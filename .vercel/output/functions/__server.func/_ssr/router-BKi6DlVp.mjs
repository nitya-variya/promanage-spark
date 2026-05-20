import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as ScriptOnce, e as useNavigate, f as useLocation } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports, R as React__default } from "../_libs/react.mjs";
import { P as Provider_default, u as useSelector, a as useDispatch } from "../_libs/react-redux.mjs";
import { c as configureStore, a as createSlice } from "../_libs/reduxjs__toolkit.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { I as InternalClerkProvider } from "../_libs/clerk__react.mjs";
import { i as isClient, g as getPublicEnvVariables } from "./env-BMKBizYn.mjs";
import { g as getStartContext } from "./server-DAYUc_Js.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/dequal.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
var getGlobalStartContext = () => {
  const context = getStartContext().contextAfterGlobalMiddlewares;
  if (!context) throw new Error(`Global context not set yet, you are calling getGlobalStartContext() before the global middlewares are applied.`);
  return context;
};
var ClerkOptionsCtx = React__default.createContext(void 0);
ClerkOptionsCtx.displayName = "ClerkOptionsCtx";
var ClerkOptionsProvider = (props) => {
  const { children, options } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClerkOptionsCtx.Provider, { value: { value: options }, children });
};
var useAwaitableNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const resolveFunctionsRef = React__default.useRef([]);
  const resolveAll = () => {
    resolveFunctionsRef.current.forEach((resolve) => resolve());
    resolveFunctionsRef.current.splice(0, resolveFunctionsRef.current.length);
  };
  const [_, startTransition] = reactExports.useTransition();
  React__default.useEffect(() => {
    resolveAll();
  }, [location]);
  return (options) => {
    return new Promise((res) => {
      startTransition(() => {
        resolveFunctionsRef.current.push(res);
        res(navigate(options));
      });
    });
  };
};
var pickFromClerkInitState = (clerkInitState) => {
  const {
    __clerk_ssr_state,
    __publishableKey,
    __proxyUrl,
    __domain,
    __isSatellite,
    __signInUrl,
    __signUpUrl,
    __clerkJSUrl,
    __clerkJSVersion,
    __clerkUIUrl,
    __clerkUIVersion,
    __telemetryDisabled,
    __telemetryDebug,
    __unsafeDisableDevelopmentModeConsoleWarning,
    __signInForceRedirectUrl,
    __signUpForceRedirectUrl,
    __signInFallbackRedirectUrl,
    __signUpFallbackRedirectUrl,
    __keylessClaimUrl,
    __keylessApiKeysUrl,
    __prefetchUI
  } = clerkInitState || {};
  return {
    clerkSsrState: __clerk_ssr_state,
    publishableKey: __publishableKey,
    proxyUrl: __proxyUrl,
    domain: __domain,
    isSatellite: !!__isSatellite,
    signInUrl: __signInUrl,
    signUpUrl: __signUpUrl,
    __internal_clerkJSUrl: __clerkJSUrl,
    __internal_clerkJSVersion: __clerkJSVersion,
    __internal_clerkUIUrl: __clerkUIUrl,
    __internal_clerkUIVersion: __clerkUIVersion,
    prefetchUI: __prefetchUI,
    telemetry: {
      disabled: __telemetryDisabled,
      debug: __telemetryDebug
    },
    unsafe_disableDevelopmentModeConsoleWarning: __unsafeDisableDevelopmentModeConsoleWarning,
    signInForceRedirectUrl: __signInForceRedirectUrl,
    signUpForceRedirectUrl: __signUpForceRedirectUrl,
    signInFallbackRedirectUrl: __signInFallbackRedirectUrl,
    signUpFallbackRedirectUrl: __signUpFallbackRedirectUrl,
    __keylessClaimUrl,
    __keylessApiKeysUrl
  };
};
var mergeWithPublicEnvs = (restInitState) => {
  const envVars = getPublicEnvVariables();
  return {
    ...restInitState,
    publishableKey: restInitState.publishableKey || envVars.publishableKey,
    domain: restInitState.domain || envVars.domain,
    isSatellite: restInitState.isSatellite || envVars.isSatellite,
    signInUrl: restInitState.signInUrl || envVars.signInUrl,
    signUpUrl: restInitState.signUpUrl || envVars.signUpUrl,
    __internal_clerkJSUrl: restInitState.__internal_clerkJSUrl || envVars.clerkJsUrl,
    __internal_clerkJSVersion: restInitState.__internal_clerkJSVersion || envVars.clerkJsVersion,
    __internal_clerkUIUrl: restInitState.__internal_clerkUIUrl || envVars.clerkUIUrl,
    __internal_clerkUIVersion: restInitState.__internal_clerkUIVersion || envVars.clerkUIVersion,
    signInForceRedirectUrl: restInitState.signInForceRedirectUrl,
    prefetchUI: restInitState.prefetchUI ?? envVars.prefetchUI,
    unsafe_disableDevelopmentModeConsoleWarning: restInitState.unsafe_disableDevelopmentModeConsoleWarning ?? envVars.unsafeDisableDevelopmentModeConsoleWarning
  };
};
function parseUrlForNavigation(to, baseUrl) {
  const url = new URL(to, baseUrl);
  const searchParams = Object.fromEntries(url.searchParams);
  return {
    to: url.pathname,
    search: Object.keys(searchParams).length > 0 ? searchParams : void 0,
    hash: url.hash ? url.hash.slice(1) : void 0
  };
}
var SDK_METADATA = {
  name: "@clerk/tanstack-react-start",
  version: "1.2.7"
};
var awaitableNavigateRef = { current: void 0 };
function ClerkProvider({
  children,
  ...providerProps
}) {
  const awaitableNavigate = useAwaitableNavigate();
  const clerkInitialState = getGlobalStartContext()?.clerkInitialState ?? {};
  reactExports.useEffect(() => {
    awaitableNavigateRef.current = awaitableNavigate;
  }, [awaitableNavigate]);
  const clerkInitState = isClient() ? window.__clerk_init_state : clerkInitialState;
  const { clerkSsrState, __keylessClaimUrl, __keylessApiKeysUrl, ...restInitState } = pickFromClerkInitState(
    clerkInitState?.__internal_clerk_state
  );
  const mergedProps = {
    ...mergeWithPublicEnvs(restInitState),
    ...providerProps
  };
  const keylessProps = __keylessClaimUrl ? {
    __internal_keyless_claimKeylessApplicationUrl: __keylessClaimUrl,
    __internal_keyless_copyInstanceKeysUrl: __keylessApiKeysUrl
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScriptOnce, { children: `window.__clerk_init_state = ${JSON.stringify(clerkInitialState)};` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClerkOptionsProvider, { options: mergedProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      InternalClerkProvider,
      {
        initialState: clerkSsrState,
        sdkMetadata: SDK_METADATA,
        routerPush: (to) => {
          const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
          return awaitableNavigateRef.current?.({
            ...rest,
            search,
            hash,
            replace: false
          });
        },
        routerReplace: (to) => {
          const { search, hash, ...rest } = parseUrlForNavigation(to, window.location.origin);
          return awaitableNavigateRef.current?.({
            ...rest,
            search,
            hash,
            replace: true
          });
        },
        ...mergedProps,
        ...keylessProps,
        children
      }
    ) })
  ] });
}
ClerkProvider.displayName = "ClerkProvider";
const initialState = {
  mode: (typeof window !== "undefined" && localStorage.getItem("theme")) === "dark" ? "dark" : "light"
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    },
    setTheme(state, action) {
      state.mode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode);
      }
    }
  }
});
const { toggleTheme, setTheme } = themeSlice.actions;
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer
  }
});
const useAppDispatch = useDispatch.withTypes();
const useAppSelector = useSelector.withTypes();
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      position: "top-right",
      expand: true,
      richColors: true,
      closeButton: true,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: `
            group toast
            backdrop-blur-md
            bg-black/70
            border border-white/10
            text-white
            shadow-[0_8px_30px_rgb(0,0,0,0.35)]
            rounded-2xl
            px-5 py-4
            gap-3
            overflow-hidden
            before:absolute
            before:inset-0
            before:bg-gradient-to-br
            before:from-white/[0.08]
            before:to-transparent
            before:pointer-events-none
          `,
          title: `
            text-[15px]
            font-semibold
            tracking-[-0.02em]
            text-white
          `,
          description: `
            text-sm
            text-white/60
            leading-relaxed
          `,
          actionButton: `
            bg-white
            text-black
            hover:bg-white/90
            rounded-xl
            px-4
            py-2
            text-xs
            font-medium
            transition-all
          `,
          cancelButton: `
            bg-white/10
            backdrop-blur-sm
            border border-white/10
            text-white/70
            hover:bg-white/20
            rounded-xl
            px-4
            py-2
            text-xs
            transition-all
          `,
          success: `
            border border-emerald-500/20
          `,
          error: `
            border border-red-500/20
          `,
          warning: `
            border border-yellow-500/20
          `,
          info: `
            border border-blue-500/20
          `
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-BwBsrBIe.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      {
        name: "description",
        content: "Project Compass is a web application for managing projects and generating success stories."
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      {
        property: "og:description",
        content: "Project Compass is a web application for managing projects and generating success stories."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      {
        name: "twitter:description",
        content: "Project Compass is a web application for managing projects and generating success stories."
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69dff7a8-dca1-474f-a6ed-94b8cb93f1ce/id-preview-02b1fe29--8785d5f8-1a3b-4923-9f9c-637a758fc3f2.lovable.app-1778484082249.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69dff7a8-dca1-474f-a6ed-94b8cb93f1ce/id-preview-02b1fe29--8785d5f8-1a3b-4923-9f9c-637a758fc3f2.lovable.app-1778484082249.png"
      }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function ThemeInitializer() {
  const mode = useAppSelector((state) => state.theme.mode);
  reactExports.useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
  return null;
}
function RootComponent() {
  const { queryClient } = Route$3.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClerkProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Provider_default, { store, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeInitializer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$2 = () => import("./index-ByhyTUwF.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Project Vault — Success Story Manager"
    }, {
      name: "description",
      content: "Internal manager for tracking client projects and generating polished success stories."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./sign-up._-C45kKnYy.mjs");
const Route$1 = createFileRoute("/sign-up/$")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./sign-in._-BREsgBq9.mjs");
const Route = createFileRoute("/sign-in/$")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const SignUpSplatRoute = Route$1.update({
  id: "/sign-up/$",
  path: "/sign-up/$",
  getParentRoute: () => Route$3
});
const SignInSplatRoute = Route.update({
  id: "/sign-in/$",
  path: "/sign-in/$",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  SignInSplatRoute,
  SignUpSplatRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useAppDispatch as a,
  router as r,
  toggleTheme as t,
  useAppSelector as u
};
