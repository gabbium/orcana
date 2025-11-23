import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import query from "@tanstack/eslint-plugin-query";
import router from "@tanstack/eslint-plugin-router";
import importer from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
      jsxA11y.flatConfigs.recommended,
      importer.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
]);
