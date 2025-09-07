import React, { useState, useMemo } from 'react';
import type { Task } from '../types';
import { PROFILE_TYPES, TIMELINE_OPTIONS } from '../constants';
import { getTasksForProfile } from '../utils/hierarchy';
// Fix: Update import to remove unused Select components.
import { Select, SelectItem } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Download, Eye } from 'lucide-react';
import { buildHierarchy } from '../utils/hierarchy';
import { generateProfileChecklistMarkdown, exportProfileChecklistToMarkdown, exportProfileChecklistToCSV } from '../utils/export';
import PreviewDialog from './PreviewDialog';

interface ByProfileViewProps {
  tasks: Task[];
}

const ByProfileView: React.FC<ByProfileViewProps> = ({ tasks }) => {
  const [selectedProfile, setSelectedProfile] = useState<string>(PROFILE_TYPES[0]);
  const [markdownPreview, setMarkdownPreview] = useState<string | null>(null);

  const groupedTasks = useMemo(() => {
    if (!selectedProfile) return {};
    return getTasksForProfile(tasks, selectedProfile);
  }, [tasks, selectedProfile]);
  
  const sortedTimelines = useMemo(() => {
    return Object.keys(groupedTasks).sort((a, b) => {
      const aIndex = TIMELINE_OPTIONS.indexOf(a);
      const bIndex = TIMELINE_OPTIONS.indexOf(b);
      return aIndex - bIndex;
    });
  }, [groupedTasks]);
  
  const handleExportMarkdown = () => {
    if(!selectedProfile || Object.keys(groupedTasks).length === 0) return;
    exportProfileChecklistToMarkdown(groupedTasks, selectedProfile, `${selectedProfile}-checklist.md`);
  };
  
  const handlePreviewMarkdown = () => {
    if(!selectedProfile || Object.keys(groupedTasks).length === 0) return;
    const markdownContent = generateProfileChecklistMarkdown(groupedTasks, selectedProfile);
    setMarkdownPreview(markdownContent);
  };

  const handleExportCSV = () => {
    if(!selectedProfile || Object.keys(groupedTasks).length === 0) return;
    exportProfileChecklistToCSV(groupedTasks, `${selectedProfile}-checklist.csv`);
  };

  const TaskChecklistItem: React.FC<{task: Task, isSubtask?: boolean}> = ({ task, isSubtask = false }) => (
    <div className={`flex items-start gap-3 ${isSubtask ? 'ml-6' : ''}`}>
      <input type="checkbox" className="mt-1.5 h-4 w-4 accent-primary" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
            <span className="font-medium">{task.name}</span>
            <Badge variant="secondary">Level {task.level}</Badge>
        </div>
        {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Checklist by Profile</CardTitle>
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Fix: Refactor to use native select element structure and onChange event. */}
            <Select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)} className="w-full sm:w-[180px]">
              {PROFILE_TYPES.map(profile => (
                <SelectItem key={profile} value={profile}>{profile}</SelectItem>
              ))}
            </Select>
            <Button variant="outline" onClick={handlePreviewMarkdown} disabled={!selectedProfile || sortedTimelines.length === 0}>
              <Eye className="mr-2 h-4 w-4"/> Preview
            </Button>
            <Button variant="outline" onClick={handleExportMarkdown} disabled={!selectedProfile || sortedTimelines.length === 0}>
              <Download className="mr-2 h-4 w-4"/> Markdown
            </Button>
            <Button variant="outline" onClick={handleExportCSV} disabled={!selectedProfile || sortedTimelines.length === 0}>
              <Download className="mr-2 h-4 w-4"/> Export to Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedProfile && sortedTimelines.length > 0 ? (
          <div className="space-y-8">
            {sortedTimelines.map(timeline => {
              const timelineTasks = buildHierarchy(groupedTasks[timeline]);
              const renderChecklist = (tasks: Task[]) => {
                  return tasks.map(task => (
                      <div key={task.id}>
                          <TaskChecklistItem task={task} />
                          {task.children && task.children.length > 0 && (
                            <div className="mt-2 space-y-2 pl-6 border-l-2 ml-2 border-gray-200">
                                {renderChecklist(task.children)}
                            </div>
                          )}
                      </div>
                  ))
              }
              return (
                <div key={timeline}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">{timeline}</h3>
                  <div className="space-y-4">
                     {renderChecklist(timelineTasks)}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <h3 className="text-lg font-semibold">No tasks for this profile.</h3>
            <p>Select a different profile or add tasks in the "All Tasks" view.</p>
          </div>
        )}
      </CardContent>
      <PreviewDialog 
        isOpen={markdownPreview !== null}
        onClose={() => setMarkdownPreview(null)}
        title={`Markdown Preview: ${selectedProfile} Checklist`}
        content={markdownPreview || ''}
      />
    </Card>
  );
};

export default ByProfileView;