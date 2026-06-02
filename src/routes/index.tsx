import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
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
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
  useUser,
  SignOutButton,
} from "@clerk/tanstack-react-start";
import Userdetail from "@/components/projects/Userdetail";

const STORAGE_KEY = "promanage-projects";

function loadProjects(): Project[] {
  // We no longer load from localStorage to ensure security.
  // Data will only be populated from Google Sheets after auth.
  return [];
}

/** Simple tween transition — much cheaper than spring physics */
const cardTransition = { duration: 0.2, ease: "easeOut" } as const;

const fetchSecureProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return { success: false, error: "Unauthorized access: Please log in." };
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const apiToken = process.env.INTERNAL_API_TOKEN;

  if (!scriptUrl) return { success: false, error: "Server misconfiguration" };

  try {
    // SECURE FIX: Fetch the user directly from Clerk's backend using their trusted userId
    const user = await clerkClient().users.getUser(userId);
    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return {
        success: false,
        error: "Unauthorized access: No email associated with your account.",
      };
    }

    console.log("Server function securely fetched email for user:", userEmail);

    const url = new URL(scriptUrl);
    url.searchParams.append("email", userEmail);
    if (apiToken) url.searchParams.append("token", apiToken);

    const res = await fetch(url.toString());
    const json = await res.json();
    return json;
  } catch (err: any) {
    console.error("Fetch error:", err);
    return { success: false, error: `Server Error: ${err.message || "Failed to fetch"}` };
  }
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Project Vault - Success Story Manager" },
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<SortMode>("default");
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [techDropdownOpen, setTechDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  const { user, isLoaded, isSignedIn } = useUser();

  // Sync projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  // Fetch from Google Apps Script if URL is provided
  useEffect(() => {
    // Wait until clerk auth is loaded and user is signed in to fetch private data
    if (!isLoaded || !isSignedIn || !user) return;

    const fetchFromSheet = async () => {
      try {
        // No longer sending email from the client to prevent spoofing
        const json = await fetchSecureProjects();

        // Handle the wrapped json response from Apps Script
        const data = json.success !== undefined ? json.data : json;

        if (json.success === false) {
          console.error("Unauthorized access to sheet data:", json.error);
          setAuthError(json.error);
          setIsInitialLoading(false);
          return;
        }

        setAuthError(null);

        if (Array.isArray(data) && data.length > 0) {
          const formattedData = data.map((item: any, index: number) => {
            const parseArray = (val: any) => {
              if (Array.isArray(val)) return val;
              if (typeof val === "string")
                return val
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean);
              return [];
            };

            return {
              id: item.id || `sheet-${index}`,
              // Map Responsible PM to client since the UI expects a client field
              client: item["Responsible PM"] || item.client || item.Client || "Internal",
              projectName: item["Project name"] || item.projectName || item["Project Name"] || "",
              status:
                item["Approved By Management"]?.toString().toLowerCase() === "yes"
                  ? "Completed"
                  : "In Progress",
              techStack: parseArray(item["TechStack"] || item.techStack || item["Tech Stack"]),
              services: parseArray(item["Services"] || item.services),
              deliverables: parseArray(
                item["Key Features Delivered (Short Bullet Points)"] ||
                  item.deliverables ||
                  item.Deliverables,
              ),
              challenges:
                item["Project Goal / Objective"] || item.challenges || item.Challenges || "",
              conclusion:
                item["StakeHolders/ Target Users"] || item.conclusion || item.Conclusion || "",
              timeDuration: item.timeDuration || item["Time Duration"] || "",
              country: item["Country"] || item.country || "",
              industry: item["Domain / Industry"] || item.industry || item.Industry || "",
              domain: item["Domain / Industry"] || item.domain || item.Domain || "",
              projectLink:
                item["Project Links (Staging / Prod)"] ||
                item.projectLink ||
                item["Project Link"] ||
                "",
              successStoryReady:
                item["should focus: yes or no"]?.toString().toLowerCase().includes("yes") ||
                item.successStoryReady === "TRUE" ||
                item.successStoryReady === true,
            };
          });
          setProjects(formattedData);
        }
      } catch (err) {
        console.error("Failed to fetch from Google Sheets", err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchFromSheet();

    // Polling every 5 seconds for live sync
    const interval = setInterval(fetchFromSheet, 5000);
    return () => clearInterval(interval);
  }, [isLoaded, isSignedIn, user]);

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

  // Reset page when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy, techFilter]);

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

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
        <div className="w-full max-w-md rounded-3xl border border-violet-100 bg-white p-8 text-center shadow-2xl shadow-violet-500/10 dark:border-violet-500/20 dark:bg-gray-900 sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-300">
            <LayoutGrid className="h-8 w-8" />
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 bg-clip-text text-3xl font-bold text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400">
            Project Vault
          </h1>
          <p className="mb-8 text-sm text-gray-600 dark:text-gray-400">
            Secure internal dashboard. Please log in with your authorized email to view the
            portfolio.
          </p>
          <SignInButton mode="modal">
            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-150 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.97]">
              Secure Login
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  if (authError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black p-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white/95 p-8 text-center shadow-2xl shadow-red-500/20 backdrop-blur-xl dark:border-red-900/50 dark:bg-gray-900/95 sm:p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">
            <X className="h-8 w-8" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-red-600 dark:text-red-400">Access Denied</h1>
          <p className="mb-8 text-sm text-gray-700 dark:text-gray-300">{authError}</p>
          <p className="mb-8 text-xs text-gray-500 dark:text-gray-500">
            You are currently logged in as <br />
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </p>
          <SignOutButton>
            <button className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:bg-black active:scale-[0.97] dark:bg-white dark:text-black dark:hover:bg-gray-200">
              Sign out & switch account
            </button>
          </SignOutButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Userdetail />
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
            <p className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              Replace the spreadsheet. Find any project in seconds and craft polished copy for your
              website CMS.
            </p>
          </div>
          <div className="flex items-center gap-3">
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

        <div className="relative mt-6 min-h-[400px]">
          {/* OVERLAY FOR LOADING */}
          {isInitialLoading && (
            <div className="absolute inset-0 z-20 flex flex-col items-start justify-start pt-10 sm:items-center sm:pt-20">
              <div className="flex flex-col items-center rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-xl dark:bg-gray-900/90 border border-violet-100 dark:border-violet-900/50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-violet-900/50 dark:border-t-violet-400"></div>
                <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
                  Verifying secure access...
                </p>
              </div>
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <div
            className={
              isInitialLoading
                ? "select-none opacity-30 blur-md pointer-events-none transition-all duration-500"
                : "transition-all duration-500"
            }
          >
            {isInitialLoading ? (
              // FAKE SKELETON GRID TO BLUR
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col gap-4"
                  >
                    <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-4 w-1/2 rounded-md bg-gray-100 dark:bg-gray-800/50"></div>
                    <div className="mt-auto flex gap-2">
                      <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                      <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filtered
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((p) => (
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

                {/* Pagination Controls */}
                {filtered.length > itemsPerPage && (
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-violet-200 dark:border-violet-500/30 bg-white dark:bg-gray-900 text-violet-700 dark:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors shadow-sm"
                    >
                      Previous
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Page {currentPage} of {Math.ceil(filtered.length / itemsPerPage)}
                    </div>
                    <button
                      onClick={() =>
                        setCurrentPage((p) =>
                          Math.min(Math.ceil(filtered.length / itemsPerPage), p + 1),
                        )
                      }
                      disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
                      className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-violet-200 dark:border-violet-500/30 bg-white dark:bg-gray-900 text-violet-700 dark:text-violet-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                )}

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
                        ? "Check your Google Sheet."
                        : "Try a different keyword."}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
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
