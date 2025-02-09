import { timeOptions } from '../Utils/types'

export interface IDatePicker {
  selectMonthInDropdown: (month: string) => Promise<void>
  selectYearInDropdown: (year: string) => Promise<void>
  clickOnMonthInList: (month: string) => Promise<void>
  clickOnYearInList: (year: string) => Promise<void>
  clickOnTimeInList: (time: timeOptions) => Promise<void>
  selectDateInCalendar: (date: string, timeOptions?: timeOptions) => Promise<void>
  fillDateInputField: (date: string, timeOptions?: timeOptions) => Promise<void>
  clickOnUpcomingButton: () => Promise<void>
  clickPastButton: () => Promise<void>
  clickEscapeKeyboardButton: () => Promise<void>
  clickOnSelectDateInputField: () => Promise<void>
  clickOnDateAndTimeInputField: () => Promise<void>
  clickNextMonthButton: () => Promise<void>
  clickPreviousMonthButton: () => Promise<void>
  clickOnCurrentVisibleYearInMenu: () => Promise<void>
  clickOnCurrentVisibleMonthInMenu: () => Promise<void>
  clearSelectDateInputField: () => Promise<void>
  clearDateAndTimeInputField: () => Promise<void>
  getCurrentTime: () => Promise<string>
  getFormatedTime: (time: timeOptions) => Promise<string>
  getFirstYearInList: () => Promise<string>
  getCurrentMonthFromDatepickersHeader: () => Promise<string>
  getCurrentYearFromDatepickersHeader: () => Promise<string>
  getFormatedDate: (date: string, time?: timeOptions) => Promise<string>
  makeYearVisibleInList: (year: string) => Promise<void>
  isDefaultDateCorrect: () => Promise<void>
  isDefaultDateAndTimeCorrect: () => Promise<void>
  isChosenDateInInputCorrect: (date: string, timeOptions?: timeOptions) => Promise<void>
  isChosenMonthInListCorrect: (month: string) => Promise<void>
  isChosenYearInListCorrect: (year: string) => Promise<void>
}
