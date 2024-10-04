import { type Locator, type Page, expect } from '@playwright/test'

export default class Buttons {
  page: Page
  doubleClickButton: Locator
  rightClickButton: Locator
  dynamicClickButton: Locator

  outputArea: { [key: string]: string } = {
    'double click': '//p[@id="doubleClickMessage" ]',
    'right click': '//p[@id="rightClickMessage"]',
    'dynamic click': '//p[@id="dynamicClickMessage"]'
  }

  constructor (page: Page) {
    this.page = page
    this.doubleClickButton = page.locator('//button[@id="doubleClickBtn"]')
    this.rightClickButton = page.locator('//button[@id="rightClickBtn"]')
    this.dynamicClickButton = page.locator('//button[text()="Click Me"]')
  }

  async clickDoubleClickButton (): Promise<void> {
    await expect(this.doubleClickButton).toBeVisible()
    await this.doubleClickButton.dblclick()
  }

  async clickRightClickButton (): Promise<void> {
    await expect(this.rightClickButton).toBeVisible()
    await this.rightClickButton.click({
      button: 'right'
    })
  }

  async clickDynamicButton (): Promise<void> {
    await expect(this.dynamicClickButton).toBeVisible()
    await this.dynamicClickButton.click()
  }

  async checkMessageVisibilityAndTextContent (buttonName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.outputArea[buttonName])
    await expect(locator).toBeVisible()
    await expect(locator).toContainText(`You have done a ${buttonName}`)
  }
}
