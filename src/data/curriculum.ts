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
  image?: string;
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
  { label: "Signia", href: "#signia" },
  { label: "EndoStitch", href: "#endostitch" },
  { label: "Exercises", href: "#exercises" },
  { label: "Assessment", href: "#assessment" },
  { label: "Tracker", href: "#tracker" },
  { label: "Calendar", href: "#calendar" },
  { label: "Faculty", href: "#faculty" },
  { label: "Resources", href: "#resources" }
];

export const learnerLevels: LearnerLevel[] = [
  {
    title: "Signia Basic Pathway",
    subtitle: "Setup and feedback",
    focus:
      "Power handle, shell, adapter/reload recognition, feedback cues, simulated clamping, firing, release, and staple-line inspection."
  },
  {
    title: "Signia Recovery Pathway",
    subtitle: "Troubleshooting",
    focus:
      "Loading/unloading difficulty, unexpected feedback, failure to retract/open, reboot, backup handle, and IFU-directed manual recovery awareness."
  },
  {
    title: "Endo Stitch Pathway",
    subtitle: "Endoscopic suturing",
    focus:
      "Device orientation, reload awareness, controlled needle transfer, interrupted/running stitch patterns, tension control, and needle-safety stop rules."
  }
];

export const coreModules: CoreModule[] = [
  {
    code: "SIGNIA",
    name: "Signia Powered Stapler",
    audience: "Residents, fellows, faculty assessors",
    description:
      "Powered stapling platform orientation, adapter/reload workflow, feedback interpretation, simulated firing, release, troubleshooting, and recovery awareness."
  },
  {
    code: "ENDOSTITCH",
    name: "Endo Stitch Suturing Device",
    audience: "Residents, fellows, faculty assessors",
    description:
      "Endoscopic suturing device orientation, reload recognition, needle transfer, interrupted and running stitch practice, tension control, and needle-safety stop rules."
  }
];

export const deviceCards: DeviceCardData[] = [
  {
    title: "Medtronic Signia Powered Stapler",
    image: "/assets/signia-side-view.jpg",
    caption: "Medtronic Signia powered stapling system reference image.",
    points: [
      "Manufacturer-described Adaptive Firing and Adaptive Compression concepts",
      "Tissue thickness and force sensing concepts",
      "Real-time handle feedback for reload-selection awareness",
      "Power handle, power shell, charger, adapters, reloads, and manual retraction tool",
      "Powered rotation, articulation, clamping, and firing concepts",
      "Troubleshooting flow: open, reboot, backup handle, then IFU-directed manual operation"
    ]
  },
  {
    title: "Medtronic Endo Stitch Suturing",
    caption: "Endoscopic suturing simulation module for interrupted and running stitch practice.",
    points: [
      "10 mm endoscopic suturing device orientation",
      "Single-stitch, triple-stitch, and compatible reload awareness",
      "Needle transfer between jaws under direct visualization",
      "Interrupted and running stitch sequencing on synthetic tissue",
      "Needle visibility, retrieval, and loss-prevention stop points",
      "Knot security, tension control, bite spacing, and communication"
    ]
  }
];

export const signiaDeviceFacts = [
  {
    label: "Platform",
    value:
      "Powered stapling system organized around a reusable handle/power shell, charger, adapters, reloads, and IFU-directed recovery accessories."
  },
  {
    label: "Manufacturer-described feedback",
    value:
      "Medtronic describes Signia as using tissue and force sensing with adaptive firing/compression concepts. In this site, feedback is taught as a pause-and-confirm simulation cue."
  },
  {
    label: "Training scope",
    value:
      "Dry-lab setup, reload/adaptor recognition, powered controls, target capture, firing/release, troubleshooting, and recovery tabletop drills."
  },
  {
    label: "Critical stop point",
    value:
      "Do not proceed in simulation when visualization, reload selection, device movement, feedback, or resistance is unexpected. Call faculty and return to IFU-guided workflow."
  }
];

export const signiaInstructionFocus = [
  "Identify handle, power shell, charger, adapter, reload, jaws, display/feedback cues, and manual retraction tool.",
  "Assemble handle, shell, adapter, and reload only within a faculty-supervised trainer station.",
  "Interpret display/audible/handle feedback as a reason to pause, verify tissue model conditions, and communicate.",
  "Practice target capture, compression awareness, powered firing, release, and staple-line inspection on synthetic tissue.",
  "Rehearse loading difficulty, unloading difficulty, retraction difficulty, reboot, backup handle, and manual recovery awareness as simulation scenarios."
];

