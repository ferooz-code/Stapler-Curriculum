import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Layers,
  PlayCircle,
  ShieldAlert,
  SlidersHorizontal
} from "lucide-react";

type Page = "home" | "signia" | "triStaple" | "endostitch";

type ReloadCard = {
  name: string;
  color: string;
  textColor?: string;
  tissue: string;
  stapleHeights: string;
  description: string;
  source: string;
  sourceLabel: string;
};

type TriStapleMatrixRow = {
  name: string;
  color: string;
  textColor?: string;
  tissue: string;
  openHeights: string;
  closedHeights: string;
  indicatedRange: string;
  lengths: string;
  application: string;
};

type TriStapleProduct = {
  name: string;
  category: string;
  summary: string;
  href: string;
};

type TriStapleFamily = {
  name: string;
  color: string;
  summary: string;
  href: string;
  details: string[];
};

type SurveyLog = {
  id: string;
  date: string;
  attempts: number;
  load: string;
  confidence: number;
  notes: string;
};

const surveyStorageKey = "signia-survey-logs-v1";

function loadSurveyLogs(): SurveyLog[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(surveyStorageKey);
    if (!saved) return [];
    const parsed = JSON.parse(saved) as SurveyLog[];
    return Array.isArray(parsed) ? parsed.filter((entry) => Number.isFinite(entry.attempts)) : [];
  } catch {
    return [];
  }
}

const sourceLinks = {
  surgicalStapling: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling.html",
  nzSurgicalStapling: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling.html",
  signia: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/surgical-staplers/powered-staplers/signia-linear-stapler-with-tri-staple-technology.html",
  nzSignia: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/signia-stapling-system.html",
  reload30: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-30-mm-reload.html",
  purpleReload: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-purple-reload.html",
  blackReload: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-black-reload.html",
  smallDiameter: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/signia-small-diameter-reload.html",
  curvedTip: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-curved-tip-reload.html",
  nzReinforcedReload: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/endo-gia-reinforced-reload.html",
  nzCurvedTipReload: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/endo-gia-curved-tip-reload.html",
  nzBlackReload: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/endo-gia-black-reload.html",
  nzRadialReload: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/endo-gia-radial-reload.html",
  nzReload30: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/endo-gia-30-mm-reload.html",
  nzLaparoscopicStaplers: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/laparoscopic-staplers.html",
  nzOpenStaplers: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/open-staplers.html",
  nzCircularStaplers: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/circular-staplers.html",
  nzSkinStaplers: "https://www.medtronic.com/covidien/en-nz/products/surgical-stapling/skin-staplers.html",
  endostitch: "https://www.medtronic.com/en-ca/healthcare-professionals/products/access-instruments/endoscopic-devices/endo-stitch-suturing-device.html",
  endostitchSingleReload: "https://www.medtronic.com/en-us/healthcare-professionals/products/wound-closure/endoscopic-suturing/accessories/endo-stitch-single-stitch-reload.html",
  medtronicManuals: "https://manuals.medtronic.com/manuals/main/region"
};

const signiaVideos = [
  { title: "Signia overview video", videoId: "ALg2o9fWQe0" },
  { title: "Signia firing video", videoId: "nHngeFrMgjw" }
];

const endoVideos = [
  { title: "Endo Stitch suturing device video", videoId: "4lIzVLi9wpE" },
  { title: "Auto Suture Endo Stitch demonstration", videoId: "v8kAcloFghM" }
];

const reloads: ReloadCard[] = [
  {
    name: "Purple",
    color: "#6f2c91",
    tissue: "Medium / thick",
    stapleHeights: "3 / 3.5 / 4 mm",
    description:
      "Tri-Staple 2.0 purple reloads are listed by Medtronic for medium/thick tissue. Use this as the main simulation station for recognition and tissue-thickness matching.",
    source: sourceLinks.purpleReload,
    sourceLabel: "Purple reload source"
  },
  {
    name: "Black",
    color: "#111827",
    tissue: "Extra thick",
    stapleHeights: "4 / 4.5 / 5 mm",
    description:
      "Tri-Staple 2.0 black reloads are described for extra-thick tissue. Simulation focus: identify when the tissue model is outside the learner's assumed load range and pause.",
    source: sourceLinks.blackReload,
    sourceLabel: "Black reload source"
  },
  {
    name: "White",
    color: "#f8fafc",
    textColor: "#0f172a",
    tissue: "Small-diameter / vascular-style recognition",
    stapleHeights: "30 and 45 mm small-diameter reload options",
    description:
      "Medtronic lists white Signia small-diameter reload options. In this curriculum, white is used as a recognition station for small-diameter reloads and thin-tissue simulation models.",
    source: sourceLinks.smallDiameter,
    sourceLabel: "Small-diameter source"
  },
  {
    name: "Gold / Tan",
    color: "#b8891f",
    tissue: "Vascular / medium",
    stapleHeights: "2 / 2.5 / 3 mm",
    description:
      "Medtronic's curved-tip listing uses tan for vascular/medium tissue. The module labels this station Gold/Tan so learners can map local tray terminology to the manufacturer listing.",
    source: sourceLinks.curvedTip,
    sourceLabel: "Curved-tip source"
  }
];

