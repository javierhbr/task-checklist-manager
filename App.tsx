import React, { useState, useCallback, useRef } from 'react';
import { useProjectData } from './hooks/useProjectData';
import AllTasksView from './components/AllTasksView';
import ByProfileView from './components/ByProfileView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { exportToJSON, exportToCSV } from './utils/export';
import ConfirmationDialog from './components/ConfirmationDialog';
import type { ProjectData } from './types';

const App: React.FC = () => {
  const { 
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
  } = useProjectData();

  const [activeView, setActiveView] = useState<'all' | 'profile'>('all');
  const [showImportWarning, setShowImportWarning] = useState<boolean>(false);
  const [pendingImportData, setPendingImportData] = useState<ProjectData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const data = JSON.parse(text);
          // Basic validation
          if (data && Array.isArray(data.tasks)) {
            if (projectData.tasks.length > 0) {
              setPendingImportData(data);
              setShowImportWarning(true);
            } else {
              setProjectData(data);
            }
          } else {
            alert('Invalid JSON format.');
          }
        } catch (error) {
          alert('Error parsing JSON file.');
        } finally {
            if(fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
      };
      reader.readAsText(file);
    }
  };

  const confirmImport = () => {
    if (pendingImportData) {
      setProjectData(pendingImportData);
    }
    setShowImportWarning(false);
    setPendingImportData(null);
  };

  const cancelImport = () => {
    setShowImportWarning(false);
    setPendingImportData(null);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleExportJSON = useCallback(() => {
    exportToJSON(projectData, 'project-data.json');
  }, [projectData]);

  const handleExportCSV = useCallback(() => {
    exportToCSV(projectData.tasks, 'project-data.csv');
  }, [projectData.tasks]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Hierarchical Task Checklist Manager</h1>
              <p className="text-gray-500 mt-1">Manage complex task lists with profile-specific timelines.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".json"
                onChange={handleFileImport}
              />
              <Button variant="outline" onClick={triggerFileUpload}>
                <Upload className="mr-2 h-4 w-4" /> Import JSON
              </Button>
              <Button variant="outline" onClick={handleExportJSON}>
                <Download className="mr-2 h-4 w-4" /> Export JSON
              </Button>
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" /> Export All to CSV
              </Button>
            </div>
          </div>
        </header>

        {/* Fix: Explicitly cast value type for onValueChange to satisfy Tabs component props. */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'all' | 'profile')} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="profile">By Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllTasksView 
              tasks={projectData.tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              addProfileToTask={addProfileToTask}
              updateTaskProfile={updateTaskProfile}
              removeProfileFromTask={removeProfileFromTask}
              getNewTaskOrder={getNewTaskOrder}
              moveTask={moveTask}
            />
          </TabsContent>
          <TabsContent value="profile">
            <ByProfileView tasks={projectData.tasks} />
          </TabsContent>
        </Tabs>
      </div>
      <ConfirmationDialog
        isOpen={showImportWarning}
        onConfirm={confirmImport}
        onCancel={cancelImport}
        title="Overwrite Existing Data?"
        message="Importing this file will overwrite all current tasks. This action cannot be undone. Are you sure you want to continue?"
        Icon={AlertTriangle}
      />
    </div>
  );
};

export default App;