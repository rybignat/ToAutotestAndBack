import { test, expect } from '@playwright/test'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utils/functions'
import DynamicPropertiesPage from '../pageObjects/dynamicProperties.page'

test.describe('Check the functioning of the "Upload and Download" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let dynamicPropertiesPage: DynamicPropertiesPage
  test.beforeEach(async ({ page }, testInfo) => {
    mainPage = new MainPage(page)
    const newPage = await mainPage.navigateToMainPage()

    if (newPage !== page) { page = newPage }

    (testInfo as any).updatedPage = page

    navigationBar = new NavigationBar(page)
    dynamicPropertiesPage = new DynamicPropertiesPage(page)

    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Dynamic Properties')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Check that "This text has random id" have random id', async ({}, testInfo) => { // eslint-disable-line
    let firstId: string
    let secondId: string
    const page = (testInfo as any).updatedPage

    await test.step('Get id of text and save it in variable firstId', async () => {
      firstId = await dynamicPropertiesPage.getIdFromElement()
    })
    await test.step('Reload page', async () => {
      await page.reload()
    })
    await test.step('Get new id of text and save it in variable secondId', async () => {
      secondId = await dynamicPropertiesPage.getIdFromElement()
    })
    await test.step('Compare the fistId and secondId values', async () => {
      expect(firstId).not.toBe(secondId)
    })
  })

  test('CASE_2: Verify the "Will Enable 5 Seconds" button behavior', async () => {
    await test.step('Check that button is unavailable', async () => {
      await dynamicPropertiesPage.isButtonDisabled()
    })
    await test.step('Check that button is available in 10 seconds', async () => {
      await dynamicPropertiesPage.isButtonEnabled()
    })
  })

  test('CASE_3: Verify the color change behavior of the "Color Change" button', async () => {
    const firstTextColor: string = 'rgb(255, 255, 255)'
    const secondTextColor: string = 'rgb(220, 53, 69)'
    await test.step('Check that the text colors match the expected ones', async () => {
      await dynamicPropertiesPage.isColorMatches(firstTextColor)
    })
    await test.step('Check that the text colors match the expected ones in 10 seconds', async () => {
      await dynamicPropertiesPage.isColorMatches(secondTextColor)
    })
  })

  test('CASE_4: Verify the visibility behavior of the "Visible After 5 Seconds" button', async () => {
    await test.step('Check that button is hidden', async () => {
      await dynamicPropertiesPage.isButtonHidden()
    })
    await test.step('Check that button is visible in 10 seconds', async () => {
      await dynamicPropertiesPage.isButtonVisible()
    })
  })
})
