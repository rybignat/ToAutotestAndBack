import { Locator, Page } from '@playwright/test'

export default class CommonObjects {
  page: Page
  logo: Locator
  header: Locator

  constructor (page: Page) {
    this.page = page
    this.logo = page.locator('//*[@id="app"]/header/a')
    this.header = page.locator('//h1[@class="text-center"]')
  }
}
