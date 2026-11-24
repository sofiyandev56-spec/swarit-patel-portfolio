import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent tooling checked in alongside the site, not part of it.
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".cursor/**",
    ".github/skills/**",
    ".grok/**",
  ]),
]);

export default eslintConfig;
