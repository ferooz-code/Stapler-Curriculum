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

type Page = "home" | "signia" | "endostitch";

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

const sourceLinks = {
  surgicalStapling: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling.html",
  signia: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/surgical-staplers/powered-staplers/signia-linear-stapler-with-tri-staple-technology.html",
  reload30: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-30-mm-reload.html",
  purpleReload: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-purple-reload.html",
  blackReload: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-black-reload.html",
  smallDiameter: "https://www.medtronic.com/en-us/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/signia-small-diameter-reload.html",
  curvedTip: "https://www.medtronic.com/en-ca/healthcare-professionals/products/surgical-stapling/stapler-reloads-loading-units/tri-staple-2-0-curved-tip-reload.html",
  endostitch: "https://www.medtronic.com/en-us/healthcare-professionals/products/access-instruments/endoscopic-devices/endo-stitch-suturing-device.html"
};

const signiaVideos = [
  { title: "Signia overview video", videoId: "ALg2o9fWQe0" },
  { title: "Signia firing video", videoId: "nHngeFrMgjw" }
];

const endoVideos = [{ title: "Endo Stitch supplemental video", videoId: "4lIzVLi9wpE" }];

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
  return hash === "signia" || hash === "endostitch" ? hash : "home";
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromHash());
  const [survey, setSurvey] = useState({ attempts: "", load: "Purple", confidence: "3", notes: "" });

  useEffect(() => {
    const sync = () => {
      setPage(pageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const surveySummary = useMemo(() => {
    const attempts = Number(survey.attempts || 0);
    if (!attempts) return "No practice attempts logged yet.";
    return `${attempts} practice run${attempts === 1 ? "" : "s"} logged with ${survey.load} as the primary reload focus.`;
  }, [survey.attempts, survey.load]);

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
              <span className="block text-base font-semibold tracking-tight">StapleSkills</span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Medtronic device lab</span>
            </span>
          </button>
          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            <NavButton active={page === "home"} onClick={() => navigate("home")}>Home</NavButton>
            <NavButton active={page === "signia"} onClick={() => navigate("signia")}>Signia</NavButton>
            <NavButton active={page === "endostitch"} onClick={() => navigate("endostitch")}>Endo Stitch</NavButton>
          </nav>
        </div>
      </header>

      <main>
        {page === "home" && <HomePage onNavigate={navigate} />}
        {page === "signia" && (
          <SigniaPage survey={survey} setSurvey={setSurvey} surveySummary={surveySummary} />
        )}
        {page === "endostitch" && <EndoStitchPage />}
      </main>

      <footer className="border-t border-slate-200 bg-[#101820] px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-200">
            Educational simulation curriculum only. Follow institutional policy, manufacturer IFU, and faculty supervision.
          </p>
          <a className="text-sm font-semibold text-white underline decoration-[#e31b23] underline-offset-4" href={sourceLinks.surgicalStapling} target="_blank" rel="noreferrer">
            Medtronic surgical stapling source
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
            Medtronic stapling and suturing device practice
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A cleaner device lab for residents and fellows: choose Signia Powered Stapler or Endo Stitch, review product-focused training content, watch the embedded videos, and log practice in a brief local survey.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0057a6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004985]" type="button" onClick={() => onNavigate("signia")}>
              Signia <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#101820] shadow-sm transition hover:border-[#0057a6] hover:text-[#0057a6]" type="button" onClick={() => onNavigate("endostitch")}>
              Endo Stitch <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-8 border-l-4 border-[#e31b23] bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            Device training is simulation-only. It does not replace manufacturer IFU, institutional policy, credentialing, or supervised clinical judgment.
          </div>
        </div>
        <div className="self-center">
          <div className="rounded-sm border border-slate-200 bg-slate-50 p-5 shadow-card">
            <img
              src="/assets/signia-side-view.jpg"
              alt="Medtronic Signia powered stapler side view"
              className="aspect-[4/3] w-full rounded-sm bg-white object-contain"
            />
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MiniMetric label="Pages" value="2" />
              <MiniMetric label="Videos" value="3" />
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
  surveySummary
}: {
  survey: { attempts: string; load: string; confidence: string; notes: string };
  setSurvey: React.Dispatch<React.SetStateAction<{ attempts: string; load: string; confidence: string; notes: string }>>;
  surveySummary: string;
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
          <SurveyCard survey={survey} setSurvey={setSurvey} surveySummary={surveySummary} />
        </div>
      </Section>
    </div>
  );
}

function EndoStitchPage() {
  const steps = [
    "Identify the 10 mm device, handle, shaft, jaws, needle position, suture tail, and reload type on the dry trainer.",
    "Practice air transfers first so the learner can see needle movement between jaws without tissue.",
    "Move to marked synthetic tissue only after controlled visualization and stable needle transfer are demonstrated.",
    "Stop immediately for lost needle visualization, partial capture, uncontrolled needle position, tissue tearing, or crossed suture.",
    "Document practice attempts and faculty feedback before moving to another station."
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e31b23]">Endo Stitch module</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-[#101820] sm:text-5xl">
            Endo Stitch suturing device practice
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A focused simulation page for device recognition, needle-transfer practice, stitch-pattern drills, safety stop rules, and the embedded Endo Stitch video.
          </p>
        </div>
      </section>

      <Section id="endostitch-info" label="Product information" title="What learners identify before practice">
        <div className="grid gap-5 lg:grid-cols-3">
          <InfoCard title="Device orientation" icon={<ClipboardCheck className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              Use the dry trainer to identify the handle, shaft, jaws, needle transfer path, suture tail, and reload count before any tissue-model work.
            </p>
          </InfoCard>
          <InfoCard title="Simulation focus" icon={<CheckCircle2 className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              Practice controlled visualization, symmetric bites, suture tension, and immediate communication when the needle or tissue path is not clear.
            </p>
          </InfoCard>
          <InfoCard title="Safety stop" icon={<ShieldAlert className="h-5 w-5" />}>
            <p className="text-sm leading-6 text-slate-600">
              Lost visualization or uncontrolled needle position stops the station. Resume only with faculty direction and current IFU/local policy.
            </p>
            <SourceLink href={sourceLinks.endostitch}>Open Endo Stitch source</SourceLink>
          </InfoCard>
        </div>
      </Section>

      <Section id="endostitch-video" label="Video" title="Endo Stitch supplemental video">
        <div className="max-w-3xl">
          {endoVideos.map((video) => (
            <VideoCard key={video.videoId} {...video} />
          ))}
        </div>
      </Section>

      <Section id="endostitch-practice" label="Practice" title="Needle-transfer simulation sequence">
        <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-card">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#0057a6] text-xs font-bold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
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
  surveySummary
}: {
  survey: { attempts: string; load: string; confidence: string; notes: string };
  setSurvey: React.Dispatch<React.SetStateAction<{ attempts: string; load: string; confidence: string; notes: string }>>;
  surveySummary: string;
}) {
  return (
    <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 shadow-card">
      <h3 className="text-xl font-semibold text-[#101820]">Survey</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">Quick local practice log for the current learner. No backend is used.</p>
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

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#0057a6]">{value}</p>
    </div>
  );
}

export default App;
