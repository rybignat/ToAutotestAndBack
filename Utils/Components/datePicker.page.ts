import { type Locator, type Page, expect } from '@playwright/test'
import { timeOptions } from '../types'

export default class DatePicker {
  page: Page
  selectDate: Locator
  selectDateAndTime: Locator
  currentMonthAndYearInHeader: Locator
  currentVisibleYearInMenu: Locator
  currentVisibleMonthInMenu: Locator
  previousMonthButton: Locator
  nextMonthButton: Locator
  upcomingYearsButton: Locator
  pastYearsButton: Locator
  firstYearInList: Locator
  monthArray: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor (page: Page) {
    this.page = page
    this.selectDate = page.locator('//input[@id="datePickerMonthYearInput"]')
    this.selectDateAndTime = page.locator('//input[@id="dateAndTimePickerInput"]')
    this.currentMonthAndYearInHeader = page.locator('(//div[@class="react-datepicker__header"]/div)[1]')
    this.currentVisibleYearInMenu = page.locator('//span[@class="react-datepicker__year-read-view--selected-year"]')
    this.currentVisibleMonthInMenu = page.locator('//span[@class="react-datepicker__month-read-view--selected-month"]')
    this.nextMonthButton = page.locator('//button[@aria-label="Next Month"]')
    this.previousMonthButton = page.locator('//button[@aria-label="Previous Month"]')
    this.upcomingYearsButton = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div/a)[1]')
    this.pastYearsButton = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div/a)[2]')
    this.firstYearInList = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div)[2]')
  }

  async getCurrentTime (): Promise<string> {
    const inputValue: string = await this.selectDateAndTime.getAttribute('value') as string
    const currentTime: string = inputValue.split(' ')[3] + ' ' + inputValue.split(' ')[4]
    return currentTime
  }

  async selectMonthInPopup (month: string): Promise<void> {
    const monthLocator: Locator = this.page.locator('//select[@class="react-datepicker__month-select"]')
    await monthLocator.selectOption(`${this.monthArray.indexOf(month)}`)
  }

  async selectYearInPopup (year: string): Promise<void> {
    const yearLocator: Locator = this.page.locator('//select[@class="react-datepicker__year-select"]')
    await yearLocator.selectOption(`${year}`)
  }

  async clickOnMonthInList (month: string): Promise<void> {
    await this.currentVisibleMonthInMenu.click()
    const monthLocator: Locator = this.page.locator(`//div[@class="react-datepicker__month-dropdown"]/div[text()="${month}"]`)
    await monthLocator.click()
  }

  async clickOnYearInList (year: string): Promise<void> {
    await this.currentVisibleYearInMenu.click()
    const yearLocator: Locator = this.page.locator(`//div[@class="react-datepicker__year-dropdown"]/div[text()="${year}"]`)
    await yearLocator.click()
  }

  async clickOnTimeInList (time: timeOptions): Promise<void> {
    const timeLocator: Locator = this.page.locator(`//div/ul[@class="react-datepicker__time-list"]/li[text()= '${time}']`)
    await timeLocator.click()
  }

  async selectDateInCalendar (month: string, day: string, year: string, timeOptions?: timeOptions): Promise<void> {
    const dayInCalendarLocator: Locator = this.page.locator(`(//div[@class="react-datepicker__week"]/div[text()="${day}"])`)
    const position = Number(day) > 15 ? 'last' : 'first'
    if (timeOptions !== undefined) {
      await this.clickOnMonthInList(month)
      await this.clickOnYearInList(year)
      await dayInCalendarLocator[position]().click()
      await this.clickOnTimeInList(timeOptions)
    } else {
      await this.selectMonthInPopup(month)
      await this.selectYearInPopup(year)
      await dayInCalendarLocator[position]().click()
    }
  }

  async fillDateInputField (month: string, day: string, year: string, timeOptions?: timeOptions): Promise<void> {
    if (timeOptions !== undefined) {
      await this.selectDateAndTime.fill(`${month} ${day}, ${year} ${timeOptions}`)

      await this.selectDate.fill(`${this.monthArray.indexOf(month) + 1}/${day}/${year}`)
    } else {
      await this.selectDate.fill(`${this.monthArray.indexOf(month) + 1}/${day}/${year}`)
    }
  }

  async clickOnUpcomingButton (): Promise<void> {
    await this.upcomingYearsButton.click()
  }

  async clickPastButton (): Promise<void> {
    await this.pastYearsButton.click()
  }

  async clickEscapeKeyboardButton (): Promise<void> {
    await this.selectDateAndTime.click()
    await this.page.keyboard.press('Escape')
  }

  async getFirstYearInList (): Promise<string> {
    await this.selectDateAndTime.click()
    await this.currentVisibleYearInMenu.click()
    return await this.firstYearInList.textContent() as string
  }

  async getCurrentMonthFromDatepickersHeader (): Promise<string> {
    const currentMonthText = await this.currentMonthAndYearInHeader.textContent() as string
    return currentMonthText.replace(/[^a-zA-Z]/g, '')
  }

  async getCurrentYearFromDatepickersHeader (): Promise<string> {
    const currentYearText = await this.currentMonthAndYearInHeader.textContent() as string
    return currentYearText.replace(/[a-zA-Z]/g, '').trim()
  }

  async isDefaultDateCorrect (): Promise<void> {
    const localDate = new Date()
    const [month, day, year] = [
      localDate.getMonth(),
      String(localDate.getDate()).padStart(2, '0'),
      localDate.getFullYear()
    ]
    const webDateLocator: Locator = this.page.locator(`//input[@value="0${month + 1}/${day}/${year}"]`)
    await expect(webDateLocator).toBeVisible()
  }

  async isDefaultDateAndTimeCorrect (): Promise<void> {
    const dateInputValue: string | null = await this.page.locator('//input[@id="dateAndTimePickerInput"]').getAttribute('value')
    const localDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
      hour12: true
    }).format(new Date())
    if (dateInputValue === null || dateInputValue === undefined) {
      throw new Error('Missing attribute value for element')
    }
    expect(dateInputValue).toBe(localDate.replace('at ', ''))
  }

  async isChoosedDateInInputCorrect (month: string, day: string, year: string, timeOptions?: string): Promise<void> {
    if (timeOptions === undefined) {
      const dateInputValue: string = await this.page.locator('//input[@id="datePickerMonthYearInput"]').getAttribute('value') as string
      expect(dateInputValue).toEqual(`${month}/${day}/${year}`)
    } else {
      const dateInputValue: string | null = await this.page.locator('//input[@id="dateAndTimePickerInput"]').getAttribute('value')
      const expectedDateValue: string = `${month} ${day}, ${year} ${timeOptions} ${Number(timeOptions) > 12 ? 'PM' : 'AM'}`
      if (dateInputValue === null || dateInputValue === undefined) {
        throw new Error('Missing attribute value for element')
      }
      expect(dateInputValue).toBe(expectedDateValue)
    }
  }

  async isChoosedMonthInListCorrect (month: string): Promise<void> {
    const currentMonthText = await this.currentVisibleMonthInMenu.textContent() as string
    expect(currentMonthText).toBe(month)
  }

  async isChoosedYearInListCorrect (year: string): Promise<void> {
    const currentYearText = await this.currentVisibleYearInMenu.textContent() as string
    expect(currentYearText).toBe(year)
  }
}
