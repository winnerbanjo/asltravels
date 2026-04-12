import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [
      ".next/**",
      ".next_*/**",
      ".next_broken_*/**",
      ".next_corrupt_*/**",
      ".next_runtimefix_*/**",
      ".next_editorfix_*/**",
      ".next_providerfix_*/**",
      ".next_restartfix_*/**",
      ".next_sessionfix_*/**",
      ".next_speedfix_*/**",
      ".next_creditfix_*/**",
      ".next_runtimeclear_*/**",
      ".next_localfix_*/**",
      "node_modules/**",
      ".node_modules_bak_20260411_1806/**",
    ],
  },
];

export default config;
