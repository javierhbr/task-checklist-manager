import React, { useState, useCallback, useRef } from 'react';
import { useProjectData } from './hooks/useProjectData';
import AllTasksView from './components/AllTasksView';
import ByProfileView from './components/ByProfileView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Download, Upload, AlertTriangle } from 'lucide-react';
import { exportToJSON, exportToCSV } from './utils/export';
import ImportConfirmationDialog from './components/ImportConfirmationDialog';
import { LOCAL_STORAGE_KEY, BUILTIN_CHECKLISTS } from './constants';
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
  const [showImportOptions, setShowImportOptions] = useState<boolean>(false);
  const [selectedChecklist, setSelectedChecklist] = useState<string>('');
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
            setProjectData(data);
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


  const handleExportAndImport = () => {
    // First export current data
    handleExportJSON();
    // Then show file picker for import
    setShowImportOptions(false);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleDirectImport = () => {
    // Show file picker directly
    setShowImportOptions(false);
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const cancelImport = () => {
    setShowImportOptions(false);
  };

  const triggerFileUpload = () => {
    // Check if there's data in localStorage before showing file picker
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData && storedData !== 'null') {
      try {
        const parsedStoredData = JSON.parse(storedData);
        if (parsedStoredData && Array.isArray(parsedStoredData.tasks) && parsedStoredData.tasks.length > 0) {
          setShowImportOptions(true);
          return;
        }
      } catch {
        // If localStorage is corrupted, continue with file picker
      }
    }
    // No existing data, show file picker directly
    fileInputRef.current?.click();
  };

  const handleExportJSON = useCallback(() => {
    exportToJSON(projectData, 'project-data.json');
  }, [projectData]);

  const handleExportCSV = useCallback(() => {
    exportToCSV(projectData.tasks, 'project-data.csv');
  }, [projectData.tasks]);

  const handleBuiltinChecklistLoad = (checklistKey: string) => {
    if (!checklistKey) return;
    
    const checklist = BUILTIN_CHECKLISTS.find(c => c.key === checklistKey);
    if (!checklist) return;

    setProjectData(checklist.data);
    setSelectedChecklist(checklistKey);
  };

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
              <Select 
                value={selectedChecklist} 
                onChange={(e) => handleBuiltinChecklistLoad(e.target.value)}
                className="w-[200px]"
              >
                <SelectItem value="">Load Built-in Checklist</SelectItem>
                {BUILTIN_CHECKLISTS.map((checklist) => (
                  <SelectItem key={checklist.key} value={checklist.key}>
                    {checklist.label}
                  </SelectItem>
                ))}
              </Select>
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
      <ImportConfirmationDialog
        isOpen={showImportOptions}
        onExport={handleExportAndImport}
        onImport={handleDirectImport}
        onCancel={cancelImport}
        title="Import Will Override Current Data"
        message="If you import it will override any change you have now. Do you want to export the current data?"
        Icon={AlertTriangle}
      />
    </div>
  );
};

export default App;