import { r as renderErrorPage } from "./index.mjs";
import { c as createClerkRequest, a as constants, A as AuthStatus, b as createClerkClient, d as debugRequestState } from "../_libs/clerk__backend.mjs";
import { N as isTruthy, g as getEnvVariable, O as isDevelopmentEnvironment, P as handleNetlifyCacheInDevInstance, Q as apiUrlFromPublishableKey, R as isProxyUrlRelative, S as isHttpOrHttps, B as isDevelopmentFromSecretKey, U as resolveKeysWithKeylessFallback$1, V as createKeylessService, W as createNodeFileStorage } from "../_libs/clerk__shared.mjs";
import { e as errorThrower, g as getPublicEnvVariables } from "./env-BMKBizYn.mjs";
import * as fs from "fs";
import * as path from "path";
import "node:crypto";
import "../_libs/react.mjs";
import "../_libs/dequal.mjs";
var createMiddleware = (options, __opts) => {
  const resolvedOptions = {
    type: "request",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { middleware }));
    },
    inputValidator: (inputValidator) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { inputValidator }));
    },
    client: (client) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { client }));
    },
    server: (server) => {
      return createMiddleware({}, Object.assign(resolvedOptions, { server }));
    }
  };
};
function dedupeSerializationAdapters(deduped, serializationAdapters) {
  for (let i = 0, len = serializationAdapters.length; i < len; i++) {
    const current = serializationAdapters[i];
    if (!deduped.has(current)) {
      deduped.add(current);
      if (current.extends) dedupeSerializationAdapters(deduped, current.extends);
    }
  }
}
var createStart = (getOptions) => {
  return {
    getOptions: async () => {
      const options = await getOptions();
      if (options.serializationAdapters) {
        const deduped = /* @__PURE__ */ new Set();
        dedupeSerializationAdapters(deduped, options.serializationAdapters);
        options.serializationAdapters = Array.from(deduped);
      }
      return options;
    },
    createMiddleware
  };
};
var commonEnvs = () => {
  const publicEnvs = getPublicEnvVariables();
  return {
    // Public environment variables
    CLERK_JS_VERSION: publicEnvs.clerkJsVersion,
    CLERK_JS_URL: publicEnvs.clerkJsUrl,
    CLERK_UI_URL: publicEnvs.clerkUIUrl,
    CLERK_UI_VERSION: publicEnvs.clerkUIVersion,
    PREFETCH_UI: publicEnvs.prefetchUI,
    PUBLISHABLE_KEY: publicEnvs.publishableKey,
    DOMAIN: publicEnvs.domain,
    PROXY_URL: publicEnvs.proxyUrl,
    IS_SATELLITE: publicEnvs.isSatellite,
    SIGN_IN_URL: publicEnvs.signInUrl,
    SIGN_UP_URL: publicEnvs.signUpUrl,
    TELEMETRY_DISABLED: publicEnvs.telemetryDisabled,
    TELEMETRY_DEBUG: publicEnvs.telemetryDebug,
    // Server-only environment variables
    API_VERSION: getEnvVariable("CLERK_API_VERSION") || "v1",
    SECRET_KEY: getEnvVariable("CLERK_SECRET_KEY"),
    MACHINE_SECRET_KEY: getEnvVariable("CLERK_MACHINE_SECRET_KEY"),
    ENCRYPTION_KEY: getEnvVariable("CLERK_ENCRYPTION_KEY"),
    CLERK_JWT_KEY: getEnvVariable("CLERK_JWT_KEY"),
    API_URL: getEnvVariable("CLERK_API_URL") || apiUrlFromPublishableKey(publicEnvs.publishableKey),
    SDK_METADATA: {
      name: "@clerk/tanstack-react-start",
      version: "1.2.7",
      environment: getEnvVariable("NODE_ENV")
    }
  };
};
var clerkClient = (options) => {
  const commonEnv = commonEnvs();
  return createClerkClient({
    secretKey: commonEnv.SECRET_KEY,
    machineSecretKey: commonEnv.MACHINE_SECRET_KEY,
    publishableKey: commonEnv.PUBLISHABLE_KEY,
    apiUrl: commonEnv.API_URL,
    apiVersion: commonEnv.API_VERSION,
    userAgent: `${"@clerk/tanstack-react-start"}@${"1.2.7"}`,
    proxyUrl: commonEnv.PROXY_URL,
    domain: commonEnv.DOMAIN,
    isSatellite: commonEnv.IS_SATELLITE,
    sdkMetadata: commonEnv.SDK_METADATA,
    telemetry: {
      disabled: commonEnv.TELEMETRY_DISABLED,
      debug: commonEnv.TELEMETRY_DEBUG
    },
    ...options
  });
};
var KEYLESS_DISABLED = isTruthy(getEnvVariable("VITE_CLERK_KEYLESS_DISABLED")) || isTruthy(getEnvVariable("CLERK_KEYLESS_DISABLED")) || false;
var canUseKeyless = isDevelopmentEnvironment() && !KEYLESS_DISABLED;
function createFileStorage(options = {}) {
  const { cwd = () => process.cwd() } = options;
  return createNodeFileStorage(fs, path, {
    cwd,
    frameworkPackageName: "@clerk/tanstack-react-start"
  });
}
var keylessServiceInstance = null;
function keyless() {
  if (!keylessServiceInstance) {
    keylessServiceInstance = createKeylessService({
      storage: createFileStorage(),
      api: {
        async createAccountlessApplication(requestHeaders) {
          try {
            return await clerkClient().__experimental_accountlessApplications.createAccountlessApplication({
              requestHeaders
            });
          } catch {
            return null;
          }
        },
        async completeOnboarding(requestHeaders) {
          try {
            return await clerkClient().__experimental_accountlessApplications.completeAccountlessApplicationOnboarding({
              requestHeaders
            });
          } catch {
            return null;
          }
        }
      },
      framework: "tanstack-react-start"
    });
  }
  return keylessServiceInstance;
}
function resolveKeysWithKeylessFallback(configuredPublishableKey, configuredSecretKey) {
  return resolveKeysWithKeylessFallback$1(configuredPublishableKey, configuredSecretKey, keyless(), canUseKeyless);
}
var loadOptions = (request, overrides = {}) => {
  const commonEnv = commonEnvs();
  const secretKey = overrides.secretKey || commonEnv.SECRET_KEY;
  const machineSecretKey = overrides.machineSecretKey || commonEnv.MACHINE_SECRET_KEY;
  const publishableKey = overrides.publishableKey || commonEnv.PUBLISHABLE_KEY;
  const jwtKey = overrides.jwtKey || commonEnv.CLERK_JWT_KEY;
  const apiUrl = getEnvVariable("CLERK_API_URL") || apiUrlFromPublishableKey(publishableKey);
  const domain = overrides.domain || commonEnv.DOMAIN;
  const isSatellite = overrides.isSatellite || commonEnv.IS_SATELLITE;
  const relativeOrAbsoluteProxyUrl = overrides.proxyUrl || commonEnv.PROXY_URL;
  const signInUrl = overrides.signInUrl || commonEnv.SIGN_IN_URL;
  const signUpUrl = overrides.signUpUrl || commonEnv.SIGN_UP_URL;
  const satelliteAutoSync = overrides.satelliteAutoSync;
  let proxyUrl;
  if (!!relativeOrAbsoluteProxyUrl && isProxyUrlRelative(relativeOrAbsoluteProxyUrl)) {
    proxyUrl = new URL(relativeOrAbsoluteProxyUrl, request.clerkUrl).toString();
  } else {
    proxyUrl = relativeOrAbsoluteProxyUrl;
  }
  if (!secretKey && !canUseKeyless) {
    throw errorThrower.throw("Clerk: no secret key provided");
  }
  if (isSatellite && !proxyUrl && !domain) {
    throw errorThrower.throw("Clerk: satellite mode requires a proxy URL or domain");
  }
  if (isSatellite && secretKey && !isHttpOrHttps(signInUrl) && isDevelopmentFromSecretKey(secretKey)) {
    throw errorThrower.throw("Clerk: satellite mode requires a sign-in URL in production");
  }
  return {
    // used to append options that are not initialized from env
    ...overrides,
    secretKey,
    machineSecretKey,
    publishableKey,
    jwtKey,
    apiUrl,
    domain,
    isSatellite,
    proxyUrl,
    signInUrl,
    signUpUrl,
    satelliteAutoSync
  };
};
var wrapWithClerkState = (data) => {
  return { __internal_clerk_state: { ...data } };
};
function getPrefetchUIFromEnv() {
  if (getEnvVariable("CLERK_PREFETCH_UI") === "false") {
    return false;
  }
  return void 0;
}
function getUnsafeDisableDevelopmentModeConsoleWarningFromEnv() {
  const value = getEnvVariable("VITE_CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING") || getEnvVariable("CLERK_UNSAFE_DISABLE_DEVELOPMENT_MODE_CONSOLE_WARNING");
  return value ? isTruthy(value) : void 0;
}
function getResponseClerkState(requestState, additionalStateOptions = {}) {
  const { reason, message, isSignedIn, ...rest } = requestState;
  const clerkInitialState = wrapWithClerkState({
    __clerk_ssr_state: rest.toAuth(),
    __publishableKey: requestState.publishableKey,
    __proxyUrl: requestState.proxyUrl,
    __domain: requestState.domain,
    __isSatellite: requestState.isSatellite,
    __signInUrl: requestState.signInUrl,
    __signUpUrl: requestState.signUpUrl,
    __afterSignInUrl: requestState.afterSignInUrl,
    __afterSignUpUrl: requestState.afterSignUpUrl,
    __clerk_debug: debugRequestState(requestState),
    __clerkJSUrl: getEnvVariable("CLERK_JS") || getEnvVariable("CLERK_JS_URL"),
    __clerkJSVersion: getEnvVariable("CLERK_JS_VERSION"),
    __clerkUIUrl: getEnvVariable("CLERK_UI_URL"),
    __clerkUIVersion: getEnvVariable("CLERK_UI_VERSION"),
    __prefetchUI: getPrefetchUIFromEnv(),
    __telemetryDisabled: isTruthy(getEnvVariable("CLERK_TELEMETRY_DISABLED")),
    __telemetryDebug: isTruthy(getEnvVariable("CLERK_TELEMETRY_DEBUG")),
    __unsafeDisableDevelopmentModeConsoleWarning: getUnsafeDisableDevelopmentModeConsoleWarningFromEnv(),
    __signInForceRedirectUrl: additionalStateOptions.signInForceRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FORCE_REDIRECT_URL") || "",
    __signUpForceRedirectUrl: additionalStateOptions.signUpForceRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FORCE_REDIRECT_URL") || "",
    __signInFallbackRedirectUrl: additionalStateOptions.signInFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_IN_FALLBACK_REDIRECT_URL") || "",
    __signUpFallbackRedirectUrl: additionalStateOptions.signUpFallbackRedirectUrl || getEnvVariable("CLERK_SIGN_UP_FALLBACK_REDIRECT_URL") || ""
  });
  return clerkInitialState;
}
var patchRequest = (request) => {
  const clonedRequest = new Request(request.url, {
    headers: request.headers,
    method: request.method,
    redirect: request.redirect,
    cache: request.cache
  });
  if (clonedRequest.method !== "GET" && clonedRequest.body !== null && !("duplex" in clonedRequest)) {
    clonedRequest.duplex = "half";
  }
  return clonedRequest;
};
var clerkMiddleware = (options) => {
  return createMiddleware().server(async ({ request, next }) => {
    const clerkRequest = createClerkRequest(patchRequest(request));
    const resolvedOptions = options;
    const loadedOptions = loadOptions(clerkRequest, {
      ...resolvedOptions,
      publishableKey: resolvedOptions?.publishableKey,
      secretKey: resolvedOptions?.secretKey
    });
    const {
      publishableKey,
      secretKey,
      claimUrl: keylessClaimUrl,
      apiKeysUrl: keylessApiKeysUrl
    } = await resolveKeysWithKeylessFallback(loadedOptions.publishableKey, loadedOptions.secretKey);
    if (publishableKey) {
      loadedOptions.publishableKey = publishableKey;
    }
    if (secretKey) {
      loadedOptions.secretKey = secretKey;
    }
    const requestState = await clerkClient().authenticateRequest(clerkRequest, {
      ...loadedOptions,
      acceptsToken: "any"
    });
    const locationHeader = requestState.headers.get(constants.Headers.Location);
    if (locationHeader) {
      handleNetlifyCacheInDevInstance({
        locationHeader,
        requestStateHeaders: requestState.headers,
        publishableKey: requestState.publishableKey
      });
      throw new Response(null, { status: 307, headers: requestState.headers });
    }
    if (requestState.status === AuthStatus.Handshake) {
      throw new Error("Clerk: handshake status without redirect");
    }
    const clerkInitialState = getResponseClerkState(requestState, loadedOptions);
    if (canUseKeyless && keylessClaimUrl) {
      clerkInitialState.__internal_clerk_state = {
        ...clerkInitialState.__internal_clerk_state,
        __keylessClaimUrl: keylessClaimUrl,
        __keylessApiKeysUrl: keylessApiKeysUrl
      };
    }
    const result = await next({
      context: {
        clerkInitialState,
        auth: (opts) => requestState.toAuth(opts)
      }
    });
    if (requestState.headers) {
      requestState.headers.forEach((value, key) => {
        result.response.headers.append(key, value);
      });
    }
    return result;
  });
};
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" }
    });
  }
});
const startInstance = createStart(() => ({
  requestMiddleware: [clerkMiddleware(), errorMiddleware]
}));
export {
  startInstance
};
