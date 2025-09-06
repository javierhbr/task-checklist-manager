# **Complete System Requirements: Hierarchical Task Checklist Manager**

## **System Overview**
A comprehensive React 19 + TypeScript web application for managing hierarchical task lists with profile-specific timelines, featuring automatic localStorage persistence, multi-format exports, and dynamic checklist generation capabilities.

---

## **Core Data Structure**

### **Task Entity Schema**
```typescript
interface Task {
  id: string;                    // Unique identifier (e.g., "task-1732842567890-xyz123")
  order: number;                 // Decimal ordering (1, 1.1, 1.11, 2, 2.1, etc.)
  name: string;                  // Task title/name
  description: string;           // Markdown-formatted description
  profiles: ProfileAssignment[]; // Array of profile assignments
  parentId?: string;             // Optional parent task ID for hierarchy
  level: number;                 // Hierarchy level (1=main, 2=sub, 3=sub-sub)
}

interface ProfileAssignment {
  profileType: string;           // Profile type (Contractor, Associate, CDP, etc.)
  timeline: string;              // Timeline period (Week 1, Month 1, etc.)
}

interface ProjectData {
  tasks: Task[];                 // Array of all tasks
}
```

### **Hierarchy Rules**
- **Level 1**: Main tasks (no parent)
- **Level 2**: Sub-tasks (parent must be Level 1)
- **Level 3**: Sub-sub-tasks (parent must be Level 2)
- **Maximum depth**: 3 levels
- **Ordering system**: Decimal notation (1.0 → 1.1 → 1.11)

---

## **Technical Stack & Dependencies**

### **Core Technologies**
- **React**: 19.x with hooks (useState, useEffect, useCallback)
- **TypeScript**: Strict typing for all components and data structures
- **Base UI Components**: Shadcn/ui component library
- **Build System**: Modern React build tools

### **Required UI Components**
```typescript
// Base UI Dependencies
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
```

### **Icons & Visual Elements**
```typescript
// Lucide React Icons
import { 
  Trash2, Plus, Download, Upload, Edit3, Save, X, 
  AlertTriangle, ChevronRight, ChevronDown, Indent 
} from 'lucide-react';
```

---

## **Data Management System**

### **Persistence Layer**
- **Storage**: Browser localStorage with key `"task-checklist-data"`
- **Auto-save**: Automatic persistence on every data change
- **Auto-load**: Data restoration on application initialization
- **Backup strategy**: Manual JSON export capability

### **Import/Export Capabilities**

#### **Import Formats**
- **JSON**: Complete project structure import
- **Overwrite protection**: Warning dialog for existing data
- **Data validation**: JSON structure verification

#### **Export Formats**

**Complete Data Export:**
- **JSON**: Full project structure with hierarchy
- **Excel**: Tabular format with Level, Parent ID, Profile, Timeline columns

**Profile-Specific Checklist Export:**
- **Markdown**: Hierarchical checklist with indented checkboxes
- **CSV**: Flat structure with Level indicators
- **Excel**: Formatted checklist with checkbox symbols

---

## **User Interface Architecture**

### **Main Navigation**
**Dual-View System:**
1. **"All Tasks" View**: Complete hierarchical management interface
2. **"By Profile" View**: Profile-filtered checklist preview

### **All Tasks View Features**

#### **Hierarchical Display**
- **Tree structure**: Expandable/collapsible task hierarchy
- **Visual indicators**: 
  - Level badges (Level 1, 2, 3)
  - Indentation (24px per level)
  - Expand/collapse chevrons
  - Parent-child connection lines

#### **Task Management Operations**
- **Add Main Task**: Creates Level 1 tasks
- **Add Sub-Task**: Creates child tasks (Level 2 or 3)
- **Inline editing**: Direct text modification
- **Drag indicators**: Visual hierarchy cues
- **Cascade deletion**: Removes task and all children

#### **Profile Assignment Interface**
- **Dynamic profile addition**: Add/remove profile assignments per task
- **Timeline assignment**: Separate timeline per profile type
- **Dropdown selectors**: Profile types and timeline options
- **Validation**: Prevents deletion of last profile assignment

### **By Profile View Features**

#### **Profile Selection**
- **Dropdown filter**: Select from available profile types
- **Dynamic population**: Auto-populated from task assignments
- **Empty state handling**: Informative messages for no data

#### **Checklist Preview**
- **Timeline grouping**: Tasks organized by timeline periods
- **Hierarchical display**: Maintains parent-child relationships
- **Interactive checkboxes**: Visual checkbox elements
- **Level indicators**: Badge system for hierarchy levels
- **Indentation**: Progressive left margin by level

---

## **Profile & Timeline Management**

### **Profile Types**
**Default Types:**
- Contractor
- Associate  
- CDP (Career Development Program)
- Intern
- Manager

**Extensibility**: System supports custom profile types

### **Timeline Options**
**Available Periods:**
- Week 1, Week 2, Week 3, Week 4
- Month 1, Month 2, Month 3, Month 6, Month 12

**Characteristics:**
- Relative periods (not absolute dates)
- Chronological ordering
- Profile-specific assignment capability

---

## **Data Processing Algorithms**

### **Hierarchy Construction**
```typescript
buildHierarchy(tasks: Task[]): Task[] {
  // 1. Create task map for O(1) lookups
  // 2. Initialize children arrays
  // 3. Build parent-child relationships
  // 4. Sort by order at each level
  // 5. Return root-level tasks with children
}
```

### **Profile Filtering**
```typescript
getTasksForProfile(profileType: string): { [timeline: string]: Task[] } {
  // 1. Filter tasks by profile assignment
  // 2. Build hierarchy for filtered tasks
  // 3. Group by timeline while maintaining hierarchy
  // 4. Flatten for timeline display
  // 5. Return timeline-grouped task collections
}
```

