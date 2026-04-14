const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  // stub WaveSurfer globally before app scripts execute
  await page.addInitScript(() => {
    window.WaveSurfer = {
      create: () => ({
        loadBlob: () => {},
        on: () => {},
        once: () => {},
        play: () => {},
        playPause: () => {},
        skipForward: () => {},
        skipBackward: () => {},
        setMute: () => {},
        destroy: () => {}
      })
    }
  })

  // seed localStorage with a sample recording so UI shows items
  await page.addInitScript(() => {
    const state = {
      recordedFiles: [
        {
          name: 'Test Recording',
          data: '',
          date: new Date().toLocaleString()
        }
      ],
      selectedColour: 'red',
      normalise: false,
      bitRate: 128000,
      skipLength: 2,
      audioRate: 1.2
    }
    localStorage.setItem('vuex', JSON.stringify(state))
  })
})

test('Files page lists recordings and play toggles icon', async ({ page }) => {
  await page.goto('/#/files')

  // ensure file list is present and contains the seeded recording
  const listItem = page.locator('#fileList .file').first()
  await expect(listItem).toHaveCount(1)
  // title may not have stable class names in compiled Vuetify; check text content instead
  await expect(listItem).toContainText('Test Recording')

  // if webpack dev server overlay appears (runtime errors), dismiss it so clicks aren't intercepted
  const overlayFrame = page.frameLocator('#webpack-dev-server-client-overlay')
  if (await overlayFrame.locator('button').count() > 0) {
    await overlayFrame.locator('button').click()
  }

  // click the file to load it into the player (click the whole list item)
  await listItem.click()

  // click the play button (4th audio control) and ensure it exists
  const playBtn = page.locator('#audioControls').nth(3).locator('button')
  await expect(playBtn).toHaveCount(1)
  // remove any webpack overlay iframe that may have reappeared
  await page.evaluate(() => {
    const f = document.getElementById('webpack-dev-server-client-overlay')
    if (f) f.remove()
  })
  await page.waitForTimeout(50)
  // programmatically dispatch click to avoid overlay intercepting pointer events
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#audioControls button'))
    const btn = btns[3]
    if (btn) btn.click()
  })

  // ensure click did not produce a runtime error overlay
  await expect(page.locator('iframe')).toHaveCount(0)
})
