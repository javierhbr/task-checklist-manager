
export interface ProfileAssignment {
  profileType: string;
  timeline: string;
}

export interface Task {
  id: string;
  order: number;
  name: string;
  description: string;
  profiles: ProfileAssignment[];
  parentId?: string;
  level: number;
  children?: Task[]; // Added for hierarchical structure
}

export interface ProjectData {
  tasks: Task[];
}
