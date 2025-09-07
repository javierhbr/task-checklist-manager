
export const PROFILE_TYPES = [
  'Contractor',
  'Associate',
  'CDP',
  'Intern',
  'Manager',
];

export const TIMELINE_OPTIONS = [
  'Week 1',
  'Week 2',
  'Week 3',
  'Week 4',
  'Month 1',
  'Month 2',
  'Month 3',
  'Month 6',
  'Month 12',
];

export const LOCAL_STORAGE_KEY = 'task-checklist-data';

export const SAMPLE_DATA = {
  tasks: [
    {
      id: "task-1",
      order: 1,
      name: "Onboarding & Setup",
      description: "Complete initial setup and get familiar with the tools.",
      profiles: [{ profileType: "Associate", timeline: "Week 1" }],
      level: 1,
    },
    {
      id: "task-1-1",
      order: 1.1,
      name: "Setup Development Environment",
      description: "Install all necessary software and configure your IDE.",
      profiles: [{ profileType: "Associate", timeline: "Week 1" }],
      parentId: "task-1",
      level: 2,
    },
     {
      id: "task-1-1-1",
      order: 1.11,
      name: "Install Node.js & Git",
      description: "Make sure you have the latest LTS version of Node.js and Git installed.",
      profiles: [{ profileType: "Associate", timeline: "Week 1" }],
      parentId: "task-1-1",
      level: 3,
    },
    {
      id: "task-2",
      order: 2,
      name: "First Project Contribution",
      description: "Make your first contribution to a live project.",
      profiles: [
        { profileType: "Associate", timeline: "Month 1" },
        { profileType: "Contractor", timeline: "Week 2" },
      ],
      level: 1,
    },
  ],
};
