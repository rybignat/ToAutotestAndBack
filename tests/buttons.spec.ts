import { test } from '@playwright/test'
import ButtonsPage from '../pageObjects/buttons.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '../Utills/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utills/functions'

test.describe('Check the functioning of the "Buttons" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let buttonsPage: ButtonsPage
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    buttonsPage = new ButtonsPage(page)

    await mainPage.navigateToMainPage()
    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Buttons')
    await removeSideAds(page)
  })

  test('CASE_1: Double click the "Double Click Me" button and check result', async () => {
    await test.step('Double Click the "Double Click Me" button', async () => {
      await buttonsPage.doubleClickButtonByName('doubleClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a double click")', async () => {
      await buttonsPage.checkIsMsgAprsInResult('doubleClick')
    })
  })

  test('CASE_2: Right click "Right Click Me" button and check the result', async () => {
    await test.step('Right click on "Right Click Me" button', async () => {
      await buttonsPage.rightClickButtonByName('rightClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a right click")', async () => {
      await buttonsPage.checkIsMsgAprsInResult('rightClick')
    })
  })

  test('CASE_3: Click the "Click Me" button and check result', async () => {
    await test.step('Click on "Click Me" button', async () => {
      await buttonsPage.clickButtonByName('dynamicClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a dynamic click"', async () => {
      await buttonsPage.checkIsMsgAprsInResult('dynamicClick')
    })
  })

  test('CASE_4: Check double, right and single clicks in no particular order', async () => {
    await test.step('Click "Click Me" button', async () => {
      await buttonsPage.clickButtonByName('dynamicClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a dynamic click"', async () => {
      await buttonsPage.checkIsMsgAprsInResult('dynamicClick')
    })
    await test.step('Double Click the "Double Click Me" button', async () => {
      await buttonsPage.doubleClickButtonByName('doubleClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a double click")', async () => {
      await buttonsPage.checkIsMsgAprsInResult('doubleClick')
    })
    await test.step('Right click on "Right Click Me" button', async () => {
      await buttonsPage.rightClickButtonByName('rightClick')
    })
    await test.step('Check is message appears in result(Expected "You have done a right click")', async () => {
      await buttonsPage.checkIsMsgAprsInResult('rightClick')
    })
  })
})
