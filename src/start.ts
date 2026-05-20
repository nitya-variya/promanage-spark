import { clerkMiddleware } from "@clerk/tanstack-react-start/server";
import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error("Caught in errorMiddleware:", error);
    const errorMessage = error instanceof Error ? error.stack || error.message : String(error);
    return new Response(`Server Error:\n${errorMessage}`, {
      status: 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [clerkMiddleware(), errorMiddleware],
}));
