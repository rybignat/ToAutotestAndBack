
import { BrowserContext, type Locator, type Page, expect } from '@playwright/test'

export default class LinksPage {
  page: Page
  homeLink: Locator
  homeDynamicLink: Locator
  outputArea: Locator
  linkLocators: { [linkName: string]: string } = {
    Created: '//p//a[@id="created"]',
    'No Content': '//p//a[@id="no-content"]',
    Moved: '//p//a[@id="moved"]',
    'Bad Request': '//p//a[@id="bad-request"]',
    Unauthorized: '//p//a[@id="unauthorized"]',
    Forbidden: '//p//a[@id="forbidden"]',
    'Not Found': '//p//a[@id="invalid-url"]'
  }

  constructor (page: Page) {
    this.page = page
    this.homeLink = page.locator('//p//a[@id="simpleLink"]')
    this.homeDynamicLink = page.locator('//p//a[@id="dynamicLink"]')
    this.outputArea = page.locator('//p[@id="linkResponse"]')
  }

  async clickLinkByName (linkName: string): Promise<void> {
    const locator: Locator = this.page.locator(this.linkLocators[linkName])
    await locator.click()
  }

  async checkResultMessage (statusCode: number, statusText: string): Promise<void> {
    const finalStatusText = statusText === 'Moved' ? `${statusText} Permanently` : statusText

    const result = await this.outputArea.textContent()
    const expectedResult = `Link has responded with staus ${statusCode} and status text ${finalStatusText}`

    expect(result).toEqual(expectedResult)
  }

  async checkStatusTextAndCodeInResponse (statusCode: number, statusText: string): Promise<void> {
    const finalStatusText = statusText === 'Not Found'
      ? 'invalid-url'
      : statusText.toLowerCase().replace(' ', '-')

    await this.page.waitForResponse(response =>
      response.url() === `https://demoqa.com/${finalStatusText}` &&
      response.status() === statusCode &&
      response.request().method() === 'GET'
    )
  }

  async openAndCheckNewPage (context: BrowserContext, isLinkDynamic?: boolean): Promise<void> {
    const [newPage] =
      await Promise.all([
        context.waitForEvent('page'),
        (isLinkDynamic ?? false) ? this.homeDynamicLink.click() : this.homeLink.click()
      ])
    await newPage.waitForLoadState('load')
    await expect(newPage).toHaveURL('https://demoqa.com/')
    const allPages = context.pages()
    expect(allPages.length).toBe(2)
  }
}
