import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects-data";

export function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(project)}
      whileHover={{ y: -4, boxShadow: "0 20px 45px -22px rgba(76, 29, 149, 0.28)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-violet-100/70 bg-white/80 p-6 text-left shadow-[0_1px_2px_rgba(76,29,149,0.06)] backdrop-blur"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-200/50 to-pink-200/40 blur-2xl transition group-hover:scale-110" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-violet-500">
            {project.client}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {project.projectName}
          </h3>
          {(project.industry || project.country) && (
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500">
              <Globe className="h-3 w-3" />
              {[project.industry, project.country].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        <ArrowUpRight className="h-4 w-4 text-violet-300 transition group-hover:text-violet-700" />
      </div>

      {project.successStoryReady && (
        <span className="relative inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-violet-200">
          <Sparkles className="h-3 w-3" /> Story ready
        </span>
      )}

      <div className="relative flex flex-wrap gap-1.5 pt-1">
        {project.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-100"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
