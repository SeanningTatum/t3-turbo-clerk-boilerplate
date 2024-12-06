// eslint-disable-next-line import/no-anonymous-default-export
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      ["ai-chat", "api", "config", "db", "tooling", "ui", "validators"],
    ],
    "type-enum": [
      2,
      "always",
      [
        "analytics",
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "rfc",
      ],
    ],
  },
};
