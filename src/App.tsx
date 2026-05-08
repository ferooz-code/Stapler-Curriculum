import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers,
  MonitorCheck,
  RotateCcw,
  ShieldAlert,
  Target,
  Users
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
  coreModules,
  deviceCards,
  echelonModules,
  entrustmentLevels,
  exercises,
  facultyTemplate,
  facultyWorkflow,
  learnerLevels,
  metricTargets,
  navItems,
  onlineResources,
  quizBlueprint,
  resources,
  rubricDomains,
  safetyFailures,
  signiaConcepts,
  supervisionNote,
  trackerRows
} from "./data/curriculum";

const moduleIds = [
  ...coreModules.map((module) => module.code),
  ...echelonModules.map((module) => module.id),
  ...exercises.map((exercise) => exercise.id)
];

function App() {
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(["STAP-1", "echelon-loading", "exercise-a"])
  );

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
      { name: "Alex Sample", label: "Junior pathway", complete: 46 },
      { name: "Jordan Sample", label: "Senior pathway", complete: 68 },
      { name: "Morgan Fellow", label: "Fellow pathway", complete: 88 }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header navItems={navItems} completedCount={completedCount} totalCount={moduleIds.length} />
      <main>
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
                before primary OR device use.
              </p>
            </Card>
            <Card title="Competency Based" icon={<ClipboardCheck className="h-5 w-5" />}>
              <p className="text-sm leading-6 text-slate-600">
                Progression depends on quiz scores, checklist performance, global rating domains, objective
                metrics, and absence of critical safety failures.
              </p>
            </Card>
            <Card title="OR Readiness" icon={<ShieldAlert className="h-5 w-5" />}>
              <p className="text-sm leading-6 text-slate-600">
                Entrustment decisions combine observed simulation performance, remediation history, and faculty
                judgment under local supervision standards.
              </p>
            </Card>
          </div>
        </section>

        <section id="overview" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Curriculum overview"
              title="A spiral curriculum for stapler competency"
              description="The curriculum revisits device operation with increasing complexity: recognition, controlled simulation practice, troubleshooting, assessment, remediation, and entrustment."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {learnerLevels.map((level, index) => (
                <Card
                  key={level.title}
                  title={level.title}
                  eyebrow={level.subtitle}
                  icon={
                    index === 0 ? (
                      <GraduationCap className="h-5 w-5" />
                    ) : index === 1 ? (
                      <Target className="h-5 w-5" />
                    ) : (
                      <Users className="h-5 w-5" />
                    )
                  }
                >
                  <p className="text-sm leading-6 text-slate-600">{level.focus}</p>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-navy-900">Core Modules</h3>
                  <p className="mt-2 text-sm text-slate-600">Mark modules complete as learners progress locally.</p>
                </div>
                <p className="text-sm font-semibold text-clinical-700">{completionPercent}% local progress</p>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {coreModules.map((module) => (
                  <Card key={module.code} className="flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-bold text-safety-600">{module.code}</p>
                          <h4 className="mt-1 text-xl font-semibold text-navy-900">{module.name}</h4>
                          <p className="mt-1 text-sm text-slate-500">{module.audience}</p>
                        </div>
                        <CompletionButton
                          complete={completedIds.has(module.code)}
                          onClick={() => toggleComplete(module.code)}
                        />
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{module.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="devices" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Device modules"
              title="Two powered stapling platforms, taught as simulation workflows"
              description="Device content is framed as educational orientation and deliberate practice. Learners should always reconcile training steps with the current IFU, local inventory, and faculty guidance."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {deviceCards.map((device) => (
                <Card key={device.title} title={device.title} icon={<Layers className="h-5 w-5" />}>
                  <img
                    src={device.image}
                    alt={`${device.title} reference`}
                    className="aspect-[16/8] w-full rounded-md border border-slate-100 object-contain"
                  />
                  <p className="mt-3 text-sm text-slate-500">{device.caption}</p>
                  <ul className="mt-5 grid gap-2">
                    {device.points.map((point) => (
                      <li key={point} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-clinical-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="echelon" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.3fr]">
            <div>
              <SectionTitle
                eyebrow="ECHELON 3000 training"
                title="Stepwise simulation workflow"
                description="Modules are adapted from the uploaded optimized device performance guide and rewritten for simulation practice."
              />
              <div className="mt-8 grid gap-4">
                <img
                  src="/assets/echelon-angle.webp"
                  alt="ECHELON 3000 angled device for simulation reference"
                  className="rounded-lg border border-slate-200 bg-white object-contain p-3 shadow-card"
                />
                <img
                  src="/assets/echelon-marked.webp"
                  alt="ECHELON stapler image showing dynamic firing and anvil callouts"
                  className="rounded-lg border border-slate-200 bg-white object-contain p-3 shadow-card"
                />
              </div>
              <div className="mt-6 rounded-lg border border-safety-200 bg-safety-50 p-4 text-sm leading-6 text-safety-700">
                <AlertTriangle className="mb-2 h-5 w-5" aria-hidden="true" />
                {supervisionNote}
              </div>
            </div>
            <ModuleAccordion
              modules={echelonModules}
              completedIds={completedIds}
              onToggleComplete={toggleComplete}
            />
          </div>
        </section>

        <section id="signia" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Signia powered stapler concepts"
              title="Powered stapling comparison, without marketing claims"
              description="This section presents manufacturer-described concepts as simulation discussion points: adaptive firing, sensing, feedback, reloads, adapters, and ergonomics."
            />
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.2fr]">
              <div className="grid gap-5">
                <Card title="Signia system image" icon={<Activity className="h-5 w-5" />}>
                  <img
                    src="/assets/signia-side-view.jpg"
                    alt="Signia powered stapling system side view"
                    className="aspect-[16/9] w-full rounded-md border border-slate-100 object-contain"
                  />
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Use this visual to orient learners to the handle, shaft, jaws, adapters, and powered-control
                    concept before station practice.
                  </p>
                </Card>
                <Card tone="warning" title="Comparison guardrail" icon={<ShieldAlert className="h-5 w-5" />}>
                  <p className="text-sm leading-6 text-safety-700">
                    Discuss features as manufacturer-described concepts and simulation prompts. Do not imply
                    patient-care superiority or substitute this site for official device training.
                  </p>
                </Card>
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
        </section>

        <section id="exercises" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Simulation exercises"
              title="Deliberate practice stations"
              description="Each station has a defined objective and measurable output so faculty can coach, reassess, and document progression."
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

        <section id="assessment" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Assessment tools"
              title="Checklist, rubric, quiz, metrics, and entrustment"
              description="Assessment combines binary behaviors, global ratings, knowledge checks, objective metrics, critical safety failures, and entrustment decisions."
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

        <section id="tracker" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Curriculum tracker"
              title="Interactive demo tracker table"
              description="Sample data mirrors the uploaded tracker fields: session log, quiz score, checklist score, rubric average, safety failures, objective metrics, remediation, and entrustment."
            />
            <div className="mt-10">
              <TrackerTable rows={trackerRows} />
            </div>
          </div>
        </section>

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

        <section id="resources" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Resources"
              title="Quick links for learners and faculty"
              description="Download local curriculum artifacts, jump to printable sections, and open selected manufacturer resources and videos."
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
