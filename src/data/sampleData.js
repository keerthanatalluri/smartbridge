export const initialUsers = [
  {
    id: "usr_01",
    name: "Sarah Jenkins",
    email: "sarah@designhub.io",
    password: "demo123",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    company: "DesignHub Inc.",
    industry: "UI/UX & SaaS Product Studio",
    website: "https://designhub.io",
    verified: true,
    totalSpent: 18400,
    projectsCount: 6,
    location: "San Francisco, CA",
    status: "active",
    createdAt: "2026-01-15T08:00:00.000Z"
  },
  {
    id: "usr_02",
    name: "Alex Rivera",
    email: "alex@dev.io",
    password: "demo123",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    title: "Senior Full-Stack & React Architect",
    bio: "Passionate full-stack engineer specializing in React, TypeScript, scalable SaaS UI architecture, and real-time systems with 8+ years building enterprise web apps.",
    hourlyRate: 65,
    availability: "Available",
    skills: ["React", "JavaScript", "Tailwind CSS", "Node.js", "REST APIs", "TypeScript", "Next.js"],
    portfolioLinks: [
      {
        id: "p1",
        title: "SaaS Analytics Dashboard",
        url: "https://analytics.example.com",
        desc: "Interactive financial & marketing KPI dashboard with sub-second chart rendering and data exports."
      },
      {
        id: "p2",
        title: "E-Commerce Workflow Engine",
        url: "https://shopflow.example.com",
        desc: "High-conversion checkout & order fulfillment portal built with modern React hooks."
      }
    ],
    rating: 4.9,
    reviewsCount: 28,
    completedProjectsCount: 14,
    totalEarnings: 34200,
    verified: true,
    location: "Austin, TX",
    status: "active",
    createdAt: "2026-01-10T10:00:00.000Z"
  },
  {
    id: "usr_03",
    name: "Elena Rostova",
    email: "elena@cloudcode.io",
    password: "demo123",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    title: "Cloud & Backend Architect",
    bio: "Ex-Stripe systems engineer focused on secure REST/GraphQL architectures, Python/FastAPI microservices, and high-performance React frontends.",
    hourlyRate: 85,
    availability: "Available",
    skills: ["Python", "FastAPI", "React", "PostgreSQL", "AWS", "Docker", "REST APIs"],
    portfolioLinks: [
      {
        id: "p3",
        title: "Fintech Settlement Hub",
        url: "https://paystream.example.com",
        desc: "Automated ACH and card payment reconciliation dashboard handling 50k transactions/day."
      }
    ],
    rating: 5.0,
    reviewsCount: 19,
    completedProjectsCount: 11,
    totalEarnings: 42800,
    verified: true,
    location: "Berlin, Germany",
    status: "active",
    createdAt: "2026-02-01T12:00:00.000Z"
  },
  {
    id: "usr_04",
    name: "Marcus Vance",
    email: "marcus@cloudnova.tech",
    password: "demo123",
    role: "client",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    company: "CloudNova Technologies",
    industry: "Enterprise Cloud Security & DevSecOps",
    website: "https://cloudnova.tech",
    verified: true,
    totalSpent: 32000,
    projectsCount: 9,
    location: "Seattle, WA",
    status: "active",
    createdAt: "2026-01-20T09:00:00.000Z"
  },
  {
    id: "usr_admin",
    name: "System Administrator",
    email: "admin@freelancehub.io",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    company: "FreelanceHub HQ",
    title: "Global Platform Supervisor",
    status: "active",
    createdAt: "2026-01-01T00:00:00.000Z"
  }
];