export const medtronicSigniaModules: TrainingModule[] = [
  {
    id: "signia-platform-orientation",
    title: "Signia Module 1: Platform Orientation",
    summary: "Identify the reusable and single-use system elements before any simulation firing station.",
    steps: [
      "Identify the power handle, power shell, charger, linear adapter options, compatible reloads, insertion guide, sterilization tray, and manual retraction tool.",
      "Confirm the training station has current IFU access and faculty or device-education supervision.",
      "Inspect simulation packaging, labels, adapter length, reload family, and expiration/status cues according to local policy.",
      "Verbalize that reloads and tissue models used in simulation do not authorize independent patient-care use.",
      "Document the selected adapter and reload in the training log before beginning the station.",
      "State the safety phrase: follow institutional policy, manufacturer IFU, and faculty supervision before simulated use."
    ]
  },
  {
    id: "signia-assembly-readiness",
    title: "Signia Module 2: Assembly and Readiness Check",
    summary: "Practice handle, shell, adapter, and reload readiness as a dry-lab setup workflow.",
    steps: [
      "Confirm the handle and power shell are ready for the simulated session and that the display/indicator behavior is reviewed with faculty.",
      "Attach the appropriate adapter to the handle before connecting a reload, using the station checklist and IFU as the reference.",
      "Keep hands clear of distal jaws, knife path, and reload edges during setup and demonstration.",
      "Open, center, rotate, articulate, clamp, and release on the trainer while naming each control aloud.",
      "Stop the setup if a connection, calibration, display, or movement cue is unexpected.",
      "Return the device to a neutral trainer position and verbally confirm readiness before moving to tissue practice."
    ]
  },
  {
    id: "signia-feedback-adaptive-firing",
    title: "Signia Module 3: Feedback and Adaptive Firing Concepts",
    summary: "Translate manufacturer-described sensing and powered firing concepts into simulation discussion points.",
    steps: [
      "Explain that Medtronic describes Signia as sensing tissue/forces and adjusting clamping or firing behavior in real time.",
      "Use synthetic tissue of different thicknesses to discuss why feedback is a pause-and-confirm signal, not permission to proceed automatically.",
      "Compare expected and unexpected display or audible feedback with the faculty facilitator before firing.",
      "State the reload-selection rationale and abort criteria before each simulated firing.",
      "Record feedback interpretation, reload choice, and whether faculty correction was needed.",
      "Repeat the scenario with a different synthetic tissue thickness and compare the expected training response."
    ]
  },
  {
    id: "signia-linear-firing-release",
    title: "Signia Module 4: Linear Stapling Firing and Release Drill",
    summary: "Controlled target capture, compression awareness, powered firing, release, and staple-line inspection.",
    steps: [
      "Align synthetic tissue flat within the jaws and confirm both sides of the target are visible on the trainer view.",
      "Announce target, reload, tissue thickness assumption, and stop points before clamping.",
      "Clamp only after confirming no hidden structure, twist, traction, or off-target capture is present.",
      "Fire in simulation only after the faculty observer confirms the setup is acceptable.",
      "Open/release, inspect the staple line, and classify it as acceptable, questionable, or unacceptable using the curriculum rubric.",
      "Announce whether the trainee would pass, repeat, or remediate the station based on the observed result."
    ]
  },
  {
    id: "signia-troubleshooting",
    title: "Signia Module 5: Troubleshooting and Recovery Awareness",
    summary: "A faculty-led scenario for loading difficulty, unloading difficulty, incomplete opening, and recovery escalation.",
    warning: true,
    steps: [
      "For loading or unloading difficulty, stop, center/open the adapter as applicable, confirm alignment, and ask faculty to compare the setup with the IFU/troubleshooting guide.",
      "For unexpected clamping, firing, or feedback behavior, stop the scenario, keep the device stable, and verbalize the concern to the team.",
      "For failure to retract or open in the scenario, rehearse the escalation sequence: powered opening approach, handle reboot, backup handle if available, then IFU-directed manual operation with faculty/device-representative guidance.",
      "Know that manual operation can take several minutes and many rotations; do not overtighten or force resistance during demonstration.",
      "After any recovery drill, label the device scenario as a product-event simulation, inspect the model, and document remediation needs.",
      "Debrief what should be escalated to institutional device channels if this were a real product event."
    ]
  }
];

