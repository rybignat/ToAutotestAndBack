import { type Locator, type Page, expect } from '@playwright/test'
import { type UserRegistration } from '../types'
import WebTablesPage from '../../pageObjects/webTables.page'

export default class RegistrationFormPage {
  page: Page
  webTablesPage: WebTablesPage
  header: Locator
  closeButton: Locator
  submitButton: Locator
  firstNameInput: Locator
  lastNameInput: Locator
  emailInput: Locator
  ageInput: Locator
  salaryInput: Locator
  departmentInput: Locator
  errorColor: string = 'rgb(220, 53, 69)'
  successColor: string = 'rgb(40, 167, 69)'
  inputFieldsNames: { [key: string]: string } = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    Age: 'age',
    Email: 'userEmail',
    Salary: 'salary',
    Department: 'department'
  }

  constructor (page: Page) {
    this.page = page
    this.webTablesPage = new WebTablesPage(page)
    this.header = page.locator('//div[@id="registration-form-modal"]')
    this.closeButton = page.locator('//button[@class="close"]')
    this.submitButton = page.locator('//button[@id="submit"]')
    this.firstNameInput = page.locator('//div/input[@id="firstName"]')
    this.lastNameInput = page.locator('//div/input[@id="lastName"]')
    this.emailInput = page.locator('//div/input[@id="userEmail"]')
    this.salaryInput = page.locator('//div/input[@id="salary"]')
    this.departmentInput = page.locator('//div/input[@id="department"]')
    this.ageInput = page.locator('//div/input[@id="age"]')
  }

  async enterFirstName (firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName)
  }

  async enterLastName (lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName)
  }

  async enterEmail (email: string): Promise<void> {
    await this.emailInput.fill(email)
  }

  async enterAge (age: string): Promise<void> {
    await this.ageInput.fill(age)
  }

  async enterSalary (salary: string): Promise<void> {
    await this.salaryInput.fill(salary)
  }

  async enterDepartment (department: string): Promise<void> {
    await this.departmentInput.fill(department)
  }

  async clickSubmitButton (): Promise<void> {
    await this.submitButton.click()
  }

  async clickCloseButton (): Promise<void> {
    await this.closeButton.click()
    await this.page.waitForTimeout(3000)
  }

  async clickEscapeKeyboardButton (): Promise<void> {
    await this.page.keyboard.press('Escape')
    await this.page.waitForTimeout(3000)
  }

  async getValueFromInputField (inputFieldName: string): Promise<string> {
    const valueLocator: Locator = this.page.locator(`//div/input[@id="${this.inputFieldsNames[inputFieldName]}"]`)
    const value: string | null = await valueLocator.getAttribute('value')
    if (value !== null && value !== undefined) {
      return value
    }
    throw new Error('Missing attribute value for element')
  }

  async clearInputField (fieldName: string): Promise<void> {
    const fieldLocator: Locator = this.page.locator(`//div/input[@id="${this.inputFieldsNames[fieldName]}"]`)
    await fieldLocator.clear()
  }

  async makeUser (user: UserRegistration): Promise<void> {
    await this.webTablesPage.clickAddButton()
    await this.enterFirstName(user.firstName)
    await this.enterLastName(user.lastName)
    await this.enterEmail(user.email)
    await this.enterAge(user.age)
    await this.enterSalary(user.salary)
    await this.enterDepartment(user.department)
    await this.clickSubmitButton()
  }

  async createSpecifiedNumberOfUsers (user: UserRegistration, usersQuantity: number): Promise<void> {
    for (let i = 0; i < usersQuantity; i++) {
      await this.makeUser(user)
    }
    await this.page.waitForTimeout(3000)
  }

  async isModalWindowHeaderVisible (): Promise<boolean> {
    return await this.header.isVisible()
  }

  async checkInputValidationState (expectedColor: 'successColor' | 'errorColor', currentField: Locator): Promise<void> {
    const color: string = expectedColor === 'errorColor' ? this.errorColor : this.successColor
    await expect(currentField).toHaveCSS('border-color', color)
  }
}
