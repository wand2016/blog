import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next', 'next/core-web-vitals', 'prettier'),
  {
    plugins: { import: eslintPluginImport },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          named: true,
          'newlines-between': 'always',
        },
      ],
      'import/imports-first': 'error',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    },
  },
];

export default eslintConfig;
