import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
      "no-undef": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];

export default eslintConfig;
