import { c as SignUp$1, u as useRoutingProps, d as SignIn$1, e as UserProfile, O as OrganizationProfile, f as OrganizationList } from "../_libs/clerk__react.mjs";
import { g as useParams, f as useLocation } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
var usePathnameWithoutSplatRouteParams = () => {
  const { _splat } = useParams({
    strict: false
  });
  const { pathname } = useLocation();
  const splatRouteParam = _splat || "";
  const path = pathname.replace(splatRouteParam, "").replace(/\/$/, "").replace(/^\//, "").trim();
  const computedPath = `/${path}`;
  const stablePath = reactExports.useRef(computedPath);
  return stablePath.current;
};
Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(UserProfile, { ...useRoutingProps("UserProfile", props, { path }) });
  },
  { ...UserProfile }
);
Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizationProfile, { ...useRoutingProps("OrganizationProfile", props, { path }) });
  },
  { ...OrganizationProfile }
);
Object.assign(
  (props) => {
    const path = usePathnameWithoutSplatRouteParams();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OrganizationList, { ...useRoutingProps("OrganizationList", props, { path }) });
  },
  { ...OrganizationList }
);
var SignIn = (props) => {
  const path = usePathnameWithoutSplatRouteParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SignIn$1, { ...useRoutingProps("SignIn", props, { path }) });
};
var SignUp = (props) => {
  const path = usePathnameWithoutSplatRouteParams();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SignUp$1, { ...useRoutingProps("SignUp", props, { path }) });
};
export {
  SignUp as S,
  SignIn as a
};
