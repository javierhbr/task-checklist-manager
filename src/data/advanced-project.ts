import type { ProjectData } from '../types';

export const advancedProjectData: ProjectData = {
  tasks: [
    {
      id: "task-1",
      order: 1,
      name: "System Architecture & Design",
      description: "Design complex system architecture for enterprise-level applications.",
      profiles: [
        { profileType: "CDP", timeline: "Month 1" },
        { profileType: "Manager", timeline: "Month 1" }
      ],
      level: 1
    },
    {
      id: "task-1-1",
      order: 1.1,
      name: "Microservices Architecture Design",
      description: "Design microservices architecture with proper service boundaries and communication patterns.",
      profiles: [
        { profileType: "CDP", timeline: "Month 1" },
        { profileType: "Manager", timeline: "Month 1" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-1-2",
      order: 1.2,
      name: "Scalability & Performance Planning",
      description: "Plan for horizontal scaling, load balancing, and performance optimization.",
      profiles: [
        { profileType: "CDP", timeline: "Month 1" },
        { profileType: "Manager", timeline: "Month 1" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-1-3",
      order: 1.3,
      name: "Security Architecture",
      description: "Design comprehensive security architecture including authentication, authorization, and data protection.",
      profiles: [
        { profileType: "CDP", timeline: "Month 1" },
        { profileType: "Manager", timeline: "Month 1" }
      ],
      parentId: "task-1",
      level: 2
    },
    {
      id: "task-2",
      order: 2,
      name: "Advanced Development Practices",
      description: "Implement advanced development practices and patterns.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" },
        { profileType: "Associate", timeline: "Month 3" }
      ],
      level: 1
    },
    {
      id: "task-2-1",
      order: 2.1,
      name: "Design Patterns Implementation",
      description: "Implement advanced design patterns like Observer, Factory, and Dependency Injection.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Associate", timeline: "Month 3" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-2-2",
      order: 2.2,
      name: "Event-Driven Architecture",
      description: "Implement event-driven architecture with message queues and event sourcing.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-2-3",
      order: 2.3,
      name: "Caching Strategy",
      description: "Implement multi-layer caching strategy including Redis, CDN, and application-level caching.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Associate", timeline: "Month 3" }
      ],
      parentId: "task-2",
      level: 2
    },
    {
      id: "task-3",
      order: 3,
      name: "DevOps & Infrastructure",
      description: "Set up advanced DevOps practices and cloud infrastructure.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" }
      ],
      level: 1
    },
    {
      id: "task-3-1",
      order: 3.1,
      name: "Container Orchestration",
      description: "Set up Kubernetes or Docker Swarm for container orchestration.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-3-2",
      order: 3.2,
      name: "Infrastructure as Code",
      description: "Implement Infrastructure as Code using Terraform or CloudFormation.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-3-3",
      order: 3.3,
      name: "Monitoring & Observability",
      description: "Set up comprehensive monitoring, logging, and observability tools.",
      profiles: [
        { profileType: "CDP", timeline: "Month 2" },
        { profileType: "Manager", timeline: "Month 2" }
      ],
      parentId: "task-3",
      level: 2
    },
    {
      id: "task-4",
      order: 4,
      name: "Data Management & Analytics",
      description: "Implement advanced data management and analytics capabilities.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" }
      ],
      level: 1
    },
    {
      id: "task-4-1",
      order: 4.1,
      name: "Data Pipeline Architecture",
      description: "Design and implement data pipeline architecture for real-time and batch processing.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-4-2",
      order: 4.2,
      name: "Machine Learning Integration",
      description: "Integrate machine learning models and AI capabilities into the system.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-4-3",
      order: 4.3,
      name: "Data Warehouse Setup",
      description: "Set up data warehouse and business intelligence tools.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" }
      ],
      parentId: "task-4",
      level: 2
    },
    {
      id: "task-5",
      order: 5,
      name: "Advanced Testing & Quality",
      description: "Implement comprehensive testing strategies and quality assurance.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" },
        { profileType: "Associate", timeline: "Month 4" }
      ],
      level: 1
    },
    {
      id: "task-5-1",
      order: 5.1,
      name: "Performance Testing",
      description: "Implement load testing, stress testing, and performance optimization.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Associate", timeline: "Month 4" }
      ],
      parentId: "task-5",
      level: 2
    },
    {
      id: "task-5-2",
      order: 5.2,
      name: "Security Testing",
      description: "Implement security testing including penetration testing and vulnerability assessment.",
      profiles: [
        { profileType: "CDP", timeline: "Month 3" },
        { profileType: "Manager", timeline: "Month 3" }
      ],
      parentId: "task-5",
      level: 2
    },
    {
      id: "task-6",
      order: 6,
      name: "Deployment & Go-Live",
      description: "Execute production deployment and go-live activities.",
      profiles: [
        { profileType: "Manager", timeline: "Month 6" },
        { profileType: "CDP", timeline: "Month 6" }
      ],
      level: 1
    },
    {
      id: "task-6-1",
      order: 6.1,
      name: "Blue-Green Deployment",
      description: "Implement blue-green deployment strategy for zero-downtime releases.",
      profiles: [
        { profileType: "CDP", timeline: "Month 6" },
        { profileType: "Manager", timeline: "Month 6" }
      ],
      parentId: "task-6",
      level: 2
    },
    {
      id: "task-6-2",
      order: 6.2,
      name: "Production Monitoring",
      description: "Set up production monitoring and alerting systems.",
      profiles: [
        { profileType: "CDP", timeline: "Month 6" },
        { profileType: "Manager", timeline: "Month 6" }
      ],
      parentId: "task-6",
      level: 2
    }
  ]
};
