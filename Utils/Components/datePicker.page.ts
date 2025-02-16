import { expect, type Locator, type Page } from '@playwright/test'
import { timeOptions } from '../types'
import { IDatePicker } from '../../interfaces/datePicker.t'

export default class DatePicker implements IDatePicker {
  page: Page
  dateInputField: Locator
  dateAndTimeInputField: Locator
  currentMonthAndYearInHeader: Locator
  currentVisibleYearInMenu: Locator
  currentVisibleMonthInMenu: Locator
  monthDropdown: Locator
  yearDropdown: Locator
  previousMonthButton: Locator
  nextMonthButton: Locator
  upcomingYearsButton: Locator
  pastYearsButton: Locator
  firstYearInList: Locator
  monthsArray: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor (page: Page) {
    this.page = page
    this.dateInputField = page.locator('//input[@id="datePickerMonthYearInput"]')
    this.dateAndTimeInputField = page.locator('//input[@id="dateAndTimePickerInput"]')
    this.currentMonthAndYearInHeader = page.locator('(//div[@class="react-datepicker__header"]/div)[1]')
    this.currentVisibleYearInMenu = page.locator('//span[@class="react-datepicker__year-read-view--selected-year"]')
    this.currentVisibleMonthInMenu = page.locator('//span[@class="react-datepicker__month-read-view--selected-month"]')
    this.monthDropdown = page.locator('//select[@class="react-datepicker__month-select"]')
    this.yearDropdown = page.locator('//select[@class="react-datepicker__year-select"]')
    this.nextMonthButton = page.locator('//button[@aria-label="Next Month"]')
    this.previousMonthButton = page.locator('//button[@aria-label="Previous Month"]')
    this.upcomingYearsButton = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div/a)[1]')
    this.pastYearsButton = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div/a)[2]')
    this.firstYearInList = page.locator('(//div[@class="react-datepicker__year-dropdown"]/div)[2]')
  }

  async selectMonthInDropdown (month: string): Promise<void> {
    await this.monthDropdown.selectOption(`${this.monthsArray.indexOf(month)}`)
  }

  async selectYearInDropdown (year: number): Promise<void> {
    await this.yearDropdown.selectOption(year.toString())
  }

  async selectDateInCalendar (date: string, timeOptions?: timeOptions): Promise<void> {
    const filteredDateArray: string[] = date.replace(',', '').split(' ')
    const dayInCalendarLocator: Locator = this.page.locator(`(//div[@class="react-datepicker__week"]/div[text()="${filteredDateArray[1]}"])`)
    const position = Number(filteredDateArray[1]) > 15 ? 'last' : 'first'
    if (timeOptions !== undefined) {
      await this.clickOnCurrentVisibleMonthInMenu()
      await this.clickOnMonthInList(filteredDateArray[0])
      await this.makeYearVisibleInList(filteredDateArray[2])
      await this.clickOnYearInList(Number(filteredDateArray[2]))
      await dayInCalendarLocator[position]().click()
      await this.clickOnTimeInList(timeOptions)
    } else {
      await this.selectMonthInDropdown(filteredDateArray[0])
      await this.selectYearInDropdown(Number(filteredDateArray[2]))
      await dayInCalendarLocator[position]().click()
    }
  }

  async clearSelectDateInputField (): Promise<void> {
    await this.dateInputField.clear()
  }

  async clearDateAndTimeInputField (): Promise<void> {
    await this.dateAndTimeInputField.clear()
  }

  async fillDateInputField (date: string, timeOptions?: timeOptions): Promise<void> {
    if (timeOptions !== undefined) {
      await this.dateAndTimeInputField.fill(`${date} ${timeOptions}`)
    } else {
      await this.dateInputField.fill(date)
    }
  }

  async clickOnUpcomingButton (): Promise<void> {
    await this.upcomingYearsButton.click()
  }

  async clickPastButton (): Promise<void> {
    await this.pastYearsButton.click()
  }

  async clickEscapeKeyboardButton (): Promise<void> {
    await this.page.keyboard.press('Escape')
  }

  async clickNextMonthButton (): Promise<void> {
    await this.nextMonthButton.click()
  }

  async clickPreviousMonthButton (): Promise<void> {
    await this.previousMonthButton.click()
  }

  async clickOnCurrentVisibleYearInMenu (): Promise<void> {
    await this.currentVisibleYearInMenu.click()
  }

  async clickOnCurrentVisibleMonthInMenu (): Promise<void> {
    await this.currentVisibleMonthInMenu.click()
  }

  async clickOnMonthInList (month: string): Promise<void> {
    const monthLocator: Locator = this.page.locator(`//div[@class="react-datepicker__month-dropdown"]/div[text()="${month}"]`)
    await monthLocator.click()
  }

  async clickOnYearInList (year: number): Promise<void> {
    const yearLocator: Locator = this.page.locator(`//div[@class="react-datepicker__year-dropdown"]/div[text()="${year}"]`)
    await yearLocator.click()
  }

  async clickOnTimeInList (time: timeOptions): Promise<void> {
    const timeLocator: Locator = this.page.locator(`//div/ul[@class="react-datepicker__time-list"]/li[text()= '${time}']`)
    await timeLocator.click()
  }

  async clickOnSelectDateInputField (): Promise<void> {
    await this.dateInputField.click()
  }

  async clickOnDateAndTimeInputField (): Promise<void> {
    await this.dateAndTimeInputField.click()
  }

  async getFormatedTime (time: timeOptions): Promise<string> {
    const timeArray: string[] = time.split(':')
    const timePeriod: 'AM' | 'PM' = Number(timeArray[0]) >= 12 ? 'PM' : 'AM'
    timeArray[0] = `${Number(timeArray[0]) % 12 === 0 ? 12 : Number(timeArray[0]) % 12}`
    return `${timeArray.join(':')} ${timePeriod}`
  }

  async getFirstYearInList (): Promise<number> {
    return Number(await this.firstYearInList.textContent())
  }

  async getTimeFromInput (): Promise<string> {
    const inputValue: string = await this.dateAndTimeInputField.getAttribute('value') as string
    return inputValue.split(' ')[3] + ' ' + inputValue.split(' ')[4]
  }

  async getCurrentMonthFromDatepickersHeader (): Promise<string> {
    const currentMonthText = await this.currentMonthAndYearInHeader.textContent() as string
    return currentMonthText.replace(/[^a-zA-Z]/g, '')
  }

  async getCurrentYearFromDatepickersHeader (): Promise<string> {
    const currentYearText = await this.currentMonthAndYearInHeader.textContent() as string
    return currentYearText.replace(/[a-zA-Z]/g, '').trim()
  }

  async getFormatedDate (date: string, time?: timeOptions): Promise<string> {
    const filteredDateArray: string[] = date.replace(',', '').split(' ')
    if (time === undefined || time === null) {
      return [
        String(this.monthsArray.indexOf(filteredDateArray[0]) + 1).padStart(2, '0'),
        String(Number(filteredDateArray[1])).padStart(2, '0'),
        filteredDateArray[2]
      ].join('/')
    }
    return `${date} ${time} ${Number(time) > 12 ? 'PM' : 'AM'}`
  }

  getFormattedLocalDate (): string {
    const localDate = new Date()
    const [month, day, year] = [
      String(localDate.getMonth() + 1).padStart(2, '0'),
      String(localDate.getDate()).padStart(2, '0'),
      localDate.getFullYear()
    ]
    return `${month}/${day}/${year}`
  }

  async getDisplayedDate (): Promise<string> {
    return await this.dateInputField.inputValue()
  }

  async makeYearVisibleInList (year: string): Promise<void> {
    const currentLocalYear = new Date().getFullYear()
    const yearsDifference: number = currentLocalYear - Number(year)
    await this.currentVisibleYearInMenu.click()
    if (Math.abs(yearsDifference) < 5) { return }
    const button = yearsDifference < 0 ? this.upcomingYearsButton : this.pastYearsButton
    let remainingClicks = Math.abs(yearsDifference)
    while (remainingClicks-- > 0) {
      await button.click()
    }
  }

  async verifyDefaultDate (expectedDate: string, displayedDate: string): Promise<void> {
    expect(displayedDate).toBe(expectedDate)
  }

  async isDefaultDateAndTimeCorrect (): Promise<void> {
    const dateInputValue: string | null = await this.dateAndTimeInputField.getAttribute('value')
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

  async isChosenDateInInputCorrect (date: string, time?: timeOptions): Promise<void> {
    if (time === undefined) {
      const dateInputValue: string = await this.dateInputField.getAttribute('value') as string
      expect(dateInputValue).toBe(date)
    } else {
      const dateInputValue: string | null = await this.dateAndTimeInputField.getAttribute('value') as string
      const expectedDateValue: string = `${date} ${await this.getFormatedTime(time)}`
      expect(dateInputValue).toBe(expectedDateValue)
    }
  }

  async isTimeInInputFieldCorrect (formattedTime: string): Promise<void> {
    expect(await this.getTimeFromInput()).toBe(formattedTime)
  }

  async isMonthInHeaderCorrect (expectedMonth: string): Promise<void> {
    expect(await this.getCurrentMonthFromDatepickersHeader()).toBe(expectedMonth)
  }

  async isYearInHeaderCorrect (expectedYear: number): Promise<void> {
    expect(await this.getCurrentYearFromDatepickersHeader()).toBe(expectedYear.toString())
  }

  async isChosenMonthInListCorrect (month: string): Promise<void> {
    expect(await this.currentVisibleMonthInMenu.textContent()).toBe(month)
  }

  async isChosenYearInListCorrect (year: number): Promise<void> {
    expect(await this.currentVisibleYearInMenu.textContent()).toBe(year.toString())
  }

  async isYearDifferent (currentYear: number, initialYear: number, state: 'Upcoming' | 'Past'): Promise<void> {
    const matcher = state === 'Upcoming' ? 'toBeGreaterThan' : 'toBeLessThan'
    expect(currentYear)[matcher](initialYear)
  }
}
