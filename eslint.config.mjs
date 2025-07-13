import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import typescriptParser from "@typescript-eslint/parser";
import checkFile from "eslint-plugin-check-file";
import drizzle from "eslint-plugin-drizzle";
import n from "eslint-plugin-n";
import tailwind from "eslint-plugin-tailwindcss";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "plugin:drizzle/recommended"
  ),
  ...pluginQuery.configs["flat/recommended"],
  ...tailwind.configs["flat/recommended"],
  {
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      "check-file": checkFile,
      n,
      drizzle,
    },
    rules: {
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",
      quotes: ["error", "double"],
      "n/no-process-env": "off",
      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx,js,jsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE",
        },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
