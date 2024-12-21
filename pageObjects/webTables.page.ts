import { type Locator, type Page, expect } from '@playwright/test'

export default class WebTablesPage {
  page: Page
  addNewUserButton: Locator
  searchInput: Locator
  previousPageButton: Locator
  nextPageButton: Locator
  pageNumber: Locator
  rowsPerPageDropdownMenu: Locator

  constructor (page: Page) {
    this.page = page
    this.addNewUserButton = page.locator('//button[@id="addNewRecordButton"]')
    this.previousPageButton = page.locator('//div[@class="-pagination"]/div/button[text()="Previous"]')
    this.nextPageButton = page.locator('//div[@class="-pagination"]/div/button[text()="Next"]')
    this.pageNumber = page.locator('//div[@class="-pageJump"]/input')
    this.searchInput = page.locator('//input[@id="searchBox"]')
    this.rowsPerPageDropdownMenu = page.locator('//span/select[@aria-label="rows per page"]')
  }

  async isUserAppearsInWebTable (userEmail: string, condition: boolean): Promise<void> {
    const locator = this.page.locator(`//div[@role="gridcell"][text()="${userEmail}"]`)
    condition ? await expect(locator).toBeVisible() : await expect(locator).not.toBeVisible()
  }

  async checkTextContentOfTableCellByCellName (userEmail: string, cellName: string): Promise<string | null> {
    const cellsNames: { [key: string]: number } = {
      firstName: 1,
      lastName: 2,
      age: 3,
      email: 4,
      salary: 5,
      department: 6
    }
    const cellContent = await this.page.locator(`//div[@role="gridcell"][text()="${userEmail}"]
    /parent::div/div[${cellsNames[cellName]}]`).textContent()
    if (cellContent === null) {
      process.exit(1)
    }
    return cellContent.trim()
  }

  async clickEditUserButton (userEmail: string): Promise<void> {
    const editButtonLocator = this.page.locator(`//div[@role="gridcell"][text()="${userEmail}"]/parent::div/descendant::span[@title="Edit"]`)
    await editButtonLocator.click()
  }

  async deleteUserButtonClick (userEmail: string): Promise<void> {
    const deleteUserButton = this.page.locator(`//div[@role="gridcell"][text()="${userEmail}"]/parent::div/descendant::span[@title="Delete"]`)
    await deleteUserButton.click()
  }

  async enterSearchData (userEmail: string): Promise<void> {
    await this.searchInput.fill(userEmail)
  }

  async clearSearchInput (): Promise<void> {
    await this.searchInput.clear()
  }

  async clickAddButton (): Promise<void> {
    await this.addNewUserButton.click()
  }

  async clickPreviousButton (): Promise<void> {
    await this.previousPageButton.click()
  }

  async clickNextButton (): Promise<void> {
    await this.nextPageButton.click()
  }

  async goToPageByNumber (pageNumber: number): Promise<void> {
    await this.pageNumber.fill(pageNumber.toString())
    await this.page.keyboard.press('Enter')
  }

  async selectQuantityOfRows (value: number): Promise<void> {
    await this.rowsPerPageDropdownMenu.selectOption({ value: value.toString() })
  }

  async verifyRowsQuantityOnWebTable (expectedQuantity: number): Promise<void> {
    const quantity = this.page.locator('//div[@class="rt-tbody"]/div')
    await expect(quantity).toHaveCount(expectedQuantity)
  }

  async verifyUsersQuantityOnWebTable (userEmail: string, expectedQuantity: number): Promise<void> {
    const usersQuantity = this.page.locator(`//div[@role="gridcell"][text()="${userEmail}"]`)
    await expect(usersQuantity).toHaveCount(expectedQuantity)
  }
}
