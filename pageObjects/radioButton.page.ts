import { type Locator, type Page, expect } from '@playwright/test'

export default class RadioButtonPage {
  page: Page
  noButton: Locator
  radioButtons: { [key: string]: string } = {
    Yes: '//input[@id="yesRadio"]',
    Impressive: '//input[@id="impressiveRadio"]'
  }

  constructor (page: Page) {
    this.page = page
    this.noButton = page.locator('//label[@class="custom-control-label disabled"]')
  }

  async clickRadioButtonByName (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.radioButtons[key])
    await expect(locator).toBeVisible()
    await locator.click({ force: true })
    await expect(locator).toBeChecked()
  }

  async isButtonDisabled (): Promise<void> {
    await expect(this.noButton).toBeDisabled()
  }

  async checkisElementVisibleInResult (element: string): Promise<boolean> {
    return await this.page.locator(`//p/span[text()="${element}"]`).isVisible()
  }
}
