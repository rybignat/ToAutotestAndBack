const now = new Date()
const timestamp = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}-${now.toTimeString().split(' ')[0]}`


import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config'
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Запуск тестов в параллельном режиме
  forbidOnly: !!process.env.CI, // Запрет использования test.only в CI
  retries: process.env.CI ? 2 : 0, // Повторные попытки в CI
  workers: process.env.CI ? 4 : 4, // Количество воркеров в CI
  reportSlowTests: null,
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: false,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN,
          },
          project: process.env.QASE_TESTOPS_PROJECT,
          uploadAttachments: true,
          run: {
            complete: true,
            title: timestamp
          }
        },
      },
    ],
  ],

  use: {
    baseURL: 'https://demoqa.com/',
    trace: 'on-first-retry',
    screenshot: {
      mode: "only-on-failure",
      fullPage: true
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: isGitHubActions,
      },
    },
  ],

  // Включение локального dev-сервера перед запуском тестов (если требуется)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
