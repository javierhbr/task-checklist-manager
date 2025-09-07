import type { ProjectData, Task } from '../types';
import { TIMELINE_OPTIONS } from '../constants';
import { buildHierarchy } from './hierarchy';

// Generic download trigger
const downloadFile = (content: string, mimeType: string, filename: string) => {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Export entire project to JSON (flat structure for re-importing)
export const exportToJSON = (data: ProjectData, filename: string) => {
  const jsonString = JSON.stringify(data, null, 2);
  downloadFile(jsonString, 'application/json', filename);
};

const escapeCsvField = (field: any): string => {
    if (field === null || field === undefined) {
        return '';
    }
    const str = String(field);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
};

// Convert flat data to CSV string
const convertToCSV = (data: any[]): string => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvRows = [
        headers.join(','),
        ...data.map(row => headers.map(fieldName => escapeCsvField(row[fieldName])).join(','))
    ];
    return csvRows.join('\r\n');
};

// Helper to convert tasks to a flat array for CSV
const flattenTasksForGeneralExport = (tasks: Task[]): any[] => {
    const flatTasks: any[] = [];
    tasks.forEach(task => {
        if (task.profiles.length > 0) {
            task.profiles.forEach(profile => {
                flatTasks.push({
                    id: task.id,
                    order: task.order,
                    name: task.name,
                    description: task.description,
                    parentId: task.parentId || '',
                    level: task.level,
                    profileType: profile.profileType,
                    timeline: profile.timeline,
                });
            });
        } else {
            flatTasks.push({
                id: task.id,
                order: task.order,
                name: task.name,
                description: task.description,
                parentId: task.parentId || '',
                level: task.level,
                profileType: '',
                timeline: '',
            });
        }
    });
    return flatTasks;
}


// Export all tasks to CSV
export const exportToCSV = (tasks: Task[], filename: string) => {
    const flatTasks = flattenTasksForGeneralExport(tasks);
    const csvString = convertToCSV(flatTasks);
    if (!csvString) return;
    downloadFile(csvString, 'text/csv;charset=utf-8;', filename);
};


// Generate Markdown for a specific profile's checklist
export const generateProfileChecklistMarkdown = (
  groupedTasks: { [timeline: string]: Task[] },
  profileType: string
): string => {
  let markdown = `# Checklist for ${profileType}\n\n`;
  
  const sortedTimelines = Object.keys(groupedTasks).sort((a, b) => {
      const aIndex = TIMELINE_OPTIONS.indexOf(a);
      const bIndex = TIMELINE_OPTIONS.indexOf(b);
      return aIndex - bIndex;
  });

  const taskToMarkdown = (task: Task, indentLevel: number): string => {
    const indent = '  '.repeat(indentLevel);
    let taskMd = `${indent}- [ ] **${task.name}**\n`;
    if (task.description) {
      taskMd += `${indent}  > ${task.description.replace(/\n/g, `\n${indent}  > `)}\n`;
    }
    if (task.children && task.children.length > 0) {
        task.children.forEach(child => {
            taskMd += taskToMarkdown(child, indentLevel + 1);
        });
    }
    return taskMd;
  }

  sortedTimelines.forEach(timeline => {
    markdown += `## ${timeline}\n\n`;
    const hierarchicalTasks = buildHierarchy(groupedTasks[timeline]);
    hierarchicalTasks.forEach(task => {
        markdown += taskToMarkdown(task, 0);
    });
    markdown += '\n';
  });

  return markdown;
};

// Export profile checklist to Markdown file
export const exportProfileChecklistToMarkdown = (
  groupedTasks: { [timeline: string]: Task[] },
  profileType: string,
  filename: string
) => {
  const markdownContent = generateProfileChecklistMarkdown(groupedTasks, profileType);
  downloadFile(markdownContent, 'text/markdown;charset=utf-8;', filename);
};

// Export profile checklist to CSV file
export const exportProfileChecklistToCSV = (
  groupedTasks: { [timeline: string]: Task[] },
  filename: string
) => {
  const flatTasksForCsv: { timeline: string; level: number; name: string; description: string }[] = [];
  
  const sortedTimelines = Object.keys(groupedTasks).sort((a, b) => {
      const aIndex = TIMELINE_OPTIONS.indexOf(a);
      const bIndex = TIMELINE_OPTIONS.indexOf(b);
      return aIndex - bIndex;
  });

  sortedTimelines.forEach(timeline => {
    const hierarchicalTasks = buildHierarchy(groupedTasks[timeline]);

    const processTasks = (tasks: Task[]) => {
      tasks.forEach(task => {
        flatTasksForCsv.push({
          timeline,
          level: task.level,
          name: task.name,
          description: task.description,
        });
        if (task.children && task.children.length > 0) {
          processTasks(task.children);
        }
      });
    }
    processTasks(hierarchicalTasks);
  });
  
  if (flatTasksForCsv.length === 0) return;

  const csvString = convertToCSV(flatTasksForCsv);
  if (!csvString) return;
  downloadFile(csvString, 'text/csv;charset=utf-8;', filename);
};