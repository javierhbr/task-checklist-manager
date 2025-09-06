import React, { useState, useMemo } from 'react';
import type { Task, ProfileAssignment } from '../types';
import { buildHierarchy } from '../utils/hierarchy';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AllTasksViewProps {
  tasks: Task[];
  addTask: (taskData: Omit<Task, 'id' | 'order' | 'profiles'> & { parentId?: string }) => void;
  updateTask: (taskId: string, updates: Partial<Pick<Task, 'name' | 'description'>>) => void;
  deleteTask: (taskId: string) => void;
  addProfileToTask: (taskId: string, profile: ProfileAssignment) => void;
  updateTaskProfile: (taskId: string, profileIndex: number, updates: Partial<ProfileAssignment>) => void;
  removeProfileFromTask: (taskId:string, profileIndex: number) => void;
  getNewTaskOrder: (parentId?: string) => number;
  moveTask: (draggedId: string, targetId: string | null, position: 'before' | 'after' | 'inside' | 'root') => void;
}

const AllTasksView: React.FC<AllTasksViewProps> = (props) => {
  const { tasks, addTask, getNewTaskOrder } = props;
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set(tasks.map(t => t.id)));
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const hierarchicalTasks = useMemo(() => buildHierarchy(tasks), [tasks]);

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleAddMainTask = () => {
    addTask({
      name: 'New Main Task',
      description: '',
      level: 1,
    });
  };

  const handleDragOverRoot = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
  };

  const handleDropOnRoot = (e: React.DragEvent) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text/plain');
      if (e.target === e.currentTarget && draggedId) {
          props.moveTask(draggedId, null, 'root');
      }
      setDraggedItemId(null);
  };

  const renderTasks = (tasksToRender: Task[], level: number = 1) => {
    return tasksToRender.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        level={level}
        isExpanded={expandedTasks.has(task.id)}
        onToggleExpand={toggleExpand}
        renderSubTasks={renderTasks}
        draggedItemId={draggedItemId}
        setDraggedItemId={setDraggedItemId}
        {...props}
      />
    ));
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Tasks</CardTitle>
        <Button onClick={handleAddMainTask}>
          <Plus className="mr-2 h-4 w-4" /> Add Main Task
        </Button>
      </CardHeader>
      <CardContent 
        onDragOver={handleDragOverRoot}
        onDrop={handleDropOnRoot}
        className="min-h-[100px]"
      >
        {hierarchicalTasks.length > 0 ? (
          <div className="space-y-2">
            {renderTasks(hierarchicalTasks)}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <h3 className="text-lg font-semibold">No tasks yet.</h3>
            <p>Click "Add Main Task" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllTasksView;