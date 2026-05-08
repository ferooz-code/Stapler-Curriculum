export type LearnerLevel = {
  title: string;
  subtitle: string;
  focus: string;
};

export type CoreModule = {
  code: string;
  name: string;
  audience: string;
  description: string;
};

export type DeviceCardData = {
  title: string;
  image: string;
  caption: string;
  points: string[];
};

export type TrainingModule = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  warning?: boolean;
};

export type Exercise = {
  id: string;
  title: string;
  objective: string;
  metrics: string[];
};

export type MetricTarget = {
  level: string;
  componentIdentification: string;
  time: string;
  deviation: string;
  wedgeSuccess: string;
  safetyErrors: string;
  acceptableLineRate: string;
};

export type TrackerRow = {
  date: string;
  traineeId: string;
  name: string;
  role: string;
  pgyLevel: string;
  moduleCode: string;
  moduleName: string;
  facultyAssessor: string;
  quizScore: number;
  checklistScore: number;
  checklistMax: number;
  rubricAvg: number;
  criticalSafetyFailures: number;
  metric1Name: string;
  metric1Value: string;
  metric2Name: string;
  metric2Value: string;
  passStatus: "Pass" | "Needs Remediation";
  entrustmentLevel: string;
  comments: string;
};

export const supervisionNote =
  "Educational simulation only. Follow institutional policy, manufacturer IFU, and faculty supervision.";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Devices", href: "#devices" },
  { label: "ECHELON", href: "#echelon" },
  { label: "Signia", href: "#signia" },
  { label: "Exercises", href: "#exercises" },
  { label: "Assessment", href: "#assessment" },
  { label: "Tracker", href: "#tracker" },
  { label: "Calendar", href: "#calendar" },
  { label: "Faculty", href: "#faculty" },
  { label: "Resources", href: "#resources" }
];

export const learnerLevels: LearnerLevel[] = [
  {
    title: "Junior Residents",
    subtitle: "PGY 1-2",
    focus:
      "Device recognition, safe basic operation, reloads, setup, tissue positioning, and basic handling."
  },
  {
    title: "Senior Residents",
    subtitle: "PGY 3-5",
    focus:
      "Thoracoscopic stapling, constrained-angle use, troubleshooting, efficiency, and decision-making."
  },
  {
    title: "Fellows",
    subtitle: "Advanced trainees",
    focus:
      "Mastery, judgment, teaching juniors, complex scenarios, rescue strategies, and OR readiness."
  }
];

export const coreModules: CoreModule[] = [
  {
    code: "STAP-1",
    name: "Stapler Fundamentals",
    audience: "PGY1-2 / new fellows",
    description:
      "Components, reload recognition, loading, safety checks, compression, firing, release, and staple line inspection."
  },
  {
    code: "STAP-2",
    name: "Thoracoscopic Stapling",
    audience: "PGY2-5 / fellows",
    description:
      "Port strategy, camera alignment, articulation, target capture, constrained angles, and stable release."
  },
  {
    code: "STAP-3",
    name: "Stapler Troubleshooting",
    audience: "PGY3-5 / fellows",
    description:
      "Hazard recognition, stop points, failed release workflow, manual recovery awareness, and team communication."
  },
  {
    code: "SUT-1",
    name: "Basic Endoscopic Suturing",
    audience: "PGY1-2 / new fellows",
    description:
      "Needle loading, entry and exit placement, bite symmetry, knot security, tension control, and economy of motion."
  },
  {
    code: "ENERGY-1",
    name: "Energy Devices and Tissue Effects",
    audience: "All levels",
    description:
      "Energy modality selection, thermal spread, safe activation, tissue effects, and post-activation inspection."
  },
  {
    code: "CAM-1",
    name: "Thoracoscopic Camera and Instrument Setup",
    audience: "All levels",
    description:
      "Camera orientation, white balance, port ergonomics, assistant communication, and instrument choreography."
  },
  {
    code: "CRM-1",
    name: "Device Failure and Crisis Resource Management",
    audience: "Senior residents / fellows",
    description:
      "Escalation language, abort criteria, role clarity, equipment backup, and documentation after a device issue."
  }
];

