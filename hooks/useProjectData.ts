import { useState, useEffect, useCallback } from 'react';
import type { ProjectData, Task, ProfileAssignment } from '../types';
import { LOCAL_STORAGE_KEY, SAMPLE_DATA } from '../constants';
import { produce } from 'immer';

export const useProjectData = () => {
  const [projectData, setProjectData] = useState<ProjectData>({ tasks: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('Loading from localStorage:', { storedData });
      
      if (storedData) {
        const parsedData: ProjectData = JSON.parse(storedData);
        console.log('Parsed data:', parsedData);
        
        if(parsedData && Array.isArray(parsedData.tasks)) {
           console.log('Setting project data from localStorage:', parsedData);
           setProjectData(parsedData);
        } else {
            console.log('Invalid data structure, using SAMPLE_DATA');
            setProjectData(SAMPLE_DATA);
        }
      } else {
        console.log('No stored data found, using SAMPLE_DATA');
        setProjectData(SAMPLE_DATA);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage, using sample data.', error);
      setProjectData(SAMPLE_DATA);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectData));
      } catch (error) {
        console.error('Failed to save data to localStorage.', error);
      }
    }
  }, [projectData, isInitialized]);
  
  const getNewTaskOrder = useCallback((parentId?: string) => {
    const siblings = projectData.tasks.filter(t => t.parentId === parentId);
    if (siblings.length === 0) {
      if (!parentId) return 1;
      const parent = projectData.tasks.find(t => t.id === parentId);
      if (!parent) return 1;
      const levelMultiplier = Math.pow(10, -(parent.level));
      return parent.order + levelMultiplier;
    }
    const lastSiblingOrder = Math.max(...siblings.map(s => s.order));
    const parent = parentId ? projectData.tasks.find(t => t.id === parentId) : null;
    const levelMultiplier = parent ? Math.pow(10, -(parent.level)) : 1;

    // A bit of logic to handle floating point inaccuracies
    const orderStr = lastSiblingOrder.toString();
    const decimalPlaces = orderStr.includes('.') ? orderStr.split('.')[1].length : 0;
    const increment = Math.pow(10, -decimalPlaces) * levelMultiplier;
    
    return parseFloat((lastSiblingOrder + increment).toPrecision(15));
  }, [projectData.tasks]);


  const addTask = useCallback((taskData: Omit<Task, 'id' | 'order' | 'profiles'> & { parentId?: string }) => {
    setProjectData(produce(draft => {
        const order = getNewTaskOrder(taskData.parentId);
        const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            order,
            profiles: [],
        };
        draft.tasks.push(newTask);
    }));
  }, [getNewTaskOrder]);


  const updateTask = useCallback((taskId: string, updates: Partial<Pick<Task, 'name' | 'description'>>) => {
    setProjectData(produce(draft => {
        const task = draft.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
        }
    }));
  }, []);
  
  const deleteTask = useCallback((taskId: string) => {
    setProjectData(produce(draft => {
      const tasksToDelete = new Set<string>([taskId]);
      let changed = true;
      while(changed) {
        changed = false;
        const currentSize = tasksToDelete.size;
        draft.tasks.forEach(t => {
          if(t.parentId && tasksToDelete.has(t.parentId)) {
            tasksToDelete.add(t.id);
          }
        });
        if(tasksToDelete.size > currentSize) changed = true;
      }
      draft.tasks = draft.tasks.filter(t => !tasksToDelete.has(t.id));
    }));
  }, []);

  const addProfileToTask = useCallback((taskId: string, profile: ProfileAssignment) => {
    setProjectData(produce(draft => {
        const task = draft.tasks.find(t => t.id === taskId);
        if (task) {
            task.profiles.push(profile);
        }
    }));
  }, []);

  const updateTaskProfile = useCallback((taskId: string, profileIndex: number, updates: Partial<ProfileAssignment>) => {
    setProjectData(produce(draft => {
        const task = draft.tasks.find(t => t.id === taskId);
        if (task && task.profiles[profileIndex]) {
            Object.assign(task.profiles[profileIndex], updates);
        }
    }));
  }, []);

  const removeProfileFromTask = useCallback((taskId: string, profileIndex: number) => {
    setProjectData(produce(draft => {
        const task = draft.tasks.find(t => t.id === taskId);
        if (task && task.profiles.length > 1) { // Prevent deleting the last profile
            task.profiles.splice(profileIndex, 1);
        }
    }));
  }, []);

  const moveTask = useCallback((draggedId: string, targetId: string | null, position: 'before' | 'after' | 'inside' | 'root') => {
    setProjectData(produce(draft => {
        const draggedTask = draft.tasks.find(t => t.id === draggedId);
        if (!draggedTask) return;

        const descendantIds = new Set<string>();
        const findDescendants = (parentId: string) => {
            draft.tasks.forEach(t => {
                if (t.parentId === parentId) {
                    descendantIds.add(t.id);
                    findDescendants(t.id);
                }
            });
        };
        findDescendants(draggedId);

        if (targetId && (targetId === draggedId || descendantIds.has(targetId))) {
            console.error("Cannot drop a task into itself or its children.");
            return;
        }
        
        const updateChildLevels = (parentId: string, newParentLevel: number) => {
            draft.tasks.forEach(t => {
                if (t.parentId === parentId) {
                    t.level = newParentLevel + 1;
                    updateChildLevels(t.id, t.level);
                }
            });
        };

        const maxDepthOfDragged = (taskId: string, currentDepth: number): number => {
            const children = draft.tasks.filter(t => t.parentId === taskId);
            if (children.length === 0) return currentDepth;
            return Math.max(...children.map(c => maxDepthOfDragged(c.id, currentDepth + 1)));
        };

        let newParentId: string | undefined = undefined;
        let newLevel: number;
        let newOrder: number;

        if (position === 'inside') {
            const targetTask = draft.tasks.find(t => t.id === targetId);
            if (!targetTask || targetTask.level >= 3) return;

            const draggedDepth = maxDepthOfDragged(draggedTask.id, 1);
            if (targetTask.level + draggedDepth > 3) {
                alert("This move is not allowed as it would create a task hierarchy deeper than 3 levels.");
                return;
            }

            newParentId = targetTask.id;
            newLevel = targetTask.level + 1;
            const siblings = draft.tasks.filter(t => t.parentId === newParentId).sort((a, b) => a.order - b.order);
            const lastSibling = siblings[siblings.length - 1];
            newOrder = lastSibling ? lastSibling.order + Math.pow(10, -newLevel) : targetTask.order + Math.pow(10, -(newLevel -1));

        } else if (position === 'root') {
             newParentId = undefined;
             newLevel = 1;
             const siblings = draft.tasks.filter(t => !t.parentId).sort((a, b) => a.order - b.order);
             const lastSibling = siblings.filter(t => t.id !== draggedId)[siblings.length - 1];
             newOrder = lastSibling ? Math.floor(lastSibling.order) + 1 : 1;
        } else {
            const targetTask = draft.tasks.find(t => t.id === targetId);
            if (!targetTask) return;

            const draggedDepth = maxDepthOfDragged(draggedTask.id, 1);
            if (targetTask.level + draggedDepth - 1 > 3) {
                alert("This move is not allowed as it would create a task hierarchy deeper than 3 levels.");
                return;
            }

            newParentId = targetTask.parentId;
            newLevel = targetTask.level;
            const siblings = draft.tasks.filter(t => t.parentId === newParentId && t.id !== draggedId).sort((a, b) => a.order - b.order);
            const targetIndex = siblings.findIndex(t => t.id === targetId);

            if (position === 'before') {
                const prevSibling = siblings[targetIndex - 1];
                const orderAbove = prevSibling ? prevSibling.order : 0;
                newOrder = (orderAbove + targetTask.order) / 2;
            } else { 
                const nextSibling = siblings[targetIndex + 1];
                const orderBelow = nextSibling ? nextSibling.order : Math.floor(targetTask.order) + 1;
                newOrder = (targetTask.order + orderBelow) / 2;
            }
        }
        
        draggedTask.parentId = newParentId;
        draggedTask.level = newLevel;
        draggedTask.order = parseFloat(newOrder.toPrecision(15));
        
        updateChildLevels(draggedId, newLevel);
    }));
  }, []);

  return { 
    projectData, 
    setProjectData,
    addTask,
    updateTask,
    deleteTask,
    addProfileToTask,
    updateTaskProfile,
    removeProfileFromTask,
    getNewTaskOrder,
    moveTask
  };
};