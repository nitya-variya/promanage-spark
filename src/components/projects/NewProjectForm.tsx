import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { TagInput } from "./TagInput";
import type { Project, ProjectStatus } from "@/lib/projects-data";

const STATUSES: ProjectStatus[] = ["Planned", "In Progress", "Completed"];

export function NewProjectForm({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (p: Project) => void;
}) {
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planned");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);

  const reset = () => {
    setClient("");
    setProjectName("");
    setStatus("Planned");
    setTechStack([]);
    setServices([]);
    setDeliverables([]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client.trim() || !projectName.trim()) return;
    onCreate({
      id: crypto.randomUUID(),
      client: client.trim(),
      projectName: projectName.trim(),
      status,
      techStack,
      services,
      deliverables,
      successStoryReady: status === "Completed",
    });
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/30 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">New project</h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  Add a project to the vault.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Client
                </label>
                <input
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Acme Corp"
                  className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  Project Name
                </label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="E-Commerce Redesign"
                  className="mt-2 w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </label>
              <div className="mt-2 flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                      status === s
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-[#E5E7EB] bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <TagInput
                label="Tech Stack"
                placeholder="Type and press Enter…"
                value={techStack}
                onChange={setTechStack}
              />
              <TagInput
                label="Services"
                placeholder="Type and press Enter…"
                value={services}
                onChange={setServices}
              />
              <TagInput
                label="Deliverables"
                placeholder="Type and press Enter…"
                value={deliverables}
                onChange={setDeliverables}
              />
            </div>

            <div className="mt-7 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
              >
                Create project
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