export const deviceCards: DeviceCardData[] = [
  {
    title: "ECHELON 3000 Stapler",
    image: "/assets/echelon-reloads.webp",
    caption: "ECHELON 3000 simulation device image with reload options.",
    points: [
      "Powered articulation",
      "Home button and straight-jaw return",
      "Reload loading workflow",
      "Partial-close articulation limits",
      "Firing trigger lock and knife indicator",
      "Jaw opening sequence",
      "Troubleshooting and manual recovery workflow"
    ]
  },
  {
    title: "Signia Powered Stapler",
    image: "/assets/signia-side-view.jpg",
    caption: "Signia powered stapling system reference image.",
    points: [
      "Manufacturer-described Adaptive Firing concept",
      "Tissue and force sensing concepts",
      "Real-time feedback for reload selection awareness",
      "Adapter and reload portfolio",
      "Ergonomic push-button controls",
      "Powered stapling comparison concepts"
    ]
  }
];

export const echelonModules: TrainingModule[] = [
  {
    id: "echelon-loading",
    title: "Module 1: Loading the Device",
    summary: "Reload loading and pre-use visual checks for simulation practice.",
    steps: [
      "Verify reload size matches instrument size.",
      "Confirm staple retaining cap is present during loading.",
      "Slide reload against bottom of reload jaw until alignment tab stops in alignment slot.",
      "Remove retaining cap straight up.",
      "Confirm reload lies flat and no drivers are visible."
    ]
  },
  {
    id: "echelon-articulation",
    title: "Module 2: Articulation and Centering",
    summary: "Battery, articulation controls, anvil orientation, and home button practice.",
    steps: [
      "Insert battery.",
      "Test left and right articulation buttons.",
      "Press home button to return jaws straight.",
      "Practice anvil jaw up and anvil jaw down.",
      "Explain haptic or audible feedback at maximum articulation."
    ]
  },
  {
    id: "echelon-partial-close",
    title: "Module 3: Partial Close Articulation",
    summary: "Recognize when articulation remains enabled or becomes disabled.",
    steps: [
      "Articulation is possible when jaws are open and partial close indicator is visible.",
      "Once the anvil covers the indicator, articulation is disabled.",
      "If articulation is attempted while closed, the device provides haptic feedback."
    ]
  },
  {
    id: "echelon-closure",
    title: "Module 4: Device Closure",
    summary: "Flat positioning, visual confirmation, compression interval, and stop points.",
    steps: [
      "Position tissue flat between jaws.",
      "Avoid bunching, twisting, traction, or hidden tissue.",
      "Hold jaws in place for 15 seconds before firing during simulation practice.",
      "Confirm both sides are visualized."
    ]
  },
  {
    id: "echelon-firing",
    title: "Module 5: Firing",
    summary: "Trigger lock, controlled activation, knife return, and staple line inspection.",
    steps: [
      "Pull back red firing trigger lock.",
      "Pull dark gray firing trigger.",
      "Continue until motor stops.",
      "Release firing trigger to return knife to home.",
      "Inspect knife indicator and staple line."
    ]
  },
  {
    id: "echelon-opening",
    title: "Module 6: Opening the Jaws",
    summary: "Safe release sequence after confirming knife position.",
    steps: [
      "Confirm knife is home.",
      "Squeeze closing trigger.",
      "Press clamp release button.",
      "Slowly release closing trigger.",
      "If jaws do not open, use approved troubleshooting workflow."
    ]
  },
  {
    id: "echelon-additional",
    title: "Module 7: Preparing for Additional Firings",
    summary: "Simulation cleaning and reload readiness after a completed firing.",
    steps: [
      "Submerge anvil and cartridge jaw in sterile solution during simulation cleaning.",
      "Swish to remove loose staples.",
      "Wipe inside and outside jaw surfaces.",
      "Reload only after inspection."
    ]
  },
  {
    id: "echelon-troubleshooting",
    title: "Module 8: Jaws Will Not Open",
    summary: "Escalation-minded troubleshooting flow for simulation drills.",
    warning: true,
    steps: [
      "Confirm battery is seated.",
      "Press home button.",
      "Remove and reinsert battery.",
      "Press home again.",
      "If unresolved, follow manufacturer IFU and faculty/device representative guidance."
    ]
  }
];

