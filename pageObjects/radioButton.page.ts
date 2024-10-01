import { type Locator, type Page, expect } from '@playwright/test'

export default class RadioButtonPage {
  page: Page
  yesButton: Locator
  impressiveButton: Locator
  noButton: Locator

  constructor (page: Page) {
    this.page = page
    this.yesButton = page.locator('//input[@type="radio" and contains (@id, "yesRadio")]')
    this.impressiveButton = page.locator('//input[@id="impressiveRadio"]')
    this.noButton = page.locator('//label[@class="custom-control-label disabled"]')
  }

  async isButtonDisabled (): Promise<void> {
    await expect(this.noButton).toBeDisabled()
  }

  async clickYesButton (): Promise<void> {
    await expect(this.yesButton).toBeVisible()
    await this.yesButton.click({ force: true })
    await expect(this.yesButton).toBeChecked()
  }

  async clickImpressiveButton (): Promise<void> {
    await expect(this.impressiveButton).toBeVisible()
    await this.impressiveButton.click({ force: true })
    await expect(this.impressiveButton).toBeChecked()
  }

  async checkisElementVisibleInResult (element: string): Promise<boolean> {
    return await this.page.locator(`//p/span[text()="${element}"]`).isVisible()
  }
}
