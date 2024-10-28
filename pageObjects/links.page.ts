
import { BrowserContext, type Locator, type Page, expect } from '@playwright/test'

export default class LinksPage {
  page: Page
  homeLink: Locator
  homeDynamicLink: Locator
  textMessageArea: Locator
  linkLocators: { [key: string]: string } = {
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
    this.textMessageArea = page.locator('//p[@id="linkResponse"]')
  }

  async clickLinkByName (key: string): Promise<void> {
    const locator: Locator = this.page.locator(this.linkLocators[key])
    await expect(locator).toBeVisible()
    await locator.click()
  }

  async checkResultMessage (statusCode: number, statusText: string): Promise<void> {
    if (statusText === 'Moved') {
      statusText = 'Moved Permanently'
    }
    const result: string = await this.textMessageArea.textContent() as string
    const expectedResult = `Link has responded with staus ${statusCode} and status text ${statusText}`
    expect(result).toEqual(expectedResult)
  }

  async checkStatusTextAndCodeInResponse (statusCode: number, statusText: string): Promise<void> {
    if (statusText === 'Not Found') {
      statusText = 'invalid-url'
    }
    await this.page.waitForResponse(response =>
      response.url() === `https://demoqa.com/${statusText.toLowerCase().replace(' ', '-')}` && response.status() === statusCode &&
      response.request().method() === 'GET')
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