export const initialProjects = [
  {
    id: "prj_101",
    clientId: "usr_01",
    title: "E-Commerce Mobile App Redesign with React",
    description: "We need an expert UI/UX developer to convert modern Figma designs into ultra-responsive React components with seamless state management, accessible navigation, and optimized product checkout flows.",
    category: "Web Development",
    requiredSkills: ["React", "CSS3", "JavaScript", "Responsive Design", "Tailwind CSS"],
    budgetType: "Fixed",
    budget: 2500,
    deadline: "2026-11-30",
    scopeLevel: "Intermediate",
    status: "Open",
    proposalsCount: 1,
    createdAt: "2026-10-20T14:30:00.000Z"
  },
  {
    id: "prj_102",
    clientId: "usr_04",
    title: "Cloud Security Real-Time Analytics Dashboard",
    description: "Seeking a senior frontend specialist to build a high-performance observability cockpit. The app consumes live telemetry feeds, provides dynamic filtering, interactive topology charts, and dark-mode compliance.",
    category: "Web Development",
    requiredSkills: ["React", "TypeScript", "REST APIs", "Tailwind CSS"],
    budgetType: "Fixed",
    budget: 4200,
    deadline: "2026-12-15",
    scopeLevel: "Expert",
    status: "Open",
    proposalsCount: 2,
    createdAt: "2026-10-22T10:15:00.000Z"
  },
  {
    id: "prj_103",
    clientId: "usr_01",
    title: "AI Agent Chat Interface & Prompt Flow Engine",
    description: "Design and implement a conversational copilot interface with markdown rendering, streaming token support, code syntax highlighting, and customizable prompt template drawers.",
    category: "AI & Machine Learning",
    requiredSkills: ["React", "Node.js", "REST APIs", "JavaScript"],
    budgetType: "Fixed",
    budget: 3800,
    deadline: "2026-12-05",
    scopeLevel: "Expert",
    status: "In Progress",
    hiredFreelancerId: "usr_02",
    proposalsCount: 1,
    createdAt: "2026-10-18T11:00:00.000Z"
  },
  {
    id: "prj_104",
    clientId: "usr_04",
    title: "Enterprise Brand Guidelines & Component Tokens",
    description: "Looking for an experienced design engineer to audit our current design tokens, build a reusable design library, and document micro-interaction specs for our engineering squads.",
    category: "Design & Creative",
    requiredSkills: ["Figma", "Design Systems", "CSS3", "Responsive Design"],
    budgetType: "Hourly",
    budget: 65,
    deadline: "2026-11-20",
    scopeLevel: "Intermediate",
    status: "Open",
    proposalsCount: 0,
    createdAt: "2026-10-23T16:45:00.000Z"
  },
  {
    id: "prj_105",
    clientId: "usr_01",
    title: "Full-Stack Microservices Telemetry Collector",
    description: "We are developing a high-throughput event collector service. Requires deep knowledge of RESTful API standards, asynchronous job queues, and robust error handling.",
    category: "Backend Architecture",
    requiredSkills: ["Python", "Node.js", "Docker", "REST APIs", "PostgreSQL"],
    budgetType: "Fixed",
    budget: 5000,
    deadline: "2027-01-15",
    scopeLevel: "Expert",
    status: "Open",
    proposalsCount: 0,
    createdAt: "2026-10-24T08:30:00.000Z"
  },
  {
    id: "prj_106",
    clientId: "usr_04",
    title: "FinTech Compliance & KYC Verification Module",
    description: "Build an interactive multi-step verification pipeline adhering to ISO/IEC security guidelines with client-side document redaction preview and instant status feedback.",
    category: "Web Development",
    requiredSkills: ["React", "JavaScript", "REST APIs"],
    budgetType: "Fixed",
    budget: 3200,
    deadline: "2026-10-15",
    scopeLevel: "Intermediate",
    status: "Completed",
    hiredFreelancerId: "usr_03",
    proposalsCount: 1,
    createdAt: "2026-09-10T12:00:00.000Z"
  }
];

export const initialProposals = [
  {
    id: "prop_201",
    projectId: "prj_101",
    freelancerId: "usr_02",
    coverLetter: "I have extensive experience building scalable React e-commerce interfaces with modular component architectures. I can complete this within 14 days with clean code, full responsiveness, and high accessibility scores.",
    proposedPrice: 2400,
    deliveryDays: 14,
    status: "Pending",
    milestones: [
      { title: "Component Structure & Design Token Setup", amount: 1000 },
      { title: "Shopping Cart & Checkout Flow", amount: 1400 }
    ],
    createdAt: "2026-10-21T09:15:00.000Z"
  },
  {
    id: "prop_202",
    projectId: "prj_102",
    freelancerId: "usr_02",
    coverLetter: "I specialize in building mission-critical telemetry cockpits with sub-second chart rendering. I'll architect this with clean state slices and modular SVG visualizers.",
    proposedPrice: 4000,
    deliveryDays: 20,
    status: "Pending",
    milestones: [
      { title: "Telemetry Feed Pipeline & Filters", amount: 2000 },
      { title: "Topology Charts & Dark Mode System", amount: 2000 }
    ],
    createdAt: "2026-10-22T14:00:00.000Z"
  },
  {
    id: "prop_203",
    projectId: "prj_102",
    freelancerId: "usr_03",
    coverLetter: "With my cloud backend background and deep enterprise UI experience, I will ensure high data integrity, WebSocket fault-tolerance, and seamless dashboard responsiveness under heavy load.",
    proposedPrice: 4150,
    deliveryDays: 18,
    status: "Pending",
    milestones: [
      { title: "Core WebSocket Data Connectors", amount: 1800 },
      { title: "Real-Time Topology Visualization", amount: 2350 }
    ],
    createdAt: "2026-10-23T11:20:00.000Z"
  },
  {
    id: "prop_204",
    projectId: "prj_103",
    freelancerId: "usr_02",
    coverLetter: "I have built production LLM copilot interfaces. I will implement custom stream parsing, auto-scrolling with user interrupt detection, and token usage meters.",
    proposedPrice: 3800,
    deliveryDays: 21,
    status: "Accepted",
    milestones: [
      { title: "Architecture & Component Storybook", amount: 1800 },
      { title: "Streaming Response Chat Engine & State", amount: 2000 }
    ],
    createdAt: "2026-10-18T15:30:00.000Z"
  }
];

