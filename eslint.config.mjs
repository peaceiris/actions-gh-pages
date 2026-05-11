import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['coverage/**', 'lib/**', 'node_modules/**']
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['src/**/*.ts', '__tests__/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.es2022,
        ...globals.node
      },
      sourceType: 'module'
    }
  },
  {
    files: ['__tests__/**/*.ts'],
    ...jestPlugin.configs['flat/recommended']
  },
  prettierRecommended
];
