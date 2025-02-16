import { timeOptions } from '../Utils/types'

export interface IDatePicker {
  selectMonthInDropdown: (month: string) => Promise<void>
  selectYearInDropdown: (year: number) => Promise<void>
  clickOnMonthInList: (month: string) => Promise<void>
  clickOnYearInList: (year: number) => Promise<void>
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
  getTimeFromInput: () => Promise<string>
  getFormatedTime: (time: timeOptions) => Promise<string>
  getFirstYearInList: () => Promise<number>
  getCurrentMonthFromDatepickersHeader: () => Promise<string>
  getCurrentYearFromDatepickersHeader: () => Promise<string>
  getFormatedDate: (date: string, time?: timeOptions) => Promise<string>
  getFormattedLocalDate: () => string
  getDisplayedDate: () => Promise<string>
  verifyDefaultDate: (expectedDate: string, displayedDate: string) => Promise<void>
  makeYearVisibleInList: (year: string) => Promise<void>
  isTimeInInputFieldCorrect: (formattedTime: string) => Promise<void>
  isDefaultDateAndTimeCorrect: () => Promise<void>
  isMonthInHeaderCorrect: (expectedMonth: string) => Promise<void>
  isYearDifferent: (currentYear: number, initialYear: number, state: 'Upcoming' | 'Past') => Promise<void>
  isYearInHeaderCorrect: (expectedYear: number) => Promise<void>
  isChosenDateInInputCorrect: (date: string, timeOptions?: timeOptions) => Promise<void>
  isChosenMonthInListCorrect: (month: string) => Promise<void>
  isChosenYearInListCorrect: (year: number) => Promise<void>
}