### **Order Management**
**Decimal Ordering System:**
- **Main tasks**: Integer values (1, 2, 3, ...)
- **Sub-tasks**: Parent + 0.1 increments (1.1, 1.2, 1.3, ...)
- **Sub-sub-tasks**: Parent + 0.01 increments (1.11, 1.12, 1.13, ...)

---

## **Export System Specifications**

### **Markdown Export Format**
```markdown
# [ProfileType] Checklist

## [Timeline Period]
- [ ] **[Main Task Name]**
  [Task Description]
  
  - [ ] **[Sub-Task Name]**
    [Sub-Task Description]
    
    - [ ] **[Sub-Sub-Task Name]**
      [Sub-Sub-Task Description]
```

### **CSV Export Schema**
```csv
Timeline,Level,Task Name,Description
"Week 1",1,"Setup Environment","Configure development setup"
"Week 1",2,"Install Software","Download required tools"
"Week 1",3,"Configure IDE","Setup editor preferences"
```

### **Excel Export Structure**
**Complete Data:**
- Order | Level | Parent ID | Task Name | Description | Profile Type | Timeline

**Profile Checklist:**
- Timeline | Level | Checklist | Task Name | Description | Completed

---

## **State Management Architecture**

### **React State Structure**
```typescript
// Primary data state
const [projectData, setProjectData] = useState<ProjectData>();

// UI state
const [selectedProfile, setSelectedProfile] = useState<string>("");
const [activeView, setActiveView] = useState<"all" | "profile">("all");
const [editingTask, setEditingTask] = useState<string | null>(null);
const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

// Import/Export state
const [showImportWarning, setShowImportWarning] = useState<boolean>(false);
const [pendingImportData, setPendingImportData] = useState<ProjectData | null>(null);
```

### **Data Flow Patterns**
1. **User Action** → State Update → Auto-save to localStorage
2. **Import Action** → Validation → Warning Dialog → State Update
3. **Export Action** → Data Processing → File Generation → Download

---

## **File Format Specifications**

### **JSON Structure**
```json
{
  "tasks": [
    {
      "id": "task-001",
      "order": 1,
      "name": "Main Task",
      "description": "Task description in **Markdown**",
      "level": 1,
      "profiles": [
        {
          "profileType": "Associate",
          "timeline": "Week 1"
        }
      ]
    },
    {
      "id": "task-001-1",
      "order": 1.1,
      "name": "Sub Task",
      "description": "Sub-task description",
      "level": 2,
      "parentId": "task-001",
      "profiles": [
        {
          "profileType": "Associate", 
          "timeline": "Week 1"
        }
      ]
    }
  ]
}
```

---

## **Error Handling & Validation**

### **Data Validation**
- **JSON Import**: Schema validation before import
- **Parent-Child Integrity**: Validates parent exists before creating child
- **Level Constraints**: Prevents creation beyond Level 3
- **Profile Assignment**: Ensures at least one profile per task

### **Error Recovery**
- **localStorage Corruption**: Falls back to sample data
- **Invalid JSON**: User notification with error details
- **Missing Parent**: Prevents orphaned task creation

---

## **Performance Considerations**

### **Optimization Strategies**
- **useCallback**: Memoized functions for expensive operations
- **Computed Hierarchy**: Build tree structure only when needed
- **Conditional Rendering**: Render children only when expanded
- **Efficient Updates**: Immutable state updates

### **Memory Management**
- **localStorage Limits**: JSON string storage (typical 5-10MB limit)
- **Large Dataset Handling**: Pagination considerations for 1000+ tasks
- **Export Optimization**: Streaming for large file exports

---

## **Browser Compatibility**

### **Minimum Requirements**
- **Modern ES6+ Support**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **localStorage API**: Standard across all modern browsers
- **File Download API**: Blob and URL.createObjectURL support
- **JSON API**: Native JSON.parse/stringify

### **Progressive Enhancement**
- **No localStorage**: Graceful degradation to session-only storage
- **File API Limitations**: Fallback download methods
- **Touch Support**: Mobile-friendly interactions

---

## **Security Considerations**

### **Data Protection**
- **Client-Side Only**: No server-side data transmission
- **localStorage Isolation**: Domain-specific data storage
- **XSS Prevention**: Input sanitization for user content
- **File Upload Safety**: JSON validation and sanitization

### **Privacy Compliance**
- **Local Storage Only**: No external data transmission
- **No Analytics**: No user tracking or data collection
- **Offline Capable**: Functions without internet connection

---

## **Development & Deployment**


## **Extensibility Framework**

### **Customization Points**
- **Profile Types**: Configurable profile type list
- **Timeline Options**: Customizable timeline periods
- **Export Formats**: Plugin architecture for new formats
- **UI Themes**: CSS variable-based theming

### **Integration Capabilities**
- **API Integration**: RESTful API connector interfaces
- **Database Sync**: Potential backend synchronization
- **Third-Party Tools**: Export to project management systems
- **Mobile Apps**: React Native code sharing potential

---

## **Testing Strategy**

### **Unit Testing**
- **Component Testing**: React Testing Library
- **Function Testing**: Jest for utility functions
- **Type Safety**: TypeScript compilation checks

### **Integration Testing**
- **localStorage Integration**: Data persistence testing
- **File Operations**: Import/export functionality
- **User Workflows**: End-to-end task management

### **Accessibility Testing**
- **WCAG Compliance**: Screen reader compatibility
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Visual accessibility standards

---

This comprehensive specification provides a complete technical foundation for implementing the Hierarchical Task Checklist Manager system with all required functionalities, performance considerations, and extensibility options.