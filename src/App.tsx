import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Layers,
  MonitorCheck,
  RotateCcw,
  ShieldAlert,
  Target
} from "lucide-react";
import {
  AssessmentTabs,
  CalendarTimeline,
  Card,
  CompletionButton,
  Footer,
  Header,
  Hero,
  ModuleAccordion,
  ResourceCard,
  SectionTitle,
  TrackerTable
} from "./components/SiteComponents";
import {
  calendarItems,
  checklistItems,
  entrustmentLevels,
  exercises,
  facultyTemplate,
  facultyWorkflow,
  medtronicSafetyNotes,
  medtronicSigniaModules,
  signiaDeviceFacts,
  signiaInstructionFocus,
  endoStitchModules,
  endoStitchCompetencyFocus,
  endoStitchDeviceFacts,
  endoStitchReloadOptions,
  metricTargets,
  navItems,
  onlineResources,
  quizBlueprint,
  resources,
  rubricDomains,
  safetyFailures,
  signiaConcepts,
  trackerRows
} from "./data/curriculum";

const moduleIds = [
  ...medtronicSigniaModules.map((module) => module.id),
  ...endoStitchModules.map((module) => module.id),
  ...exercises.map((exercise) => exercise.id)
];

const pageIds = [
  "home",
  "overview",
  "signia",
  "endostitch",
  "exercises",
  "assessment",
  "tracker",
  "calendar",
  "faculty",
  "resources"
] as const;

type PageId = (typeof pageIds)[number];

function getPageFromHash(): PageId {
  if (typeof window === "undefined") {
    return "home";
  }

  const hash = window.location.hash.replace("#", "").toLowerCase();
  return pageIds.includes(hash as PageId) ? (hash as PageId) : "home";
}

function YouTubeEmbed({ title, videoId }: { title: string; videoId: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card">
      <div className="aspect-video w-full bg-navy-950">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <p className="font-semibold text-navy-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Supplemental simulation video. Confirm all device handling against the current manufacturer IFU,
          institutional policy, and faculty supervision.
        </p>
      </div>
    </div>
  );
}

