import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Browser / React source files
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended", pluginReact.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    settings: { react: { version: "detect" } },
    rules: {
      // React 17+ JSX transform does not require React in scope
      "react/react-in-jsx-scope": "off",
    },
  },

  // Node context files (Playwright + scripts)
  {
    files: ["playwright.config.js", "scripts/**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
]);
