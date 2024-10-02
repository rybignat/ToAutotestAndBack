import { test } from '@playwright/test'
import TextBox from '../pageObjects/textBox.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '../Utills/Components/navigationBar.page'

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
    await test.step('Вводим в поле почту', async () => {
      await textBoxPage.enterEmail(defaultUser.invalidEmail)
    })
    await test.step('Нажимаем кнопку "Подтвердить"', async () => {
      await textBoxPage.clickSubmitButton()
    })
    await test.step('Проверяем,что почта не соответствует требуемому формату', async () => {
      await textBoxPage.expectErrorToBeVisible(true)
    })
  })

  test('happy path', async () => {
    await test.step('Вводим имя пользователя', async () => {
      await textBoxPage.enterName(defaultUser.name)
    })
    await test.step('Вводим email пользователя', async () => {
      await textBoxPage.enterEmail(defaultUser.email)
    })
    await test.step('Вводим текущий адрес пользователя', async () => {
      await textBoxPage.enterCurrentAddress(defaultUser.currentAddress)
    })
    await test.step('Вводим адрес прописки пользователя', async () => {
      await textBoxPage.enterPermanentAddress(defaultUser.permanentAddress)
    })
    await test.step('Нажимаем кнопку "Подтвердить"', async () => {
      await textBoxPage.clickSubmitButton()
    })
    await test.step('Проверяем,верно ли имя в форме', async () => {
      await textBoxPage.checkCurrentName(defaultUser.name)
    })
    await test.step('Проверяем,верен ли email в форме', async () => {
      await textBoxPage.checkEmail(defaultUser.email)
    })
    await test.step('Проверяем,верный ли текущий адрес в форме', async () => {
      await textBoxPage.checkCurrentAddress(defaultUser.currentAddress)
    })
    await test.step('Проверяем,верный ли адрес прописки в форме', async () => {
      await textBoxPage.checkPermanentAddress(defaultUser.permanentAddress)
    })
  })
})