function SafetyNotePanel({ notes }: { notes: string[] }) {
  return (
    <div className="mt-8 grid gap-4 rounded-lg border border-safety-200 bg-safety-50 p-5 lg:grid-cols-2">
      {notes.map((note) => (
        <div key={note} className="flex gap-2 text-sm leading-6 text-safety-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {note}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(["signia-platform-orientation", "endostitch-orientation", "exercise-signia-setup"])
  );
  const [activePage, setActivePage] = useState<PageId>(() => getPageFromHash());

  useEffect(() => {
    const syncPageFromHash = () => {
      setActivePage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    syncPageFromHash();
    window.addEventListener("hashchange", syncPageFromHash);
    return () => window.removeEventListener("hashchange", syncPageFromHash);
  }, []);

  const toggleComplete = (id: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedCount = moduleIds.filter((id) => completedIds.has(id)).length;
  const completionPercent = Math.round((completedCount / moduleIds.length) * 100);

  const traineeProgress = useMemo(
    () => [
      { name: "Alex Sample", label: "Signia pathway", complete: 48 },
      { name: "Jordan Sample", label: "Endo Stitch pathway", complete: 64 },
      { name: "Morgan Faculty Fellow", label: "Combined device pathway", complete: 86 }
    ],
    []
  );

  const signiaSafetyNotes = medtronicSafetyNotes.filter((note) => !note.startsWith("For Endo Stitch"));
  const endoSafetyNotes = medtronicSafetyNotes.filter(
    (note) => note.startsWith("Simulation only") || note.startsWith("For Endo Stitch")
  );

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header
        navItems={navItems}
        completedCount={completedCount}
        totalCount={moduleIds.length}
        activeHref={`#${activePage}`}
      />
      <main className="min-h-[calc(100vh-160px)]">
        {activePage === "home" && (
          <>
            <Hero />
            <section className="border-y border-slate-200 bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-safety-600">
                    Local progress summary
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-navy-900">
                    {completedCount} of {moduleIds.length} learning items complete
                  </h2>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
                    <div className="h-full rounded-full bg-clinical-500" style={{ width: `${completionPercent}%` }} />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {traineeProgress.map((trainee) => (
                    <div key={trainee.name} className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-navy-900">{trainee.name}</p>
                          <p className="text-xs text-slate-500">{trainee.label}</p>
                        </div>
                        <span className="text-sm font-bold text-clinical-700">{trainee.complete}%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-clinical-500" style={{ width: `${trainee.complete}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
                <Card title="Simulation First" icon={<MonitorCheck className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Learners build baseline competency in dry lab, box trainer, and synthetic tissue stations
                    before supervised clinical device exposure.
                  </p>
                </Card>
                <Card title="Competency Based" icon={<ClipboardCheck className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Progression is tracked separately for Signia Powered Stapler and Endo Stitch using checklist scores,
                    quiz results, objective metrics, and safety stop rules.
                  </p>
                </Card>
                <Card title="OR Readiness" icon={<ShieldAlert className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Entrustment decisions remain device-specific and combine observed simulation performance,
                    remediation history, and faculty judgment.
                  </p>
                </Card>
              </div>
            </section>
          </>
        )}

        {activePage === "overview" && (
          <section id="overview" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Curriculum overview"
                title="Focused pages for each Medtronic device pathway"
                description="Use the top navigation to open a single focused page at a time. Signia and Endo Stitch now have separate pages with their own instructions, safety rules, exercises, assessment tools, and tracker links."
              />
              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <Card title="Signia Powered Stapler" icon={<Layers className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Setup, powered controls, adaptive firing concepts, feedback interpretation, troubleshooting, and two Signia video panels.
                  </p>
                  <a className="mt-5 inline-flex rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700" href="#signia">
                    Open Signia Page
                  </a>
                </Card>
                <Card title="Endo Stitch Suturing Device" icon={<ClipboardCheck className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Device orientation, reload awareness, needle transfer, interrupted and running stitch drills, written safety stop rules, and a supplemental Endo Stitch video.
                  </p>
                  <a className="mt-5 inline-flex rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700" href="#endostitch">
                    Open Endo Stitch Page
                  </a>
                </Card>
                <Card title="Assess and Track" icon={<BarChart3 className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-slate-600">
                    Use the assessment page, tracker, annual calendar, and faculty guide as separate workspace pages after device practice.
                  </p>
                  <a className="mt-5 inline-flex rounded-md bg-clinical-600 px-4 py-2 text-sm font-semibold text-white hover:bg-clinical-700" href="#tracker">
                    Open Tracker
                  </a>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activePage === "signia" && (
          <section id="signia" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Signia page"
                title="Signia Powered Stapler simulation training"
                description="A dedicated Signia page for device orientation, powered stapling concepts, step-by-step simulation modules, safety guardrails, and embedded Signia videos."
              />
              <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.25fr]">
                <div className="grid gap-5">
                  <Card title="Signia Powered Stapler" icon={<Layers className="h-5 w-5" />}>
                    <img
                      src="/assets/signia-side-view.jpg"
                      alt="Medtronic Signia powered stapler side view"
                      className="aspect-[16/9] w-full rounded-md border border-slate-100 object-contain"
                    />
                    <dl className="mt-5 grid gap-3">
                      {signiaDeviceFacts.map((fact) => (
                        <div key={fact.label} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                          <dt className="text-sm font-bold uppercase tracking-[0.12em] text-safety-600">{fact.label}</dt>
                          <dd className="mt-2 text-sm leading-6 text-slate-700">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                  <Card tone="warning" title="Signia safety guardrails" icon={<ShieldAlert className="h-5 w-5" />}>
                    <ul className="grid gap-2">
                      {signiaInstructionFocus.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6 text-safety-700">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="grid gap-6">
                  <div>
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-navy-900">Signia step-by-step instructions</h3>
                        <p className="mt-2 text-sm text-slate-600">Open each accordion for the full simulation sequence and mark it complete as the learner progresses.</p>
                      </div>
                      <span className="text-sm font-semibold text-clinical-700">{medtronicSigniaModules.length} modules</span>
                    </div>
                    <ModuleAccordion
                      modules={medtronicSigniaModules}
                      completedIds={completedIds}
                      onToggleComplete={toggleComplete}
                    />
                  </div>
                  <div className="grid gap-5 xl:grid-cols-2">
                    <YouTubeEmbed title="Signia Powered Stapler overview video" videoId="ALg2o9fWQe0" />
                    <YouTubeEmbed title="Signia Powered Stapler firing video" videoId="nHngeFrMgjw" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {signiaConcepts.map((concept) => (
                      <Card key={concept.title} title={concept.title}>
                        <p className="text-sm leading-6 text-slate-600">{concept.text}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
              <SafetyNotePanel notes={signiaSafetyNotes} />
            </div>
          </section>
        )}

        {activePage === "endostitch" && (
          <section id="endostitch" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Endo Stitch page"
                title="Endo Stitch suturing device simulation training"
                description="A dedicated Endo Stitch page for device information, reload awareness, needle transfer, stitch-pattern drills, error recognition, and faculty-supervised safety stop rules."
              />
              <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.25fr]">
                <div className="grid gap-5">
                  <Card title="Endo Stitch device information" icon={<ClipboardCheck className="h-5 w-5" />}>
                    <dl className="grid gap-3">
                      {endoStitchDeviceFacts.map((fact) => (
                        <div key={fact.label} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                          <dt className="text-sm font-bold uppercase tracking-[0.12em] text-safety-600">{fact.label}</dt>
                          <dd className="mt-2 text-sm leading-6 text-slate-700">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                  <Card title="Reload and compatibility awareness" icon={<Layers className="h-5 w-5" />}>
                    <div className="grid gap-3">
                      {endoStitchReloadOptions.map((option) => (
                        <div key={option.title} className="rounded-md border border-slate-200 p-4">
                          <p className="font-semibold text-navy-900">{option.title}</p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{option.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card tone="warning" title="Endo Stitch safety stop rules" icon={<AlertTriangle className="h-5 w-5" />}>
                    <ul className="grid gap-2">
                      {endoStitchCompetencyFocus.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-6 text-safety-700">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
                <div className="grid gap-6">
                  <div>
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-navy-900">Endo Stitch step-by-step instructions</h3>
                        <p className="mt-2 text-sm text-slate-600">Open each accordion for the full device orientation, needle-transfer, stitch-pattern, and rescue sequence.</p>
                      </div>
                      <span className="text-sm font-semibold text-clinical-700">{endoStitchModules.length} modules</span>
                    </div>
                    <ModuleAccordion
                      modules={endoStitchModules}
                      completedIds={completedIds}
                      onToggleComplete={toggleComplete}
                    />
                  </div>
                  <YouTubeEmbed title="Endo Stitch supplemental video" videoId="4lIzVLi9wpE" />
                </div>
              </div>
              <SafetyNotePanel notes={endoSafetyNotes} />
            </div>
          </section>
        )}

        {activePage === "exercises" && (
          <section id="exercises" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Device simulation exercises"
                title="Signia and Endo Stitch deliberate practice stations"
                description="Each station maps to either the Signia Powered Stapler page or the Endo Stitch page so faculty can coach, reassess, and document device-specific progression."
              />
              <div className="mt-10 grid gap-5 lg:grid-cols-2">
                {exercises.map((exercise) => (
                  <Card key={exercise.id} title={exercise.title} icon={<Target className="h-5 w-5" />}>
                    <p className="text-sm font-semibold text-navy-900">Objective</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{exercise.objective}</p>
                    <p className="mt-5 text-sm font-semibold text-navy-900">Metrics</p>
                    <ul className="mt-2 grid gap-2">
                      {exercise.metrics.map((metric) => (
                        <li key={metric} className="flex gap-2 text-sm text-slate-700">
                          <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-clinical-500" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <CompletionButton
                        complete={completedIds.has(exercise.id)}
                        onClick={() => toggleComplete(exercise.id)}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activePage === "assessment" && (
          <section id="assessment" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Assessment tools"
                title="Checklist, rubric, quiz, metrics, and entrustment"
                description="Assessment is device-specific: Signia powered stapling and Endo Stitch suturing each use checklist behaviors, global ratings, objective metrics, safety failures, and entrustment decisions."
              />
              <div className="mt-10">
                <AssessmentTabs
                  checklistItems={checklistItems}
                  rubricDomains={rubricDomains}
                  quizBlueprint={quizBlueprint}
                  safetyFailures={safetyFailures}
                  metricTargets={metricTargets}
                  entrustmentLevels={entrustmentLevels}
                />
              </div>
            </div>
          </section>
        )}

        {activePage === "tracker" && (
          <section id="tracker" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Curriculum tracker"
                title="Medtronic device tracker table"
                description="Sample data tracks Signia and Endo Stitch sessions with quiz score, checklist score, rubric average, safety failures, objective metrics, remediation, and entrustment."
              />
              <div className="mt-10">
                <TrackerTable rows={trackerRows} />
              </div>
            </div>
          </section>
        )}

        {activePage === "calendar" && (
          <section id="calendar" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Annual calendar"
                title="Twelve-month implementation timeline"
                description="A practical annual rhythm for formal simulation, optional open lab, quiz/prework, and quarterly faculty review."
              />
              <div className="mt-10">
                <CalendarTimeline items={calendarItems} />
              </div>
            </div>
          </section>
        )}

        {activePage === "faculty" && (
          <section id="faculty" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Faculty guide"
                title="Session template and assessment workflow"
                description="Faculty use the same structure across levels so expectations, scoring, remediation, and entrustment stay consistent."
              />
              <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                <Card title="Standard Session Template" icon={<CalendarDays className="h-5 w-5" />}>
                  <ol className="grid gap-3">
                    {facultyTemplate.map((item, index) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-navy-800 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </Card>
                <div className="grid gap-5 md:grid-cols-3">
                  {Object.entries(facultyWorkflow).map(([phase, items]) => (
                    <Card key={phase} title={phase} icon={<RotateCcw className="h-5 w-5" />}>
                      <ul className="grid gap-2">
                        {items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-clinical-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activePage === "resources" && (
          <section id="resources" className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Resources"
                title="Quick links for learners and faculty"
                description="Open Medtronic Signia and Endo Stitch source links, printable assessment sections, device calendar, and Signia in-service videos."
              />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {resources.map((resource) => (
                  <ResourceCard key={resource.title} {...resource} />
                ))}
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-navy-900">Online resources and videos</h3>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  {onlineResources.map((resource) => (
                    <ResourceCard
                      key={resource.href}
                      title={resource.title}
                      description="External resource. Confirm details against the current IFU and institutional device education program."
                      href={resource.href}
                      type="External"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
