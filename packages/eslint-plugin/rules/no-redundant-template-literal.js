/** @type {import("eslint").Rule.RuleModule} */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Template literal with single expression should be replaced with String casting.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      /**
       * @param {import("estree").TemplateLiteral} node
       */
      'TemplateLiteral[expressions.length=1][quasis.length=2][quasis.0.value.raw=""][quasis.1.value.raw=""]'(
        node,
      ) {
        context.report({
          node,
          message:
            "単一の式を含むテンプレートリテラルは冗長です。String でキャストしてください。",
          fix(fixer) {
            const expression = node.expressions[0];
            const text = sourceCode.getText(expression);
            return fixer.replaceText(node, `String(${text})`);
          },
        });
      },
    };
  },
};

module.exports = rule;
