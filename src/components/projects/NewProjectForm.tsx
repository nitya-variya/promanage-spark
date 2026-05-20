import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Clock,
  FileText,
  Flag,
  Globe,
  Layers,
  Link as LinkIcon,
  Pencil,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { TagInput } from "./TagInput";
import type { Project } from "@/lib/projects-data";

function Field({
  label,
  required,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-violet-600">
        <Icon className="h-3.5 w-3.5" />
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-violet-100 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

export function NewProjectForm({
  open,
  onClose,
  onCreate,
  onUpdate,
  editProject,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (p: Project) => void;
  onUpdate?: (p: Project) => void;
  editProject?: Project | null;
}) {
  const [client, setClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [challenges, setChallenges] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [domain, setDomain] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<string[]>([]);

  const isEditMode = !!editProject;

  // Pre-fill fields when editProject changes
  useEffect(() => {
    if (editProject) {
      setClient(editProject.client);
      setProjectName(editProject.projectName);
      setChallenges(editProject.challenges);
      setConclusion(editProject.conclusion);
      setTimeDuration(editProject.timeDuration);
      setCountry(editProject.country);
      setIndustry(editProject.industry);
      setDomain(editProject.domain);
      setProjectLink(editProject.projectLink);
      setTechStack([...editProject.techStack]);
      setServices([...editProject.services]);
      setDeliverables([...editProject.deliverables]);
    } else {
      reset();
    }
  }, [editProject]);

  const reset = () => {
    setClient("");
    setProjectName("");
    setChallenges("");
    setConclusion("");
    setTimeDuration("");
    setCountry("");
    setIndustry("");
    setDomain("");
    setProjectLink("");
    setTechStack([]);
    setServices([]);
    setDeliverables([]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !client.trim() ||
      !projectName.trim() ||
      !challenges.trim() ||
      !conclusion.trim() ||
      !country.trim() ||
      !industry.trim() ||
      !projectLink.trim() ||
      deliverables.length === 0
    )
      return;

    const name = projectName.trim();
    const projectData: Project = {
      id: isEditMode ? editProject.id : crypto.randomUUID(),
      client: client.trim(),
      projectName: name,
      status: isEditMode ? editProject.status : "Completed",
      techStack,
      services,
      deliverables,
      challenges: challenges.trim(),
      conclusion: conclusion.trim(),
      timeDuration: timeDuration.trim(),
      country: country.trim(),
      industry: industry.trim(),
      domain: domain.trim(),
      projectLink: projectLink.trim(),
      successStoryReady: isEditMode ? editProject.successStoryReady : true,
    };

    if (isEditMode && onUpdate) {
      onUpdate(projectData);
      toast.success(`Project "${name}" updated successfully!`, {
        description: "Your project has been updated.",
      });
    } else {
      onCreate(projectData);
      toast.success(`Project "${name}" created successfully!`, {
        description: "Your new project has been added to the list.",
      });
    }

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
          className="fixed inset-0 z-50 flex items-end justify-center bg-violet-950/30 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                  {isEditMode ? (
                    <><Pencil className="h-3 w-3" /> Edit entry</>
                  ) : (
                    <><Sparkles className="h-3 w-3" /> New entry</>
                  )}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  {isEditMode ? "Edit project" : "Add a project"}
                </h2>
                <p className="mt-0.5 text-sm text-gray-500">
                  {isEditMode
                    ? "Update the project details below. Fields marked with "
                    : "Fill in the success story details. Fields marked with "}
                  <span className="text-rose-500">*</span> are required.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 hover:bg-violet-50 hover:text-violet-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Client" required icon={Building2}>
                <input
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Client name"
                  className={inputCls}
                />
              </Field>
              <Field label="Project Name" required icon={FileText}>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Internal project name"
                  className={inputCls}
                />
              </Field>

              <Field label="Country" required icon={Flag}>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. India"
                  className={inputCls}
                />
              </Field>
              <Field label="Industry" required icon={Layers}>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Healthcare"
                  className={inputCls}
                />
              </Field>

              <Field label="Domain" icon={Globe}>
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. SaaS, Fintech"
                  className={inputCls}
                />
              </Field>
              <Field label="Time Duration" icon={Clock}>
                <input
                  value={timeDuration}
                  onChange={(e) => setTimeDuration(e.target.value)}
                  placeholder="e.g. 3 months"
                  className={inputCls}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Project Link" required icon={LinkIcon}>
                  <input
                    value={projectLink}
                    onChange={(e) => setProjectLink(e.target.value)}
                    placeholder="https://"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Challenges" required icon={Target}>
                  <textarea
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    rows={3}
                    placeholder="What problem were we solving?"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Field label="Conclusion" required icon={Sparkles}>
                  <textarea
                    value={conclusion}
                    onChange={(e) => setConclusion(e.target.value)}
                    rows={3}
                    placeholder="Outcome and impact"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <TagInput
                label="Deliverables *"
                placeholder="Type and press Enter…"
                value={deliverables}
                onChange={setDeliverables}
              />
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
            </div>

            <div className="mt-7 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-violet-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-violet-50"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-violet-500/25 hover:from-violet-700 hover:to-fuchsia-700"
              >
                {isEditMode ? "Update project" : "Create project"}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
