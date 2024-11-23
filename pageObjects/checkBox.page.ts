import { type Locator, type Page } from '@playwright/test'
import { scrollToElement } from '../Utils/functions'

export default class CheckBoxPage {
  page: Page
  expandAllButton: Locator
  collapseButton: Locator
  outputArea: Locator

  constructor (page: Page) {
    this.page = page
    this.expandAllButton = page.locator('//button[@title="Expand all"]')
    this.collapseButton = page.locator('//button[@title="Collapse all"]')
    this.outputArea = page.locator('')
  }

  async clickExpandAllButton (): Promise<void> {
    await this.expandAllButton.click({ force: true })
  }

  async clickCheckBoxByName (elementName: string): Promise<void> {
    const locator: Locator = this.page.locator(`//ol/li/span/label/span[text()="${elementName}"]`)
    await scrollToElement(this.page, `//ol/li/span/label/span[text()="${elementName}"]`)
    await locator.click()
  }

  async loopThroughStringArrayAndClick (elementsList: string[]): Promise<void> {
    for (const elementName of elementsList) {
      await this.clickCheckBoxByName(elementName)
    }
  }

  async formatArray (elementsArray: string[]): Promise<string[]> {
    const resultArray: string[] = []
    const parentsArray: string[] = await this.getParentsByRules(elementsArray)

    for (const element of elementsArray) {
      if (element.includes('.doc')) {
        const word = element.replace('.doc', '').split(' ')
        const secondWord = word[1][0].toUpperCase() + word[1].slice(1).toLowerCase()
        resultArray.push(`${word[0].toLowerCase()}${secondWord}`)
        continue
      }
      resultArray.push(element.toLowerCase())
    }
    return [...resultArray, ...parentsArray]
  }

  async getSpanQuantity (): Promise<number> {
    const spanElements = await this.page.locator('//div[@id="result"]/span').count()
    return spanElements - 1
  }

  async getParentsByRules (elementsArray: string[]): Promise<string[]> {
    const parentsArray: string[] = []
    if (elementsArray.includes('Desktop')) {
      parentsArray.push('notes', 'commands')
    }
    if (elementsArray.includes('Notes') && elementsArray.includes('Commands')) {
      parentsArray.push('desktop')
    }
    if (elementsArray.includes('React') && elementsArray.includes('Angular') && elementsArray.includes('Veu')) {
      parentsArray.push('workspace')
    }
    if (elementsArray.includes('Public') && elementsArray.includes('Private') &&
      elementsArray.includes('Classified') && elementsArray.includes('General')) {
      parentsArray.push('office')
    }
    if (parentsArray.includes('workspace') && parentsArray.includes('office')) {
      parentsArray.push('documents')
    }
    if (elementsArray.includes('Word File.doc') && elementsArray.includes('Excel File.doc')) {
      parentsArray.push('downloads')
    }
    if (elementsArray.includes('Documents')) {
      parentsArray.push('react', 'angular', 'veu', 'public', 'private', 'classified', 'general', 'workspace', 'office')
    }
    if (parentsArray.includes('desktop') && parentsArray.includes('documents') && parentsArray.includes('downloads')) {
      parentsArray.push('home')
    }
    if (elementsArray.includes('Home')) {
      parentsArray.push('desktop', 'documents', 'downloads', 'notes', 'commands', 'workspace', 'office',
        'react', 'angular', 'veu', 'public', 'private', 'classified', 'general', 'wordFile', 'excelFile')
    }
    return parentsArray
  }

  async checkIsElementVisibleInResult (element: string): Promise<boolean> {
    return await this.page.locator(`//div[@id="result"]/span[text()="${element}"]`).isVisible()
  }
}