const triStapleMatrix: TriStapleMatrixRow[] = [
  {
    name: "Gray",
    color: "#64748b",
    tissue: "Vascular",
    openHeights: "2.0 mm",
    closedHeights: "0.75 mm",
    indicatedRange: "0.75-1.0 mm",
    lengths: "30, 45 mm",
    application: "Thin vascular-style tissue models"
  },
  {
    name: "Tan",
    color: "#b8891f",
    tissue: "Vascular / medium",
    openHeights: "2.0, 2.5, 3.0 mm",
    closedHeights: "0.75, 1.0, 1.25 mm",
    indicatedRange: "0.88-1.8 mm",
    lengths: "30, 45, 60 mm",
    application: "Vascular-to-medium synthetic tissue stations"
  },
  {
    name: "Purple",
    color: "#6f2c91",
    tissue: "Medium / thick",
    openHeights: "3.0, 3.5, 4.0 mm",
    closedHeights: "1.25, 1.5, 1.75 mm",
    indicatedRange: "1.5-2.25 mm",
    lengths: "30, 45, 60 mm",
    application: "Medium-to-thick model recognition and selection"
  },
  {
    name: "Black",
    color: "#111827",
    tissue: "Extra thick",
    openHeights: "4.0, 4.5, 5.0 mm",
    closedHeights: "1.75, 2.0, 2.25 mm",
    indicatedRange: "2.25-3.0 mm",
    lengths: "45, 60 mm",
    application: "Extra-thick models and stop-to-confirm drills"
  }
];

const medtronicNzProductList: TriStapleProduct[] = [
  { name: "Signia™ Stapling System", category: "Smart stapling", summary: "Powered stapling platform listed in Medtronic NZ surgical stapling products.", href: sourceLinks.nzSignia },
  { name: "Endo GIA™ Reinforced Reload with Tri-Staple™ Technology", category: "Stapler reloads", summary: "Preloaded buttress/reinforcement reload family in purple and black options.", href: sourceLinks.nzReinforcedReload },
  { name: "Endo GIA™ Curved Tip Reload with Tri-Staple™ Technology", category: "Stapler reloads", summary: "Curved distal tip reloads for visibility and maneuverability around target tissue models.", href: sourceLinks.nzCurvedTipReload },
  { name: "Endo GIA™ Black Reload with Tri-Staple™ Technology", category: "Stapler reloads", summary: "Extra-thick reload option listed in 45 and 60 mm lengths.", href: sourceLinks.nzBlackReload },
  { name: "Endo GIA™ Radial Reload with Tri-Staple™ Technology", category: "Stapler reloads", summary: "Radial reload with 360-degree rotation and purple/black options.", href: sourceLinks.nzRadialReload },
  { name: "Endo GIA™ 30 mm Reload with Tri-Staple™ Technology", category: "Stapler reloads", summary: "Extra-short reload for confined-space simulation and reload recognition.", href: sourceLinks.nzReload30 },
  { name: "Laparoscopic Staplers", category: "Category page", summary: "Medtronic NZ listing for laparoscopic stapling systems and related products.", href: sourceLinks.nzLaparoscopicStaplers },
  { name: "Open Staplers", category: "Category page", summary: "Medtronic NZ listing for open stapling systems.", href: sourceLinks.nzOpenStaplers },
  { name: "Circular Staplers", category: "Category page", summary: "Medtronic NZ listing for circular stapling products.", href: sourceLinks.nzCircularStaplers },
  { name: "Skin Staplers", category: "Category page", summary: "Medtronic NZ listing for skin stapling products.", href: sourceLinks.nzSkinStaplers }
];

