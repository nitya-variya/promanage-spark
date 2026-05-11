import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { type Project, buildSuccessStory } from "@/lib/projects-data";

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  "In Progress": "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
  Planned: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
};

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </h4>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className="rounded-md bg-gray-50 px-2.5 py-1 text-sm text-gray-700 ring-1 ring-inset ring-gray-200"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!project) return;
    await navigator.clipboard.writeText(buildSuccessStory(project));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/30 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[#E5E7EB] bg-white/90 px-7 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {project.client}
                </p>
                <h2 className="mt-0.5 text-2xl font-semibold text-gray-900">
                  {project.projectName}
                </h2>
                <span
                  className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-7 py-6">
              <Section title="Services" items={project.services} />
              <Section title="Tech Stack" items={project.techStack} />
              <Section title="Deliverables" items={project.deliverables} />

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Generate Success Story
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Auto-formatted text ready to paste into your CMS.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy
                      </>
                    )}
                  </motion.button>
                </div>
                <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-[#E5E7EB] bg-white p-4 font-sans text-sm leading-relaxed text-gray-700">
                  {buildSuccessStory(project)}
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
