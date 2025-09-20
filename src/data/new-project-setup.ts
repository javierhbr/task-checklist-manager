import type { ProjectData } from '../types';

export const newProjectSetupData: ProjectData = {
  tasks: [
    {
      id: "task-1",
      order: 1,
      name: "Project Planning & Requirements",
      description: "Define project scope, requirements, and initial planning phase.",
      profiles: [
        { profileType: "Manager", timeline: "Week 1" },
        { profileType: "CDP", timeline: "Week 1" },
        { profileType: "Associate", timeline: "Week 2" }
      ],
      level: 1
    },
    {
      id: "task-1-1",
      order: 1.1,
      name: "Requirements Gathering",
      description: "Collect and document all project requirements from stakeholders.",
      profiles: [
        { profileType: "Manager", timeline: "Week 1" },
        { profileType: "CDP", timeline: "Week 1" },
        { profileType: "Associate", timeline: "Week 2" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-1-2",
      order: 1.2,
      name: "Technical Architecture Design",
      description: "Design the technical architecture and system components.",
      profiles: [
        { profileType: "CDP", timeline: "Week 1" },
        { profileType: "Manager", timeline: "Week 2" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-2",
      order: 2,
      name: "Development Environment Setup",
      description: "Set up the development environment and infrastructure.",
      profiles: [
        { profileType: "CDP", timeline: "Week 2" },
        { profileType: "Associate", timeline: "Week 2" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      level: 1
    },
    {
      id: "task-2-1",
      order: 2.1,
      name: "Repository Setup",
      description: "Create and configure version control repositories.",
      profiles: [
        { profileType: "CDP", timeline: "Week 2" },
        { profileType: "Associate", timeline: "Week 2" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-2-2",
      order: 2.2,
      name: "CI/CD Pipeline Setup",
      description: "Configure continuous integration and deployment pipelines.",
      profiles: [
        { profileType: "CDP", timeline: "Week 2" },
        { profileType: "Associate", timeline: "Week 3" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-2-3",
      order: 2.3,
      name: "Development Tools Configuration",
      description: "Set up linting, testing, and code quality tools.",
      profiles: [
        { profileType: "CDP", timeline: "Week 2" },
        { profileType: "Associate", timeline: "Week 2" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-3",
      order: 3,
      name: "Database & Backend Setup",
      description: "Set up database and backend infrastructure.",
      profiles: [
        { profileType: "CDP", timeline: "Week 3" },
        { profileType: "Associate", timeline: "Week 3" },
        { profileType: "Contractor", timeline: "Week 2" }
      ],
      level: 1
    },
    {
      id: "task-3-1",
      order: 3.1,
      name: "Database Schema Design",
      description: "Design and create initial database schema.",
      profiles: [
        { profileType: "CDP", timeline: "Week 3" },
        { profileType: "Associate", timeline: "Week 3" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-3-2",
      order: 3.2,
      name: "API Endpoints Design",
      description: "Design RESTful API endpoints and documentation.",
      profiles: [
        { profileType: "CDP", timeline: "Week 3" },
        { profileType: "Associate", timeline: "Week 3" },
        { profileType: "Contractor", timeline: "Week 2" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-4",
      order: 4,
      name: "Frontend Setup",
      description: "Set up frontend framework and initial components.",
      profiles: [
        { profileType: "Associate", timeline: "Week 4" },
        { profileType: "Intern", timeline: "Week 4" },
        { profileType: "Contractor", timeline: "Week 3" }
      ],
      level: 1
    },
    {
      id: "task-4-1",
      order: 4.1,
      name: "UI/UX Design Implementation",
      description: "Implement initial UI components and design system.",
      profiles: [
        { profileType: "Associate", timeline: "Week 4" },
        { profileType: "Intern", timeline: "Week 4" },
        { profileType: "Contractor", timeline: "Week 3" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-4-2",
      order: 4.2,
      name: "State Management Setup",
      description: "Configure state management and data flow architecture.",
      profiles: [
        { profileType: "Associate", timeline: "Week 4" },
        { profileType: "Contractor", timeline: "Week 3" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-5",
      order: 5,
      name: "Testing & Quality Assurance",
      description: "Set up testing framework and quality assurance processes.",
      profiles: [
        { profileType: "CDP", timeline: "Week 4" },
        { profileType: "Associate", timeline: "Week 5" },
        { profileType: "Contractor", timeline: "Week 4" }
      ],
      level: 1
    },
    {
      id: "task-5-1",
      order: 5.1,
      name: "Unit Testing Setup",
      description: "Configure unit testing framework and write initial tests.",
      profiles: [
        { profileType: "CDP", timeline: "Week 4" },
        { profileType: "Associate", timeline: "Week 5" },
        { profileType: "Contractor", timeline: "Week 4" }
      ],
      parentId: "task-5",
      level: 2
    },
    {
      id: "task-5-2",
      order: 5.2,
      name: "Integration Testing",
      description: "Set up integration testing and end-to-end testing.",
      profiles: [
        { profileType: "CDP", timeline: "Week 4" },
        { profileType: "Associate", timeline: "Week 5" }
      ],
      parentId: "task-5",
      level: 2
    }
  ]
};
