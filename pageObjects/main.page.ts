import { Locator, Page } from '@playwright/test'

export default class MainPage {
  page: Page

  constructor (page: Page) {
    this.page = page
  }

  async navigateToMainPage (): Promise<Page> {
    let attempts = 5
    while (attempts-- > 0) {
      const response = await this.page.goto('https://the-internet.herokuapp.com/status_codes/500', { waitUntil: 'domcontentloaded' })

      if ((response != null) && ![500, 502].includes(response.status())) {
        return this.page
      }

      // Открываем новую страницу в том же контексте
      const newPage = await this.page.context().newPage()
      const newResponse = await newPage.goto('https://demoqa.com', { waitUntil: 'domcontentloaded' })

      if ((newResponse != null) && ![500, 502].includes(newResponse.status())) {
        await this.page.close() // Закрываем старую страницу
        this.page = newPage // Обновляем `this.page`
        return this.page
      }

      await newPage.close()
    }

    throw new Error('❌ Failed to load the page after 5 attempts.')
  }

  async clickElementsOnMainPageByName (elementName: string): Promise<void> {
    const locator: Locator = this.page.locator(`//h5[text()="${elementName}"]`)
    await locator.click()
  }
}
