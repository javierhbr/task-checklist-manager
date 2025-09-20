import type { ProjectData } from '../types';

export const newHireOnboardingData: ProjectData = {
  tasks: [
    {
      id: "task-1",
      order: 1,
      name: "Pre-boarding Preparation",
      description: "Complete all necessary paperwork and setup before the first day.",
      profiles: [
        { profileType: "Associate", timeline: "Week -1" },
        { profileType: "Intern", timeline: "Week -1" },
        { profileType: "Contractor", timeline: "Week -1" }
      ],
      level: 1
    },
    {
      id: "task-1-1",
      order: 1.1,
      name: "Complete HR Paperwork",
      description: "Fill out all required HR forms including tax documents, benefits enrollment, and emergency contacts.",
      profiles: [
        { profileType: "Associate", timeline: "Week -1" },
        { profileType: "Intern", timeline: "Week -1" },
        { profileType: "Contractor", timeline: "Week -1" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-1-2",
      order: 1.2,
      name: "IT Account Setup",
      description: "Get email account, access credentials, and necessary software licenses.",
      profiles: [
        { profileType: "Associate", timeline: "Week -1" },
        { profileType: "Intern", timeline: "Week -1" },
        { profileType: "Contractor", timeline: "Week -1" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-2",
      order: 2,
      name: "First Day Orientation",
      description: "Complete first day orientation and meet the team.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      level: 1
    },
    {
      id: "task-2-1",
      order: 2.1,
      name: "Company Culture Introduction",
      description: "Learn about company values, mission, and culture through orientation sessions.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-2-2",
      order: 2.2,
      name: "Meet Your Team",
      description: "Introduction meetings with direct team members and key stakeholders.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-3",
      order: 3,
      name: "Development Environment Setup",
      description: "Set up your development environment and tools.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      level: 1
    },
    {
      id: "task-3-1",
      order: 3.1,
      name: "Install Development Tools",
      description: "Install IDE, version control, and other essential development tools.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-3-2",
      order: 3.2,
      name: "Access to Repositories",
      description: "Get access to necessary code repositories and documentation systems.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-4",
      order: 4,
      name: "First Week Goals",
      description: "Complete first week learning objectives and initial tasks.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      level: 1
    },
    {
      id: "task-4-1",
      order: 4.1,
      name: "Read Project Documentation",
      description: "Review project documentation and understand the codebase structure.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-4-2",
      order: 4.2,
      name: "Complete First Small Task",
      description: "Work on a small, well-defined task to get familiar with the development process.",
      profiles: [
        { profileType: "Associate", timeline: "Week 1" },
        { profileType: "Intern", timeline: "Week 1" },
        { profileType: "Contractor", timeline: "Week 1" }
      ],
      parentId: "task-4",
      level: 2
    }
  ]
};
