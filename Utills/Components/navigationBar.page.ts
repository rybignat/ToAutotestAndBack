import { Locator, Page } from '@playwright/test'
import { findKeyByValue } from '../functions'
import { NavigationBarStructure } from '../types'
export class NavigationBar {
  page: Page
  navigationBarStructure: NavigationBarStructure = {
    Elements: ['Text Box', 'Check Box', 'Radio Button', 'Web Tables', 'Buttons', 'Links', 'Broken Links - Images', 'Upload and Download', 'Dynamic Properties'],
    Forms: ['Practice Form'],
    "Alerts, Frame & Windows": ['Browser Windows', 'Alerts', 'Frames', 'Nested Frames', 'Modal Dialogs'],
    Widgets: ['Accordian', 'Auto Complete', 'Date Picker', 'Slider', 'Progress Bar', 'Tabs', 'Tool Tips', 'Menu', 'Select Menu'],
    Interactions: ['Sortable', 'Selectable', 'Resizable', 'Droppable', 'Dragabble'],
    "Book Store Application": ['Login', 'Book Store', 'Profile', 'Book Store API']
  }

  constructor (page: Page) {
    this.page = page
  }

  async clickExpandButtonByName (elementName: string): Promise<void> {
    const locator: Locator = this.page.locator(`
      //div[@class="element-group"]
      //div[@class="header-text" and contains(text(), "${elementName}")]
      `)

    await locator.click()
  }

  async clickOnElementByParentAndName (elementName: string): Promise<void> {
    const parentName: string | undefined = await findKeyByValue(this.navigationBarStructure, elementName)
    if (!parentName) {
      process.exit(1)
    }
    const locator: Locator = this.page.locator(`
      //div[text()="${parentName}"]/ancestor::div[2]
      //div[@class="element-list collapse show"]
      //span[text()="${elementName}"]
      `)

    await locator.click()
  }
}
