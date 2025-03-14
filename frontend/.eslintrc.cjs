module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:promise/recommended',
    'plugin:testing-library/react',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'unused-imports',
    'promise',
    'testing-library',
    'import'
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', './tsconfig.eslint.json']
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
        paths: ['src']
      },
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    }
  },
  rules: {
    // 基础规则
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    
    // TypeScript 规则
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', {
      'vars': 'all',
      'varsIgnorePattern': '^_',
      'args': 'after-used',
      'argsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    
    // React 规则
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    
    // 导入规则
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'type',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'pathGroups': [
        {
          'pattern': '@/**',
          'group': 'internal',
          'position': 'before'
        },
        {
          'pattern': '@/**/*.types',
          'group': 'type',
          'position': 'before'
        },
        {
          'pattern': '@/types/**',
          'group': 'type',
          'position': 'before'
        }
      ],
      'pathGroupsExcludedImportTypes': ['type'],
      'newlines-between': 'always',
      'alphabetize': { 'order': 'asc' },
      'warnOnUnassignedImports': true
    }],
    'import/no-duplicates': 'error',
    'import/no-unresolved': ['error', {
      'ignore': ['^@/']  // 忽略 @ 开头的路径
    }],
    
    // 未使用的导入
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'varsIgnorePattern': '^_',
        'args': 'after-used',
        'argsIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }
    ],
    
    // Promise 规则
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/catch-or-return': 'error',

    // Testing Library 规则
    'testing-library/await-async-queries': 'error',
    'testing-library/no-await-sync-events': 'error',
    'testing-library/no-container': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-node-access': 'warn',
    'testing-library/no-wait-for-multiple-assertions': 'warn',
    'testing-library/prefer-screen-queries': 'warn',
    'testing-library/no-unnecessary-act': 'warn'
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'off'
      }
    },
    {
      files: ['vite.config.ts', 'vitest.config.ts'],
      env: {
        node: true
      }
    },
    {
      // 对于类型定义文件，放宽未使用变量的规则
      files: ['**/types/**/*.ts'],
      rules: {
        'unused-imports/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 'off'
      }
    }
  ]
}; 