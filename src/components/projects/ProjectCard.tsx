import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects-data";

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  "In Progress": "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Planned: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
};

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
      whileHover={{ y: -4, boxShadow: "0 18px 40px -18px rgba(16,24,40,0.18)" }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            {project.client}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-gray-900">
            {project.projectName}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 text-gray-300 transition group-hover:text-gray-900" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
        {project.successStoryReady && (
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 ring-1 ring-violet-100">
            <Sparkles className="h-3 w-3" /> Story ready
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {project.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
