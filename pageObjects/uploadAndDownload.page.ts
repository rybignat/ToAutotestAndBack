import { type Locator, type Page, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

export default class UploadAndDownloadPage {
  page: Page
  downloadButton: Locator
  uploadButton: Locator
  outputArea: Locator
  downloadsDir = path.join(__dirname, '../Utils/Downloads')
  uploadFilePath = path.join(__dirname, '../Utils/Uploads/sampleFile.jpeg')
  uploadFileName = fs.readdirSync(path.join(__dirname, '../Utils/Uploads'))
  downloadPath: string | undefined

  constructor (page: Page) {
    this.page = page
    this.downloadButton = page.locator('//a[@id="downloadButton"]')
    this.uploadButton = page.locator('//input[@id="uploadFile"]')
    this.outputArea = page.locator('//p[@id="uploadedFilePath"]')
  }

  async downloadFile (): Promise<void> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click()
    ])
    this.downloadPath = path.join(this.downloadsDir, download.suggestedFilename())
    await download.saveAs(this.downloadPath)
  }

  async removeDownloadsFolder (): Promise<void> {
    fs.rmSync(this.downloadsDir, { recursive: true, force: true })
  }

  async uploadFile (): Promise<void> {
    await this.uploadButton.setInputFiles(this.uploadFilePath)
  }

  async checkIsFileExists (): Promise<boolean> {
    if (this.downloadPath == null || this.downloadPath === '') {
      throw new Error('File doesn\'t exist')
    }
    return fs.existsSync(this.downloadPath)
  }

  async checkIsFilepathCorrect (): Promise<void> {
    const fileName = (await this.outputArea.textContent())?.replace('C:\\fakepath\\', '')
    expect(fileName).toBe(this.uploadFileName[0])
  }
}