export const endoStitchModules: TrainingModule[] = [
  {
    id: "endostitch-orientation",
    title: "Endo Stitch Module 1: Device Orientation and Reloads",
    summary: "Recognize the 10 mm suturing device, jaws, handle controls, shaft, reload types, and suture path.",
    steps: [
      "Identify the Endo Stitch suturing device, shaft, jaws, handle action, needle position, and suture tail on the dry trainer.",
      "Review single-stitch, triple-stitch, and compatible reload concepts as inventory awareness, not product selection advice.",
      "Confirm all reload handling is performed on a trainer under faculty supervision and current IFU access.",
      "Trace the intended suture path before touching the tissue model.",
      "State the needle-loss stop rule: if the needle is not visible and controlled, pause and call faculty.",
      "Confirm reload count, suture tail orientation, and synthetic tissue target marks before beginning."
    ]
  },
  {
    id: "endostitch-needle-transfer",
    title: "Endo Stitch Module 2: Needle Transfer Drill",
    summary: "Practice deliberate jaw alignment and needle passage without tissue, then through synthetic tissue.",
    steps: [
      "Start with air passes to see how the needle transfers between jaws in the trainer field.",
      "Keep the jaws in view during each open, close, and transfer movement.",
      "Advance to synthetic tissue only after five consecutive controlled transfers without needle instability.",
      "Place symmetric bites on marked entry and exit points while avoiding tissue tearing or excessive tension.",
      "Reset if visualization is lost, the needle is partially captured, or the tissue path is unclear.",
      "Record number of clean transfers, misfires, partial captures, and faculty prompts."
    ]
  },
  {
    id: "endostitch-interrupted-running",
    title: "Endo Stitch Module 3: Interrupted and Running Stitch Patterns",
    summary: "Use marked pads to practice spacing, bite symmetry, travel direction, and suture management.",
    steps: [
      "Plan the stitch line on the model and verbalize direction, spacing, and tension goal.",
      "Complete three interrupted stitches with equal bite depth and controlled suture tails.",
      "Complete a running stitch segment while maintaining consistent spacing and avoiding suture crossing.",
      "Use faculty-approved knot or closure practice methods for the station; do not convert this to patient-care instruction.",
      "Score the station for bite spacing, tissue handling, tension, needle control, and communication.",
      "Repeat with the camera angle shifted to test whether the learner can maintain orientation under constrained visualization."
    ]
  },
  {
    id: "endostitch-error-rescue",
    title: "Endo Stitch Module 4: Error Recognition and Rescue",
    summary: "Recognize unsafe needle position, poor bite geometry, tension problems, and loss-of-visualization events.",
    warning: true,
    steps: [
      "Stop immediately if the needle is not visible, not fully controlled, or unexpectedly transferred.",
      "Identify poor bite symmetry, skim bites, tissue tearing, crossed suture, excessive tension, and slack loops.",
      "Communicate the error aloud and request camera/instrument stabilization before continuing the scenario.",
      "Recover only using faculty-approved simulation steps and current IFU guidance.",
      "Log the event as a remediation item if needle control or visualization stop rules were missed.",
      "Debrief how the trainee would communicate needle status, reload status, and recovery plan to the team."
    ]
  }
];

export const medtronicSafetyNotes = [
  "Simulation only: these modules do not replace Medtronic IFU, institutional policy, credentialing, or faculty/device-education supervision.",
  "Treat powered feedback as a prompt to pause, verify, and communicate; it is not an automatic proceed signal.",
  "Manual recovery concepts should be demonstrated only by faculty or device educators using approved training equipment and current IFU.",
  "For Endo Stitch drills, uncontrolled needle position or lost visualization is an immediate stop point."
];

