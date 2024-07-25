import { type Locator, type Page } from '@playwright/test'

export class TextBox {
  page: Page
  fullNameInput: Locator
  emailInput: Locator
  currentAddressInput: Locator
  permanentAddressInput: Locator
  submitButton: Locator
  outputAreaName: Locator
  outputAreaEmail: Locator
  currentAddressOutput: Locator
  permanentAddressOutput: Locator

  constructor (page: Page) {
    this.page = page
    this.fullNameInput = page.locator('//input[@id="userName"]')
    this.emailInput = page.locator('//input[@id="userEmail"]')
    this.currentAddressInput = page.locator('//textarea[@id="currentAddress"]')
    this.permanentAddressInput = page.locator('//textarea[@id="permanentAddress"]')
    this.submitButton = page.locator('//button[@id="submit"]')
    this.outputAreaName = page.locator('//p[@id="name"]')
    this.outputAreaEmail = page.locator('//p[@id="email"]')
    this.currentAddressOutput = page.locator('//p[@id="currentAddress"]')
    this.permanentAddressOutput = page.locator('//p[@id="permanentAddress"]')
  }

  async fillNameAndClickSubmitButton (): Promise<void> {
    await this.fullNameInput.fill('test')
    await this.submitButton.click()
  }
}
