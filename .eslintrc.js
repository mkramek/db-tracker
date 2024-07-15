module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:node/recommended", "plugin:import/errors", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ["import", "prettier", "node"],
  rules: {
    "node/no-unsupported-features/es-syntax": "warn",
    "no-undef": "warn",
    "no-extra-boolean-cast": "warn",
    "no-unused-vars": "warn",
    "node/no-extraneous-require": "warn",
    "node/no-unsupported-features/node-builtins": "warn",
    "no-process-exit": "warn",
    "node/no-missing-require": "warn",
    "node/no-unsupported-features/es-builtins": "warn",
    "node/no-unpublished-require": "warn",
    "no-unreachable": "warn",
    "prettier/prettier": "warn",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".json"],
      },
    },
  },
};
