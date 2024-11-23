import { test } from '@playwright/test'
import LinksPage from '../pageObjects/links.page'
import MainPage from '../pageObjects/main.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utils/functions'

test.describe('Check the functioning of the "Links" section', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let linksPage: LinksPage

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    linksPage = new LinksPage(page)

    await mainPage.navigateToMainPage()
    await removeMainAds(page)
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Links')
    await removeSideAds(page)
  })

  test('CASE_1: Verify "Home" Link Functionality', async ({ context }) => {
    await test.step('Click on the "Home" link.(Expected result: A new tab opens, navigating to the home page', async () => {
      await linksPage.openAndCheckNewPage(context, false)
    })
  })

  test('CASE_2: Verify Dynamic Link Functionality', async ({ context }) => {
    await test.step('Click on the dynamic link.(Expected result: A new tab opens, navigating to the home page', async () => {
      await linksPage.openAndCheckNewPage(context, true)
    })
  })

  test('CASE_3: Verify "Created" Link Functionality', async () => {
    const statusCode = 201
    const statusText = 'Created'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_4: Verify "No Content" Link Functionality', async () => {
    const statusCode = 204
    const statusText = 'No Content'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_5: Verify "Moved" Link Functionality', async () => {
    const statusCode = 301
    const statusText = 'Moved'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText} Permanently`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_6: Verify "Bad Request" Link Functionality', async () => {
    const statusCode = 400
    const statusText = 'Bad Request'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_7: Verify "Unauthorized" Link Functionality', async () => {
    const statusCode = 401
    const statusText = 'Unauthorized'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_8: Verify "Forbidden" Link Functionality', async () => {
    const statusCode = 403
    const statusText = 'Forbidden'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })

  test('CASE_9: Verify "Not Found" Link Functionality', async () => {
    const statusCode = 404
    const statusText = 'Not Found'
    await test.step(`Click the ${statusText} link`, async () => {
      await linksPage.clickLinkByName(statusText)
    })
    await test.step(`Check response.(Expected result: Response with status code ${statusCode} is received`, async () => {
      await linksPage.checkStatusTextAndCodeInResponse(statusCode, statusText)
    })
    await test.step(`Check the result area.(Expected result: Link has responded with status ${statusCode} and status text ${statusText}`, async () => {
      await linksPage.checkResultMessage(statusCode, statusText)
    })
  })
})
