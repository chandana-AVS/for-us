export async function register() {
  if (typeof window === "undefined" && process?.env?.NEXT_RUNTIME === "nodejs") {
    try {
      console.log("Initializing Observability Stack (Logs & Traces)...");
    } catch (error) {
      console.error("Failed to initialize instrumentation:", error);
    }
  }
}
