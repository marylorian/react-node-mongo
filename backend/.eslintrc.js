module.exports = {
  env: {
    node: true,
    es2021: true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:node/recommended"
  ],
  parser: "@typescript-eslint/parser",
    "parserOptions": {
      ecmaVersion: 'latest',
      sourceType: 'module',
      "project": "./tsconfig.json"
    },
    plugins: ['@typescript-eslint'],
    "rules": {
      "max-len": [
        "warn",
        {
          "code": 80
        }
      ],
      "comma-dangle": ["warn", "always-multiline"],
      "no-console": 1,
      "no-extra-boolean-cast": 0,
      "semi": 1,
      "indent": ["warn", 2],
      "@typescript-eslint/no-misused-promises": 0,
      "@typescript-eslint/no-floating-promises": 0,
      "node/no-process-env": 1,
      "node/no-unsupported-features/es-syntax": [
        "error",
        { "ignores": ["modules"] }
      ],
      "node/no-missing-import": 0,
      "node/no-unpublished-import": 0
    },
    "settings": {
      "node": {
        "tryExtensions": [".js", ".json", ".node", ".ts"]
      }
    }
  }

