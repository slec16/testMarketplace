// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config(
//   { ignores: ['dist', 'coverage', '*.config.ts'] },
//   {
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//     },
//   },
// )


// Импорт необходимых модулей
import js from '@eslint/js'; // Базовые правила ESLint
import globals from 'globals'; // Глобальные переменные (браузер, node и т.д.)
import tsParser from '@typescript-eslint/parser'; // Парсер TypeScript
import tsPlugin from '@typescript-eslint/eslint-plugin'; // Плагин TypeScript
import reactPlugin from 'eslint-plugin-react'; // Плагин React
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'; // Плагин Fast Refresh

export default [
  // Базовые настройки для всех файлов
  {
    ignores: [
      '**/dist/**', // Игнорируем папку сборки
      '**/coverage/**', // Игнорируем отчеты тестов
      'vite.config.*', // Игнорируем конфиг Vite
      '*.config.js',
      '*.config.ts'
    ]
  },

  // Настройки для JavaScript/TypeScript файлов
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Поддержка современного JavaScript
      sourceType: 'module', // Используем ES-модули
      globals: {
        ...globals.browser, // Глобальные переменные браузера (window, document и т.д.)
        ...globals.node // Глобальные переменные Node.js (если нужно)
      },
      parser: tsParser, // Парсер TypeScript
      parserOptions: {
        project: true, // Автоматически ищет tsconfig.json
        tsconfigRootDir: import.meta.dirname // Корневая директория проекта
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,

    },
    rules: {
      // Базовые правила
      'no-console': 'warn', // Предупреждаем об использовании console.log
      'no-unused-vars': 'off', // Отключаем встроенное правило (заменит TypeScript)

      // TypeScript правила
      '@typescript-eslint/no-unused-vars': 'warn', // Лучшая проверка неиспользуемых переменных
      '@typescript-eslint/explicit-function-return-type': 'off', // Не требовать указания типов возврата

      // React правила
      'react/react-in-jsx-scope': 'off', // Не требовать импорт React в новых версиях
      'react/jsx-uses-react': 'error', // Предотвращает пометку React как неиспользуемый
      'react/jsx-uses-vars': 'error', // Обнаруживает неиспользуемые JSX-переменные

      // React Hooks правила
      'react-hooks/rules-of-hooks': 'error', // Проверяет правила хуков
      'react-hooks/exhaustive-deps': 'warn', // Проверяет зависимости эффектов

      // React Refresh (для Vite)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true } // Разрешает экспорт констант
      ],

    
    },
    settings: {
      react: {
        version: 'detect' // Автоматически определяет версию React
      },
      
    }
  },

  // Дополнительные настройки только для TypeScript файлов
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn', // Предупреждает об использовании any
      '@typescript-eslint/consistent-type-imports': 'error' // Требует явного указания type/interface
    }
  }
];