import typescriptEslint from "@typescript-eslint/eslint-plugin";
import testingLibrary from "eslint-plugin-testing-library";
import tanstackEslintPluginQuery from "@tanstack/eslint-plugin-query";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/node_modules",
        "**/dist",
        "**/dev-dist",
        "**/sw.js",
        "**/generated.ts",
        "packages/components",
        "apps/integration-ui/src/locales/*",
        "apps/webapp/src/locales/*",
        "packages/widgets/src/locales/*",
    ],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "testing-library": testingLibrary,
        "@tanstack/query": tanstackEslintPluginQuery,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
            cy: true,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-var-requires": "off",
        "no-unused-vars": "off",
        "no-console": "off",
        "linebreak-style": ["error", "unix"],
        semi: ["error", "always"],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        "react/display-name": 0,
        "react/prop-types": "off",
        "react/react-in-jsx-scope": 0,
        "testing-library/await-async-query": "error",
        "testing-library/no-await-sync-query": "error",
        "testing-library/no-debug": "off",
        "testing-library/no-dom-import": "off",
        "ui-testing/no-hard-wait": "off",
    },
}, ...compat.extends("plugin:testing-library/react").map(config => ({
    ...config,
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
})), {
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],

    rules: {
        "testing-library/await-async-utils": "off",
        "testing-library/prefer-screen-queries": "off",
    },
}];