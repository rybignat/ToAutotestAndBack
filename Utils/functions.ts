import { type Page } from '@playwright/test'
export async function findKeyByValue<T> (obj: { [key: string]: T[] }, value: T): Promise<string | undefined> {
  for (const key in obj) {
    if (obj[key].includes(value)) {
      return key
    }
  }
  console.error(`${String(value)} doesn't exist in ${JSON.stringify(obj)}`)
  return undefined
}
export async function removeMainAds (page: Page): Promise<void> {
  const mainAds = page.locator('#adplus-anchor')
  await mainAds.evaluate(element => element.remove())
}
export async function removeSideAds (page: Page): Promise<void> {
  const sideAds = page.locator('#RightSide_Advertisement')
  await sideAds.evaluate(element => element.remove())
}
export async function callDebug (page: Page): Promise<void> {
  await page.pause()
}
export async function scrollToElement (page: Page, elementLocator: string): Promise<void> {
  let maxCount: number = 30
  let isVisible: boolean = await page.locator(elementLocator).isVisible()
  while (!isVisible || maxCount > 0) {
    await page.mouse.wheel(0, 2)
    maxCount -= 1
    isVisible = await page.locator(elementLocator).isVisible()
  }
}

export function env(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
}