export const medtronicResources = [
  {
    title: "Medtronic Signia stapling system",
    description: "Manufacturer page describing Adaptive Firing, Adaptive Compression, sensing, feedback, adapters, reloads, and resources.",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/specialties/surgical-solutions/product-portfolio/signia-stapling-system.html",
    type: "Medtronic"
  },
  {
    title: "Signia troubleshooting guide",
    description: "Manufacturer troubleshooting PDF for loading, unloading, retraction/opening difficulty, reboot, backup handle, and manual retraction awareness.",
    href: "https://www.medtronic.com/content/dam/medtronic-wide/public/united-states/products/surgical-stapling/signia-stapling-system-troubleshooting-guide.pdf",
    type: "PDF"
  },
  {
    title: "Signia adapter manual operation guide",
    description: "Manufacturer quick-use PDF for linear/circular adapter manual operation concepts and precautions.",
    href: "https://www.medtronic.com/content/dam/medtronic-wide/public/united-states/products/surgical-stapling/signia-stapler-quick-use-linear-circular-adapter-guide.pdf",
    type: "PDF"
  },
  {
    title: "Endo Stitch suturing device",
    description: "Manufacturer page for the 10 mm endoscopic suturing device and related reloads.",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/access-instruments/endoscopic-devices/endo-stitch-suturing-device.html",
    type: "Medtronic"
  },
  {
    title: "Endo Stitch single-stitch reload",
    description: "Manufacturer page for the single-use reload with one sutured needle.",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/wound-closure/endoscopic-suturing/accessories/endo-stitch-single-stitch-reload.html",
    type: "Medtronic"
  },
  {
    title: "Endo Stitch triple-stitch reload",
    description: "Manufacturer page for the triple-stitch reload concept used in inventory recognition drills.",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/wound-closure/endoscopic-suturing/accessories/endo-stitch-triple-stitch-reload.html",
    type: "Medtronic"
  }
];

export const endoStitchDeviceFacts = [
  {
    label: "Manufacturer-described use",
    value:
      "Endoscopic placement of interrupted or running stitches in soft tissue. Simulation sessions teach recognition and trainer handling only."
  },
  {
    label: "Instrument profile",
    value: "10 mm endoscopic suturing device with a listed 15 in / 34 cm shaft length."
  },
  {
    label: "Ordering reference",
    value: "Medtronic lists item 173016 for the Endo Stitch suturing device; programs should confirm local inventory and IFU."
  },
  {
    label: "Station setup",
    value:
      "Dry trainer, marked synthetic tissue, compatible reload examples, needle-control checklist, camera view, and faculty observer."
  }
];

export const endoStitchReloadOptions = [
  {
    title: "Single-stitch reload",
    text: "Single-use loading unit with one sutured needle; use for basic reload identification and first-pass needle-transfer drills."
  },
  {
    title: "Triple-stitch reload",
    text: "Reload concept with three sutured needles; use for inventory comparison, count discipline, and sequence planning discussions."
  },
  {
    title: "V-Loc compatible reload awareness",
    text: "Teach compatibility awareness and suture-management differences as a faculty-led comparison station, not independent selection advice."
  }
];

