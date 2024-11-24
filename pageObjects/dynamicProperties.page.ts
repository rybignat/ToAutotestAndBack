import { type Locator, type Page, expect } from '@playwright/test'

export default class DynamicPropertiesPage {
  page: Page
  textLocator: Locator
  willEnableIn5SecButton: Locator
  colorChangeButton: Locator
  visibleAfter5secButton: Locator

  constructor (page: Page) {
    this.page = page
    this.textLocator = page.locator('//p[text()="This text has random Id"]')
    this.willEnableIn5SecButton = page.locator('//button[@id="enableAfter"]')
    this.colorChangeButton = page.locator('//button[@id="colorChange"]')
    this.visibleAfter5secButton = page.locator('//button[@id="visibleAfter"]')
  }

  async getIdFromElement (): Promise<string> {
    const id: string | null = await this.textLocator.getAttribute('id')
    if (id !== null && id !== undefined) {
      return id
    }
    throw new Error('Missing attribute id for element')
  }

  async isColorMatches (expectedColor: string): Promise<void> {
    await expect(this.colorChangeButton).toHaveCSS('color', expectedColor, { timeout: 10000 })
  }

  async isButtonDisabled (): Promise<void> {
    await expect(this.willEnableIn5SecButton).toBeDisabled()
  }

  async isButtonEnabled (): Promise<void> {
    await expect(this.willEnableIn5SecButton).toBeEnabled({ timeout: 10000 })
  }

  async isButtonVisible (): Promise<void> {
    await expect(this.visibleAfter5secButton).toBeVisible({ timeout: 10000 })
  }

  async isButtonHidden (): Promise<void> {
    await expect(this.visibleAfter5secButton).toBeHidden()
  }
}
