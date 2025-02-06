import { test, expect } from '@playwright/test'
import MainPage from '../../pageObjects/main.page'
import NavigationBar from '../../Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../../Utils/functions'
import DatePicker from '../../Utils/Components/datePicker.page'

test.describe('Verify functionality of "Select Date" widget', async () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let datePicker: DatePicker

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    datePicker = new DatePicker(page)

    await mainPage.navigateToMainPage()
    await mainPage.clickElementsOnMainPageByName('Widgets')
    await navigationBar.clickOnElementByParentAndName('Date Picker')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Verify default date on page', async () => {
    await test.step('Compare the current date on your computer with the date in the widgets input', async () => {
      await datePicker.isDefaultDateCorrect()
    })
  })

  test('CASE_2: Verify functionality of month selection in dropdown menu', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
      await datePicker.selectMonthInPopup('February')
    })
    await test.step('Select "January" in dropdown menu', async () => {
      await datePicker.selectMonthInPopup('January')
    })
    await test.step('Check that month in widgets header is "January"', async () => {
      const currentMonthInHeader: string = await datePicker.getCurrentMonthFromDatepickersHeader()
      expect(currentMonthInHeader).toEqual('January')
    })
  })

  test('CASE_3: Verify "Previous month" button functionality', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
      await datePicker.selectMonthInPopup('February')
    })
    await test.step(' Click "Previous month" button', async () => {
      await datePicker.previousMonthButton.click()
    })
    await test.step('Check that month in widgets header is "January"', async () => {
      const currentMonthInHeader: string = await datePicker.getCurrentMonthFromDatepickersHeader()
      expect(currentMonthInHeader).toEqual('January')
    })
  })

  test('CASE_4: Verify "Next month" button functionality', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
      await datePicker.selectMonthInPopup('February')
    })
    await test.step(' Click "Previous month" button', async () => {
      await datePicker.nextMonthButton.click()
    })
    await test.step('Check that month in widgets header is "January"', async () => {
      const currentMonthInHeader: string = await datePicker.getCurrentMonthFromDatepickersHeader()
      expect(currentMonthInHeader).toEqual('March')
    })
  })

  test('CASE_5: Verify functionality of month selection in dropdown menu', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
      await datePicker.selectMonthInPopup('February')
    })
    await test.step('Select "January" in dropdown menu', async () => {
      await datePicker.selectMonthInPopup('January')
    })
  })

  test('CASE_6: Verify functionality of year selection in dropdown menu', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
      await datePicker.selectMonthInPopup('February')
    })
    await test.step('Select 2022 year in years dropdown menu', async () => {
      await datePicker.selectYearInPopup('2022')
    })
    await test.step('Check that year in widgets header is "2022"', async () => {
      const currentYearInHeader: string = await datePicker.getCurrentYearFromDatepickersHeader()
      expect(currentYearInHeader).toEqual('2022')
    })
  })

  test('CASE_7: Verify functionality of date input field', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.clear()
    })
    await test.step('Fill field with "02 02 2022"', async () => {
      await datePicker.selectDate.fill('02 02 2022')
    })
    await test.step('Click "Escape" button on keyboard', async () => {
      await datePicker.clickEscapeKeyboardButton()
    })
    await test.step('Verify that date in input field is "02/02/2022"', async () => {
      await datePicker.isChoosedDateInInputCorrect('02', '02', '2022')
    })
  })

  test('CASE_8: Verify date selection functionality', async () => {
    await test.step('Preconditions', async () => {
      await datePicker.selectDate.click()
    })
    await test.step('Select "February", "2022" in dropdown windows and click on "22" day in calendar', async () => {
      await datePicker.selectDateInCalendar('February', '12', '2022')
    })
    await test.step('Verify that date in input field is "02/02/2022"', async () => {
      await datePicker.isChoosedDateInInputCorrect('02', '12', '2022')
    })
  })

  test.describe('Verify functionality of "Date And Time" widget', async (): Promise<void> => {
    test('CASE_1: Verify default date on page', async () => {
      await test.step('Compare the current date on your computer with the date in the widget', async () => {
        await datePicker.isDefaultDateAndTimeCorrect()
      })
    })

    test('CASE_2: Verify functionality of month selection in widgets list', async () => {
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
      })
      await test.step('Click on "February" in list', async () => {
        await datePicker.clickOnMonthInList('February')
      })
      await test.step('Verify that month in widgets list and header changed to "February"', async () => {
        await datePicker.isChoosedMonthInListCorrect('February')
      })
    })

    test('CASE_3: Verify functionality of year selection in widgets list', async () => {
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
      })
      await test.step('Click on "2022" in list', async () => {
        await datePicker.clickOnYearInList('2022')
      })
      await test.step('Verify that year in widgets list and header changed to "2022"', async () => {
        await datePicker.isChoosedYearInListCorrect('2022')
      })
    })

    test('CASE_4: Verify functionality of "upcoming" button in years list', async () => {
      const initialFirstYearInLIst: string = await datePicker.getFirstYearInList()
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
        await datePicker.currentVisibleYearInMenu.click()
      })
      await test.step('Click on "upcoming" button', async () => {
        await datePicker.clickOnUpcomingButton()
      })
      await test.step('Verify that current first year in the list is different from the saved one', async () => {
        const currentFirstYearInList: string = await datePicker.firstYearInList.textContent() as string
        expect(initialFirstYearInLIst).not.toBe(currentFirstYearInList)
      })
    })

    test('CASE_5: Verify functionality of "past" button in years list', async () => {
      const initialFirstYearInLIst: string = await datePicker.getFirstYearInList()
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
        await datePicker.currentVisibleYearInMenu.click()
      })
      await test.step('Click on "past" button', async () => {
        await datePicker.clickPastButton()
      })
      await test.step('Verify that current first year in the list is different from the saved one', async () => {
        const currentFirstYearInList: string = await datePicker.firstYearInList.textContent() as string
        expect(initialFirstYearInLIst).not.toBe(currentFirstYearInList)
      })
    })

    test('CASE_6: Verify functionality of time selection list', async () => {
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
      })
      await test.step('Click on "8:15" in "time" list', async () => {
        await datePicker.clickOnTimeInList('08:15')
      })
      await test.step('Verify that time in input field is "8:15 AM"', async () => {
        const currentTime: string = await datePicker.getCurrentTime()
        expect(currentTime).toBe('8:15 AM')
      })
    })

    test('CASE_7: Verify functionality of date input field', async () => {
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.clear()
      })
      await test.step('Fill field with "February 2 2022 8:15"', async () => {
        await datePicker.fillDateInputField('February', '2', '2022', '08:15')
      })
      await test.step('Click "Escape" button', async () => {
        await datePicker.clickEscapeKeyboardButton()
      })
      await test.step('Verify that time in input field is February 2, 2022 8:15 AM', async () => {
        await datePicker.isChoosedDateInInputCorrect('February', '2', '2022', '8:15')
      })
    })

    test('CASE_8: Verify date selection functionality', async () => {
      await test.step('Preconditions', async () => {
        await datePicker.selectDateAndTime.click()
      })
      await test.step(
        'Click on "February" from the months list in the widget, then on "2022" from the years list, then on "22" day in calendar, then on "8:15" in time list',
        async () => {
          await datePicker.selectDateInCalendar('February', '2', '2022', '08:15')
        })
      await test.step('Verify that time in input field is "February 2, 2022 8:15 AM"', async () => {
        await datePicker.isChoosedDateInInputCorrect('February', '2', '2022', '8:15')
      })
    })
  })
})
