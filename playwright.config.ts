import { defineConfig, devices } from '@playwright/test';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Запуск тестов в параллельном режиме
  forbidOnly: !!process.env.CI, // Запрет использования test.only в CI
  retries: process.env.CI ? 2 : 0, // Повторные попытки в CI
  workers: process.env.CI ? 1 : 1, // Количество воркеров в CI
  reportSlowTests: null,
  reporter: [['list'], ['./Utils/customReporter.ts']], // Используемый репортер

  use: {
    baseURL: 'https://demoqa.com/',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],

  // Включение локального dev-сервера перед запуском тестов (если требуется)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
