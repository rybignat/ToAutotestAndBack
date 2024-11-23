import { test } from '@playwright/test'
import BrokenLinksImagesPage from '../pageObjects/brokenlinks_images.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utils/functions'

test.describe('Check the functioning of the "Broken Links - Images" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let brokenLinksImagesPage: BrokenLinksImagesPage
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    brokenLinksImagesPage = new BrokenLinksImagesPage(page)

    await mainPage.navigateToMainPage()
    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Broken Links - Images')
    await removeSideAds(page)
  })

  test('CASE_1: Check validity of "Valid image"', async () => {
    await test.step(' Check that "Valid image" is valid', async () => {
      await brokenLinksImagesPage.checkValidImage()
    })
  })

  test('CASE_2: Check validity of "Broken image"', async () => {
    await test.step('Check that "Broken image" is invalid', async () => {
      await brokenLinksImagesPage.checkBrokenImage()
    })
  })

  test('CASE_3: Verify "Valid link" functionality', async () => {
    await test.step('Click on "Click Here for Valid Link"', async () => {
      await brokenLinksImagesPage.checkValidLink()
    })
  })

  test('CASE_4: Verify "Broken link" functionality', async () => {
    await test.step('Click on "Click Here for Broken Link"', async () => {
      await brokenLinksImagesPage.checkBrokenLink()
    })
  })
})
