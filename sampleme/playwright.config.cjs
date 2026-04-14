/** @type {import('@playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: 'tests/e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:8081'
  },
  webServer: {
    command: 'npm run serve',
    port: 8081,
    reuseExistingServer: true
  }
}
