export type ProjectStatus = "Completed" | "In Progress" | "Planned";

export type Project = {
  id: string;
  client: string;
  projectName: string;
  status: ProjectStatus;
  techStack: string[];
  services: string[];
  deliverables: string[];
  challenges: string;
  conclusion: string;
  timeDuration: string;
  country: string;
  industry: string;
  domain: string;
  projectLink: string;
  successStoryReady: boolean;
};

export const initialProjects: Project[] = [];

export function buildSuccessStory(p: Project): string {
  const lines: string[] = [];
  lines.push(`${p.projectName} — ${p.client}`);
  if (p.industry || p.country) {
    lines.push("");
    lines.push(`${p.industry}${p.industry && p.country ? " · " : ""}${p.country}`);
  }
  if (p.challenges) {
    lines.push("", "Challenges", p.challenges);
  }
  if (p.services.length) {
    lines.push("", "Services Provided", ...p.services.map((s) => `• ${s}`));
  }
  if (p.techStack.length) {
    lines.push("", "Technology Stack", ...p.techStack.map((s) => `• ${s}`));
  }
  if (p.deliverables.length) {
    lines.push("", "Key Deliverables", ...p.deliverables.map((s) => `• ${s}`));
  }
  if (p.conclusion) {
    lines.push("", "Conclusion", p.conclusion);
  }
  if (p.timeDuration) {
    lines.push("", `Duration: ${p.timeDuration}`);
  }
  if (p.domain) {
    lines.push(`Domain: ${p.domain}`);
  }
  if (p.projectLink) {
    lines.push(`Project Link: ${p.projectLink}`);
  }
  return lines.join("\n");
}
