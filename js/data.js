/**
 * ARNAB BASU — PORTFOLIO DATA & CONFIGURATION
 * Pure Monochrome Edition: Black, Grey, and White.
 * Zero external libraries, zero frameworks.
 */

window.CONFIG = {
  INTRO: {
    enabled: true,
    durationMs: 2400,
    forceReplayParam: 'intro'
  },
  STARFIELD: {
    enabled: true,
    dustCount: 30,
    maxDpr: 2
  },
  MARQUEE: {
    enabled: true,
    baseSpeed: 38 // Pixels per second
  },
  CAROUSEL: {
    enabled: true,
    autoRotate: false,
    dragSensitivity: 0.28,
    inertiaDecay: 0.92,
    wheelStep: 1
  },
  CURSOR: {
    enabled: false
  },
  RESUME: {
    enabled: false, // Set to true once PDF is added
    url: 'assets/Arnab_Basu_Resume.pdf'
  },
  LOW_POWER: {
    autoDetect: true
  }
};

window.PORTFOLIO_DATA = {
  person: {
    name: "Arnab Basu",
    tagline: "Explorer | Researcher | Writer | Academician",
    location: "Kolkata, West Bengal, India",
    emailUser: "basuarnab10",
    emailHost: "gmail.com",
    phoneCountry: "+91",
    phoneArea: "90380",
    phoneNum: "58812",
    linkedIn: "https://www.linkedin.com/in/arnab-basu-3a06a8124/",
    currentRoles: "Academic Coordinator, Techno India University · PhD Scholar, UEM Kolkata",
    positioning: "Investigating the intersections of workplace spirituality, employee mental well-being, and organizational synergy in modern culture."
  },

  aboutHeadline: "WHERE SPIRITUALITY MEETS THE WORKPLACE, STUDIED WITH RIGOR.",

  aboutNarrative: [
    "I am an academician, researcher, and writer investigating the human interior within organizational structures. Currently serving as Academic Coordinator at Techno India University (School of the Future) and pursuing my PhD in Management at the University of Engineering & Management (UEM), Kolkata.",
    "My doctoral and empirical investigations center on modern spiritual transitions—particularly the 'Spiritual But Not Religious' (SBNR) movement—and their measurable impact on employee mental health, resilience, and workplace spirituality. Using rigorous methodologies such as PRISMA systematic reviews, my published scholarship also extends to clinical and health psychology contexts: assessing spiritual interventions for older adults suffering from dementia, and evaluating physiological and performance outcomes for working women.",
    "Before my academic appointments, I developed practical corporate mastery across Tata Consultancy Services, Torero Corporation, and Asian Paints. This dual lens allows me to synthesize sociological depth with organizational execution."
  ],

  researchAreas: [
    "Spirituality and religion in modern Indian culture",
    "The 'spiritual but not religious' (SBNR) movement",
    "Workplace spirituality and HR synergy",
    "Workplace mental health and resilience",
    "Spirituality and older adults with dementia",
    "Spirituality and working women's health and performance"
  ],

  publications: [
    {
      id: "pub-1",
      number: "01",
      category: "journal",
      type: "Journal Article",
      year: "2026",
      title: "Spirituality's impact on older adults suffering from dementia: a systematic review using PRISMA guidelines",
      venue: "Mental Health, Religion & Culture, pp. 1–11",
      publisher: "Taylor & Francis",
      authors: "Basu, A., & Srividya, N.",
      acknowledged: "",
      indexing: "SCOPUS Q3 · ESCI",
      links: [
        { label: "View Publication", url: "https://lnkd.in/dkzgVji3" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-1" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-1)"/><circle cx="150" cy="100" r="60" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.35"/><circle cx="150" cy="100" r="38" stroke="#0284C7" stroke-width="1.5" opacity="0.8"/><circle cx="150" cy="100" r="16" fill="#38BDF8" fill-opacity="0.25"/><path d="M90 100h120M150 40v120" stroke="#0284C7" stroke-width="0.8" opacity="0.3"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#0369A1" letter-spacing="2">PRISMA · 2026</text></svg>`
    },
    {
      id: "pub-2",
      number: "02",
      category: "journal",
      type: "Journal Article",
      year: "In Press",
      title: "A comprehensive review of literature on the relationship between spirituality and working women's physical health and performance",
      venue: "Journal of Health Psychology",
      publisher: "Sage",
      authors: "Basu, A.",
      acknowledged: "",
      indexing: "SCOPUS Q2 · SSCI",
      links: [
        { label: "View Publication", url: "https://lnkd.in/gcd2U8nh" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-2" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-2)"/><polygon points="150,45 205,145 95,145" stroke="#0284C7" stroke-width="1.5" stroke-opacity="0.75" fill="#38BDF8" fill-opacity="0.15"/><circle cx="150" cy="112" r="22" stroke="#0369A1" stroke-width="1.2" opacity="0.65"/><text x="150" y="116" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#0369A1" letter-spacing="1.5">SAGE · SSCI</text></svg>`
    },
    {
      id: "pub-3",
      number: "03",
      category: "journal",
      type: "Journal Article",
      year: "2025",
      title: "Tradition and Transition: Mapping Asia's SBNR Identities Amidst Radical Ideologies",
      venue: "Journal of Dharma, vol. 50, no. 3 (Sept. 2025)",
      publisher: "Journal of Dharma",
      authors: "Basu, A.",
      acknowledged: "Acknowledged: Mathew Attumkal and Dr. Nadindla Srividya",
      indexing: "SCOPUS Q3",
      links: [
        { label: "View Publication", url: "https://lnkd.in/gkAzN2wp" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-3" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-3)"/><circle cx="150" cy="100" r="54" stroke="#0284C7" stroke-width="1.2" opacity="0.5"/><path d="M120 100 Q150 60 180 100 T240 100" stroke="#0284C7" stroke-width="1.8" opacity="0.8" fill="none"/><path d="M60 100 Q110 140 150 100 T210 100" stroke="#0369A1" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.5" fill="none"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#0369A1" letter-spacing="2">SBNR · DHARMA</text></svg>`
    },
    {
      id: "pub-4",
      number: "04",
      category: "journal",
      type: "Journal Article",
      year: "Recent",
      title: "Intersections of spirituality and religion in Indian modern culture: a systematic review on the 'spiritual but not religious' movement and its workplace mental health outcomes",
      venue: "Mental Health, Religion & Culture, pp. 1–15",
      publisher: "Taylor & Francis",
      authors: "Basu, A.",
      acknowledged: "Guided by Dr. Nadindla Srividya",
      indexing: "SCOPUS Q2 · ESCI",
      links: [
        { label: "View Publication", url: "https://lnkd.in/gU288ApU" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-4" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-4)"/><rect x="100" y="55" width="100" height="90" stroke="#0284C7" stroke-width="1.2" stroke-opacity="0.6" fill="#38BDF8" fill-opacity="0.12"/><line x1="85" y1="100" x2="215" y2="100" stroke="#0284C7" stroke-width="1" opacity="0.4"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#0369A1" letter-spacing="1.5">T&F · Q2 ESCI</text></svg>`
    },
    {
      id: "pub-5",
      number: "05",
      category: "chapter",
      type: "Book Chapter",
      year: "2024",
      title: "Workplace Spirituality and HR Synergy: Pathways to a Positive Work Culture",
      venue: "Reimagining Human Resources for Inclusive and Sustainable Development",
      publisher: "Routledge",
      authors: "Basu, A.",
      acknowledged: "",
      indexing: "SCOPUS BOOK · ROUTLEDGE",
      links: [
        { label: "DOI: 10.4324/9781003735168", url: "https://doi.org/10.4324/9781003735168" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-5" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-5)"/><circle cx="125" cy="100" r="42" stroke="#0284C7" stroke-width="1.4" opacity="0.6"/><circle cx="175" cy="100" r="42" stroke="#0284C7" stroke-width="1.4" opacity="0.6"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#0369A1" letter-spacing="2">SYNERGY · ROUTLEDGE</text></svg>`
    },
    {
      id: "pub-6",
      number: "06",
      category: "chapter",
      type: "Book Chapter",
      year: "2024",
      title: "Nurturing Spiritual Sustainability in the Workplace: A Holistic Approach to Employee Well-being and Organizational Success",
      venue: "Reimagining Human Resources for Inclusive and Sustainable Development",
      publisher: "Routledge",
      authors: "Basu, A.",
      acknowledged: "",
      indexing: "SCOPUS BOOK · ROUTLEDGE",
      links: [
        { label: "DOI: 10.4324/9781003735168", url: "https://doi.org/10.4324/9781003735168" }
      ],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-6" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-6)"/><circle cx="150" cy="100" r="50" stroke="#0284C7" stroke-width="1.2" opacity="0.4"/><polygon points="150,55 188,122 112,122" stroke="#0284C7" stroke-width="1.2" fill="#38BDF8" fill-opacity="0.15"/><text x="150" y="142" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#0369A1" letter-spacing="1.5">SUSTAINABILITY</text></svg>`
    },
    {
      id: "pub-7",
      number: "07",
      category: "conference",
      type: "Conference Paper",
      year: "Proceedings",
      title: "Spirituality and workplace outcomes: An empirical study among IT",
      venue: "Damodar Valley Corporation HR Meet on Employee Engagement & Productivity",
      publisher: "Damodar Valley Corporation",
      authors: "Basu, A.",
      acknowledged: "",
      indexing: "CONFERENCE PROCEEDINGS",
      links: [],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-7" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-7)"/><rect x="90" y="70" width="120" height="60" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="2 2" opacity="0.6"/><circle cx="150" cy="100" r="14" fill="#38BDF8" fill-opacity="0.25"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#0369A1" letter-spacing="1.5">DVC · IT EMPIRICAL</text></svg>`
    },
    {
      id: "pub-8",
      number: "08",
      category: "ip",
      type: "Monograph & Copyright",
      year: "Published",
      title: "CORPORATE MAHABHARATA",
      venue: "Notion Press Publishing",
      publisher: "Government of India Copyright Certificate Received",
      authors: "Basu, A.",
      acknowledged: "Government of India Registered Work",
      indexing: "GOVT. OF INDIA COPYRIGHT",
      links: [],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-8" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-8)"/><circle cx="150" cy="100" r="48" stroke="#0284C7" stroke-width="1.4" opacity="0.75"/><circle cx="150" cy="100" r="28" stroke="#0369A1" stroke-width="1.2" opacity="0.5"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#0369A1" letter-spacing="2">NOTION PRESS · COPYRIGHT</text></svg>`
    },
    {
      id: "pub-9",
      number: "09",
      category: "ip",
      type: "Patent / IP",
      year: "Awarded",
      title: "First Patent from the Government of India",
      venue: "Patent Office, Government of India",
      publisher: "Government of India",
      authors: "Basu, A.",
      acknowledged: "Official Patent Registry Record",
      indexing: "GOVT. OF INDIA PATENT",
      links: [],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-9" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-9)"/><polygon points="150,50 190,75 190,125 150,150 110,125 110,75" stroke="#0284C7" stroke-width="1.4" opacity="0.7" fill="#38BDF8" fill-opacity="0.15"/><text x="150" y="104" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" fill="#0369A1" letter-spacing="2">PATENT INDIA</text></svg>`
    },
    {
      id: "pub-10",
      number: "10",
      category: "review",
      type: "Peer Review",
      year: "2025",
      title: "Reviewer Recognition for Current Psychology",
      venue: "Current Psychology (Springer Nature)",
      publisher: "Springer Nature",
      authors: "Basu, A.",
      acknowledged: "Recognised Peer Reviewer for 2025",
      indexing: "SPRINGER NATURE",
      links: [],
      abstractCover: `<svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-cover-svg"><defs><linearGradient id="glacier-cov-10" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#F0F9FF"/><stop offset="100%" stop-color="#E0F2FE"/></linearGradient></defs><rect width="300" height="200" fill="url(#glacier-cov-10)"/><circle cx="150" cy="100" r="45" stroke="#0284C7" stroke-width="1.2" opacity="0.4"/><path d="M135 100 L146 112 L168 88" stroke="#0284C7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><text x="150" y="136" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="600" fill="#0369A1" letter-spacing="1.5">SPRINGER NATURE</text></svg>`
    }
  ],

  experience: [
    {
      role: "Academic Coordinator",
      institution: "Techno India University",
      period: "Sep 2025 – Present",
      type: "Full-time",
      details: "Involved with the School of the Future: guiding and mentoring students, organizing orientation programmes, and managing strategic student events.",
      tag: "Leadership & Pedagogy"
    },
    {
      role: "PhD Scholar (Management)",
      institution: "University of Engineering & Management (UEM), Kolkata",
      period: "Nov 2022 – Present",
      type: "Part-time, Kolkata",
      details: "Doctoral research exploring workplace spirituality, employee mental well-being, SBNR identities, and organizational synergy.",
      tag: "Doctoral Research"
    },
    {
      role: "Assistant System Analyst",
      institution: "Tata Consultancy Services (TCS)",
      period: "Jan 2022 – Jul 2022",
      type: "Full-time",
      details: "Recruiting workflows, team management, enterprise sales processes, and client relations coordination.",
      tag: "Corporate Systems"
    },
    {
      role: "Retail Sales Manager",
      institution: "Torero Corporation Pvt. Ltd.",
      period: "Jan 2020 – Feb 2022",
      type: "Full-time, Greater Kolkata Area",
      details: "Cross-functional team leadership, retail sales operations, distributor relationships, and marketing campaigns.",
      tag: "Enterprise Retail"
    },
    {
      role: "Summer Intern",
      institution: "Asian Paints",
      period: "Jun 2019 – Sep 2019",
      type: "On-site, Kolkata",
      details: "Field market research, supply-chain channel observations, and consumer insight analytics across Kolkata.",
      tag: "Field Analytics"
    }
  ],

  education: [
    {
      degree: "PhD in Management",
      institution: "University of Engineering & Management (UEM)",
      period: "Nov 2022 – Present",
      notes: "Research on workplace spirituality, employee mental well-being, and organizational HR synergy."
    },
    {
      degree: "MBA (Marketing, Human Resource)",
      institution: "Institute of Engineering & Management (IEM)",
      period: "2018 – 2020",
      notes: "Grade: 8.7. Debate and group discussion titles. Completed internship at Asian Paints."
    },
    {
      degree: "Digital Marketing Programme",
      institution: "National University of Singapore (NUS)",
      period: "Feb 2020",
      notes: "Executive credential in digital marketing analytics and multichannel digital strategy."
    },
    {
      degree: "B.Tech in Computer Science",
      institution: "Academy of Technology",
      period: "2013 – 2017",
      notes: "Score: 75.1%. Activities: College anchoring and symposium coordination."
    },
    {
      degree: "Higher Secondary (Computer Science)",
      institution: "Kendriya Vidyalaya",
      period: "2011 – 2013",
      notes: "Score: 87%. Elected School Captain."
    }
  ],

  certifications: [
    {
      name: "Google Certified Educator Level 1 & Level 2",
      issuer: "Google for Education"
    },
    {
      name: "Gemini Certification (Educator Level & Higher Ed Level)",
      issuer: "Google"
    },
    {
      name: "Google Gemini Academy Certification",
      issuer: "Techno India University (8 Jan 2026, 2-Hour Intensive)"
    },
    {
      name: "AI Masterclass for Higher Education Faculty",
      issuer: "Google for Education AI Implementation Program 2026 (with upGrad)"
    },
    {
      name: "Coursera Specializations (Completed Oct 2024)",
      issuer: "Google AI Essentials · Accelerate Your Learning with ChatGPT · Uncommon Sense Teaching · Mind Shift"
    }
  ],

  skillsData: [
    {
      category: "Research and Academic Writing",
      subItems: ["Scholarly Dissemination", "Empirical Inquiries", "Theoretical Modeling", "Literature Synthesis"]
    },
    {
      category: "Systematic Reviews (PRISMA)",
      subItems: ["PRISMA 2020 Guidelines", "Protocol Registration", "Risk of Bias Assessment", "Evidence Extraction"]
    },
    {
      category: "Peer Review",
      subItems: ["Springer Nature Recognized", "Current Psychology", "Critical Appraisal", "Editorial Standards"]
    },
    {
      category: "Teaching and Mentoring",
      subItems: ["School of the Future", "Undergraduate Guidance", "Curriculum Coordination", "Student Orientation"]
    },
    {
      category: "HR and Workplace Studies",
      subItems: ["Workplace Spirituality", "SBNR Movement", "Employee Well-being", "Organizational Synergy"]
    },
    {
      category: "Team Leadership and Management",
      subItems: ["Cross-functional Directing", "Event Administration", "Talent Acquisition", "Resource Stewardship"]
    },
    {
      category: "Presentations",
      subItems: ["Microsoft PowerPoint (LinkedIn Skill Verified)", "Keynote Speaking", "Collegiate Anchoring", "Symposium Delivery"]
    },
    {
      category: "AI for Education",
      subItems: ["Google Gemini (Certified)", "OpenAI ChatGPT Prompting", "Pedagogical LLM Integration", "Ethical AI in Higher Ed"]
    },
    {
      category: "Sales, Marketing and Client Relations",
      subItems: ["Enterprise Account Stewardship", "Channel Distribution", "Torero Corp Leadership", "Asian Paints Field Insights"]
    }
  ],

  fieldHighlights: [
    {
      index: "01",
      title: "Judge at DEVX 2.0 Hackathon",
      organization: "GDG On Campus, Techno India University",
      quote: "From fearing code to evaluating it."
    },
    {
      index: "02",
      title: "Student Delegation Lead",
      organization: "Platinum Jubilee celebration of IIT Kharagpur, IIT Research Park, Newtown, Kolkata",
      quote: "Guiding emerging researchers through landmark national technology exhibitions."
    },
    {
      index: "03",
      title: "Mentor & Memento Recipient",
      organization: "School of the Future, Techno India University",
      quote: "Honored for dedicated student guidance, orientation curation, and institutional service."
    },
    {
      index: "04",
      title: "Orientation Programme Keynote Speaker",
      organization: "School of the Future, Techno India University",
      quote: "Inspiring incoming undergraduate cohorts on the future of work and mental resilience."
    },
    {
      index: "05",
      title: "National Technology Day 2026 Participant",
      organization: "Theme: 'AI for Sustainable Development in the New Era' with IQAC & IIC",
      quote: "Championing sustainable, human-first artificial intelligence in higher education."
    }
  ]
};
