export type ProjectStatus = "Completed" | "In Progress" | "Planned";

export type Project = {
  id: string;
  client: string;
  projectName: string;
  status: ProjectStatus;
  techStack: string[];
  services: string[];
  deliverables: string[];
  successStoryReady: boolean;
};

export const initialProjects: Project[] = [
  {
    id: "1",
    client: "Acme Corp",
    projectName: "E-Commerce Redesign",
    status: "Completed",
    techStack: ["Next.js", "Shopify", "Tailwind"],
    services: ["UI/UX Design", "Frontend Dev"],
    deliverables: ["Custom Storefront", "Admin Dashboard", "Payment Integration"],
    successStoryReady: true,
  },
  {
    id: "2",
    client: "Global Logistics",
    projectName: "Fleet Tracker",
    status: "In Progress",
    techStack: ["React", "Node.js", "Google Maps API"],
    services: ["Fullstack Web App"],
    deliverables: ["Real-time map", "Driver App", "Analytics Panel"],
    successStoryReady: false,
  },
  {
    id: "3",
    client: "Northwind Bank",
    projectName: "Customer Portal v2",
    status: "Completed",
    techStack: ["React", "TypeScript", "GraphQL"],
    services: ["UI/UX Design", "Frontend Dev", "API Integration"],
    deliverables: ["Self-service portal", "Document vault", "Live chat"],
    successStoryReady: true,
  },
  {
    id: "4",
    client: "Lumen Health",
    projectName: "Telemedicine Platform",
    status: "In Progress",
    techStack: ["Next.js", "WebRTC", "PostgreSQL"],
    services: ["Fullstack Web App", "DevOps"],
    deliverables: ["Video consultation", "Prescription module", "Patient records"],
    successStoryReady: false,
  },
  {
    id: "5",
    client: "Brewhaus",
    projectName: "Loyalty Mobile App",
    status: "Planned",
    techStack: ["React Native", "Firebase"],
    services: ["Mobile Development"],
    deliverables: ["iOS app", "Android app", "Rewards engine"],
    successStoryReady: false,
  },
  {
    id: "6",
    client: "Vantage Studios",
    projectName: "Marketing Website",
    status: "Completed",
    techStack: ["Astro", "Tailwind", "Sanity"],
    services: ["UI/UX Design", "Frontend Dev", "CMS Setup"],
    deliverables: ["Landing pages", "Blog", "Case study templates"],
    successStoryReady: true,
  },
];

export function buildSuccessStory(p: Project): string {
  return `${p.projectName} — ${p.client}

Overview
We partnered with ${p.client} to deliver "${p.projectName}", a ${p.status.toLowerCase()} engagement focused on measurable business impact.

Services Provided
${p.services.map((s) => `• ${s}`).join("\n")}

Technology Stack
${p.techStack.map((s) => `• ${s}`).join("\n")}

Key Deliverables
${p.deliverables.map((s) => `• ${s}`).join("\n")}

Outcome
The collaboration enabled ${p.client} to modernize their workflow, improve customer experience, and unlock new growth opportunities.`;
}
