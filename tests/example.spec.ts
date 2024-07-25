import { test } from '@playwright/test'
import { TextBox } from '../pageObjects/textBox.page'

test.describe('Testing functionality of "Text Box" page', () => {
  let textBoxPage: TextBox

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBox(page)

    // instead must be methods that lead u to page from base to "Text Box"
    await page.goto('/text-box')
  })

  test('happy path', async () => {
    // that's how u use you're methods
    await textBoxPage.fillNameAndClickSubmitButton()
  })
})
