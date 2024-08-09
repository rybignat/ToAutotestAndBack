import { Locator, Page } from '@playwright/test'

export class MainPage {
  page: Page

  constructor (page: Page) {
    this.page = page
  }

  async navigateToMainPage (): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' })
  }

  async clickElementsOnMainPageByName (elementName: string): Promise<void> {
    const locator: Locator = this.page.locator(`//h5[text()="${elementName}"]`)
    await locator.click()
  }
}
