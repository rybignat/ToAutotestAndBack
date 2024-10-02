import { test } from '@playwright/test'
import RadioButtonPage from '../pageObjects/radioButton.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '../Utills/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utills/functions'

test.describe('Check the functioning of the "Radio Button" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let radioButtonPage: RadioButtonPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    radioButtonPage = new RadioButtonPage(page)
    navigationBar = new NavigationBar(page)

    await mainPage.navigateToMainPage()
    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Radio Button')
    await removeSideAds(page)
  })

  test('CASE_1: Select "Yes" button and check result', async () => {
    await test.step('Click "Yes" button', async () => {
      await radioButtonPage.clickRadioButtonByName('Yes')
    })
    await test.step('Check the result (expecting "Yes")', async () => {
      await radioButtonPage.checkisElementVisibleInResult('Yes')
    })
  })

  test('CASE_2: Click "Impressive" button and check result', async () => {
    await test.step('Click "Impressive" button', async () => {
      await radioButtonPage.clickRadioButtonByName('Impressive')
    })
    await test.step('Check the result (expecting "Impressive")', async () => {
      await radioButtonPage.checkisElementVisibleInResult('Impressive')
    })
  })

  test('CASE_3: Check that "No" button is disabled', async () => {
    await test.step('Expecting that button is disabled', async () => {
      await radioButtonPage.isButtonDisabled()
    })
  })

  test('CASE_4: Click on "Yes" button, check result then click "Impressive" button and check result', async () => {
    await test.step('Click "Yes" button', async () => {
      await radioButtonPage.clickRadioButtonByName('Yes')
    })
    await test.step('Check result(expecting "Yes"', async () => {
      await radioButtonPage.checkisElementVisibleInResult('Yes')
    })
    await test.step('Click "Impressive" button', async () => {
      await radioButtonPage.clickRadioButtonByName('Impressive')
    })
    await test.step('Check result (expecting "Impressive")', async () => {
      await radioButtonPage.checkisElementVisibleInResult('Impressive')
    })
    await test.step('CHeck that "No" button is disabled', async () => {
      await radioButtonPage.isButtonDisabled()
    })
  })
})