export const endoStitchCompetencyFocus = [
  "Names handle, shaft, jaws, needle position, suture tail, and reload type before touching the model.",
  "Keeps the needle and jaws visible during every transfer, bite, and reset.",
  "Places symmetric bites on marked pads with controlled spacing, depth, and tissue tension.",
  "Stops immediately for lost visualization, uncontrolled needle position, tissue tearing, or crossed suture.",
  "Communicates reload count, needle status, suture tension, and recovery plan to the faculty observer."
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
    id: "exercise-signia-setup",
    title: "Signia Exercise 1: Platform Setup and Reload Recognition",
    objective:
      "Identify Signia handle, power shell, adapter, compatible reloads, feedback cues, and manual recovery accessory in a dry-lab station.",
    metrics: ["100% component identification", "Correct adapter/reload verbalization", "IFU/faculty supervision stated"]
  },
  {
    id: "exercise-signia-fire",
    title: "Signia Exercise 2: Powered Firing and Release on Synthetic Tissue",
    objective:
      "Capture a marked synthetic target, interpret feedback, complete simulated firing/release, and inspect the staple line.",
    metrics: ["Target capture accuracy", "Feedback interpreted before firing", "No unsafe firing", "Staple-line classification"]
  },
  {
    id: "exercise-signia-recovery",
    title: "Signia Exercise 3: Troubleshooting and Recovery Tabletop",
    objective:
      "Rehearse loading difficulty, unloading difficulty, unexpected feedback, failure to retract, reboot, backup handle, and manual recovery awareness.",
    metrics: ["Escalation sequence complete", "No forced movement", "Faculty/device-representative guidance named", "Documentation plan stated"]
  },
  {
    id: "exercise-endostitch-transfer",
    title: "Endo Stitch Exercise 1: Device Orientation and Needle Transfer",
    objective:
      "Identify Endo Stitch components and demonstrate controlled needle transfer through trainer air passes and marked synthetic tissue.",
    metrics: ["Five controlled air transfers", "Needle always visible", "No partial capture", "Stop rule verbalized"]
  },
  {
    id: "exercise-endostitch-patterns",
    title: "Endo Stitch Exercise 2: Interrupted and Running Stitch Patterns",
    objective:
      "Complete interrupted and running stitch patterns with consistent bite spacing, suture management, and controlled tension.",
    metrics: ["Bite symmetry", "Spacing consistency", "Tension control", "No tissue tearing"]
  },
  {
    id: "exercise-endostitch-rescue",
    title: "Endo Stitch Exercise 3: Error Recognition and Rescue",
    objective:
      "Recognize lost visualization, uncontrolled needle position, poor bite geometry, crossed suture, and tension problems during simulation.",
    metrics: ["Hazard recognized", "Immediate stop", "Needle status communicated", "Remediation plan documented"]
  }
];

export const checklistItems = [
  "Identifies Signia handle, power shell, charger, adapter, reload, jaws, display cues, and manual retraction tool",
  "Assembles Signia simulation station only under IFU/faculty-supervised conditions",
  "States Signia reload/adaptor rationale before clamping",
  "Interprets powered feedback as a pause-and-confirm cue",
  "Positions synthetic tissue fully within Signia jaws with both sides visualized",
  "Completes simulated Signia firing and release without forced movement",
  "Inspects and classifies the simulated Signia staple line",
  "Verbalizes Signia troubleshooting and recovery escalation sequence",
  "Identifies Endo Stitch handle, shaft, jaws, reload, needle position, and suture tail",
  "Confirms Endo Stitch reload count and needle status before transfer",
  "Maintains Endo Stitch needle visibility and control",
  "Places symmetric Endo Stitch bites on marked synthetic tissue",
  "Manages suture tension without tearing or crossing",
  "Stops immediately for lost visualization or uncontrolled needle position",
  "Communicates device status, safety stop, and recovery plan to faculty"
];

export const rubricDomains = [
  "Signia device knowledge",
  "Signia setup and loading",
  "Signia feedback interpretation",
  "Signia firing, release, and inspection",
  "Signia troubleshooting escalation",
  "Endo Stitch device knowledge",
  "Endo Stitch needle transfer",
  "Endo Stitch stitch pattern and tension control",
  "Safety stop recognition",
  "Team communication"
];

export const safetyFailures = [
  "Attempts simulated Signia firing without adequate visualization",
  "Uses a clearly mismatched Signia adapter or reload after opportunity to correct",
  "Ignores unexpected Signia feedback, resistance, or movement cue",
  "Forces a powered stapler or adapter during recovery simulation",
  "Fails to recognize an unacceptable Signia staple-line result",
  "Continues Endo Stitch practice after lost needle visualization",
  "Allows uncontrolled Endo Stitch needle position or unaccounted reload status"
];

export const quizBlueprint = [
  "List the Signia platform elements that must be identified before a simulated firing station.",
  "What should a learner do when Signia feedback, resistance, or device motion is unexpected?",
  "Name the Signia troubleshooting escalation sequence rehearsed in simulation.",
  "List the Endo Stitch elements that must be identified before needle-transfer practice.",
  "What are the Endo Stitch immediate stop rules for needle visualization, reload status, and tissue handling?"
];

