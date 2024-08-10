import { test } from '@playwright/test'
import { TextBox } from '../pageObjects/textBox.page'
import { MainPage } from '../pageObjects/main.page'
import { NavigationBar } from '../Utills/Components/navigationBar.page'

test.describe('Testing functionality of "Text Box" page', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let textBoxPage: TextBox

  const defaultUser = {
    name: 'Ilya de Gay le Pidorr',
    email: 'ilyao4koshnik@anal.com',
    currentAddress: 'Nexdoor str.',
    permanentAddress: 'Kanava deadend',
    invalidEmail: 'test'
  }

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    textBoxPage = new TextBox(page)
    navigationBar = new NavigationBar(page)

    await mainPage.navigateToMainPage()
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Text Box')
  })

  test('email validation', async () => {
    await textBoxPage.enterEmail(defaultUser.invalidEmail)
    await textBoxPage.clickSubmitButton()
    await textBoxPage.expectErrorToBeVisible(true)
  })

  test('happy path', async () => {
    await textBoxPage.enterName(defaultUser.name)
    await textBoxPage.enterEmail(defaultUser.email)
    await textBoxPage.enterCurrentAddress(defaultUser.currentAddress)
    await textBoxPage.enterPermanentAddress(defaultUser.permanentAddress)
    await textBoxPage.clickSubmitButton()
    await textBoxPage.checkCurrentName(defaultUser.name)
    await textBoxPage.checkEmail(defaultUser.email)
    await textBoxPage.checkCurrentAddress(defaultUser.currentAddress)
    await textBoxPage.checkPermanentAddress(defaultUser.permanentAddress)
  })
})
