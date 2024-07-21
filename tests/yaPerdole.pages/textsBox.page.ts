import { expect, type Locator, type Page } from '@playwright/test';

export class TextBox {
      page: Page
      fullNameInput: Locator
      emailInput: Locator
      currentAdressInput: Locator
      permanentAddressInput: Locator
      submitButton: Locator
      outputAreaName: Locator
      outputAreaEmail: Locator
      currentAddressOutput: Locator
      permanentAddressOutup: Locator

      constructor(page: Page) {

            this.page = page
            this.fullNameInput = page.locator('//input[@id="userName"]')
            this.emailInput = page.locator('//input[@id="userEmail"]')
            this.currentAdressInput = page.locator('//textarea[@id="currentAddress"]')
            this.permanentAddressInput = page.locator('//textarea[@id="permanentAddress"]')
            this.submitButton = page.locator('//button[@id="submit"]')
            this.outputAreaName = page.locator('//p[@id="name"]')
            this.outputAreaEmail = page.locator('//p[@id="email"]')
            this.currentAddressOutput = page.locator('//p[@id="currentAddress"]')
            this.permanentAddressOutup = page.locator('//p[@id="permanentAddress"]')
      }



}