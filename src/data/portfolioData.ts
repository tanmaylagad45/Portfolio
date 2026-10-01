export interface SocialLinks {
  linkedin: string;
  github: string;
  instagram: string;
}

export interface EducationItem {
  year: string;
  level: string;
  institution: string;
  status: string;
  expectedGrad?: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  tagline: string;
  skills: { name: string; level: 'Exploring' | 'Proficient' | 'Working With' }[];
}

export interface ProjectEntity {
  id: string;
  name: string;
  type: 'PERSON' | 'ORGANIZATION' | 'LOCATION' | 'EVIDENCE' | 'CASE';
  connections: string[];
  details: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
  features: string[];
  involvement: string[];
  technologies: string[];
  achievement?: {
    rank: string;
    title: string;
    note: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  detailedCaseStudy?: {
    problem: string;
    solution: string;
    architecture: string[];
    myContribution: string;
  };
}

export interface FutureProject {
  title: string;
  category: string;
  description: string;
  plannedStack: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  tag: string;
  description: string;
  badge: string;
  highlight?: boolean;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  status: 'Completed' | 'Learning / In Progress';
  iconName: string;
  description: string;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  subtitle: string;
  category: 'Education' | 'Hackathon' | 'AI/ML' | 'Milestone';
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Tanmay Ravikiran Lagad",
    shortName: "Tanmay Lagad",
    status: "3rd Year B.Tech / BE Computer Engineering Student",
    college: "MGM College of Engineering",
    expectedGraduation: "2028",
    location: "Kharghar, Navi Mumbai, Maharashtra, India",
    city: "Kharghar, Navi Mumbai",
    tagline: "AI/ML Enthusiast • Full-Stack Developer • Computer Engineering Student",
    heroTitles: [
      "AI/ML ENTHUSIAST",
      "FULL-STACK DEVELOPER",
      "GENAI EXPLORER",
      "COMPUTER ENGINEERING STUDENT"
    ],
    heroIntro: "Building my way into AI/ML through projects, experimentation and practical software development.",
    aboutBio: `I'm Tanmay Ravikiran Lagad, a third-year Computer Engineering student at MGM College of Engineering, currently building my skills in Artificial Intelligence and Machine Learning.

My interests include AI/ML, Generative AI, full-stack development, databases and modern interactive web development.

I enjoy learning by building practical projects and experimenting with new technologies.

My current goal is to develop strong real-world AI/ML skills and build meaningful projects that combine intelligent systems with software development.`,
    stats: [
      { label: "Academic Standing", value: "3rd Year", detail: "Computer Engineering" },
      { label: "Target Horizon", value: "2028", detail: "Expected Graduation" },
      { label: "Hackathon Podium", value: "3rd Place", detail: "Internal Smart India Hackathon 2026" },
      { label: "Core Horizon", value: "AI/ML", detail: "Current Focus & Research" }
    ]
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/tanmay-ravikiran-lagad",
    github: "https://github.com/tanmaylagad45",
    instagram: "https://www.instagram.com/tanmay_lagad_45/"
  },

  education: [
    {
      year: "2022",
      level: "Secondary School (10th)",
      institution: "Convent of Jesus and Mary High School",
      status: "Completed: 2022",
      details: [
        "Strong foundation in Science and Mathematics",
        "Sparked initial curiosity in computing and algorithm logic",
        "Active participant in school academic and science forums"
      ]
    },
    {
      year: "2024",
      level: "Higher Secondary (12th)",
      institution: "Sanjivni Junior College",
      status: "Completed: 2024",
      details: [
        "Science Stream with rigorous focus on Physics, Chemistry, and Mathematics",
        "Built problem-solving fundamentals for core engineering entrance",
        "Transitioned into computer programming and foundational algorithmic principles"
      ]
    },
    {
      year: "2024 — Present",
      level: "B.Tech / BE Computer Engineering",
      institution: "MGM College of Engineering",
      status: "3rd Year • Expected Graduation: 2028",
      expectedGrad: "2028",
      details: [
        "Curriculum: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks",
        "Active participant in technical symposiums and competitive coding platforms",
        "Internal Smart India Hackathon 2026 Podium Winner (3rd Place with NEXUS)",
        "Focusing on Artificial Intelligence, Machine Learning, and Intelligent Systems"
      ]
    }
  ] as EducationItem[],

