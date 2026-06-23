const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, 
  workers: process.env.CI ? 1 : 2, 
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
  
  use: {
    baseURL: 'https://www.automationexercise.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    navigationTimeout: 30000,  
    actionTimeout: 15000,      
  },

  webServer: undefined,

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        navigationTimeout: 40000,  
        actionTimeout: 20000,
      },
    },

    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        navigationTimeout: 40000,
        actionTimeout: 20000,
      },
    },
  ],

  
  timeout: 120000,  
  expect: {
    timeout: 10000,
  },
});