const triStapleFamilies: TriStapleFamily[] = [
  {
    name: "30 mm Reload",
    color: "#b8891f",
    summary: "Extra-short profile for constrained-space training; the Medtronic NZ page lists tan and purple Tri-Staple options plus a gray vascular reload that is not Tri-Staple technology.",
    href: sourceLinks.nzReload30,
    details: ["EGIA30AVM tan: 2, 2.5, 3 mm", "EGIA30AMT purple: 3, 3.5, 4 mm", "EGIA30CTAVM curved tip tan: 2, 2.5, 3 mm"]
  },
  {
    name: "Curved Tip Reload",
    color: "#6f2c91",
    summary: "Curved anvil tip family intended to improve visibility and maneuverability around target tissues and vessels.",
    href: sourceLinks.nzCurvedTipReload,
    details: ["Tan 30, 45, 60 mm vascular/medium options", "Purple 45 and 60 mm medium/thick options", "Gray 45 mm vascular option listed without Tri-Staple technology marker"]
  },
  {
    name: "Black Reload",
    color: "#111827",
    summary: "Extra-thick tissue family listed in 45 and 60 mm articulating lengths.",
    href: sourceLinks.nzBlackReload,
    details: ["EGIA45AXT black: 4, 4.5, 5 mm", "EGIA60AXT black: 4, 4.5, 5 mm", "Use as a simulation station for too-thick or abnormal-compression stop points"]
  },
  {
    name: "Radial Reload",
    color: "#0057a6",
    summary: "Radial reload family with 360-degree rotation and purple/black options for access-angle learning.",
    href: sourceLinks.nzRadialReload,
    details: ["EGIARADMT purple: 3, 3.5, 4 mm", "EGIARADXT black: 4, 4.5, 5 mm", "Use for coronal/sagittal access discussion in simulation"]
  },
  {
    name: "Reinforced Reload",
    color: "#e31b23",
    summary: "Preloaded reinforcement family compatible with manual and powered handles per Medtronic NZ product content.",
    href: sourceLinks.nzReinforcedReload,
    details: ["Purple 45 and 60 mm medium/thick reinforced options", "Black 45 and 60 mm extra-thick reinforced options", "Teach buttress recognition, packaging check, and faculty confirmation before use"]
  }
];

const simulationSteps = [
  "Confirm the session is simulation-only and open the current IFU or local quick-reference before handling the device.",
  "Identify the powered handle, power shell, linear adapter, jaws, firing controls, OLED/feedback screen, and manual recovery accessory.",
  "Select a reload card by tissue-model thickness, then verbalize why that selection fits or why faculty review is needed.",
  "Capture a marked synthetic target with both sides visible, pause for compression/feedback discussion, then complete the simulated firing sequence only after faculty confirmation.",
  "Open/release, inspect the staple line on the model, classify it as acceptable/questionable/unacceptable, and document practice attempts in the survey."
];

