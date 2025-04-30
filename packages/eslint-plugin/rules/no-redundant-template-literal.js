/** @type {import("eslint").Rule.RuleModule} */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "children: ReactNode should be replaced with PropsWithChildren.",
    },
    fixable: undefined,
    schema: [],
  },
  create(context) {
    return {
      /**
       * @param {import("estree").TemplateLiteral} node
       */
      'TemplateLiteral[expressions.length=1][quasis.length=2][quasis.0.value.raw=""][quasis.1.value.raw=""]'(
        node,
      ) {
        context.report({
          node,
          message: "boo",
        });
      },
    };
  },
};

module.exports = rule;