export const signiaConcepts = [
  {
    title: "Adaptive Firing",
    text:
      "Manufacturer-described concept: the system senses tissue conditions and adjusts firing speed accordingly during powered stapling."
  },
  {
    title: "Tissue Sensing",
    text:
      "Training focus: interpret the idea of force and tissue sensing as a feedback concept, not as permission to proceed without faculty confirmation."
  },
  {
    title: "Real-Time Feedback",
    text:
      "Learners discuss how feedback may inform reload selection awareness and the need to pause when conditions are unexpected."
  },
  {
    title: "Reloads and Adapters",
    text:
      "Compare adapter lengths, reload families, and setup needs as a simulation inventory exercise."
  },
  {
    title: "Ergonomic Design",
    text:
      "Practice push-button controls and one-handed maneuverability in a dry-lab setting before live-case exposure."
  },
  {
    title: "Powered Platform Comparison",
    text:
      "Compare powered articulation, powered firing, device feedback, reload workflow, and recovery planning without declaring one system superior."
  }
];

export const exercises: Exercise[] = [
  {
    id: "exercise-a",
    title: "Exercise A: Device Orientation and Component Identification",
    objective:
      "Identify parts, controls, reloads, safety lock, articulation, clamp, firing trigger, release, and indicators.",
    metrics: ["100% component identification", "Time goal 2 minutes"]
  },
  {
    id: "exercise-b",
    title: "Exercise B: Straight Staple Line on Synthetic Tissue",
    objective: "Align tissue with target line, compress, fire, release, and inspect.",
    metrics: [
      "Deviation from target line",
      "Incomplete staple lines",
      "Unsafe firings",
      "Setup-to-inspection time"
    ]
  },
  {
    id: "exercise-c",
    title: "Exercise C: Wedge Resection Drill",
    objective: "Plan wedge orientation, lesion margin, and stapling sequence.",
    metrics: ["Margin achieved", "Lesion encompassed", "Number of firings", "Staple line integrity"]
  },
  {
    id: "exercise-d",
    title: "Exercise D: Constrained-Angle Thoracoscopic Stapling",
    objective: "Use port access, camera view, articulation, and safe target capture.",
    metrics: ["Time to position", "Visualization loss events", "Repositioning", "Target accuracy"]
  },
  {
    id: "exercise-e",
    title: "Exercise E: Error Recognition and Rescue",
    objective:
      "Identify tissue twist, wrong reload, poor angle, hidden capture, and abnormal resistance.",
    metrics: [
      "Hazard recognition",
      "Proceed/abort decision",
      "Verbal safety communication",
      "No critical safety error"
    ]
  }
];

export const checklistItems = [
  "Performs device safety check",
  "Identifies correct stapler and reload",
  "Names major components",
  "Loads cartridge correctly",
  "Maintains orientation",
  "Positions tissue fully within jaws",
  "Visualizes both sides",
  "Applies compression before firing",
  "Fires smoothly",
  "Opens and releases safely",
  "Inspects staple line",
  "Recognizes unacceptable line",
  "States next step when error occurs",
  "Protects surrounding structures",
  "Communicates with assistant/camera operator"
];

export const rubricDomains = [
  "Device knowledge",
  "Setup and loading",
  "Tissue positioning",
  "Economy of motion",
  "Firing technique",
  "Staple line evaluation",
  "Troubleshooting",
  "Communication"
];

export const safetyFailures = [
  "Attempts to fire without adequate visualization",
  "Captures unintended structure",
  "Chooses clearly inappropriate reload after opportunity to correct",
  "Fails to stop despite malposition",
  "Produces unacceptable staple line and does not recognize it"
];

export const quizBlueprint = [
  "List the major steps of safe stapler use from reload selection to staple line inspection.",
  "Name three reasons not to fire even if tissue appears within the jaws.",
  "What features make a staple line unacceptable, and what is the immediate simulation response?",
  "How do thoracoscopic constraints change visualization and articulation planning?",
  "What information should be communicated to the assistant or camera operator before firing?"
];