function pageFromHash(): Page {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (hash === "signia" || hash === "endostitch") return hash;
  if (hash === "tristaple" || hash === "tri-staple") return "triStaple";
  return "home";
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash());
  const [survey, setSurvey] = useState({ attempts: "", load: "Purple", confidence: "3", notes: "" });
  const [surveyLogs, setSurveyLogs] = useState<SurveyLog[]>(() => loadSurveyLogs());

  useEffect(() => {
    const sync = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(surveyStorageKey, JSON.stringify(surveyLogs));
  }, [surveyLogs]);

  const surveySummary = useMemo(() => {
    const attempts = Number(survey.attempts || 0);
    if (!attempts) return "Enter the number of practice runs, then submit to add it to the tracker.";
    return `${attempts} practice run${attempts === 1 ? "" : "s"} ready to submit with ${survey.load} as the primary reload focus.`;
  }, [survey.attempts, survey.load]);

  const surveyTotals = useMemo(() => {
    const totalAttempts = surveyLogs.reduce((sum, entry) => sum + entry.attempts, 0);
    const totalConfidence = surveyLogs.reduce((sum, entry) => sum + entry.confidence, 0);
    const averageConfidence = surveyLogs.length ? (totalConfidence / surveyLogs.length).toFixed(1) : "0.0";
    return { totalAttempts, totalSessions: surveyLogs.length, averageConfidence };
  }, [surveyLogs]);

  const submitSurvey = () => {
    const attempts = Number(survey.attempts || 0);
    if (!Number.isFinite(attempts) || attempts <= 0) return;

    const entry: SurveyLog = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      date: new Date().toISOString(),
      attempts,
      load: survey.load,
      confidence: Number(survey.confidence),
      notes: survey.notes.trim()
    };

    setSurveyLogs((current) => [entry, ...current]);
    setSurvey((current) => ({ ...current, attempts: "", notes: "" }));
  };

  const navigate = (next: Page) => {
    window.location.hash = next === "home" ? "home" : next;
  };

  return (
    <div className="min-h-screen bg-white text-[#101820]">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="h-1 bg-[#e31b23]" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button className="flex items-center gap-3 text-left" type="button" onClick={() => navigate("home")}>
            <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#0057a6] text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight">Medtronic Device LMS</span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Surgical education platform</span>
            </span>
          </button>
          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            <NavButton active={page === "home"} onClick={() => navigate("home")}>Home</NavButton>
            <NavButton active={page === "signia"} onClick={() => navigate("signia")}>Signia</NavButton>
            <NavButton active={page === "triStaple"} onClick={() => navigate("triStaple")}>Tri Staple</NavButton>
            <NavButton active={page === "endostitch"} onClick={() => navigate("endostitch")}>Endo Stitch</NavButton>
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "signia" && (
          <SigniaPage
            survey={survey}
            setSurvey={setSurvey}
            surveySummary={surveySummary}
            surveyLogs={surveyLogs}
            surveyTotals={surveyTotals}
            onSubmitSurvey={submitSurvey}
          />
        )}
        {page === "triStaple" && <TriStaplePage />}
        {page === "endostitch" && <EndoStitchPage />}
      </main>

      <footer className="border-t border-slate-200 bg-[#101820] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-200">
            Educational simulation curriculum only. Follow institutional policy, manufacturer IFU, and faculty supervision.
          </p>
          <a className="text-sm font-semibold text-white underline decoration-[#e31b23] underline-offset-4" href={sourceLinks.nzSurgicalStapling} target="_blank" rel="noreferrer">
            Medtronic NZ surgical stapling list
          </a>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button
      className={`rounded-sm px-3 py-2 text-sm font-semibold transition ${
        active ? "bg-[#0057a6] text-white" : "text-slate-700 hover:bg-slate-100 hover:text-[#0057a6]"
      }`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
        <div className="self-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">Simulation training microsite</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl lg:text-6xl">
            Learn to Safely Operate and Use Advanced Surgical Devices
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This educational platform is designed to help residents, surgeons, fellows, and operating room teams learn about the Medtronic Signia™ Stapling System, Tri-Staple™ reload families, and Endo Stitch™ devices through structured, interactive surgical education.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0057a6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004985]" type="button" onClick={() => onNavigate("signia")}>
              Signia <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#101820] shadow-sm transition hover:border-[#0057a6] hover:text-[#0057a6]" type="button" onClick={() => onNavigate("triStaple")}>
              Tri Staple <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#101820] shadow-sm transition hover:border-[#0057a6] hover:text-[#0057a6]" type="button" onClick={() => onNavigate("endostitch")}>
              Endo Stitch <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="border-l-4 border-[#e31b23] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Explore how these devices work, how to safely operate them, and how they are used in real surgical procedures through step-by-step learning modules, procedural demonstrations, safety guidance, troubleshooting resources, and expert instructional content.
            </div>
            <div className="border-l-4 border-[#0057a6] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              Built to support modern surgical training, competency development, and safer operative practice using Signia™ and Endo Stitch™ technologies. Educational simulation only. Follow institutional policy, manufacturer IFU, and faculty supervision.
            </div>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <FeatureList
              title="Learner outcomes"
              items={[
                "Device operation knowledge",
                "Surgical workflow understanding",
                "Safe handling techniques",
                "Cartridge and Tri-Staple reload selection skills",
                "Troubleshooting and technical awareness",
                "Procedural confidence",
                "Clinical decision-making skills",
                "Best practices for patient safety"
              ]}
            />
            <FeatureList
              title="Platform features"
              items={[
                "Interactive learning modules",
                "Surgical procedure walkthroughs",
                "Device setup and operation training",
                "Safety and error prevention education",
                "Video demonstrations and expert guidance",
                "Technical support resources",
                "Case-based learning and assessments",
                "Simulation-focused educational content"
              ]}
            />
          </div>
        </div>
        <div className="self-center">
          <div className="rounded-sm border border-slate-200 bg-slate-50 p-5 shadow-card">
            <div className="grid gap-4">
              <img
                src="/assets/signia-side-view.jpg"
                alt="Medtronic Signia powered stapler side view"
                className="aspect-[16/9] w-full rounded-sm bg-white object-contain"
              />
              <img
                src="/assets/endo-stitch.webp"
                alt="Medtronic Endo Stitch suturing device"
                className="aspect-[16/9] w-full rounded-sm bg-white object-contain"
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniMetric label="Pages" value="3" />
              <MiniMetric label="Videos" value="4" />
              <MiniMetric label="Mode" value="Sim" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SigniaPage({
  survey,
  setSurvey,
  surveySummary,
  surveyLogs,
  surveyTotals,
  onSubmitSurvey
}: {
  survey: { attempts: string; load: string; confidence: string; notes: string };
  setSurvey: React.Dispatch<React.SetStateAction<{ attempts: string; load: string; confidence: string; notes: string }>>;
  surveySummary: string;
  surveyLogs: SurveyLog[];
  surveyTotals: { totalAttempts: number; totalSessions: number; averageConfidence: string };
  onSubmitSurvey: () => void;
}) {
  return (
    <div className="bg-white">
      <PageHero
        eyebrow="Signia module"
        title="Signia powered stapler training"
        description="Organized around introduction to stapler use, controls, tissue thickness, videos, reload recognition, simulation instructions, and a quick practice survey."
        image="/assets/signia-side-view.jpg"
        imageAlt="Medtronic Signia powered stapler"
      />

      <Section id="intro" label="Introduction to Stapler Use" title="Build a shared mental model before practice">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoCard icon={<SlidersHorizontal className="h-5 w-5" />} title="Controls">
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Identify the powered handle, power shell, linear adapter, jaws, OLED display, and manual retraction tool.</li>
              <li>Discuss powered articulation, rotation, clamping, and feedback as simulation controls requiring faculty oversight.</li>
              <li>Use LED/OLED feedback as a pause-and-confirm cue, not permission to proceed automatically.</li>
            </ul>
          </InfoCard>
          <InfoCard icon={<Layers className="h-5 w-5" />} title="Tissue thickness">
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>Match reload color to synthetic tissue thickness using current IFU and local inventory labels.</li>
              <li>Practice recognizing when the tissue model looks too thin, too thick, twisted, or poorly visualized for the intended reload.</li>
              <li>Stop and verbalize the next step when feedback or compression behavior is unexpected.</li>
            </ul>
          </InfoCard>
          <InfoCard icon={<ShieldAlert className="h-5 w-5" />} title="Source guardrails">
            <p className="text-sm leading-6 text-slate-600">
              Medtronic notes that website material does not replace device manuals or IFU. This module stays educational and simulation-only.
            </p>
            <SourceLink href={sourceLinks.signia}>Open Signia product source</SourceLink>
          </InfoCard>
        </div>
      </Section>

      <Section id="video" label="Video" title="Watch, pause, then practice the sequence">
        <div className="grid gap-5 lg:grid-cols-2">
          {signiaVideos.map((video) => (
            <VideoCard key={video.videoId} {...video} />
          ))}
        </div>
      </Section>

      <Section id="loads" label="Stapler Loads" title="Reload recognition by color and tissue model">
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          These cards translate the program's requested color headings into a training station. Purple and Black map directly to Medtronic Tri-Staple 2.0 reload listings; White maps to Signia small-diameter reloads; Gold is shown as Gold/Tan to match the Medtronic tan curved-tip listing.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {reloads.map((reload) => (
            <ReloadTrainingCard key={reload.name} reload={reload} />
          ))}
        </div>
      </Section>

      <Section id="practice" label="Stapler Practice" title="Simulation instructions and quick survey">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-[#101820]">Simulation instructions</h3>
            <ol className="mt-5 space-y-4">
              {simulationSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0057a6] text-xs font-bold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <SurveyCard
            survey={survey}
            setSurvey={setSurvey}
            surveySummary={surveySummary}
            surveyLogs={surveyLogs}
            surveyTotals={surveyTotals}
            onSubmitSurvey={onSubmitSurvey}
          />
        </div>
      </Section>
    </div>
  );
}

