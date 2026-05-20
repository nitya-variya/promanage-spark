import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Root2, P as Portal2, C as Content2, T as Title2, D as Description2, a as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { u as useAppSelector, a as useAppDispatch, t as toggleTheme } from "./router-BKi6DlVp.mjs";
import { S as Show, a as SignInButton, b as SignUpButton, U as UserButton } from "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import { L as LayoutGrid, M as Moon, S as Sun, P as Plus, a as Search, A as ArrowDownAZ, b as ArrowUpZA, C as CodeXml, c as ChevronDown, X, d as Sparkles, G as Globe, e as Pencil, T as Trash2, f as ArrowUpRight, E as ExternalLink, F as Flag, g as Layers, h as Clock, i as Check, j as Copy, B as Building2, k as FileText, l as Link, m as Target } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "./env-BMKBizYn.mjs";
import "./server-DAYUc_Js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/dequal.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const ProjectCard = reactExports.memo(function ProjectCard2({
  project,
  onOpen,
  onDelete,
  onEdit
}) {
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onOpen(project),
        className: "group w-full h-full relative flex flex-col gap-4 overflow-hidden cursor-pointer rounded-2xl border border-violet-100/70 dark:border-violet-500/20 bg-white/80 dark:bg-black/40 p-6 text-left shadow-[0_1px_2px_rgba(76,29,149,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_20px_45px_-22px_rgba(76,29,149,0.28)] active:scale-[0.99]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-200/50 to-pink-200/40 blur-2xl transition-transform duration-300 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-violet-500 dark:text-violet-400", children: project.client }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100", children: project.projectName }),
              (project.industry || project.country) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
                [project.industry, project.country].filter(Boolean).join(" · ")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  onClick: (e) => {
                    e.stopPropagation();
                    onEdit(project);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      onEdit(project);
                    }
                  },
                  className: "rounded-lg p-1.5 text-black-300 opacity-0 transition-all hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 group-hover:opacity-100 cursor-pointer",
                  title: "Edit project",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  onClick: (e) => {
                    e.stopPropagation();
                    setShowConfirm(true);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      setShowConfirm(true);
                    }
                  },
                  className: "rounded-lg p-1.5 text-black-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400 group-hover:opacity-100 cursor-pointer",
                  title: "Delete project",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 text-black-300 transition group-hover:text-violet-700" })
            ] })
          ] }),
          project.successStoryReady && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/50 dark:to-pink-900/50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300 ring-1 ring-violet-200 dark:ring-violet-500/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
            " Story ready"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-wrap gap-1.5 pt-1", children: project.techStack.slice(0, 4).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "rounded-md bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 text-xs font-medium text-violet-700 dark:text-violet-300 ring-1 ring-inset ring-violet-100 dark:ring-violet-500/30",
              children: t
            },
            t
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showConfirm, onOpenChange: setShowConfirm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you sure you want to delete this project?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This will permanently remove",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-black", children: [
            '"',
            project.projectName,
            '"'
          ] }),
          " from your project list. This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-xl cursor-pointer", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: () => onDelete(project.id),
            className: "rounded-xl bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 cursor-pointer",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
});
const initialProjects = [
  {
    id: "p1",
    client: "Northwind Retail",
    projectName: "Aurora Commerce Platform",
    status: "Completed",
    techStack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    services: ["UX Design", "Frontend Development", "Payments Integration"],
    deliverables: ["Storefront", "Admin Dashboard", "Checkout Flow"],
    challenges: "Legacy monolith caused 6s page loads and frequent checkout drop-offs during peak traffic.",
    conclusion: "Migrated to a headless architecture, cutting page load to 1.2s and lifting checkout conversion by 38%.",
    timeDuration: "5 months",
    country: "United States",
    industry: "Retail",
    domain: "E-commerce",
    projectLink: "https://example.com/aurora",
    successStoryReady: true
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
    conclusion: "Unified portal reduced support calls by 52% and improved patient satisfaction scores from 6.4 to 8.9.",
    timeDuration: "8 months",
    country: "Canada",
    industry: "Healthcare",
    domain: "Patient Engagement",
    projectLink: "https://example.com/patientpath",
    successStoryReady: true
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
    successStoryReady: false
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
    conclusion: "Streamlined to 4 minutes end-to-end, doubling completed applications month over month.",
    timeDuration: "4 months",
    country: "United Kingdom",
    industry: "Finance",
    domain: "Digital Banking",
    projectLink: "https://example.com/greenleaf",
    successStoryReady: true
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
    successStoryReady: true
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
    conclusion: "New SEO-first build tripled organic traffic in 90 days and added 1,200 qualified leads.",
    timeDuration: "5 months",
    country: "United Arab Emirates",
    industry: "Real Estate",
    domain: "Property Marketplace",
    projectLink: "https://example.com/skyline",
    successStoryReady: false
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
    conclusion: "Sub-second anomaly detection prevented an estimated $2.3M in downtime within the first quarter.",
    timeDuration: "9 months",
    country: "Norway",
    industry: "Energy",
    domain: "Smart Grid",
    projectLink: "https://example.com/gridsense",
    successStoryReady: false
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
    successStoryReady: true
  }
];
function buildSuccessStory(p) {
  const lines = [];
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
function TagSection({ title, items }) {
  if (!items.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-black-500", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "rounded-md bg-violet-50 px-2.5 py-1 text-sm text-violet-700 ring-1 ring-inset ring-violet-100",
        children: it
      },
      it
    )) })
  ] });
}
function TextSection({ title, body }) {
  if (!body) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-black-500", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-700", children: body })
  ] });
}
function MetaPill({
  icon: Icon,
  label,
  value
}) {
  if (!value) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-violet-50/60 px-3 py-2 text-sm ring-1 ring-violet-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-violet-600" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-800", children: value })
  ] });
}
function ProjectDetailModal({
  project,
  onClose
}) {
  const [copied, setCopied] = reactExports.useState(false);
  const handleCopy = async () => {
    if (!project) return;
    await navigator.clipboard.writeText(buildSuccessStory(project));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: project && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end justify-center bg-violet-950/30 p-0 backdrop-blur-sm sm:items-center sm:p-6",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { y: 30, opacity: 0, scale: 0.98 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: 20, opacity: 0, scale: 0.98 },
          transition: { type: "spring", stiffness: 280, damping: 28 },
          className: "relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-2xl",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-violet-100 bg-gradient-to-r from-violet-50/80 via-white to-pink-50/60 px-7 py-5 backdrop-blur", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-violet-600", children: project.client }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-0.5 text-2xl font-semibold text-gray-900", children: project.projectName }),
                project.projectLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: project.projectLink,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "mt-1 inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:text-violet-800",
                    children: [
                      "Visit project ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "rounded-full p-1.5 text-gray-400 transition hover:bg-violet-100 hover:text-violet-700",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 px-7 py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MetaPill, { icon: Flag, label: "Country", value: project.country }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MetaPill, { icon: Layers, label: "Industry", value: project.industry }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MetaPill, { icon: Globe, label: "Domain", value: project.domain }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MetaPill, { icon: Clock, label: "Duration", value: project.timeDuration })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextSection, { title: "Challenges", body: project.challenges }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TagSection, { title: "Services", items: project.services }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TagSection, { title: "Tech Stack", items: project.techStack }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TagSection, { title: "Deliverables", items: project.deliverables }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TextSection, { title: "Conclusion", body: project.conclusion }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/70 to-pink-50/40 p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-900", children: "Success Story" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-gray-500", children: "Compiled from the fields above. Copy and paste into your CMS." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.button,
                    {
                      whileTap: { scale: 0.96 },
                      onClick: handleCopy,
                      className: "inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-2 text-sm font-medium text-white shadow-md shadow-violet-500/25 transition hover:from-violet-700 hover:to-fuchsia-700",
                      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
                        " Copied"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }),
                        " Copy"
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-violet-100 bg-white p-4 font-sans text-sm leading-relaxed text-gray-700", children: buildSuccessStory(project) })
              ] })
            ] })
          ]
        }
      )
    }
  ) });
}
function TagInput({
  label,
  placeholder,
  value,
  onChange
}) {
  const [draft, setDraft] = reactExports.useState("");
  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    if (value.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...value, v]);
    setDraft("");
  };
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs font-medium uppercase tracking-wider text-gray-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 focus-within:border-gray-400", children: [
      value.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-sm text-gray-700 animate-in fade-in duration-150",
          children: [
            tag,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onChange(value.filter((t) => t !== tag)),
                className: "text-gray-400 hover:text-gray-700",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
              }
            )
          ]
        },
        tag
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: draft,
          onChange: (e) => setDraft(e.target.value),
          onKeyDown: onKey,
          onBlur: commit,
          placeholder: value.length ? "" : placeholder,
          className: "min-w-[8rem] flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-gray-400"
        }
      )
    ] })
  ] });
}
function Field({
  label,
  required,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-violet-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children })
  ] });
}
const inputCls = "w-full rounded-xl border border-violet-100 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";
function NewProjectForm({
  open,
  onClose,
  onCreate,
  onUpdate,
  editProject
}) {
  const [client, setClient] = reactExports.useState("");
  const [projectName, setProjectName] = reactExports.useState("");
  const [challenges, setChallenges] = reactExports.useState("");
  const [conclusion, setConclusion] = reactExports.useState("");
  const [timeDuration, setTimeDuration] = reactExports.useState("");
  const [country, setCountry] = reactExports.useState("");
  const [industry, setIndustry] = reactExports.useState("");
  const [domain, setDomain] = reactExports.useState("");
  const [projectLink, setProjectLink] = reactExports.useState("");
  const [techStack, setTechStack] = reactExports.useState([]);
  const [services, setServices] = reactExports.useState([]);
  const [deliverables, setDeliverables] = reactExports.useState([]);
  const isEditMode = !!editProject;
  reactExports.useEffect(() => {
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
  const submit = (e) => {
    e.preventDefault();
    if (!client.trim() || !projectName.trim() || !challenges.trim() || !conclusion.trim() || !country.trim() || !industry.trim() || !projectLink.trim() || deliverables.length === 0)
      return;
    const name = projectName.trim();
    const projectData = {
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
      successStoryReady: isEditMode ? editProject.successStoryReady : true
    };
    if (isEditMode && onUpdate) {
      onUpdate(projectData);
      toast.success(`Project "${name}" updated successfully!`, {
        description: "Your project has been updated."
      });
    } else {
      onCreate(projectData);
      toast.success(`Project "${name}" created successfully!`, {
        description: "Your new project has been added to the list."
      });
    }
    reset();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: onClose,
      className: "fixed inset-0 z-50 flex items-end justify-center bg-violet-950/30 backdrop-blur-sm sm:items-center sm:p-6",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.form,
        {
          onSubmit: submit,
          onClick: (e) => e.stopPropagation(),
          initial: { y: 30, opacity: 0, scale: 0.98 },
          animate: { y: 0, opacity: 1, scale: 1 },
          exit: { y: 20, opacity: 0, scale: 0.98 },
          transition: { type: "spring", stiffness: 280, damping: 28 },
          className: "max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-7 shadow-2xl sm:rounded-2xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 px-2.5 py-0.5 text-xs font-medium text-violet-700", children: isEditMode ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
                  " Edit entry"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                  " New entry"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-xl font-semibold text-gray-900", children: isEditMode ? "Edit project" : "Add a project" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-gray-500", children: [
                  isEditMode ? "Update the project details below. Fields marked with " : "Fill in the success story details. Fields marked with ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-500", children: "*" }),
                  " are required."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "rounded-full p-1.5 text-gray-400 hover:bg-violet-50 hover:text-violet-700",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Client", required: true, icon: Building2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: client,
                  onChange: (e) => setClient(e.target.value),
                  placeholder: "Client name",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project Name", required: true, icon: FileText, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: projectName,
                  onChange: (e) => setProjectName(e.target.value),
                  placeholder: "Internal project name",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Country", required: true, icon: Flag, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: country,
                  onChange: (e) => setCountry(e.target.value),
                  placeholder: "e.g. India",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Industry", required: true, icon: Layers, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: industry,
                  onChange: (e) => setIndustry(e.target.value),
                  placeholder: "e.g. Healthcare",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Domain", icon: Globe, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: domain,
                  onChange: (e) => setDomain(e.target.value),
                  placeholder: "e.g. SaaS, Fintech",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Time Duration", icon: Clock, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: timeDuration,
                  onChange: (e) => setTimeDuration(e.target.value),
                  placeholder: "e.g. 3 months",
                  className: inputCls
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Project Link", required: true, icon: Link, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: projectLink,
                  onChange: (e) => setProjectLink(e.target.value),
                  placeholder: "https://",
                  className: inputCls
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Challenges", required: true, icon: Target, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: challenges,
                  onChange: (e) => setChallenges(e.target.value),
                  rows: 3,
                  placeholder: "What problem were we solving?",
                  className: inputCls
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Conclusion", required: true, icon: Sparkles, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: conclusion,
                  onChange: (e) => setConclusion(e.target.value),
                  rows: 3,
                  placeholder: "Outcome and impact",
                  className: inputCls
                }
              ) }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TagInput,
                {
                  label: "Deliverables *",
                  placeholder: "Type and press Enter…",
                  value: deliverables,
                  onChange: setDeliverables
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TagInput,
                {
                  label: "Tech Stack",
                  placeholder: "Type and press Enter…",
                  value: techStack,
                  onChange: setTechStack
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TagInput,
                {
                  label: "Services",
                  placeholder: "Type and press Enter…",
                  value: services,
                  onChange: setServices
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex justify-end gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "rounded-lg border border-violet-100 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-violet-50",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  whileTap: { scale: 0.97 },
                  type: "submit",
                  className: "rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-violet-500/25 hover:from-violet-700 hover:to-fuchsia-700",
                  children: isEditMode ? "Update project" : "Create project"
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}
const STORAGE_KEY = "promanage-projects";
function loadProjects() {
  if (typeof window === "undefined") return initialProjects;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
  }
  return initialProjects;
}
const cardTransition = {
  duration: 0.2,
  ease: "easeOut"
};
function Index() {
  const [projects, setProjects] = reactExports.useState(loadProjects);
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [creating, setCreating] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [sortBy, setSortBy] = reactExports.useState("default");
  const [techFilter, setTechFilter] = reactExports.useState([]);
  const [techDropdownOpen, setTechDropdownOpen] = reactExports.useState(false);
  const techDropdownRef = reactExports.useRef(null);
  const themeMode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);
  reactExports.useEffect(() => {
    function handleClickOutside(e) {
      if (techDropdownRef.current && !techDropdownRef.current.contains(e.target)) {
        setTechDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const allTechs = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);
  const filtered = reactExports.useMemo(() => {
    let result = projects;
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => p.projectName.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.industry.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.techStack.some((t) => t.toLowerCase().includes(q)));
    }
    if (techFilter.length > 0) {
      result = result.filter((p) => {
        const lowerStack = p.techStack.map((t) => t.toLowerCase());
        return techFilter.every((tf) => lowerStack.includes(tf.toLowerCase()));
      });
    }
    if (sortBy === "a-z") {
      result = [...result].sort((a, b) => a.projectName.localeCompare(b.projectName));
    } else if (sortBy === "z-a") {
      result = [...result].sort((a, b) => b.projectName.localeCompare(a.projectName));
    }
    return result;
  }, [projects, query, sortBy, techFilter.join()]);
  const handleDelete = reactExports.useCallback((id) => {
    setProjects((prev) => {
      const project = prev.find((p) => p.id === id);
      if (project) {
        toast.error(`Project "${project.projectName}" deleted successfully!`, {
          description: "The project has been removed from your list."
        });
      }
      return prev.filter((p) => p.id !== id);
    });
  }, []);
  const handleOpen = reactExports.useCallback((p) => setSelected(p), []);
  const handleCloseDetail = reactExports.useCallback(() => setSelected(null), []);
  const handleOpenCreate = reactExports.useCallback(() => setCreating(true), []);
  const handleCloseCreate = reactExports.useCallback(() => {
    setCreating(false);
    setEditing(null);
  }, []);
  const handleCreate = reactExports.useCallback((p) => setProjects((prev) => [p, ...prev]), []);
  const handleEdit = reactExports.useCallback((p) => {
    setEditing(p);
    setCreating(true);
  }, []);
  const handleUpdate = reactExports.useCallback((updated) => {
    setProjects((prev) => prev.map((p) => p.id === updated.id ? updated : p));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 pb-24 pt-12 sm:pt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-violet-200 dark:border-violet-500/30 bg-white/80 dark:bg-black/40 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300 shadow-[0_1px_2px_rgba(76,29,149,0.08)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-3.5 w-3.5" }),
            "Project Vault"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-rose-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl", children: "Projects & Success Stories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400", children: "Replace the spreadsheet. Find any project in seconds and craft polished copy for your website CMS." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Show, { when: "signed-out", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignInButton, { mode: "modal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex items-center gap-1.5 self-start rounded-xl border border-violet-200 dark:border-violet-500/30 bg-white/80 dark:bg-gray-900/60 px-4 py-2.5 text-sm font-medium text-violet-700 dark:text-violet-300 shadow-sm transition-all duration-150 hover:border-violet-400 dark:hover:border-violet-400 hover:shadow-md active:scale-[0.97] cursor-pointer", children: "Sign in" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpButton, { mode: "modal", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex items-center gap-1.5 self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-150 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.97] cursor-pointer", children: "Sign up" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Show, { when: "signed-in", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 self-start rounded-xl bg-black dark:bg-white px-4 py-2.5 text-sm font-medium text-white dark:text-black shadow-lg shadow-black-500/30 transition-transform duration-150 hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-[0.97] cursor-pointer", onClick: () => dispatch(toggleTheme()), children: [
              themeMode === "light" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-white dark:text-black" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-white dark:text-black" }),
              themeMode === "light" ? "Dark Mode" : "Light Mode"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleOpenCreate, className: "inline-flex items-center gap-1.5 self-start rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-transform duration-150 hover:from-violet-700 hover:to-fuchsia-700 active:scale-[0.97] cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              " New project"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserButton, { appearance: {
              elements: {
                avatarBox: "h-9 w-9"
              }
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 top-1/5 h-4 w-4 translate-y-1/2 text-black-400 dark:text-white-500 z-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by project, client, industry, country or tech…", className: "w-full rounded-2xl border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/80 py-3.5 pl-11 pr-4 text-sm dark:text-gray-200 shadow-[0_1px_2px_rgba(76,29,149,0.06)] outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-violet-400 dark:focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500", children: "Sort:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSortBy(sortBy === "a-z" ? "default" : "a-z"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${sortBy === "a-z" ? "bg-violet-600 text-white shadow-md shadow-violet-500/25" : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownAZ, { className: "h-3.5 w-3.5" }),
            "A → Z"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSortBy(sortBy === "z-a" ? "default" : "z-a"), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${sortBy === "z-a" ? "bg-violet-600 text-white shadow-md shadow-violet-500/25" : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpZA, { className: "h-3.5 w-3.5" }),
            "Z → A"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 h-5 w-px bg-violet-100 dark:bg-violet-500/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: techDropdownRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTechDropdownOpen(!techDropdownOpen), className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 cursor-pointer ${techFilter.length > 0 ? "bg-violet-600 text-white shadow-md shadow-violet-500/25" : "border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900/60 text-gray-600 dark:text-gray-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:text-violet-700 dark:hover:text-violet-300"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-3.5 w-3.5" }),
              techFilter.length === 0 ? "Technology" : techFilter.length === 1 ? techFilter[0] : `${techFilter.length} selected`,
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3 w-3 transition-transform duration-200 ${techDropdownOpen ? "rotate-180" : ""}` })
            ] }),
            techDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-full z-30 mt-1.5 max-h-56 w-52 overflow-y-auto rounded-xl border border-violet-100 dark:border-violet-500/20 bg-white dark:bg-gray-900 p-1.5 shadow-xl shadow-violet-500/10", children: allTechs.map((tech) => {
              const isSelected = techFilter.includes(tech);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setTechFilter((prev) => isSelected ? prev.filter((t) => t !== tech) : [...prev, tech]);
              }, className: `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors duration-100 cursor-pointer ${isSelected ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300" : "text-gray-600 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${isSelected ? "border-violet-600 bg-violet-600 text-white" : "border-gray-300 dark:border-gray-600"}`, children: isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-3 w-3", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2.5 6l2.5 2.5 4.5-5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
                tech
              ] }, tech);
            }) })
          ] }),
          (sortBy !== "default" || techFilter.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setSortBy("default");
            setTechFilter([]);
          }, className: "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
            "Clear"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-gray-400", children: [
            filtered.length,
            " ",
            filtered.length === 1 ? "result" : "results"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, exit: {
        opacity: 0,
        scale: 0.95
      }, transition: cardTransition, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, onOpen: handleOpen, onDelete: handleDelete, onEdit: handleEdit }) }, p.id)) }) }),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-dashed border-violet-200 dark:border-violet-500/30 bg-white/60 dark:bg-black/20 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/50 dark:to-pink-900/50 text-violet-600 dark:text-violet-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-medium text-gray-700 dark:text-gray-300", children: projects.length === 0 ? "No projects yet" : "No projects match your search" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: projects.length === 0 ? 'Click "New project" to add your first success story.' : "Try a different keyword." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDetailModal, { project: selected, onClose: handleCloseDetail }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewProjectForm, { open: creating, onClose: handleCloseCreate, onCreate: handleCreate, onUpdate: handleUpdate, editProject: editing })
  ] });
}
export {
  Index as component
};
