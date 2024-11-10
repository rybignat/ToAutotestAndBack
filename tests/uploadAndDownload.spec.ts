import { test, expect } from '@playwright/test'
import UploadAndDownloadPage from '../pageObjects/uploadAndDownload.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '../Utills/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utills/functions'

test.describe('Check the functioning of the "Upload and Download" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let uploadAndDownloadPage: UploadAndDownloadPage
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    uploadAndDownloadPage = new UploadAndDownloadPage(page)

    await mainPage.navigateToMainPage()
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Upload and Download')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Verify "Download" Button Functionality', async () => {
    let doesFileExist: boolean
    await test.step('Click on the "Download" button', async () => {
      await uploadAndDownloadPage.downloadFile()
    })
    await test.step('Check that file "sampleFile.jpeg" is downloaded', async () => {
      doesFileExist = await uploadAndDownloadPage.checkIsFileExists()
      expect(doesFileExist).toBeTruthy()
      if (doesFileExist) {
        await test.step('Clear download directory', async () => {
          await uploadAndDownloadPage.removeDonwloadsFolder()
        })
      }
    })
  })

  test('CASE_2: Verify "Upload" Button Functionality', async () => {
    await test.step('Upload file "sampleFile.jpeg', async () => {
      await uploadAndDownloadPage.uploadFile()
    })
    await test.step('Check is filepath is correct', async () => {
      await uploadAndDownloadPage.checkIsFilepathCorrect()
    })
  })
})
