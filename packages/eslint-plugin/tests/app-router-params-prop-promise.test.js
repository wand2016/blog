const { RuleTester } = require("eslint");
const rule = require("../rules/app-router-params-prop-promise");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2023,
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
    },
  },
});

ruleTester.run("app-router-params-prop-promise", rule, {
  valid: [
    {
      code: `
type Props = {
  params: Promise<{
    id: string;
  }>;
}        
`,
      filename: "app/hoge/page.tsx",
    },
    {
      code: `
type Props = {
  params: {
    id: string;
  };
}        
`,
      filename: "libs/hoge.ts",
    },
  ],
  invalid: [
    {
      code: `
type Props = {
  params: {
    id: string;
  };
}        
`,
      filename: "app/hoge/page.tsx",
      errors: [
        {
          message:
            "App Router 配下のページの params prop は Promise である必要があります。",
          line: 3,
          endLine: 5,
          column: 3,
          endColumn: 5,
        },
      ],
    },
  ],
});
