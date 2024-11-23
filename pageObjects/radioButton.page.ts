import { type Locator, type Page, expect } from '@playwright/test'

export default class RadioButtonPage {
  page: Page
  noButton: Locator
  outputArea: Locator
  radioButtons: { [buttonName: string]: string } = {
    Yes: '//input[@id="yesRadio"]',
    Impressive: '//input[@id="impressiveRadio"]'
  }

  constructor (page: Page) {
    this.page = page
    this.outputArea = page.locator('//p[text()="You have selected "]/span[@class="text-success"]')
    this.noButton = page.locator('//input[@id="noRadio"]')
  }

  async clickRadioButtonByName (buttonName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.radioButtons[buttonName])
    await locator.click({ force: true })
    await expect(locator).toBeChecked()
  }

  async isButtonDisabled (): Promise<void> {
    await expect(this.noButton).toBeDisabled()
  }

  async checkIsElementVisibleInResult (element: string): Promise<void> {
    await expect(this.outputArea).toContainText(`${element}`)
  }
}