export const metricTargets: MetricTarget[] = [
  {
    level: "Signia Setup Target",
    componentIdentification: "100% Signia parts/reloads",
    time: "<=120 sec station setup",
    deviation: "Target captured within marks",
    wedgeSuccess: "Feedback rationale stated",
    safetyErrors: "0 missed stop rules",
    acceptableLineRate: ">=90% acceptable classification"
  },
  {
    level: "Signia Recovery Target",
    componentIdentification: "Recovery tools named",
    time: "<=90 sec escalation verbalized",
    deviation: "No forced movement",
    wedgeSuccess: "Recovery sequence complete",
    safetyErrors: "0 missed stop rules",
    acceptableLineRate: "100% escalation documented"
  },
  {
    level: "Endo Stitch Target",
    componentIdentification: "100% device/reload ID",
    time: "5 clean transfers before tissue",
    deviation: "Bites within target marks",
    wedgeSuccess: ">=90% transfer success",
    safetyErrors: "0 missed stop rules",
    acceptableLineRate: ">=90% pattern completion"
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
    traineeId: "M001",
    name: "Alex Sample",
    role: "Resident",
    pgyLevel: "PGY1",
    moduleCode: "SIGNIA",
    moduleName: "Signia Platform Setup",
    facultyAssessor: "Faculty A",
    quizScore: 88,
    checklistScore: 13,
    checklistMax: 15,
    rubricAvg: 3.3,
    criticalSafetyFailures: 0,
    metric1Name: "Component ID",
    metric1Value: "100%",
    metric2Name: "Setup time",
    metric2Value: "112 sec",
    passStatus: "Pass",
    entrustmentLevel: "Level 2",
    comments: "Safe Signia setup; repeat for speed and feedback vocabulary."
  },
  {
    date: "2026-08-09",
    traineeId: "M002",
    name: "Jordan Sample",
    role: "Resident",
    pgyLevel: "PGY3",
    moduleCode: "SIGNIA",
    moduleName: "Signia Firing and Release",
    facultyAssessor: "Faculty B",
    quizScore: 92,
    checklistScore: 15,
    checklistMax: 15,
    rubricAvg: 4.1,
    criticalSafetyFailures: 0,
    metric1Name: "Feedback cues",
    metric1Value: "4/4",
    metric2Name: "Target capture",
    metric2Value: "Within marks",
    passStatus: "Pass",
    entrustmentLevel: "Level 3",
    comments: "Good feedback interpretation and controlled release."
  },
  {
    date: "2026-09-18",
    traineeId: "M003",
    name: "Morgan Fellow",
    role: "Fellow",
    pgyLevel: "Fellow",
    moduleCode: "SIGNIA",
    moduleName: "Signia Troubleshooting and Recovery",
    facultyAssessor: "Faculty C",
    quizScore: 96,
    checklistScore: 15,
    checklistMax: 15,
    rubricAvg: 4.7,
    criticalSafetyFailures: 0,
    metric1Name: "Recovery sequence",
    metric1Value: "Complete",
    metric2Name: "Forced movement",
    metric2Value: "None",
    passStatus: "Pass",
    entrustmentLevel: "Level 5",
    comments: "Ready to coach Signia recovery tabletop scenarios."
  },
  {
    date: "2026-10-04",
    traineeId: "M004",
    name: "Taylor Lee",
    role: "Resident",
    pgyLevel: "PGY2",
    moduleCode: "ENDOSTITCH",
    moduleName: "Endo Stitch Orientation",
    facultyAssessor: "Faculty A",
    quizScore: 82,
    checklistScore: 12,
    checklistMax: 15,
    rubricAvg: 3.0,
    criticalSafetyFailures: 0,
    metric1Name: "Device/reload ID",
    metric1Value: "100%",
    metric2Name: "Needle status",
    metric2Value: "Verbalized",
    passStatus: "Pass",
    entrustmentLevel: "Level 2",
    comments: "Safe orientation; continue needle-transfer practice."
  },
  {
    date: "2026-11-14",
    traineeId: "M005",
    name: "Casey Morgan",
    role: "Resident",
    pgyLevel: "PGY4",
    moduleCode: "ENDOSTITCH",
    moduleName: "Endo Stitch Needle Transfer",
    facultyAssessor: "Faculty D",
    quizScore: 84,
    checklistScore: 11,
    checklistMax: 15,
    rubricAvg: 2.8,
    criticalSafetyFailures: 1,
    metric1Name: "Clean transfers",
    metric1Value: "3/5",
    metric2Name: "Needle visualization",
    metric2Value: "Lost once",
    passStatus: "Needs Remediation",
    entrustmentLevel: "Level 1",
    comments: "Needle visibility stop rule missed; repeat transfer station."
  },
  {
    date: "2026-12-02",
    traineeId: "M006",
    name: "Priya Shah",
    role: "Resident",
    pgyLevel: "PGY2",
    moduleCode: "ENDOSTITCH",
    moduleName: "Endo Stitch Running Stitch",
    facultyAssessor: "Faculty E",
    quizScore: 90,
    checklistScore: 14,
    checklistMax: 15,
    rubricAvg: 3.7,
    criticalSafetyFailures: 0,
    metric1Name: "Bite spacing",
    metric1Value: "Within marks",
    metric2Name: "Tension control",
    metric2Value: "Acceptable",
    passStatus: "Pass",
    entrustmentLevel: "Level 3",
    comments: "Good suture management; add constrained-view repeat."
  }
];

