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

export const initialProjects: Project[] = [
  {
    id: "p1",
    client: "Northwind Retail",
    projectName: "Aurora Commerce Platform",
    status: "Completed",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    services: ["UX Design", "Frontend Development", "Payments Integration"],
    deliverables: ["Storefront", "Admin Dashboard", "Checkout Flow"],
    challenges:
      "Legacy monolith caused 6s page loads and frequent checkout drop-offs during peak traffic.",
    conclusion:
      "Migrated to a headless architecture, cutting page load to 1.2s and lifting checkout conversion by 38%.",
    timeDuration: "5 months",
    country: "United States",
    industry: "Retail",
    domain: "E-commerce",
    projectLink: "https://example.com/aurora",
    successStoryReady: true,
  },
  {
    id: "p2",
    client: "MediCare Plus",
    projectName: "PatientPath Portal",
    status: "Completed",
    techStack: ["React", "Node.js", "AWS", "FHIR"],
    services: ["Discovery", "HIPAA Compliance", "Web App Development"],
    deliverables: ["Patient Portal", "Appointment System", "Secure Messaging"],
    challenges: "Patients struggled to access records across three disconnected hospital systems.",
    conclusion:
      "Unified portal reduced support calls by 52% and improved patient satisfaction scores from 6.4 to 8.9.",
    timeDuration: "8 months",
    country: "Canada",
    industry: "Healthcare",
    domain: "Patient Engagement",
    projectLink: "https://example.com/patientpath",
    successStoryReady: true,
  },
  {
    id: "p3",
    client: "Velocity Logistics",
    projectName: "FleetPulse Tracking",
    status: "In Progress",
    techStack: ["React Native", "GraphQL", "MongoDB", "Mapbox"],
    services: ["Mobile Development", "Realtime Backend", "Geospatial Mapping"],
    deliverables: ["Driver App", "Dispatcher Console", "Live ETA Engine"],
    challenges: "Manual radio dispatch caused 22% of deliveries to miss promised time windows.",
    conclusion: "Realtime tracking and smart routing brought on-time delivery rate to 96%.",
    timeDuration: "6 months",
    country: "Germany",
    industry: "Logistics",
    domain: "Fleet Management",
    projectLink: "https://example.com/fleetpulse",
    successStoryReady: false,
  },
  {
    id: "p4",
    client: "GreenLeaf Bank",
    projectName: "Onboarding Reimagined",
    status: "Completed",
    techStack: ["Vue 3", "Nuxt", "Kotlin", "Azure"],
    services: ["KYC Workflow Design", "Identity Verification", "Frontend Engineering"],
    deliverables: ["Onboarding Flow", "Document Capture", "Risk Scoring UI"],
    challenges: "New account sign-up took 14 minutes with a 47% abandonment rate.",
    conclusion:
      "Streamlined to 4 minutes end-to-end, doubling completed applications month over month.",
    timeDuration: "4 months",
    country: "United Kingdom",
    industry: "Finance",
    domain: "Digital Banking",
    projectLink: "https://example.com/greenleaf",
    successStoryReady: true,
  },
  {
    id: "p5",
    client: "Lumen Learning",
    projectName: "Classroom Insights AI",
    status: "Completed",
    techStack: ["Next.js", "Python", "OpenAI", "Supabase"],
    services: ["AI Strategy", "LLM Integration", "Teacher Dashboards"],
    deliverables: ["Insights Dashboard", "Lesson Recommender", "Parent Reports"],
    challenges: "Teachers spent 6+ hours weekly compiling student progress reports manually.",
    conclusion: "AI-generated insights reclaim 5 hours per teacher each week with 94% accuracy.",
    timeDuration: "3 months",
    country: "Australia",
    industry: "Education",
    domain: "EdTech",
    projectLink: "https://example.com/lumen",
    successStoryReady: true,
  },
  {
    id: "p6",
    client: "Atlas Realty",
    projectName: "Skyline Listings Hub",
    status: "In Progress",
    techStack: ["Astro", "Tailwind CSS", "Sanity", "Algolia"],
    services: ["Content Strategy", "Search UX", "Web Development"],
    deliverables: ["Marketing Site", "Listing Search", "Agent CMS"],
    challenges: "Outdated site failed to rank for high-intent property searches in target metros.",
    conclusion:
      "New SEO-first build tripled organic traffic in 90 days and added 1,200 qualified leads.",
    timeDuration: "5 months",
    country: "United Arab Emirates",
    industry: "Real Estate",
    domain: "Property Marketplace",
    projectLink: "https://example.com/skyline",
    successStoryReady: false,
  },
  {
    id: "p7",
    client: "Cobalt Energy",
    projectName: "GridSense Operations",
    status: "Planned",
    techStack: ["React", "Go", "Kubernetes", "TimescaleDB"],
    services: ["IoT Architecture", "Realtime Analytics", "Operator UX"],
    deliverables: ["Operator Console", "Anomaly Alerts", "Reporting Suite"],
    challenges: "Operators reacted to grid anomalies hours after they occurred, risking outages.",
    conclusion:
      "Sub-second anomaly detection prevented an estimated $2.3M in downtime within the first quarter.",
    timeDuration: "9 months",
    country: "Norway",
    industry: "Energy",
    domain: "Smart Grid",
    projectLink: "https://example.com/gridsense",
    successStoryReady: false,
  },
  {
    id: "p8",
    client: "Bloom & Co",
    projectName: "Petal Subscription Box",
    status: "Completed",
    techStack: ["Shopify Hydrogen", "Remix", "Klaviyo"],
    services: ["Brand Refresh", "Subscription Commerce", "Lifecycle Marketing"],
    deliverables: ["Subscription Flow", "Customer Portal", "Email Automation"],
    challenges: "High churn after the second delivery and limited personalization options.",
    conclusion: "Personalized boxes and lifecycle emails cut churn by 31% and grew LTV by 2.4x.",
    timeDuration: "3 months",
    country: "France",
    industry: "Lifestyle",
    domain: "Subscription Commerce",
    projectLink: "https://example.com/petal",
    successStoryReady: true,
  },
];

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
