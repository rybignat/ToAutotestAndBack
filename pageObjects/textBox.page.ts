import { expect, type Locator, type Page } from '@playwright/test'

export class TextBox {
  page: Page
  fullNameInput: Locator
  emailInput: Locator
  currentAddressInput: Locator
  permanentAddressInput: Locator
  submitButton: Locator
  areaNameOutput: Locator
  areaEmailOutput: Locator
  currentAddressOutput: Locator
  permanentAddressOutput: Locator

  constructor (page: Page) {
    this.page = page
    this.fullNameInput = page.locator('//input[@id="userName"]')
    this.emailInput = page.locator('//input[@id="userEmail"]')
    this.currentAddressInput = page.locator('//textarea[@id="currentAddress"]')
    this.permanentAddressInput = page.locator('//textarea[@id="permanentAddress"]')
    this.submitButton = page.locator('//button[@id="submit"]')
    this.areaNameOutput = page.locator('//p[@id="name"]')
    this.areaEmailOutput = page.locator('//p[@id="email"]')
    this.currentAddressOutput = page.locator('//p[@id="currentAddress"]')
    this.permanentAddressOutput = page.locator('//p[@id="permanentAddress"]')
  }

  async callDebug (): Promise<void> {
    await this.page.pause()
  }

  async enterName (name: string): Promise<void> { await this.fullNameInput.fill(name) }

  async enterEmail (email: string): Promise<void> { await this.emailInput.fill(email) }

  async enterCurrentAddress (currentAddress: string): Promise<void> { await this.currentAddressInput.fill(currentAddress) }

  async enterPermanentAddress (permanentAddress: string): Promise<void> { await this.permanentAddressInput.fill(permanentAddress) }

  async clickSubmitButton (): Promise<void> { await this.submitButton.click() }

  async checkCurrentName (expectedName: string): Promise<void> {
    const resultName = await this.areaNameOutput.textContent() as string
    expect(resultName.replace('Name:', '').trim()).toEqual(expectedName)
  }

  async checkEmail (expectedEmail: string): Promise<void> {
    const resultEmail = await this.areaEmailOutput.textContent() as string
    expect(resultEmail.replace('Email:', '').trim()).toEqual(expectedEmail)
  }

  async checkCurrentAddress (expectedCurrentAddress: string): Promise<void> {
    const resultCurrentAdress = await this.currentAddressOutput.textContent() as string
    expect(resultCurrentAdress.replace('Current Address :', '').trim()).toEqual(expectedCurrentAddress)
  }

  async checkPermanentAddress (expectedPermanentAddress: string): Promise<void> {
    const resultPermanentAddress = await this.permanentAddressOutput.textContent() as string
    expect(resultPermanentAddress.replace('Permananet Address :', '').trim()).toEqual(expectedPermanentAddress)
  }

  async expectErrorToBeVisible (isErrorVisible: boolean): Promise<void> {
    const isErrorLocatorVisible = await this.page.locator('//input[contains(@class, "field-error")]').isVisible()
    expect(isErrorLocatorVisible).toBe(isErrorVisible)
  }
}
