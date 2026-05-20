import { memo, useState } from "react";
import { ArrowUpRight, Globe, Pencil, Sparkles, Trash2 } from "lucide-react";
import type { Project } from "@/lib/projects-data";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const ProjectCard = memo(function ProjectCard({
  project,
  onOpen,
  onDelete,
  onEdit,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  onDelete: (id: string) => void;
  onEdit: (p: Project) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      {/* Replaced motion.button with a plain button + CSS transitions.
          Eliminates per-card spring physics & FLIP layout calculations. */}
      <button
        onClick={() => onOpen(project)}
        className="group w-full h-full relative flex flex-col gap-4 overflow-hidden cursor-pointer rounded-2xl border border-violet-100/70 dark:border-violet-500/20 bg-white/80 dark:bg-black/40 p-6 text-left shadow-[0_1px_2px_rgba(76,29,149,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_-22px_rgba(76,29,149,0.28)] active:scale-[0.99]"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-200/50 to-pink-200/40 blur-2xl transition-transform duration-300 group-hover:scale-110" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-violet-500 dark:text-violet-400">
              {project.client}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {project.projectName}
            </h3>
            {(project.industry || project.country) && (
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Globe className="h-3 w-3" />
                {[project.industry, project.country].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onEdit(project);
                }
              }}
              className="rounded-lg p-1.5 text-black-300 opacity-0 transition-all hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 group-hover:opacity-100 cursor-pointer"
              title="Edit project"
            >
              <Pencil className="h-4 w-4" />
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  setShowConfirm(true);
                }
              }}
              className="rounded-lg p-1.5 text-black-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 group-hover:opacity-100 cursor-pointer"
              title="Delete project"
            >
              <Trash2 className="h-4 w-4" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-black-300 transition group-hover:text-violet-700" />
          </div>
        </div>

        {project.successStoryReady && (
          <span className="relative inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/50 dark:to-pink-900/50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300 ring-1 ring-violet-200 dark:ring-violet-500/30">
            <Sparkles className="h-3 w-3" /> Story ready
          </span>
        )}

        <div className="relative flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-100 dark:ring-violet-500/30"
            >
              {t}
            </span>
          ))}
        </div>
      </button>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <strong className="text-black">"{project.projectName}"</strong> from your project
              list. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(project.id)}
              className="rounded-xl bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});
