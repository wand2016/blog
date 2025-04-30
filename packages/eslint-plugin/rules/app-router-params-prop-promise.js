/** @type {import("eslint").Rule.RuleModule} */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "App Router params prop should be a Promise.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    const filename = context.filename ?? context.getFilename();
    const sourceCode = context.sourceCode ?? context.getSourceCode();

    return {
      /**
       * @param {import("@typescript-eslint/typescript-estree").TSESTree.TSPropertySignature} node
       */
      'Program > TSTypeAliasDeclaration:has(>Identifier[name="Props"]) > TSTypeLiteral > TSPropertySignature:has(>Identifier[name="params"]):not([typeAnnotation.typeAnnotation.type="TSTypeReference"][typeAnnotation.typeAnnotation.typeName.type="Identifier"][typeAnnotation.typeAnnotation.typeName.name="Promise"])'(
        node,
      ) {
        if (!filename.includes("/app/")) return;

        context.report({
          node,
          message:
            "App Router 配下のページの params prop は Promise である必要があります。",
          fix(fixer) {
            const typeAnnotation = sourceCode.getText(
              node.typeAnnotation.typeAnnotation,
            );
            const newTypeAnnotation = `Promise<${typeAnnotation}>`;
            return fixer.replaceText(
              node.typeAnnotation.typeAnnotation,
              newTypeAnnotation,
            );
          },
        });
      },
    };
  },
};

module.exports = rule;
