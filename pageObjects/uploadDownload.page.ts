import { type Locator, type Page, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

export default class UploadAndDownloadPage {
  page: Page
  downloadsDir = path.join(__dirname, '../Utills/downloads')
  uploadFilePath = path.join(__dirname, '../Utills/uploads/sampleFile.jpeg')
  uploadFileName = fs.readdirSync(path.join(__dirname, '../Utills/uploads'))
  downloadPath: string | undefined
  dowloadButton: Locator
  uploadButton: Locator
  outputArea: Locator

  constructor (page: Page) {
    this.page = page
    this.dowloadButton = page.locator('//a[@id="downloadButton"]')
    this.uploadButton = page.locator('//input[@id="uploadFile"]')
    this.outputArea = page.locator('//p[@id="uploadedFilePath"]')
  }

  async downloadFile (): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download')
    await this.dowloadButton.click()
    const download = await downloadPromise
    this.downloadPath = path.join(this.downloadsDir, download.suggestedFilename())
    await download.saveAs(this.downloadPath)
  }

  async checkIsFileExists (): Promise<boolean> {
    if (this.downloadPath == null || this.downloadPath === '') {
      throw new Error('File dosen`t exist')
    }
    return fs.existsSync(this.downloadPath)
  }

  async removeDonwloadsFolder (): Promise<void> {
    fs.rmSync(this.downloadsDir, { recursive: true, force: true })
  }

  async uploadFile (): Promise<void> {
    await this.uploadButton.setInputFiles(this.uploadFilePath)
  }

  async checkIsFilepathCorrect (): Promise<void> {
    const fileName = (await this.outputArea.textContent())?.replace('C:\\fakepath\\', '')
    expect(fileName).toBe(this.uploadFileName[0])
  }
}