export const metricTargets: MetricTarget[] = [
  {
    level: "Junior Target",
    componentIdentification: "100%",
    time: "<=120 sec",
    deviation: "<=5 mm",
    wedgeSuccess: ">=80%",
    safetyErrors: "0",
    acceptableLineRate: ">=80%"
  },
  {
    level: "Senior Target",
    componentIdentification: "100%",
    time: "<=90 sec",
    deviation: "<=3 mm",
    wedgeSuccess: ">=90%",
    safetyErrors: "0",
    acceptableLineRate: ">=90%"
  },
  {
    level: "Fellow Target",
    componentIdentification: "100%",
    time: "<=75 sec",
    deviation: "<=2 mm",
    wedgeSuccess: "100%",
    safetyErrors: "0",
    acceptableLineRate: ">=95%"
  }
];

export const entrustmentLevels = [
  "Level 1: observes and identifies device/steps",
  "Level 2: performs on simulator with direct coaching",
  "Level 3: performs routine task in OR with direct supervision",
  "Level 4: performs in OR with indirect guidance for routine uses",
  "Level 5: teaches others and manages device troubleshooting"
];

export const trackerRows: TrackerRow[] = [
  {
    date: "2026-07-12",
    traineeId: "R001",
    name: "Alex Sample",
    role: "Resident",
    pgyLevel: "PGY1",
    moduleCode: "STAP-1",
    moduleName: "Stapler Fundamentals",
    facultyAssessor: "Faculty A",
    quizScore: 86,
    checklistScore: 14,
    checklistMax: 15,
    rubricAvg: 3.2,
    criticalSafetyFailures: 0,
    metric1Name: "Setup time",
    metric1Value: "118 sec",
    metric2Name: "Line deviation",
    metric2Value: "4 mm",
    passStatus: "Pass",
    entrustmentLevel: "Level 2",
    comments: "Safe dry-lab handling; repeat for speed."
  },
  {
    date: "2026-08-09",
    traineeId: "R002",
    name: "Jordan Sample",
    role: "Resident",
    pgyLevel: "PGY3",
    moduleCode: "STAP-2",
    moduleName: "Thoracoscopic Stapling",
    facultyAssessor: "Faculty B",
    quizScore: 92,
    checklistScore: 15,
    checklistMax: 15,
    rubricAvg: 4.1,
    criticalSafetyFailures: 0,
    metric1Name: "Position time",
    metric1Value: "82 sec",
    metric2Name: "Target capture",
    metric2Value: "92%",
    passStatus: "Pass",
    entrustmentLevel: "Level 3",
    comments: "Good visualization language and controlled release."
  },
  {
    date: "2026-09-18",
    traineeId: "F001",
    name: "Morgan Fellow",
    role: "Fellow",
    pgyLevel: "Fellow",
    moduleCode: "STAP-3",
    moduleName: "Stapler Troubleshooting",
    facultyAssessor: "Faculty C",
    quizScore: 96,
    checklistScore: 15,
    checklistMax: 15,
    rubricAvg: 4.7,
    criticalSafetyFailures: 0,
    metric1Name: "Hazards found",
    metric1Value: "5/5",
    metric2Name: "Escalation",
    metric2Value: "Clear",
    passStatus: "Pass",
    entrustmentLevel: "Level 5",
    comments: "Ready to coach junior learners in simulation."
  },
  {
    date: "2026-10-04",
    traineeId: "R003",
    name: "Taylor Lee",
    role: "Resident",
    pgyLevel: "PGY2",
    moduleCode: "STAP-1",
    moduleName: "Stapler Fundamentals",
    facultyAssessor: "Faculty A",
    quizScore: 74,
    checklistScore: 11,
    checklistMax: 15,
    rubricAvg: 2.6,
    criticalSafetyFailures: 0,
    metric1Name: "Setup time",
    metric1Value: "142 sec",
    metric2Name: "Line deviation",
    metric2Value: "8 mm",
    passStatus: "Needs Remediation",
    entrustmentLevel: "Level 1",
    comments: "Assign reload review and coached repeat within 2 weeks."
  },
  {
    date: "2026-11-14",
    traineeId: "R004",
    name: "Casey Morgan",
    role: "Resident",
    pgyLevel: "PGY4",
    moduleCode: "STAP-2",
    moduleName: "Thoracoscopic Stapling",
    facultyAssessor: "Faculty D",
    quizScore: 88,
    checklistScore: 12,
    checklistMax: 15,
    rubricAvg: 3.1,
    criticalSafetyFailures: 1,
    metric1Name: "Visualization loss",
    metric1Value: "2 events",
    metric2Name: "Target capture",
    metric2Value: "78%",
    passStatus: "Needs Remediation",
    entrustmentLevel: "Level 2",
    comments: "Critical stop point missed; repeat constrained-angle station."
  }
];