function TriStaplePage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">Tri Staple module</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
              Tri-Staple™ reload selection and product map
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              A simulation-focused reload reference built from the uploaded Tri Staple reload document and the Medtronic NZ surgical stapling product listing. Learners use this page to recognize reload colors, tissue ranges, lengths, and product families before faculty-supervised practice.
            </p>
            <div className="mt-6 rounded-sm border-l-4 border-[#e31b23] bg-white p-4 text-sm leading-6 text-slate-700 shadow-card">
              Educational simulation only. Reload selection and device use must follow institutional policy, manufacturer IFU, and faculty supervision.
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <SourceLink href={sourceLinks.nzSurgicalStapling}>Open Medtronic NZ product list</SourceLink>
              <SourceLink href={sourceLinks.surgicalStapling}>Open Medtronic surgical stapling source</SourceLink>
            </div>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              {triStapleMatrix.map((reload) => (
                <ReloadIllustration key={reload.name} color={reload.color} textColor={reload.textColor} label={reload.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="tri-concepts" label="Core concepts" title="What Tri-Staple adds to reload training">
        <div className="grid gap-5 lg:grid-cols-4">
          <InfoCard title="Stepped cartridge face" icon={<Layers className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">The uploaded reload guide describes a stepped cartridge face. In simulation, learners use this as a visual cue to discuss tissue compression and reload orientation.</p>
          </InfoCard>
          <InfoCard title="Variable staple heights" icon={<SlidersHorizontal className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">Tri-Staple reloads use progressive staple-height rows. The teaching goal is matching color and height range to a validated synthetic tissue station.</p>
          </InfoCard>
          <InfoCard title="Fixed anvil" icon={<ClipboardCheck className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">The document lists a fixed anvil as a feature. Learners identify it and verbalize why instrument alignment matters before clamping.</p>
          </InfoCard>
          <InfoCard title="I-beam mechanism" icon={<ShieldAlert className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">The I-beam is taught as a device-design concept, not a reason to bypass visualization, compression checks, IFU review, or faculty stop points.</p>
          </InfoCard>
        </div>
      </Section>

      <Section id="tri-matrix" label="Reload matrix" title="Laparoscopic Tri-Staple reload colors">
        <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-bold">Color</th>
                  <th className="px-4 py-3 font-bold">Open heights</th>
                  <th className="px-4 py-3 font-bold">Closed heights</th>
                  <th className="px-4 py-3 font-bold">Indicated tissue range</th>
                  <th className="px-4 py-3 font-bold">Linear lengths</th>
                  <th className="px-4 py-3 font-bold">Training application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {triStapleMatrix.map((reload) => (
                  <tr key={reload.name} className="align-top">
                    <td className="px-4 py-4 font-semibold text-[#101820]">
                      <span className="mr-2 inline-block h-3 w-3 rounded-full align-middle" style={{ backgroundColor: reload.color }} />
                      {reload.name} <span className="block text-xs font-normal text-slate-500">{reload.tissue}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-700">{reload.openHeights}</td>
                    <td className="px-4 py-4 text-slate-700">{reload.closedHeights}</td>
                    <td className="px-4 py-4 text-slate-700">{reload.indicatedRange}</td>
                    <td className="px-4 py-4 text-slate-700">{reload.lengths}</td>
                    <td className="px-4 py-4 text-slate-700">{reload.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="tri-products" label="Medtronic NZ listing" title="All surgical stapling items from the product list">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {medtronicNzProductList.map((product) => (
            <article key={product.name} className="rounded-sm border border-slate-200 bg-white p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e31b23]">{product.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#101820]">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{product.summary}</p>
              <SourceLink href={product.href}>Open product page</SourceLink>
            </article>
          ))}
        </div>
      </Section>

      <Section id="tri-families" label="Tri-Staple families" title="Reload family details for simulation stations">
        <div className="grid gap-5 lg:grid-cols-2">
          {triStapleFamilies.map((family) => (
            <article key={family.name} className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-start gap-4">
                <span className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: family.color }} />
                <div>
                  <h3 className="text-xl font-semibold text-[#101820]">{family.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{family.summary}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {family.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0057a6]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <SourceLink href={family.href}>Open family source</SourceLink>
            </article>
          ))}
        </div>
      </Section>

      <Section id="tri-open" label="Open and circular reference" title="Additional Tri-Staple details from the uploaded guide">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-[#101820]">Tri-Staple™ GIA™ open stapling</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">The uploaded guide lists tan, purple, and black open GIA options with 60 and 80 mm linear lengths, seven reloads/eight total firings, and a new knife blade after every fire.</p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-sm bg-slate-50 p-3"><dt className="font-semibold text-slate-900">Tan</dt><dd className="mt-1 text-slate-600">2.4, 2.7, 3.0 mm open</dd></div>
              <div className="rounded-sm bg-slate-50 p-3"><dt className="font-semibold text-slate-900">Purple</dt><dd className="mt-1 text-slate-600">3.0, 3.5, 4.0 mm open</dd></div>
              <div className="rounded-sm bg-slate-50 p-3"><dt className="font-semibold text-slate-900">Black</dt><dd className="mt-1 text-slate-600">4.0, 4.5, 5.0 mm open</dd></div>
            </dl>
          </article>
          <article className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-[#101820]">Tri-Staple™ EEA™ circular stapling</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">The uploaded guide lists purple and black circular options in 21, 25, 28, 31, and 33 mm diameters with standard and XL shaft lengths.</p>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-sm bg-slate-50 p-3"><dt className="font-semibold text-slate-900">Purple</dt><dd className="mt-1 text-slate-600">1.5-2.25 mm indicated tissue range</dd></div>
              <div className="rounded-sm bg-slate-50 p-3"><dt className="font-semibold text-slate-900">Black</dt><dd className="mt-1 text-slate-600">2.25-3.0 mm indicated tissue range</dd></div>
            </dl>
          </article>
        </div>
      </Section>
    </div>
  );
}

function EndoStitchPage() {
  const endoModules = [
    {
      title: "1. Loading the Suture Cartridge",
      steps: [
        "Verify initial state: ensure the device jaws are completely open and the metal internal bars are fully extended.",
        "Orient the handle so the side with printed writing faces upward.",
        "Align the small alignment divot on the distal tip with the Endo Stitch™ Single-Stitch Reload cartridge.",
        "Push the tip firmly down into the cartridge until it snaps into place.",
        "Squeeze the handle tightly and slide the green/teal toggle levers backward to capture the needle.",
        "Lift the device straight up to snap off the plastic cartridge housing.",
        "Cycle the toggle lever forward and back in simulation to confirm the needle transitions smoothly across the jaws."
      ]
    },
    {
      title: "2. Surgical Insertion and Safety Positions",
      steps: [
        "Maintain the closed position whenever the device is not actively passing through tissue in the trainer.",
        "For trocar-entry simulation, keep the jaws tightly shut to avoid catching the sharp needle tips on tissue models.",
        "Avoid pulling or shifting the suture while jaws are open; this is taught as a jamming and needle-bending risk scenario.",
        "Stop the drill for lost visualization, uncontrolled needle position, resistance, or uncertain suture path."
      ]
    },
    {
      title: "3. Suturing Process",
      steps: [
        "Advance the toggle lever forward to open the jaws at the target tissue site; the needle sits in the jaw corresponding to lever direction.",
        "Position open jaws around the targeted soft tissue layer on the model and squeeze the handle completely to pierce it.",
        "With the handle fully compressed, activate the opposite toggle lever to release the needle from its current jaw and lock it into the opposing jaw.",
        "Relax grip to reopen the jaws, then draw the device back to pull the suture length through the simulated tissue structure."
      ]
    },
    {
      title: "4. Unloading and Changing the Needle",
      steps: [
        "Fully squeeze the handle closed and move the green/teal toggle levers to the middle index position to lock the internal prongs.",
        "Push the black release button or knob on the handle forward so the needle-retention prongs extend at the tip.",
        "Open the handle while keeping the prongs exposed to release the used needle safely into a sharps container during simulation cleanup.",
        "Document whether the learner used standard suture material or a barbed wound closure device such as V-Loc™ as part of the faculty debrief."
      ]
    }
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">Endo Stitch module</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
              Endo Stitch™ suturing device practice
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              The Medtronic Endo Stitch™ is an automated endoscopic suturing device operated by squeezing a handle to close its jaws and toggling a thumb lever to pass a proprietary double-pointed needle back and forth between those jaws.
            </p>
            <div className="mt-6 rounded-sm border-l-4 border-[#e31b23] bg-white p-4 text-sm leading-6 text-slate-700 shadow-card">
              Always verify device requirements against official Medtronic product documentation, current IFU, institutional policy, and faculty supervision.
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <SourceLink href={sourceLinks.endostitch}>Open Medtronic Endo Stitch source</SourceLink>
              <SourceLink href={sourceLinks.endostitchSingleReload}>Open Single-Stitch Reload source</SourceLink>
              <SourceLink href={sourceLinks.medtronicManuals}>Open Medtronic manual library</SourceLink>
            </div>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-card">
            <img
              src="/assets/endo-stitch.webp"
              alt="Medtronic Endo Stitch suturing device"
              className="aspect-[16/10] w-full object-contain"
            />
          </div>
        </div>
      </section>

      <Section id="endostitch-info" label="Product information" title="Device controls and training focus">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoCard title="Handle and jaws" icon={<ClipboardCheck className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              Squeezing the handle closes the jaws around the simulated tissue target. Learners practice complete closure, visual confirmation, and controlled release before timed drills.
            </p>
          </InfoCard>
          <InfoCard title="Thumb toggle" icon={<CheckCircle2 className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              The thumb lever passes the double-pointed needle between jaws. The training emphasis is smooth transition, needle visibility, and immediate pause for any partial transfer.
            </p>
          </InfoCard>
          <InfoCard title="Safety stop" icon={<ShieldAlert className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              Lost visualization, suture traction with open jaws, uncontrolled needle position, or resistance stops the station. Resume only with faculty direction.
            </p>
          </InfoCard>
        </div>
      </Section>

      <Section id="endostitch-video" label="Video" title="Endo Stitch videos">
        <div className="grid gap-5 lg:grid-cols-2">
          {endoVideos.map((video) => (
            <VideoCard key={video.videoId} {...video} />
          ))}
        </div>
      </Section>

      <Section id="endostitch-practice" label="Practice modules" title="Step-by-step simulation workflow">
        <div className="grid gap-5 lg:grid-cols-2">
          {endoModules.map((module) => (
            <article key={module.title} className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-xl font-semibold text-[#101820]">{module.title}</h3>
              <ol className="mt-5 space-y-4">
                {module.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0057a6] text-xs font-bold text-white">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function PageHero({ eyebrow, title, description, image, imageAlt }: { eyebrow: string; title: string; description: string; image: string; imageAlt: string }) {
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
        </div>
        <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-card">
          <img src={image} alt={imageAlt} className="aspect-[16/10] w-full object-contain" />
        </div>
      </div>
    </section>
  );
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">{label}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#101820]">{title}</h2>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

function InfoCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-sm bg-[#eaf3fb] text-[#0057a6]">{icon}</span>
        <h3 className="text-xl font-semibold text-[#101820]">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

function VideoCard({ title, videoId }: { title: string; videoId: string }) {
  return (
    <article className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-card">
      <div className="aspect-video bg-[#101820]">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="flex items-center gap-3 p-4">
        <PlayCircle className="h-5 w-5 text-[#e31b23]" />
        <p className="font-semibold text-[#101820]">{title}</p>
      </div>
    </article>
  );
}

function ReloadTrainingCard({ reload }: { reload: ReloadCard }) {
  return (
    <article className="rounded-sm border border-slate-200 bg-white p-5 shadow-card">
      <ReloadIllustration color={reload.color} textColor={reload.textColor} label={reload.name} />
      <h3 className="mt-5 text-xl font-semibold text-[#101820]">{reload.name}</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-slate-900">Tissue model</dt>
          <dd className="mt-1 text-slate-600">{reload.tissue}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Staple heights / format</dt>
          <dd className="mt-1 text-slate-600">{reload.stapleHeights}</dd>
        </div>
      </dl>
      <p className="mt-4 text-sm leading-6 text-slate-600">{reload.description}</p>
      <SourceLink href={reload.source}>{reload.sourceLabel}</SourceLink>
    </article>
  );
}

function ReloadIllustration({ color, textColor = "#ffffff", label }: { color: string; textColor?: string; label: string }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-slate-50 p-4" aria-label={`${label} reload visual`}>
      <div className="relative h-24 overflow-hidden rounded-sm bg-white">
        <div className="absolute left-4 top-7 h-10 w-[78%] rounded-sm border border-slate-300 bg-slate-100" />
        <div className="absolute left-5 top-8 h-8 w-[68%] rounded-sm" style={{ backgroundColor: color }} />
        <div className="absolute left-8 top-10 grid w-[58%] grid-cols-8 gap-1">
          {Array.from({ length: 16 }).map((_, index) => (
            <span key={index} className="h-1.5 rounded-full bg-white/75" />
          ))}
        </div>
        <div className="absolute right-4 top-6 h-12 w-9 skew-x-[-12deg] rounded-sm border border-slate-300 bg-slate-200" />
        <div className="absolute bottom-2 left-4 rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: color, color: textColor }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function SurveyCard({
  survey,
  setSurvey,
  surveySummary,
  surveyLogs,
  surveyTotals,
  onSubmitSurvey
}: {
  survey: { attempts: string; load: string; confidence: string; notes: string };
  setSurvey: React.Dispatch<React.SetStateAction<{ attempts: string; load: string; confidence: string; notes: string }>>;
  surveySummary: string;
  surveyLogs: SurveyLog[];
  surveyTotals: { totalAttempts: number; totalSessions: number; averageConfidence: string };
  onSubmitSurvey: () => void;
}) {
  const canSubmit = Number(survey.attempts || 0) > 0;

  return (
    <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 shadow-card">
      <h3 className="text-xl font-semibold text-[#101820]">Survey and practice tracker</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">Submit each practice session to save it locally and update the totals below.</p>
      <div className="mt-5 grid gap-4">
        <label className="text-sm font-semibold text-slate-900">
          How many practice runs occurred?
          <input
            className="mt-2 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0057a6]"
            min="0"
            type="number"
            value={survey.attempts}
            onChange={(event) => setSurvey((current) => ({ ...current, attempts: event.target.value }))}
          />
        </label>
        <label className="text-sm font-semibold text-slate-900">
          Primary reload practiced
          <select
            className="mt-2 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0057a6]"
            value={survey.load}
            onChange={(event) => setSurvey((current) => ({ ...current, load: event.target.value }))}
          >
            {reloads.map((reload) => (
              <option key={reload.name}>{reload.name}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-900">
          Confidence after practice: {survey.confidence}/5
          <input
            className="mt-2 w-full accent-[#0057a6]"
            max="5"
            min="1"
            type="range"
            value={survey.confidence}
            onChange={(event) => setSurvey((current) => ({ ...current, confidence: event.target.value }))}
          />
        </label>
        <label className="text-sm font-semibold text-slate-900">
          Notes for faculty debrief
          <textarea
            className="mt-2 min-h-24 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0057a6]"
            value={survey.notes}
            onChange={(event) => setSurvey((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Reload selection, visualization issue, feedback cue, or remediation item"
          />
        </label>
      </div>
      <div className="mt-5 rounded-sm border border-[#b9d7ef] bg-white p-4 text-sm font-semibold text-[#0057a6]">
        {surveySummary}
      </div>
      <button
        className="mt-4 w-full rounded-sm bg-[#0057a6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004985] disabled:cursor-not-allowed disabled:bg-slate-300"
        type="button"
        disabled={!canSubmit}
        onClick={onSubmitSurvey}
      >
        Submit practice session
      </button>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <PracticeMetric label="Total runs" value={String(surveyTotals.totalAttempts)} />
        <PracticeMetric label="Sessions" value={String(surveyTotals.totalSessions)} />
        <PracticeMetric label="Avg confidence" value={surveyTotals.averageConfidence} />
      </div>

      <div className="mt-6 rounded-sm border border-slate-200 bg-white p-4">
        <h4 className="font-semibold text-[#101820]">Previous submissions</h4>
        {surveyLogs.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">No previous survey submissions yet.</p>
        ) : (
          <ol className="mt-4 space-y-3">
            {surveyLogs.slice(0, 5).map((entry) => (
              <li key={entry.id} className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-[#101820]">
                  <span>{entry.attempts} run{entry.attempts === 1 ? "" : "s"} with {entry.load}</span>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
                <p className="mt-1 text-slate-600">Confidence {entry.confidence}/5{entry.notes ? ` - ${entry.notes}` : ""}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
function PracticeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#0057a6]">{value}</p>
    </div>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0057a6] hover:underline" href={href} target="_blank" rel="noreferrer">
      {children} <ExternalLink className="h-4 w-4" />
    </a>
  );
}

function FeatureList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-card">
      <h3 className="text-lg font-semibold text-[#101820]">{title}</h3>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0057a6]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#0057a6]">{value}</p>
    </div>
  );
}

export default App;
