import React, { useState } from 'react';
import type { Task, ProfileAssignment } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectItem } from './ui/select';
import { Trash2, Plus, Edit3, Save, X, ChevronRight, ChevronDown, Indent, GripVertical, AlertTriangle } from 'lucide-react';
import { PROFILE_TYPES, TIMELINE_OPTIONS } from '../constants';
import ConfirmationDialog from './ConfirmationDialog';

interface TaskItemProps {
  task: Task;
  level: number;
  isExpanded: boolean;
  onToggleExpand: (taskId: string) => void;
  renderSubTasks: (tasks: Task[], level: number) => React.ReactNode;
  addTask: (taskData: Omit<Task, 'id' | 'order' | 'profiles'> & { parentId?: string }) => void;
  updateTask: (taskId: string, updates: Partial<Pick<Task, 'name' | 'description'>>) => void;
  deleteTask: (taskId: string) => void;
  addProfileToTask: (taskId: string, profile: ProfileAssignment) => void;
  updateTaskProfile: (taskId: string, profileIndex: number, updates: Partial<ProfileAssignment>) => void;
  removeProfileFromTask: (taskId:string, profileIndex: number) => void;
  moveTask: (draggedId: string, targetId: string | null, position: 'before' | 'after' | 'inside') => void;
  draggedItemId: string | null;
  setDraggedItemId: (id: string | null) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, level, isExpanded, onToggleExpand, renderSubTasks, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [dropPosition, setDropPosition] = useState<'top' | 'bottom' | 'inside' | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  const handleSave = () => {
    props.updateTask(task.id, { name: editedName, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(task.name);
    setEditedDescription(task.description);
    setIsEditing(false);
  };

  const handleAddSubTask = () => {
    if (task.level < 3) {
      props.addTask({
        name: 'New Sub-Task',
        description: '',
        level: task.level + 1,
        parentId: task.id,
      });
      if (!isExpanded) {
        onToggleExpand(task.id);
      }
    }
  };
  
  const handleAddProfile = () => {
    props.addProfileToTask(task.id, { profileType: PROFILE_TYPES[0], timeline: TIMELINE_OPTIONS[0] });
  };
  
  const handleDragStart = (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', task.id);
      e.dataTransfer.effectAllowed = "move";
      setTimeout(() => props.setDraggedItemId(task.id), 0);
  };

  const handleDragEnd = () => {
      props.setDraggedItemId(null);
      setDropPosition(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!itemRef.current || task.id === props.draggedItemId) return;

      const rect = itemRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const height = rect.height;

      if (y < height * 0.25) {
          setDropPosition('top');
      } else if (y > height * 0.75) {
          setDropPosition('bottom');
      } else {
          setDropPosition(task.level < 3 ? 'inside' : 'bottom');
      }
  };

  const handleDragLeave = () => {
      setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dropPosition) return;
      
      const draggedId = e.dataTransfer.getData('text/plain');
      if (draggedId && draggedId !== task.id) {
          const positionMap = { top: 'before', bottom: 'after', inside: 'inside' } as const;
          props.moveTask(draggedId, task.id, positionMap[dropPosition]);
      }
      setDropPosition(null);
      props.setDraggedItemId(null);
  };
  
  const handleConfirmDelete = () => {
      props.deleteTask(task.id);
      setShowDeleteConfirm(false);
  }


  const hasChildren = task.children && task.children.length > 0;
  const indentation = (level - 1) * 24;

  return (
    <>
      <div 
        ref={itemRef}
        className={`relative transition-opacity ${props.draggedItemId === task.id ? 'opacity-30' : 'opacity-100'}`}
        style={{ marginLeft: `${indentation}px` }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dropPosition === 'top' && <div className="absolute -top-1 left-0 right-0 h-1.5 bg-blue-500 rounded-full z-10" />}
        {dropPosition === 'bottom' && <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-blue-500 rounded-full z-10" />}
        <Card className={`bg-white shadow-sm hover:shadow-md transition-all duration-200 ${dropPosition === 'inside' ? 'outline outline-2 outline-offset-2 outline-blue-500' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
               <div className="flex-shrink-0 pt-1 flex items-center">
                  <div 
                      className="cursor-move text-gray-400 hover:text-gray-700"
                      draggable
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                  >
                      <GripVertical size={20} />
                  </div>
                  {hasChildren ? (
                    <button onClick={() => onToggleExpand(task.id)} className="text-gray-500 hover:text-gray-800">
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </button>
                  ) : <div className="w-[20px]">&nbsp;</div>}
              </div>

              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                    <Textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} placeholder="Task description (Markdown supported)" />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">{task.name}</h4>
                      <Badge variant="secondary">Level {task.level}</Badge>
                    </div>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  </div>
                )}

                <div className={`mt-3 ${isEditing ? 'space-y-2' : 'flex flex-wrap items-center gap-x-4 gap-y-2'}`}>
                  {task.profiles.map((profile, index) => {
                    if (isEditing) {
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <Select
                            className="w-[150px]"
                            value={profile.profileType}
                            onChange={(e) => props.updateTaskProfile(task.id, index, { profileType: e.target.value })}
                          >
                            {PROFILE_TYPES.map(pt => <SelectItem key={pt} value={pt}>{pt}</SelectItem>)}
                          </Select>
                          <Select
                            className="w-[130px]"
                            value={profile.timeline}
                            onChange={(e) => props.updateTaskProfile(task.id, index, { timeline: e.target.value })}
                          >
                            {TIMELINE_OPTIONS.map(to => <SelectItem key={to} value={to}>{to}</SelectItem>)}
                          </Select>
                          {task.profiles.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => props.removeProfileFromTask(task.id, index)}>
                              <X size={16} className="text-red-500" />
                            </Button>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Badge key={index} variant="secondary">
                        {`${profile.profileType} - ${profile.timeline}`}
                      </Badge>
                    );
                  })}
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={handleAddProfile}>
                      <Plus size={16} className="mr-1" /> Add Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}><Save size={16} className="mr-1" /> Save</Button>
                    <Button size="sm" variant="ghost" onClick={handleCancel}><X size={16} className="mr-1" /> Cancel</Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}><Edit3 size={16} /></Button>
                      <Button size="sm" variant="destructive" onClick={() => setShowDeleteConfirm(true)}><Trash2 size={16} /></Button>
                    </div>
                    {task.level < 3 && (
                      <Button size="sm" variant="outline" onClick={handleAddSubTask}><Indent size={16} className="mr-1" /> Add Sub-task</Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {hasChildren && isExpanded && (
          <div className="mt-2 border-l-2 border-gray-200 pl-4">
             {renderSubTasks(task.children!, level + 1)}
          </div>
        )}
      </div>
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
        title="Delete Task?"
        message="Are you sure you want to delete this task and all of its sub-tasks? This action cannot be undone."
        Icon={AlertTriangle}
      />
    </>
  );
};

export default TaskItem;