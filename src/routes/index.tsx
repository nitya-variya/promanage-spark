import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Plus, Search } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { initialProjects, type Project, type ProjectStatus } from "@/lib/projects-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Vault — Success Story Manager" },
      {
        name: "description",
        content:
          "Internal manager for tracking client projects and generating polished success stories.",
      },
    ],
  }),
  component: Index,
});

const FILTERS: ("All" | ProjectStatus)[] = [
  "All",
  "Completed",
  "In Progress",
  "Planned",
];

function Index() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        p.projectName.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, query, filter]);

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
              <LayoutGrid className="h-3.5 w-3.5" />
              Project Vault
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Projects & Success Stories
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Replace the spreadsheet. Find any project in seconds and generate
              clean copy for your website CMS.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
          >
            <Plus className="h-4 w-4" /> New project
          </motion.button>
        </header>

        <div className="mt-10 flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, client, or tech stack…"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white py-3.5 pl-11 pr-4 text-sm shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                    active ? "text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-gray-900"
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
            <span className="ml-auto self-center text-xs text-gray-400">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </span>
          </div>
        </div>

        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 26,
                  delay: i * 0.04,
                }}
              >
                <ProjectCard project={p} onOpen={setSelected} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed border-[#E5E7EB] bg-white py-16 text-center">
            <p className="text-sm text-gray-500">No projects match your filters.</p>
          </div>
        )}
      </div>

      <ProjectDetailModal project={selected} onClose={() => setSelected(null)} />
      <NewProjectForm
        open={creating}
        onClose={() => setCreating(false)}
        onCreate={(p) => setProjects((prev) => [p, ...prev])}
      />
    </main>
  );
}
