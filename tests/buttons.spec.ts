import { test } from '@playwright/test'
import ButtonsPage from '../pageObjects/buttons.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utils/functions'

test.describe('Check the functioning of the "Buttons" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let buttonsPage: ButtonsPage
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)

    const newPage = await mainPage.navigateToMainPage()
    if (newPage !== page) { page = newPage }

    navigationBar = new NavigationBar(page)
    buttonsPage = new ButtonsPage(page)

    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Buttons')
    await removeSideAds(page)
  })

  test('CASE_1: Double click the "Double Click Me" button and check result', async () => {
    await test.step('Double Click the "Double Click Me" button', async () => {
      await buttonsPage.clickDoubleClickButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a double click")', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('double click')
    })
  })

  test('CASE_2: Right click "Right Click Me" button and check the result', async () => {
    await test.step('Right click on "Right Click Me" button', async () => {
      await buttonsPage.clickRightClickButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a right click")', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('right click')
    })
  })

  test('CASE_3: Click the "Click Me" button and check result', async () => {
    await test.step('Click on "Click Me" button', async () => {
      await buttonsPage.clickDynamicButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a dynamic click"', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('dynamic click')
    })
  })

  test('CASE_4: Check double, right and single clicks in no particular order', async () => {
    await test.step('Click "Click Me" button', async () => {
      await buttonsPage.clickDynamicButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a dynamic click"', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('dynamic click')
    })
    await test.step('Double Click the "Double Click Me" button', async () => {
      await buttonsPage.clickDoubleClickButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a double click")', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('double click')
    })
    await test.step('Right click on "Right Click Me" button', async () => {
      await buttonsPage.clickRightClickButton()
    })
    await test.step('Check is message appears in result(Expected "You have done a right click")', async () => {
      await buttonsPage.checkMessageVisibilityAndTextContent('right click')
    })
  })
})