  skillConstellation: [
    {
      title: "Programming",
      tagline: "Core Languages & Problem Solving",
      skills: [
        { name: "Python", level: "Proficient" },
        { name: "JavaScript", level: "Proficient" },
        { name: "SQL", level: "Working With" },
        { name: "HTML5", level: "Proficient" },
        { name: "CSS3", level: "Proficient" }
      ]
    },
    {
      title: "AI / ML",
      tagline: "Intelligent Systems & Neural Architectures",
      skills: [
        { name: "Machine Learning", level: "Working With" },
        { name: "Generative AI", level: "Exploring" },
        { name: "NLP", level: "Exploring" },
        { name: "NumPy", level: "Working With" },
        { name: "Pandas", level: "Working With" },
        { name: "scikit-learn", level: "Working With" }
      ]
    },
    {
      title: "Development",
      tagline: "Modern Web & API Frameworks",
      skills: [
        { name: "React", level: "Working With" },
        { name: "Node.js", level: "Working With" },
        { name: "FastAPI", level: "Exploring" },
        { name: "REST APIs", level: "Working With" }
      ]
    },
    {
      title: "Data / Backend",
      tagline: "Relational Engines & Architecture",
      skills: [
        { name: "PostgreSQL", level: "Working With" },
        { name: "Database Design", level: "Working With" },
        { name: "Data Management", level: "Working With" }
      ]
    },
    {
      title: "Tools & DevOps",
      tagline: "Version Control & Containerization",
      skills: [
        { name: "Git", level: "Proficient" },
        { name: "GitHub", level: "Proficient" },
        { name: "Docker", level: "Exploring" }
      ]
    }
  ] as SkillCategory[],

