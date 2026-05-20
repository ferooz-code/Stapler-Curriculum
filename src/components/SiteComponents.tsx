import { useMemo, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Filter,
  Menu,
  Printer,
  Search,
  X
} from "lucide-react";
import type { MetricTarget, TrackerRow, TrainingModule } from "../data/curriculum";
import { supervisionNote } from "../data/curriculum";

type NavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems: NavItem[];
  completedCount: number;
  totalCount: number;
};

export function Header({ navItems, completedCount, totalCount }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900 text-white shadow-lg shadow-slate-900/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white text-navy-900">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-wide">StapleSkills</p>
            <p className="truncate text-xs text-slate-300">Medtronic Device Curriculum</p>
          </div>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-md px-2 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white xl:px-3"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-w-40 2xl:block">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span>Local progress</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-white/15">
            <div className="h-2 rounded-full bg-clinical-500" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <button
          className="rounded-md border border-white/20 p-2 text-white lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-navy-800 px-4 py-3 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-safety-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-normal text-navy-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>}
    </div>
  );
}

type CardProps = {
  title?: string;
  eyebrow?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "default" | "warning" | "navy";
};

export function Card({ title, eyebrow, icon, children, className = "", tone = "default" }: CardProps) {
  const toneClass =
    tone === "warning"
      ? "border-safety-100 bg-safety-50"
      : tone === "navy"
        ? "border-navy-800 bg-navy-900 text-white"
        : "border-slate-200 bg-white";

  return (
    <article className={`rounded-lg border ${toneClass} p-6 shadow-card ${className}`}>
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ${
              tone === "navy" ? "bg-white/10 text-white" : "bg-navy-50 text-navy-800"
            }`}
          >
            {icon}
          </div>
        )}
        {(title || eyebrow) && (
          <div className="min-w-0">
            {eyebrow && (
              <p
                className={`text-xs font-bold uppercase tracking-[0.16em] ${
                  tone === "navy" ? "text-clinical-100" : "text-safety-600"
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h3 className={`mt-1 text-xl font-semibold ${tone === "navy" ? "text-white" : "text-navy-900"}`}>
                {title}
              </h3>
            )}
          </div>
        )}
      </div>
      <div className={title || eyebrow || icon ? "mt-5" : ""}>{children}</div>
    </article>
  );
}

type HeroProps = {
  onPrimaryClick?: () => void;
};