export const calendarItems = [
  ["July", "Program launch and baseline assessment"],
  ["August", "Stapler fundamentals I"],
  ["September", "Stapler fundamentals II"],
  ["October", "Thoracoscopic constrained-angle stapling"],
  ["November", "Troubleshooting and rescue"],
  ["December", "Midyear review"],
  ["January", "Endoscopic suturing fundamentals"],
  ["February", "Advanced suturing and leak-tested repair"],
  ["March", "Energy devices and tissue effects"],
  ["April", "Procedure integration month"],
  ["May", "Teaching and near-peer coaching"],
  ["June", "Summative assessment and curriculum revision"]
] as const;

export const facultyTemplate = [
  "Prework: 10-15 min",
  "Descriptive teaching: 15-20 min",
  "Faculty demonstration: 10 min",
  "Deliberate practice: 45-60 min",
  "Assessment: 15-20 min",
  "Debrief: 10 min"
];

export const facultyWorkflow = {
  "Before session": [
    "Confirm roster",
    "Choose module",
    "Prepare device, reloads, tissue model, checklist, and quiz"
  ],
  "During session": [
    "Demonstrate safe workflow",
    "Coach deliberate practice",
    "Record objective metrics",
    "Stop unsafe actions immediately"
  ],
  "After session": [
    "Enter scores",
    "Identify remediation",
    "Assign entrustment level",
    "Document faculty comments"
  ]
};

export const resources = [
  {
    title: "ECHELON 3000 Quick Reference",
    description: "Local optimized device performance guide used to build the simulation modules.",
    href: "/downloads/echelon-3000-odp-guide.pdf",
    type: "PDF"
  },
  {
    title: "Signia Powered Stapler Concept Sheet",
    description: "Local product information sheet for powered stapling concepts and comparison language.",
    href: "/downloads/signia-powered-stapler-information-sheet.pdf",
    type: "PDF"
  },
  {
    title: "Stapling Skills Checklist",
    description: "Printable checklist and rubric section for faculty assessment.",
    href: "#assessment",
    type: "Section"
  },
  {
    title: "Global Rating Rubric",
    description: "Five-point global domains for formative and summative scoring.",
    href: "#assessment",
    type: "Section"
  },
  {
    title: "Objective Metrics Sheet",
    description: "Target thresholds for juniors, seniors, and fellows.",
    href: "#assessment",
    type: "Table"
  },
  {
    title: "Annual Calendar",
    description: "Twelve-month curriculum sequence for program planning.",
    href: "#calendar",
    type: "Timeline"
  },
  {
    title: "Resident Logbook Template",
    description: "Tracker workbook with roster, modules, session log, attempts log, and dashboard.",
    href: "/downloads/thoracic-surgery-curriculum-tracker.xlsx",
    type: "XLSX"
  },
  {
    title: "Curriculum Handbook",
    description: "Local handbook source with levels, modules, exercises, rubrics, and faculty workflow.",
    href: "/downloads/thoracic-surgery-device-curriculum.docx",
    type: "DOCX"
  }
];

export const onlineResources = [
  {
    title: "J&J MedTech ECHELON 3000 product page",
    href: "https://www.jnjmedtech.com/en-US/products/surgery/surgical-staplers/echelon-3000-stapler/"
  },
  {
    title: "J&J MedTech ECHELON 3000 features video",
    href: "https://www.youtube.com/watch?v=-VrCCmxw5ys"
  },
  {
    title: "Medtronic Signia stapling system page",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/specialties/surgical-solutions/product-portfolio/signia-stapling-system.html"
  },
  {
    title: "Medtronic Surgical Signia in-service overview video",
    href: "https://www.youtube.com/watch?v=ALg2o9fWQe0"
  },
  {
    title: "Medtronic Surgical Signia in-service firing video",
    href: "https://www.youtube.com/watch?v=nHngeFrMgjw"
  }
];
