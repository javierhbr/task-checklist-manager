
import type { Task } from '../types';

export const buildHierarchy = (tasks: Task[]): Task[] => {
  const taskMap = new Map<string, Task>();
  const rootTasks: Task[] = [];

  // First pass: create a map and initialize children arrays
  tasks.forEach(task => {
    taskMap.set(task.id, { ...task, children: [] });
  });

  // Second pass: build the hierarchy
  taskMap.forEach(task => {
    if (task.parentId && taskMap.has(task.parentId)) {
      const parent = taskMap.get(task.parentId)!;
      parent.children?.push(task);
    } else {
      rootTasks.push(task);
    }
  });

  // Function to recursively sort children
  const sortChildren = (taskList: Task[]) => {
    taskList.sort((a, b) => a.order - b.order);
    taskList.forEach(task => {
      if (task.children && task.children.length > 0) {
        sortChildren(task.children);
      }
    });
  };

  sortChildren(rootTasks);
  
  return rootTasks;
};


export const getTasksForProfile = (tasks: Task[], profileType: string): { [timeline: string]: Task[] } => {
  // 1. Filter tasks that have the specified profile assignment
  const filteredTasks = tasks
    .filter(task => task.profiles.some(p => p.profileType === profileType))
    .map(task => {
        // Find the specific timeline for the selected profile
        const relevantProfile = task.profiles.find(p => p.profileType === profileType);
        return { ...task, timeline: relevantProfile?.timeline || 'Unassigned' };
    });
    
  // 2. Build hierarchy for the filtered tasks
  const hierarchicalTasks = buildHierarchy(filteredTasks);

  // 3. Group by timeline while maintaining hierarchy
  const groupedByTimeline: { [timeline: string]: Task[] } = {};

  const flattenAndGroup = (task: Task, timeline: string) => {
      if (!groupedByTimeline[timeline]) {
          groupedByTimeline[timeline] = [];
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...taskWithoutChildren } = task;
      groupedByTimeline[timeline].push(taskWithoutChildren as Task);

      if (task.children) {
          task.children.forEach(child => flattenAndGroup(child, (child as any).timeline));
      }
  }

  hierarchicalTasks.forEach(task => flattenAndGroup(task, (task as any).timeline));

  return groupedByTimeline;
};
