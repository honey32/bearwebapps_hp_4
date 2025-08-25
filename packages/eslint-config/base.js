import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import importX from "eslint-plugin-import-x";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "import-x": importX,
    },
    settings: {
      "import-x/internal-regex": "^@repo/",
    },
    rules: {
      "import-x/order": [
        "error",
        {
          distinctGroup: false,
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: [],
          alphabetize: {
            order: "desc",
            caseInsensitive: true,
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            // フレームワークは builtin 扱い
            { pattern: "{next,react,react-dom}", group: "builtin" },
            { pattern: "{next,react,react-dom}/**", group: "builtin" },
            // subpath-import
            { pattern: "#*", group: "internal", position: "after" },
            // ルート相対パス
            { pattern: "@/**", group: "internal", position: "after" },
            // css modules は、なるべく最後に置く
            {
              pattern: "{.,..}/**/*.module.{css,scss}",
              group: "unknown",
              position: "after",
            },
          ],
        },
      ],
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
