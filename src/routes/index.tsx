import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Plus, Search, Sparkles } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { initialProjects, type Project } from "@/lib/projects-data";

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

function Index() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.projectName.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.industry.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)),
    );
  }, [projects, query]);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-medium text-violet-700 shadow-[0_1px_2px_rgba(76,29,149,0.08)] backdrop-blur">
              <LayoutGrid className="h-3.5 w-3.5" />
              Project Vault
            </div>
            <h1 className="mt-4 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              Projects & Success Stories
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              Replace the spreadsheet. Find any project in seconds and craft
              polished copy for your website CMS.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:from-violet-700 hover:to-fuchsia-700"
          >
            <Plus className="h-4 w-4" /> New project
          </motion.button>
        </header>

        <div className="mt-10">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, client, industry, country or tech…"
              className="w-full rounded-2xl border border-violet-100 bg-white/80 py-3.5 pl-11 pr-4 text-sm shadow-[0_1px_2px_rgba(76,29,149,0.06)] outline-none backdrop-blur placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            />
          </div>
          <div className="mt-3 flex items-center justify-end">
            <span className="text-xs text-gray-400">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </span>
          </div>
        </div>

        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
          <div className="mt-10 rounded-2xl border border-dashed border-violet-200 bg-white/60 py-16 text-center backdrop-blur">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 text-violet-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700">
              {projects.length === 0
                ? "No projects yet"
                : "No projects match your search"}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {projects.length === 0
                ? "Click “New project” to add your first success story."
                : "Try a different keyword."}
            </p>
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
