import { test, expect } from '@playwright/test'
import CheckBoxPage from '../pageObjects/checkBox.page'
import { MainPage } from '../pageObjects/main.page'
import { NavigationBar } from '../Utills/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utills/functions'

test.describe('Testing functionality of "Check Box" page', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let checkBoxPage: CheckBoxPage

  const CASE_1: string[] = ['Notes', 'React', 'Public', 'Word File.doc']
  const CASE_2: string[] = ['Documents']
  const CASE_3: string[] = ['React', 'Angular', 'Veu']
  const CASE_4: string[] = ['React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General']
  const CASE_5: string[] = ['Home']
  const CASE_6: string[] = ['Notes', 'Commands', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General', 'Word File.doc', 'Excel File.doc']
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    checkBoxPage = new CheckBoxPage(page)
    navigationBar = new NavigationBar(page)

    await mainPage.navigateToMainPage()
    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Check Box')
    await removeSideAds(page)
  })

  test('CASE_1: One checkbox in each folder', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Кликаем на необходимые элементы(чекбоксы)', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_1)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_1)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
  test('CASE_2: A large folder consisting of two small ones by one click', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Выбираем все древо файлов', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_2)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_2)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
  test('CASE_3: One folder by selecting all elements inside', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Выбираем все древо файлов,кликая на каждый элемент внутри', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_3)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_3)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
  test('CASE_4: A large folder consisting of two small ones by selecting all elements inside', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Выбираем все древо файлов,кликая на каждый элемент внутри', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_4)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_4)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
  test('CASE_5: Select all files,by clicking on Home folder', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Выбираем все древо файлов,кликая на кнопку Home', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_5)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_5)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
  test('CASE_6: Select all files,by clicking on each of them', async ({ page }) => {
    let formatedArray: string[] = []
    await test.step('Нажимаем кнопку "Раскрыть все"', async () => {
      await checkBoxPage.clickExpandAllButton()
    })
    await test.step('Выбираем все файлы,кликая по каждому', async () => {
      await checkBoxPage.loopThroughStringArrayAndClick(CASE_6)
    })
    await test.step('Форматируем исходный массив,получая результирующий', async () => {
      formatedArray = await checkBoxPage.formatArray(CASE_6)
    })
    await test.step('Сверяем кол-во элементов в результирующем массиве с ожидаемым с сайта', async () => {
      expect(formatedArray.length).toBe(await checkBoxPage.getSpanQuantity())
    })
    await test.step('Проверяем,что каждый выбраный элемент присутствует в результатах на странице', async () => {
      for (const element of formatedArray) {
        const isElementVisible: boolean = await checkBoxPage.checkisElementVisibleInResult(element)
        expect(isElementVisible).toBe(true)
      }
    })
  })
})
