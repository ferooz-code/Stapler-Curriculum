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
              <span className="block text-base font-semibold tracking-tight">Medtronic Device LMS</span>
              <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">Surgical education platform</span>
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
            Learn to Safely Operate and Use Advanced Surgical Devices
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This educational platform is designed to help residents, surgeons, fellows, and operating room teams learn about the Medtronic Signia™ Stapling System and Endo Stitch™ devices through structured, interactive surgical education.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#0057a6] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004985]" type="button" onClick={() => onNavigate("signia")}>
              Signia <ArrowRight className="h-4 w-4" />
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
                "Cartridge and reload selection skills",
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
              <MiniMetric label="Pages" value="2" />
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