  featuredProjects: [
    {
      id: "nexus",
      title: "NEXUS",
      subtitle: "AI-Powered Criminal Network Analysis System",
      badge: "🥉 3rd Place — Internal SIH 2026",
      description: "An AI-powered investigation platform designed to help investigators uncover hidden relationships, analyze interconnected entities and transform scattered investigation data into meaningful intelligence.",
      features: [
        "Network Analysis",
        "Entity Extraction",
        "Relationship Detection",
        "Anomaly Detection",
        "Geographic Analysis",
        "Timeline Analysis",
        "Evidence Management",
        "Case Management",
        "AI Investigator"
      ],
      involvement: [
        "Database Architecture",
        "Data Management & Ingestion Pipelines",
        "AI/ML Research & Entity Association"
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "NetworkX / Graph Theory", "scikit-learn", "React"],
      achievement: {
        rank: "3rd Place",
        title: "Internal Smart India Hackathon 2026",
        note: "My first hackathon and first podium finish."
      },
      detailedCaseStudy: {
        problem: "Law enforcement and investigative teams face massive volumes of siloed evidence, records, and unstructured communications. Finding subtle links between suspects, organizations, physical locations, and digital evidence takes weeks of manual cross-referencing.",
        solution: "NEXUS structures heterogeneous investigation evidence into a hypergraph. Machine learning entity extraction parses witness statements and surveillance logs to highlight conspiratorial links, frequency anomalies, and geographic clusters in real time.",
        architecture: [
          "Data Ingestion: Structured and unstructured file parsers extracting metadata and entity mentions",
          "Knowledge Graph Engine: Node-link topological analysis detecting high-centrality suspect nodes",
          "AI Investigator: Automated anomaly scoring highlighting unusual communication patterns and temporal coincidence",
          "Interactive Visualizer: Live cyber-forensic canvas displaying entity clusters with drilldown inspection"
        ],
        myContribution: "Architected the relational and graph database schema to ingest multi-source case data reliably. Designed the data pipeline for entity normalization and contributed AI/ML research into association metric algorithms."
      }
    },
    {
      id: "velocity-sports",
      title: "Velocity Sports Shop",
      subtitle: "Dynamic Sports Equipment E-Commerce Platform",
      badge: "Interactive Full-Stack Web",
      description: "A sports equipment shopping website designed with a clean, dynamic, and interactive shopping experience.",
      features: [
        "Product Browsing",
        "Product Categories",
        "Shopping Cart System",
        "Quantity Controls",
        "Checkout Interface",
        "Fully Responsive Design"
      ],
      involvement: [
        "Frontend UI/UX Implementation",
        "State Management for Cart & Checkout",
        "Responsive Cross-Device Layout"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript"],
      demoUrl: "https://github.com/tanmaylagad45/velocity-sports-shop",
      githubUrl: "https://github.com/tanmaylagad45/velocity-sports-shop"
    }
  ] as FeaturedProject[],

  futureProjects: [
    {
      title: "AI Resume Analyzer",
      category: "NLP & LLM Applications",
      description: "Intelligent parser evaluating semantic alignment between candidate resumes and job descriptions using vector embeddings and LLM reasoning.",
      plannedStack: ["Python", "LangChain / OpenAI API", "FastAPI", "React"]
    },
    {
      title: "Machine Learning Prediction System",
      category: "Predictive Analytics",
      description: "End-to-end regression and classification pipeline with real-time model monitoring, automated feature preprocessing, and interactive metrics dashboards.",
      plannedStack: ["Python", "scikit-learn", "Pandas", "Streamlit / React"]
    },
    {
      title: "RAG / AI Assistant",
      category: "Generative AI & Retrieval",
      description: "Contextual retrieval-augmented generation engine querying private technical documents and codebases with citation back-linking.",
      plannedStack: ["ChromaDB", "Hugging Face", "FastAPI", "TypeScript"]
    }
  ] as FutureProject[],

  nexusDemoGraph: {
    nodes: [
      { id: "e1", name: "Arjun", type: "PERSON", connections: ["e2", "e3", "e5"], details: "Primary suspect identified in logistics communications." },
      { id: "e2", name: "Rohan", type: "PERSON", connections: ["e1", "e3", "e4"], details: "Secondary associate with documented financial anomalies." },
      { id: "e3", name: "BlueArc Logistics", type: "ORGANIZATION", connections: ["e1", "e2", "e4"], details: "Registered freight intermediary flagged for inconsistent manifest logs." },
      { id: "e4", name: "Warehouse Sector 7", type: "LOCATION", connections: ["e2", "e3", "e5"], details: "Physical distribution hub identified via surveillance timeline." },
      { id: "e5", name: "Encrypted Hard Drive #4", type: "EVIDENCE", connections: ["e1", "e4", "e6"], details: "Digital artifact containing cryptographic ledgers and route telemetry." },
      { id: "e6", name: "Case #NX-2026", type: "CASE", connections: ["e5"], details: "Active parent dossier under investigative scrutiny." }
    ] as ProjectEntity[]
  },

  achievements: [
    {
      title: "3rd Place Podium Winner",
      event: "Internal Smart India Hackathon 2026",
      tag: "Hackathon Excellence",
      description: "My first hackathon and first podium finish. Built NEXUS, an AI-powered criminal network analysis platform with a team of computer engineers.",
      badge: "🥉 3rd Place",
      highlight: true
    },
    {
      title: "Google AI Essentials",
      event: "Google Certification Milestone",
      tag: "AI Fundamentals",
      description: "Demonstrated fundamental understanding of Artificial Intelligence concepts, Generative AI prompting, ethical AI, and practical workflow automation.",
      badge: "Google Certified"
    }
  ] as AchievementItem[],

  certifications: [
    {
      title: "Google AI Essentials",
      issuer: "Google",
      status: "Completed",
      iconName: "google",
      description: "Core concepts in Artificial Intelligence, machine learning models, ethical AI considerations, and real-world AI tool integration."
    },
    {
      title: "IBM Generative AI Engineer Professional Certificate",
      issuer: "IBM",
      status: "Learning / In Progress",
      iconName: "ibm",
      description: "Active coursework covering foundation models, prompt engineering, generative architectures, and AI agent frameworks."
    }
  ] as CertificationItem[],

  journeyMilestones: [
    { year: "2022", title: "Secondary School (10th)", subtitle: "Convent of Jesus and Mary High School", category: "Education", icon: "school" },
    { year: "2024", title: "Higher Secondary (12th)", subtitle: "Sanjivni Junior College — Science Stream", category: "Education", icon: "college" },
    { year: "2024", title: "Started B.Tech / BE Computer Engineering", subtitle: "MGM College of Engineering, Navi Mumbai", category: "Education", icon: "code" },
    { year: "2026", title: "3rd Year Computer Engineering", subtitle: "Core CS, Systems, and Software Architecture", category: "Education", icon: "terminal" },
    { year: "2026", title: "Deep Focus on AI / Machine Learning", subtitle: "Generative AI, Data Pipelines, and ML Algorithms", category: "AI/ML", icon: "brain" },
    { year: "2026", title: "Smart India Hackathon Participation", subtitle: "Intense collaborative engineering sprint", category: "Hackathon", icon: "sparkles" },
    { year: "2026", title: "3rd Place — Internal SIH 2026", subtitle: "First hackathon and first podium achievement", category: "Milestone", icon: "trophy" },
    { year: "2026", title: "NEXUS Project Development", subtitle: "AI-Powered Criminal Network Analysis System", category: "AI/ML", icon: "network" },
    { year: "2026", title: "Building Open-Source GitHub Portfolio", subtitle: "Practical development & repository showcase", category: "Milestone", icon: "git" },
    { year: "2028", title: "Expected Graduation", subtitle: "B.Tech Computer Engineering", category: "Education", icon: "graduation" }
  ] as JourneyMilestone[]
};
