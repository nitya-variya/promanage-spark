import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownAZ,
  ArrowUpZA,
  ChevronDown,
  Code2,
  LayoutGrid,
  Moon,
  Plus,
  Search,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { NewProjectForm } from "@/components/projects/NewProjectForm";
import { initialProjects, type Project } from "@/lib/projects-data";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/tanstack-react-start";

const STORAGE_KEY = "promanage-projects";

function loadProjects(): Project[] {
  if (typeof window === "undefined") return initialProjects;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Project[];
  } catch {
    // corrupted data — fall back to defaults
  }
  return initialProjects;
}

/** Simple tween transition — much cheaper than spring physics */
const cardTransition = { duration: 0.2, ease: "easeOut" } as const;

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

type SortMode = "default" | "a-z" | "z-a";

function Index() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<SortMode>("default");
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();

  // Sync projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  // Close tech dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (techDropdownRef.current && !techDropdownRef.current.contains(e.target as Node)) {
        setTechDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Collect all unique tech stack values across projects
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    let result = projects;

    // Search filter
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.projectName.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Tech stack filter (must include ALL selected technologies)
    if (techFilter.length > 0) {
      result = result.filter((p) => {
        const lowerStack = p.techStack.map((t) => t.toLowerCase());
        return techFilter.every((tf) => lowerStack.includes(tf.toLowerCase()));
      });
    }

    // Sorting
    if (sortBy === "a-z") {
      result = [...result].sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === "z-a") {
      result = [...result].sort((a, b) => b.projectName.localeCompare(a.projectName));
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, query, sortBy, techFilter.join()]);

  const handleDelete = useCallback((id: string) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === id);
      if (project) {
        toast.error(`Project "${project.projectName}" deleted successfully!`, {
          description: "The project has been removed from your list.",
        });
      }
      return prev.filter((p) => p.id !== id);
    });
  }, []);

  const handleOpen = useCallback((p: Project) => setSelected(p), []);
  const handleCloseDetail = useCallback(() => setSelected(null), []);
  const handleOpenCreate = useCallback(() => setCreating(true), []);
  const handleCloseCreate = useCallback(() => {
    setCreating(false);
    setEditing(null);
  }, []);
  const handleCreate = useCallback((p: Project) => setProjects((prev) => [p, ...prev]), []);

  const handleEdit = useCallback((p: Project) => {
    setEditing(p);
    setCreating(true);
  }, []);

  const handleUpdate = useCallback((updated: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }, []);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-500/30 bg-white/80 dark:bg-black/40 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300 shadow-[0_1px_2px_rgba(76,29,149,0.08)]">
              <LayoutGrid className="h-3.5 w-3.5" />
              Project Vault
            </div>
            <h1 className="mt-4 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
              Projects & Success Stories
            </h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              Replace the spreadsheet. Find any project in seconds and craft polished copy for your
              website CMS.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="inline-flex items-center gap-1.5 self-start rounded-xl border border-violet-200 dark:border-violet-500/30 bg-white/80 dark:bg-gray-900/60 px-4 py-2.5 text-sm font-medium text-violet-700 dark:text-violet-300 shadow-sm transition-all duration-150 hover:border-violet-400 dark:hover:border-violet-400 hover:shadow-md active:scale-[0.97] cursor-pointer">
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center gap-1.5 self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-150 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.97] cursor-pointer">
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <button
                className="inline-flex items-center gap-1.5 self-start rounded-xl bg-black dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-black shadow-lg shadow-black-500/30 transition-transform duration-150 hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.97] cursor-pointer"
                onClick={() => dispatch(toggleTheme())}
              >
                {themeMode === "light" ? (
                  <Moon className="h-4 w-4 text-white dark:text-black" />
                ) : (
                  <Sun className="h-4 w-4 text-white dark:text-black" />
                )}
                {themeMode === "light" ? "Dark Mode" : "Light Mode"}
              </button>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-150 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.97] cursor-pointer"
              >
                <Plus className="h-4 w-4" /> New project
              </button>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </Show>
          </div>
        </header>

        <div className="mt-10">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/5 h-4 w-4 translate-y-1/2 text-black-400 dark:text-white-500 z-10" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project, client, industry, country or tech…"
              className="w-full rounded-2xl border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/80 py-3.5 pl-11 pr-4 text-sm dark:text-gray-200 shadow-[0_1px_2px_rgba(76,29,149,0.06)] outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-400 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/50"
            />
          </div>

          {/* Sorting controls */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Sort:
            </span>

            {/* A-Z button */}
            <button
              onClick={() => setSortBy(sortBy === "a-z" ? "default" : "a-z")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                sortBy === "a-z"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                  : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"
              }`}
            >
              <ArrowDownAZ className="h-3.5 w-3.5" />A → Z
            </button>

            {/* Z-A button */}
            <button
              onClick={() => setSortBy(sortBy === "z-a" ? "default" : "z-a")}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                sortBy === "z-a"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                  : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"
              }`}
            >
              <ArrowUpZA className="h-3.5 w-3.5" />Z → A
            </button>

            {/* Divider */}
            <div className="mx-1 h-5 w-px bg-violet-100 dark:bg-violet-500/20" />

            {/* Tech stack dropdown (multi-select) */}
            <div className="relative" ref={techDropdownRef}>
              <button
                onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${
                  techFilter.length > 0
                    ? "bg-violet-600 text-white shadow-md shadow-violet-500/25"
                    : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                {techFilter.length === 0
                  ? "Technology"
                  : techFilter.length === 1
                    ? techFilter[0]
                    : `${techFilter.length} selected`}
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${techDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {techDropdownOpen && (
                <div className="absolute left-0 top-full z-30 mt-1.5 max-h-56 w-52 overflow-y-auto rounded-xl border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900 p-1.5 shadow-xl shadow-violet-500/10">
                  {allTechs.map((tech) => {
                    const isSelected = techFilter.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          setTechFilter((prev) =>
                            isSelected ? prev.filter((t) => t !== tech) : [...prev, tech],
                          );
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors duration-100 cursor-pointer ${
                          isSelected
                            ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                            : "text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            isSelected
                              ? "border-violet-600 bg-violet-600 text-white"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && (
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6l2.5 2.5 4.5-5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        {tech}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clear all filters */}
            {(sortBy !== "default" || techFilter.length > 0) && (
              <button
                onClick={() => {
                  setSortBy("default");
                  setTechFilter([]);
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 cursor-pointer"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}

            {/* Results count — pushed to end */}
            <span className="ml-auto text-xs text-gray-400">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </span>
          </div>
        </div>

        {/* Removed `layout` from grid — eliminates expensive FLIP calculations on every render */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={cardTransition}
              >
                <ProjectCard
                  project={p}
                  onOpen={handleOpen}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-violet-200 dark:border-violet-500/30 bg-white/60 dark:bg-black/20 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/50 dark:to-pink-900/50 text-violet-600 dark:text-violet-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              {projects.length === 0 ? "No projects yet" : "No projects match your search"}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {projects.length === 0
                ? 'Click "New project" to add your first success story.'
                : "Try a different keyword."}
            </p>
          </div>
        )}
      </div>

      <ProjectDetailModal project={selected} onClose={handleCloseDetail} />
      <NewProjectForm
        open={creating}
        onClose={handleCloseCreate}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editProject={editing}
      />
    </main>
  );
}
