import { type Locator, type Page, expect } from '@playwright/test'

export default class Buttons {
  page: Page
  buttons: { [key: string]: string } = {
    doubleClick: '//button[@id="doubleClickBtn"]',
    rightClick: '//button[@id="rightClickBtn"]',
    dynamicClick: '//button[text()="Click Me"]'
  }

  outputArea: { [key: string]: string } = {
    doubleClick: '//p[@id="doubleClickMessage"]',
    rightClick: '//p[@id="rightClickMessage"]',
    dynamicClick: '//p[@id="dynamicClickMessage"]'
  }

  constructor (page: Page) {
    this.page = page
  }

  async doubleClickButtonByName (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.buttons[key])
    await expect(locator).toBeVisible()
    await locator.dblclick()
  }

  async rightClickButtonByName (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.buttons[key])
    await expect(locator).toBeVisible()
    await locator.click({
      button: 'right'
    })
  }

  async clickButtonByName (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.buttons[key])
    await expect(locator).toBeVisible()
    await locator.click()
  }

  async checkIsMsgAprsInResult (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.outputArea[key])
    await expect(locator).toBeVisible()
  }
}
