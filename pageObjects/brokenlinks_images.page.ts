import { type Locator, type Page, expect } from '@playwright/test'

export default class BrokenLinksImagesPage {
  page: Page
  validImage: Locator
  brokenImage: Locator
  validLink: Locator
  brokenLink: Locator

  constructor (page: Page) {
    this.page = page
    this.validImage = page.locator('(//h1[text()="Broken Links - Images"]//parent::div//img)[1]')
    this.brokenImage = page.locator('(//h1[text()="Broken Links - Images"]//parent::div//img)[2]')
    this.validLink = page.locator('(//h1[text()="Broken Links - Images"]//parent::div//a)[1]')
    this.brokenLink = page.locator('(//h1[text()="Broken Links - Images"]//parent::div//a)[2]')
  }

  async checkValidImage (): Promise<void> {
    const [width, height] = await this.validImage.evaluate((img) => {
      const { naturalWidth, naturalHeight } = img as HTMLImageElement
      return [naturalWidth, naturalHeight]
    })
    expect(height).toBeGreaterThan(0)
    expect(width).toBeGreaterThan(0)
  }

  async checkBrokenImage (): Promise<void> {
    const [width, height] = await this.brokenImage.evaluate((img) => {
      const { naturalWidth, naturalHeight } = img as HTMLImageElement
      return [naturalWidth, naturalHeight]
    })
    expect(height).toBe(0)
    expect(width).toBe(0)
  }

  async checkValidLink (): Promise<void> {
    const validURL = 'https://demoqa.com/'
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url() === validURL
      ),
      this.validLink.click()
    ])

    expect(response.status()).toBe(200)
    expect(response.request().method()).toBe('GET')
  }

  async checkBrokenLink (): Promise<void> {
    const invalidURL = 'http://the-internet.herokuapp.com/status_codes/500'
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url() === invalidURL
      ),
      this.brokenLink.click()
    ])
    expect(response.status()).toBe(500)
    expect(response.request().method()).toBe('GET')
  }
}
