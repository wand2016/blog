const { RuleTester } = require("eslint");
const rule = require("../rules/no-redundant-template-literal");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2023,
  },
});

ruleTester.run("no-redundant-template-literal", rule, {
  valid: [
    {
      code: "`foo`",
    },
    {
      code: "`foo${bar}baz`",
    },
    {
      code: "`${foo}${bar}`",
    },
    {
      code: "`${foo} `",
    },
    {
      code: "` ${foo}`",
    },
    {
      code: "` ${foo} `",
    },
  ],
  invalid: [
    {
      code: "`${foo}`",
      errors: [
        {
          message: "boo",
          line: 1,
          endLine: 1,
          column: 1,
          endColumn: 9,
        },
      ],
    },
  ],
});
