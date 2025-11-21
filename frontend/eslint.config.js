import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import router from "@tanstack/eslint-plugin-router";
import { defineConfig } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import globals from "globals";

const ignorePath = fileURLToPath(new URL(".prettierignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(ignorePath, "Imported .prettierignore patterns"),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      query.configs["flat/recommended"],
      router.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]);
