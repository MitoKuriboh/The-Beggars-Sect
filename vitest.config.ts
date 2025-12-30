import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Use globals so we don't need to import describe, it, expect in every file
    globals: true,
    // Environment for testing (node since this is a CLI app)
    environment: "node",
    // Test file patterns
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts", "src/index.tsx"],
    },
  },
});
