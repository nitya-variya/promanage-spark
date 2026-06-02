import { createServerFn } from "@tanstack/react-start";

console.log("createServerFn typeof:", typeof createServerFn);
try {
  const fn = createServerFn({ method: "GET" }).handler(async () => {
    return { ok: true };
  });
  console.log("fn defined successfully", typeof fn);
} catch (e) {
  console.error("Error defining fn:", e);
}
