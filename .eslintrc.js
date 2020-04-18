module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier"
    ],
    parser: "babel-eslint",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["react", "jsx-a11y", "import", "react-hooks"],
    rules: {
        "no-unused-vars": 1,
        "react/prop-types": 0,
        "no-console": 1,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1
    }
};