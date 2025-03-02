import { test } from '@playwright/test'
import MainPage from '../../pageObjects/main.page'
import NavigationBar from '../../Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../../Utils/functions'
import DatePicker from '../../Utils/Components/datePicker.page'
import { IDatePicker } from '../../interfaces/datePicker.t'
import { timeOptions } from '../../Utils/types'

test.describe('Verify functionality of "Select Date" widget', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let datePicker: IDatePicker

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)

    const newPage = await mainPage.navigateToMainPage()
    if (newPage !== page) { page = newPage }

    navigationBar = new NavigationBar(page)
    datePicker = new DatePicker(page)

    await mainPage.clickElementsOnMainPageByName('Widgets')
    await navigationBar.clickOnElementByParentAndName('Date Picker')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Verify default date on page', async () => {
    let expectedDate: string = ''
    let displayedDate: string = ''
    await test.step('Preconditions', async () => {
      await test.step('Get the expected default date format', async () => {
        expectedDate = datePicker.getFormattedLocalDate()
        console.log(`Expected Date: ${expectedDate}`)
      })
      await test.step('Get the displayed date from the widget', async () => {
        displayedDate = await datePicker.getDisplayedDate('Date')
        console.log(`Displayed Date: ${displayedDate}`)
      })
    })
    await test.step(`Compare the ${expectedDate} and ${displayedDate} dates`, async () => {
      await datePicker.verifyDefaultDate(expectedDate, displayedDate)
    })
  })

  test('CASE_2: Verify functionality of month selection in dropdown menu', async () => {
    const initialMonth: string = 'February'
    const secondMonth: string = 'January'
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
      await test.step(`Select ${initialMonth} in months dropdown menu`, async () => {
        await datePicker.selectMonthInDropdown(initialMonth)
      })
    })
    await test.step(`Select ${secondMonth} in dropdown menu`, async () => {
      await datePicker.selectMonthInDropdown(secondMonth)
    })
    await test.step(`Check that month in widgets header is ${secondMonth}`, async () => {
      await datePicker.isMonthInHeaderCorrect(secondMonth)
    })
  })

  test('CASE_3: Verify "Previous month" button functionality', async () => {
    const initialMonth: string = 'March'
    const expectedPreviousMonth: string = 'February'
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
      await test.step(`Select ${initialMonth} in months dropdown menu`, async () => {
        await datePicker.selectMonthInDropdown(initialMonth)
      })
    })
    await test.step('Click "Previous month" button', async () => {
      await datePicker.clickPreviousMonthButton()
    })
    await test.step(`Check that month in widgets header is ${expectedPreviousMonth}`, async () => {
      await datePicker.isMonthInHeaderCorrect(expectedPreviousMonth)
    })
  })

  test('CASE_4: Verify "Next month" button functionality', async () => {
    const initialMonth: string = 'February'
    const expectedNextMonth: string = 'March'
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
      await test.step(`Select ${initialMonth} in months dropdown menu`, async () => {
        await datePicker.selectMonthInDropdown(initialMonth)
      })
    })
    await test.step('Click "Next month" button', async () => {
      await datePicker.clickNextMonthButton()
    })
    await test.step(`Check that month in widgets header is ${expectedNextMonth}`, async () => {
      await datePicker.isMonthInHeaderCorrect(expectedNextMonth)
    })
  })

  test('CASE_5: Verify functionality of year selection in dropdown menu', async () => {
    const expectedYear: number = 2022
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
    })
    await test.step(`Select ${expectedYear} year in years dropdown menu`, async () => {
      await datePicker.selectYearInDropdown(expectedYear)
    })
    await test.step(`Check that year in widgets header is ${expectedYear}`, async () => {
      await datePicker.isYearInHeaderCorrect(expectedYear)
    })
  })

  test('CASE_6: Verify functionality of date input field', async () => {
    const date: string = 'July 8, 2025'
    const formatedDate: string = await datePicker.getFormatedDate(date)
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
      await test.step('Clear input field', async () => {
        await datePicker.clearSelectDateInputField()
      })
    })
    await test.step(`Fill field with ${date}`, async () => {
      await datePicker.fillDateInputField(date)
    })
    await test.step('Click "Escape" button on keyboard', async () => {
      await datePicker.clickEscapeKeyboardButton()
    })
    await test.step(`Verify that date in input field is ${formatedDate}`, async () => {
      await datePicker.isChosenDateInInputCorrect(formatedDate)
    })
  })

  test('CASE_7: Verify date selection functionality', async () => {
    const date: string = 'April 26, 2044'
    const formatedDate: string = await datePicker.getFormatedDate(date)
    await test.step('Preconditions', async () => {
      await test.step('Click on "Select Date" input field', async () => {
        await datePicker.clickOnSelectDateInputField()
      })
    })
    await test.step(`Select ${date} in the calendar`, async () => {
      await datePicker.selectDateInCalendar(date)
    })
    await test.step(`Verify that date in input field is ${formatedDate}`, async () => {
      await datePicker.isChosenDateInInputCorrect(formatedDate)
    })
  })

  test.describe('Verify functionality of "Date And Time" widget', () => {
    test('CASE_1: Verify default date on page', async () => {
      let expectedDate: string = ''
      let displayedDate: string = ''
      await test.step('Preconditions', async () => {
        await test.step('Get the expected default date format', async () => {
          expectedDate = datePicker.getFormattedLocalDateAndTime()
        })
        await test.step('Get the displayed date from the widget', async () => {
          displayedDate = await datePicker.getDisplayedDate('Date and Time')
        })
      })
      await test.step(`Compare the ${expectedDate} and ${displayedDate} dates`, async () => {
        await datePicker.verifyDefaultDate(expectedDate, displayedDate)
      })
    })

    test('CASE_2: Verify functionality of month selection in widgets list', async () => {
      const expectedMonth: string = 'May'
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
        await test.step('Click on months menu in widget', async () => {
          await datePicker.clickOnCurrentVisibleMonthInMenu()
        })
      })
      await test.step(`Click on ${expectedMonth} in list`, async () => {
        await datePicker.clickOnMonthInList(expectedMonth)
      })
      await test.step(`Verify that month in widgets list and header changed to ${expectedMonth}`, async () => {
        await datePicker.isChosenMonthInListCorrect(expectedMonth)
      })
    })

    test('CASE_3: Verify functionality of year selection in widgets list', async () => {
      const expectedYear: number = 2027
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
        await test.step('Click on years menu in widget', async () => {
          await datePicker.clickOnCurrentVisibleYearInMenu()
        })
      })
      await test.step(`Click on ${expectedYear} in list`, async () => {
        await datePicker.clickOnYearInList(expectedYear)
      })
      await test.step(`Verify that year in widgets list and header changed to ${expectedYear}`, async () => {
        await datePicker.isChosenYearInListCorrect(expectedYear)
      })
    })

    test('CASE_4: Verify functionality of "upcoming" button in years list', async () => {
      let initialFirstYearInLIst: number
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
        await test.step('Click on years menu in widget', async () => {
          await datePicker.clickOnCurrentVisibleYearInMenu()
        })
        await test.step('Save current visible first year in list', async () => {
          initialFirstYearInLIst = await datePicker.getFirstYearInList()
        })
      })
      await test.step('Click on "upcoming" button', async () => {
        await datePicker.clickOnUpcomingButton()
      })
      await test.step('Verify that current first year in the list is greater than the saved one', async () => {
        const currentFirstYearInList: number = await datePicker.getFirstYearInList()
        await datePicker.isYearDifferent(currentFirstYearInList, initialFirstYearInLIst, 'Upcoming')
      })
    })

    test('CASE_5: Verify functionality of "past" button in years list', async () => {
      let initialFirstYearInLIst: number
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
        await test.step('Click on years menu in widget', async () => {
          await datePicker.clickOnCurrentVisibleYearInMenu()
        })
        await test.step('Save current visible first year in list', async () => {
          initialFirstYearInLIst = await datePicker.getFirstYearInList()
        })
      })
      await test.step('Click on "past" button', async () => {
        await datePicker.clickPastButton()
      })
      await test.step('Verify that current first year in the list is less than the saved one', async () => {
        const currentFirstYearInList: number = await datePicker.getFirstYearInList()
        await datePicker.isYearDifferent(currentFirstYearInList, initialFirstYearInLIst, 'Past')
      })
    })

    test('CASE_6: Verify functionality of time selection list', async () => {
      const time: timeOptions = '18:15'
      const formattedTime = await datePicker.getFormatedTime(time)
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
      })
      await test.step(`Click on ${time} in "time" list`, async () => {
        await datePicker.clickOnTimeInList(time)
      })
      await test.step(`Verify that date in input field includes ${formattedTime}`, async () => {
        await datePicker.isTimeInInputFieldCorrect(formattedTime)
      })
    })

    test('CASE_7: Verify functionality of date input field', async () => {
      const date: string = 'February 2, 2022'
      const time: timeOptions = '00:00'
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
      })
      await test.step(`Fill field with ${date} ${time}`, async () => {
        await datePicker.fillDateInputField(date, time)
      })
      await test.step('Click "Escape" button', async () => {
        await datePicker.clickEscapeKeyboardButton()
      })
      await test.step(`Verify that time in input field is ${date} ${time}`, async () => {
        await datePicker.isChosenDateInInputCorrect(date, time)
      })
    })

    test('CASE_8: Verify date selection functionality', async () => {
      const date: string = 'March 4, 2012'
      const time: timeOptions = '08:15'
      await test.step('Preconditions', async () => {
        await test.step('Click on "Date And Time" input field', async () => {
          await datePicker.clickOnDateAndTimeInputField()
        })
      })
      await test.step(`Select ${date} in the calendar and choose ${time}`, async () => {
        await datePicker.selectDateInCalendar(date, time)
      })
      await test.step(`Verify that time in input field is ${date} ${time}`, async () => {
        await datePicker.isChosenDateInInputCorrect(date, time)
      })
    })
  })
})