export const initialContracts = [
  {
    id: "cnt_301",
    projectId: "prj_103",
    projectTitle: "AI Agent Chat Interface & Prompt Flow Engine",
    clientId: "usr_01",
    freelancerId: "usr_02",
    totalAmount: 3800,
    paidAmount: 1800,
    status: "In Progress",
    startDate: "2026-10-19T10:00:00.000Z",
    milestones: [
      {
        id: "m_01",
        title: "Architecture & Component Storybook",
        amount: 1800,
        status: "Approved", // "Pending", "Submitted", "Approved"
        dueDate: "2026-11-05",
        deliverableUrl: "https://storybook.example.com/ai-chat-v1",
        deliverableNote: "Component library deployed with 18 core atoms and molecule tokens.",
        approvedAt: "2026-10-24T16:20:00.000Z"
      },
      {
        id: "m_02",
        title: "Streaming Response Chat Engine & State",
        amount: 2000,
        status: "Submitted",
        dueDate: "2026-11-28",
        deliverableUrl: "https://preview.example.com/ai-chat-stream",
        deliverableNote: "Implemented simulated SSE streaming with cancel tokens and Markdown code copy actions.",
        approvedAt: null
      }
    ]
  },
  {
    id: "cnt_302",
    projectId: "prj_106",
    projectTitle: "FinTech Compliance & KYC Verification Module",
    clientId: "usr_04",
    freelancerId: "usr_03",
    totalAmount: 3200,
    paidAmount: 3200,
    status: "Completed",
    startDate: "2026-09-12T09:00:00.000Z",
    completedDate: "2026-10-14T17:00:00.000Z",
    milestones: [
      {
        id: "m_11",
        title: "KYC Upload & Secure Client Encryption",
        amount: 1600,
        status: "Approved",
        dueDate: "2026-09-25",
        deliverableUrl: "https://compliance.example.com/demo",
        deliverableNote: "Delivered audited client-side encryption module.",
        approvedAt: "2026-09-26T14:10:00.000Z"
      },
      {
        id: "m_12",
        title: "Admin Review Desk & Audit Trail",
        amount: 1600,
        status: "Approved",
        dueDate: "2026-10-12",
        deliverableUrl: "https://compliance.example.com/audit-v1",
        deliverableNote: "Completed verification workflow and export logs.",
        approvedAt: "2026-10-14T15:00:00.000Z"
      }
    ]
  }
];

export const initialMessages = [
  {
    id: "msg_001",
    contractId: "cnt_301",
    senderId: "usr_01",
    recipientId: "usr_02",
    text: "Hi Alex! Excited to have you on the AI Agent Chat project. When do you estimate having the first component wireframes ready?",
    createdAt: "2026-10-19T10:15:00.000Z"
  },
  {
    id: "msg_002",
    contractId: "cnt_301",
    senderId: "usr_02",
    recipientId: "usr_01",
    text: "Thanks Sarah! I've already reviewed the specs. I'll publish the initial Storybook atoms by Thursday afternoon for your team to test.",
    createdAt: "2026-10-19T10:28:00.000Z"
  },
  {
    id: "msg_003",
    contractId: "cnt_301",
    senderId: "usr_01",
    recipientId: "usr_02",
    text: "The Storybook demo looks stunning! The message bubble animations and code syntax highlighter are exactly what we envisioned. Milestone 1 released!",
    createdAt: "2026-10-24T16:25:00.000Z"
  },
  {
    id: "msg_004",
    contractId: "cnt_301",
    senderId: "usr_02",
    recipientId: "usr_01",
    text: "Thank you Sarah! I've just submitted the deliverable for Milestone 2 with full streaming response support. Please take a look when you have a moment.",
    createdAt: "2026-10-26T08:12:00.000Z"
  }
];

export const initialPlatformLogs = [
  {
    id: "log_1",
    type: "contract_created",
    message: "Contract cnt_301 generated between Sarah Jenkins and Alex Rivera ($3,800)",
    timestamp: "2026-10-19T10:00:00.000Z"
  },
  {
    id: "log_2",
    type: "milestone_approved",
    message: "Sarah Jenkins approved milestone m_01 on contract cnt_301 ($1,800 released)",
    timestamp: "2026-10-24T16:20:00.000Z"
  },
  {
    id: "log_3",
    type: "project_posted",
    message: "Marcus Vance posted new project 'Cloud Security Real-Time Analytics Dashboard'",
    timestamp: "2026-10-22T10:15:00.000Z"
  },
  {
    id: "log_4",
    type: "proposal_submitted",
    message: "Elena Rostova submitted proposal for 'Cloud Security Real-Time Analytics Dashboard'",
    timestamp: "2026-10-23T11:20:00.000Z"
  }
];

export const CATEGORIES = [
  "All Categories",
  "Web Development",
  "Mobile Apps",
  "Design & Creative",
  "AI & Machine Learning",
  "Backend Architecture",
  "DevOps & Cloud",
  "Writing & Translation"
];

export const POPULAR_SKILLS = [
  "React",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Python",
  "Next.js",
  "REST APIs",
  "Figma",
  "AWS",
  "PostgreSQL",
  "Docker"
];