export function Hero({ onPrimaryClick }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-safety-600">
            StapleSkills Medtronic Curriculum
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-navy-900 sm:text-5xl lg:text-6xl">
            Medtronic Device Simulation Curriculum
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Tabbed simulation training for Medtronic Signia Powered Stapler and Endo Stitch using
            deliberate practice, objective assessment, and faculty-supervised progression.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex items-center justify-center rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-700"
              href="#overview"
              onClick={onPrimaryClick}
            >
              Open Device Tabs
            </a>
            <a
              className="inline-flex items-center justify-center rounded-md border border-navy-200 bg-white px-5 py-3 text-sm font-semibold text-navy-800 shadow-sm transition hover:bg-navy-50"
              href="#signia"
            >
              Start Training
            </a>
            <a
              className="inline-flex items-center justify-center rounded-md border border-clinical-100 bg-clinical-50 px-5 py-3 text-sm font-semibold text-clinical-700 shadow-sm transition hover:bg-clinical-100"
              href="#tracker"
            >
              Open Tracker
            </a>
          </div>
          <div className="mt-8 rounded-lg border border-safety-100 bg-safety-50 p-4 text-sm leading-6 text-safety-700">
            <strong>Simulation guardrail:</strong> {supervisionNote}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
            <img
              src="/assets/signia-side-view.jpg"
              alt="Medtronic Signia powered stapler used as simulation curriculum hero visual"
              className="aspect-[4/3] w-full rounded-md object-contain"
            />
            <p className="mt-3 text-sm text-slate-500">Medtronic Signia simulation reference image for device orientation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type CompletionButtonProps = {
  complete: boolean;
  onClick: () => void;
};

export function CompletionButton({ complete, onClick }: CompletionButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition ${
        complete
          ? "border-clinical-100 bg-clinical-50 text-clinical-700"
          : "border-slate-200 bg-white text-navy-800 hover:border-navy-200 hover:bg-navy-50"
      }`}
      type="button"
      onClick={onClick}
    >
      <Check className="h-4 w-4" aria-hidden="true" />
      {complete ? "Complete" : "Mark Complete"}
    </button>
  );
}

type ModuleAccordionProps = {
  modules: TrainingModule[];
  completedIds: Set<string>;
  onToggleComplete: (id: string) => void;
};

export function ModuleAccordion({ modules, completedIds, onToggleComplete }: ModuleAccordionProps) {
  const [openId, setOpenId] = useState(modules[0]?.id ?? "");

  return (
    <div className="grid gap-4">
      {modules.map((module) => {
        const isOpen = openId === module.id;
        const isComplete = completedIds.has(module.id);
        return (
          <article
            key={module.id}
            className={`rounded-lg border ${
              module.warning ? "border-safety-200 bg-safety-50" : "border-slate-200 bg-white"
            } shadow-card`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenId(isOpen ? "" : module.id)}
            >
              <span>
                <span className="flex items-center gap-2 text-lg font-semibold text-navy-900">
                  {module.warning && <AlertTriangle className="h-5 w-5 text-safety-600" aria-hidden="true" />}
                  {module.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{module.summary}</span>
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-slate-200 px-5 py-5">
                <ol className="grid gap-3">
                  {module.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-navy-800 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">{supervisionNote}</p>
                  <CompletionButton complete={isComplete} onClick={() => onToggleComplete(module.id)} />
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

type AssessmentTabsProps = {
  checklistItems: string[];
  rubricDomains: string[];
  quizBlueprint: string[];
  safetyFailures: string[];
  metricTargets: MetricTarget[];
  entrustmentLevels: string[];
};

const tabs = ["Checklist", "Rubric", "Quiz", "Objective Metrics", "Entrustment"] as const;

export function AssessmentTabs({
  checklistItems,
  rubricDomains,
  quizBlueprint,
  safetyFailures,
  metricTargets,
  entrustmentLevels
}: AssessmentTabsProps) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Checklist");

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-card">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Assessment tools">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                active === tab ? "bg-navy-800 text-white" : "bg-slate-100 text-slate-700 hover:bg-navy-50"
              }`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-slate-50"
          onClick={() => window.print()}
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print Checklist / Rubric
        </button>
      </div>
      <div className="p-5 sm:p-6">
        {active === "Checklist" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {checklistItems.map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
              >
                <input className="mt-1 h-4 w-4 accent-navy-800" type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        )}

        {active === "Rubric" && (
          <div className="grid gap-5">
            <div className="grid gap-3 sm:grid-cols-3">
              {["1 Novice", "3 Competent", "5 Advanced"].map((label) => (
                <div key={label} className="rounded-md border border-navy-100 bg-navy-50 p-4">
                  <p className="text-lg font-semibold text-navy-900">{label}</p>
                  <p className="mt-1 text-sm text-slate-600">Use anchor language during faculty calibration.</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {rubricDomains.map((domain) => (
                <div key={domain} className="rounded-md border border-slate-200 p-4">
                  <p className="font-semibold text-navy-900">{domain}</p>
                  <div className="mt-3 grid grid-cols-5 gap-1" aria-label={`${domain} rating scale`}>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        className="rounded-md bg-slate-100 py-2 text-xs font-bold text-slate-700 hover:bg-navy-100"
                        type="button"
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <SafetyFailureCards safetyFailures={safetyFailures} />
          </div>
        )}

        {active === "Quiz" && (
          <div className="grid gap-4">
            <p className="text-sm leading-6 text-slate-600">
              Suggested format: 10 multiple-choice or short-answer items. Recommended pass score is 80%;
              assign remediation and repeat quiz when below threshold.
            </p>
            {quizBlueprint.map((item, index) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-safety-600">Question {index + 1}</p>
                <p className="mt-1 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        )}

        {active === "Objective Metrics" && <MetricsTable metricTargets={metricTargets} />}

        {active === "Entrustment" && (
          <div className="grid gap-3">
            {entrustmentLevels.map((level, index) => (
              <div key={level} className="flex gap-4 rounded-md border border-slate-200 p-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-navy-800 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="self-center text-sm font-medium text-slate-700">{level}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SafetyFailureCards({ safetyFailures }: { safetyFailures: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {safetyFailures.map((failure) => (
        <div key={failure} className="rounded-md border border-safety-200 bg-safety-50 p-4">
          <AlertTriangle className="h-5 w-5 text-safety-600" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold leading-6 text-safety-700">{failure}</p>
        </div>
      ))}
    </div>
  );
}

function MetricsTable({ metricTargets }: { metricTargets: MetricTarget[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-[780px] w-full border-collapse text-left text-sm">
        <thead className="bg-navy-800 text-white">
          <tr>
            <th className="px-4 py-3 font-semibold">Target</th>
            <th className="px-4 py-3 font-semibold">Device / Reload ID</th>
            <th className="px-4 py-3 font-semibold">Station time</th>
            <th className="px-4 py-3 font-semibold">Target / Bite Accuracy</th>
            <th className="px-4 py-3 font-semibold">Feedback / Transfer Success</th>
            <th className="px-4 py-3 font-semibold">Missed Stop Rules</th>
            <th className="px-4 py-3 font-semibold">Acceptable Completion</th>
          </tr>
        </thead>
        <tbody>
          {metricTargets.map((row) => (
            <tr key={row.level} className="border-t border-slate-200 even:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-navy-900">{row.level}</td>
              <td className="px-4 py-3">{row.componentIdentification}</td>
              <td className="px-4 py-3">{row.time}</td>
              <td className="px-4 py-3">{row.deviation}</td>
              <td className="px-4 py-3">{row.wedgeSuccess}</td>
              <td className="px-4 py-3">{row.safetyErrors}</td>
              <td className="px-4 py-3">{row.acceptableLineRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type DashboardMetricProps = {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "warning" | "success";
};

export function DashboardMetric({ label, value, helper, tone = "default" }: DashboardMetricProps) {
  const toneClass =
    tone === "warning"
      ? "border-safety-200 bg-safety-50 text-safety-700"
      : tone === "success"
        ? "border-clinical-100 bg-clinical-50 text-clinical-700"
        : "border-slate-200 bg-white text-navy-900";

  return (
    <div className={`rounded-lg border p-5 shadow-card ${toneClass}`}>
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      {helper && <p className="mt-2 text-sm text-slate-500">{helper}</p>}
    </div>
  );
}

type TrackerTableProps = {
  rows: TrackerRow[];
};

export function TrackerTable({ rows }: TrackerTableProps) {
  const [moduleFilter, setModuleFilter] = useState("All");
  const [pgyFilter, setPgyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const modules = useMemo(() => ["All", ...Array.from(new Set(rows.map((row) => row.moduleCode)))], [rows]);
  const pgyLevels = useMemo(() => ["All", ...Array.from(new Set(rows.map((row) => row.pgyLevel)))], [rows]);
  const statuses = ["All", "Pass", "Needs Remediation"];

  const filteredRows = rows.filter((row) => {
    const matchesModule = moduleFilter === "All" || row.moduleCode === moduleFilter;
    const matchesPgy = pgyFilter === "All" || row.pgyLevel === pgyFilter;
    const matchesStatus = statusFilter === "All" || row.passStatus === statusFilter;
    const haystack = `${row.name} ${row.traineeId} ${row.moduleName} ${row.comments}`.toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    return matchesModule && matchesPgy && matchesStatus && matchesSearch;
  });

  const totals = useMemo(() => {
    const count = rows.length || 1;
    const averageQuiz = Math.round(rows.reduce((sum, row) => sum + row.quizScore, 0) / count);
    const averageChecklist = Math.round(
      rows.reduce((sum, row) => sum + (row.checklistScore / row.checklistMax) * 100, 0) / count
    );
    const remediation = rows.filter((row) => row.passStatus === "Needs Remediation").length;
    const ready = rows.filter((row) => row.entrustmentLevel === "Level 4" || row.entrustmentLevel === "Level 5").length;
    return { averageQuiz, averageChecklist, remediation, ready };
  }, [rows]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <DashboardMetric label="Total Sessions" value={String(rows.length)} helper="Sample data" />
        <DashboardMetric label="Average Quiz Score" value={`${totals.averageQuiz}%`} />
        <DashboardMetric label="Average Checklist Score" value={`${totals.averageChecklist}%`} />
        <DashboardMetric
          label="Trainees Needing Remediation"
          value={String(totals.remediation)}
          tone={totals.remediation > 0 ? "warning" : "success"}
        />
        <DashboardMetric label="Entrustment Ready" value={String(totals.ready)} tone="success" />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-card">
        <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-md border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none ring-navy-200 transition focus:border-navy-400 focus:ring-4"
              placeholder="Search trainee, module, comments"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <FilterSelect label="Module" value={moduleFilter} onChange={setModuleFilter} options={modules} />
          <FilterSelect label="PGY Level" value={pgyFilter} onChange={setPgyFilter} options={pgyLevels} />
          <FilterSelect label="Pass Status" value={statusFilter} onChange={setStatusFilter} options={statuses} />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-[1400px] w-full border-collapse text-left text-sm">
            <thead className="bg-navy-800 text-white">
              <tr>
                {[
                  "Date",
                  "Trainee ID",
                  "Name",
                  "Role",
                  "PGY Level",
                  "Module Code",
                  "Module Name",
                  "Faculty Assessor",
                  "Quiz Score",
                  "Checklist Score",
                  "Checklist Max",
                  "Rubric Avg",
                  "Critical Safety Failures",
                  "Metric 1 Name",
                  "Metric 1 Value",
                  "Metric 2 Name",
                  "Metric 2 Value",
                  "Pass / Needs Remediation",
                  "Entrustment Level",
                  "Comments"
                ].map((head) => (
                  <th key={head} className="px-4 py-3 font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={`${row.date}-${row.traineeId}-${row.moduleCode}`} className="border-t border-slate-200 even:bg-slate-50">
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3 font-medium text-navy-900">{row.traineeId}</td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.role}</td>
                  <td className="px-4 py-3">{row.pgyLevel}</td>
                  <td className="px-4 py-3 font-semibold text-navy-900">{row.moduleCode}</td>
                  <td className="px-4 py-3">{row.moduleName}</td>
                  <td className="px-4 py-3">{row.facultyAssessor}</td>
                  <td className="px-4 py-3">{row.quizScore}%</td>
                  <td className="px-4 py-3">{row.checklistScore}</td>
                  <td className="px-4 py-3">{row.checklistMax}</td>
                  <td className="px-4 py-3">{row.rubricAvg.toFixed(1)}</td>
                  <td className="px-4 py-3">{row.criticalSafetyFailures}</td>
                  <td className="px-4 py-3">{row.metric1Name}</td>
                  <td className="px-4 py-3">{row.metric1Value}</td>
                  <td className="px-4 py-3">{row.metric2Name}</td>
                  <td className="px-4 py-3">{row.metric2Value}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-bold ${
                        row.passStatus === "Pass"
                          ? "bg-clinical-50 text-clinical-700"
                          : "bg-safety-50 text-safety-700"
                      }`}
                    >
                      {row.passStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.entrustmentLevel}</td>
                  <td className="px-4 py-3">{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
          Showing {filteredRows.length} of {rows.length} sample sessions.
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        <Filter className="h-3 w-3" aria-hidden="true" />
        {label}
      </span>
      <select
        className="w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm outline-none ring-navy-200 transition focus:border-navy-400 focus:ring-4"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type CalendarTimelineProps = {
  items: readonly (readonly [string, string])[];
};

export function CalendarTimeline({ items }: CalendarTimelineProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map(([month, activity], index) => (
        <div key={month} className="relative rounded-lg border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy-800 text-sm font-bold text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-lg font-semibold text-navy-900">{month}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{activity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ResourceCard({
  title,
  description,
  href,
  type
}: {
  title: string;
  description: string;
  href: string;
  type: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      className="group flex h-full flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-navy-200 hover:shadow-lg"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-md bg-navy-50 px-2 py-1 text-xs font-bold text-navy-800">{type}</span>
          {external ? (
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-navy-800" />
          ) : (
            <Download className="h-4 w-4 text-slate-400 group-hover:text-navy-800" />
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-navy-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <span className="mt-5 text-sm font-semibold text-navy-800">
        {external ? "Open resource" : "Open / download"}
      </span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-900 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">StapleSkills Medtronic Device Curriculum</p>
          <p className="mt-1 text-sm text-slate-300">
            Educational simulation curriculum for Medtronic Signia and Endo Stitch. Follow local policy, manufacturer IFU, and faculty supervision.
          </p>
        </div>
        <a className="text-sm font-semibold text-clinical-100 hover:text-white" href="#home">
          Back to top
        </a>
      </div>
    </footer>
  );
}