export const calendarItems = [
  ["July", "Medtronic device orientation and baseline assessment"],
  ["August", "Signia platform setup, adapter workflow, and reload recognition"],
  ["September", "Signia powered feedback, firing, release, and staple-line inspection"],
  ["October", "Signia troubleshooting, recovery awareness, and product-event communication"],
  ["November", "Endo Stitch device orientation, reloads, and needle-safety stop rules"],
  ["December", "Endo Stitch needle-transfer deliberate practice"],
  ["January", "Endo Stitch interrupted stitch patterns"],
  ["February", "Endo Stitch running stitch patterns and tension control"],
  ["March", "Combined Signia and Endo Stitch simulation assessment"],
  ["April", "Remediation month for device-specific weak points"],
  ["May", "Near-peer coaching for Signia and Endo Stitch stations"],
  ["June", "Summative device competency review and curriculum update"]
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
    title: "Signia Powered Stapler Concept Sheet",
    description: "Local Medtronic Signia information sheet used for powered stapling concepts and comparison language.",
    href: "/downloads/signia-powered-stapler-information-sheet.pdf",
    type: "PDF"
  },
  {
    title: "Signia Checklist and Rubric",
    description: "Printable Signia-focused checklist, rubric, objective metrics, and safety-failure section.",
    href: "#assessment",
    type: "Section"
  },
  {
    title: "Endo Stitch Checklist and Rubric",
    description: "Printable Endo Stitch-focused checklist, needle-transfer rubric, and safety stop rules.",
    href: "#assessment",
    type: "Section"
  },
  {
    title: "Device Tracker Table",
    description: "Interactive local tracker with Signia and Endo Stitch sample sessions, remediation, and entrustment decisions.",
    href: "#tracker",
    type: "Table"
  },
  {
    title: "Medtronic Device Calendar",
    description: "Twelve-month implementation sequence for Signia and Endo Stitch simulation training.",
    href: "#calendar",
    type: "Timeline"
  }
];

export const onlineResources = [
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
  },
  {
    title: "Medtronic Signia linear stapler product and in-service resources",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/surgical-staplers/powered-staplers/signia-linear-stapler-with-tri-staple-technology.html"
  },
  {
    title: "Medtronic Signia troubleshooting guide PDF",
    href: "https://www.medtronic.com/content/dam/medtronic-wide/public/united-states/products/surgical-stapling/signia-stapling-system-troubleshooting-guide.pdf"
  },
  {
    title: "Medtronic Signia adapter manual operation guide PDF",
    href: "https://www.medtronic.com/content/dam/medtronic-wide/public/united-states/products/surgical-stapling/signia-stapler-quick-use-linear-circular-adapter-guide.pdf"
  },
  {
    title: "Medtronic Endo Stitch suturing device page",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/access-instruments/endoscopic-devices/endo-stitch-suturing-device.html"
  },
  {
    title: "Medtronic Endo Stitch single-stitch reload page",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/wound-closure/endoscopic-suturing/accessories/endo-stitch-single-stitch-reload.html"
  },
  {
    title: "Medtronic Endo Stitch triple-stitch reload page",
    href: "https://www.medtronic.com/en-us/healthcare-professionals/products/wound-closure/endoscopic-suturing/accessories/endo-stitch-triple-stitch-reload.html"
  }
];
