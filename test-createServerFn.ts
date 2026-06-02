import { createServerFn } from "@tanstack/react-start";
const fn1 = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => { return data });

const fn2 = createServerFn({ method: "GET" })
  .handler(async (ctx: any) => { return ctx.data });
