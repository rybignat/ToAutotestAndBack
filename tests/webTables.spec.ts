import { test, expect } from '@playwright/test'
import { UserRegistration, rowsOptions } from '../Utils/types'
import MainPage from '../pageObjects/main.page'
import RegistrationFormPage from '../Utils/Components/registrationForm.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds } from '../Utils/functions'
import WebTablesPage from '../pageObjects/webTables.page'

test.describe('Check functionality of WebTables page', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationFormPage: RegistrationFormPage

  const userData: UserRegistration = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
    age: '21',
    salary: '30000',
    department: 'Apple'
  }
  const spareUserData: UserRegistration = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    age: '25',
    salary: '30000',
    department: 'Google'
  }
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)
    navigationBar = new NavigationBar(page)
    webTablesPage = new WebTablesPage(page)
    registrationFormPage = new RegistrationFormPage(page)

    await mainPage.navigateToMainPage()
    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Web Tables')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Check the functionality of the delete user button', async () => {
    await test.step('Pre-conditions', async () => {
      await test.step('Create a new user', async () => {
        await registrationFormPage.makeUser(userData)
      })
    })
    await test.step('Delete created user', async () => {
      await webTablesPage.deleteUserButtonClick(userData.email)
    })
    await test.step('Post-conditions', async () => {
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })
  })

  test('CASE_2: Verify selecting rows per page updates the table display', async () => {
    const expRowsQuantity: rowsOptions = 5
    await test.step(`Select ${expRowsQuantity} rows per page`, async () => {
      await webTablesPage.selectQuantityOfRows(expRowsQuantity)
    })
    await test.step(`Verify ${expRowsQuantity} rows are displayed`, async () => {
      await webTablesPage.verifyRowsQuantityOnWebTable(expRowsQuantity)
    })
  })

  test('CASE_3: Check the functionality of the search area', async () => {
    await test.step('Pre-conditions', async () => {
      await test.step('Create a new users for test', async () => {
        await registrationFormPage.makeUser(userData)
        await registrationFormPage.makeUser(spareUserData)
      })
    })
    await test.step(`Fill search input with ${userData.email}`, async () => {
      await webTablesPage.searchInputFill(userData.email)
    })
    await test.step('Check that searched user appears in web table', async () => {
      await webTablesPage.isUserAppearsInWebTable(userData.email, true)
    })
    await test.step('Check that there are no mismatched data in the search', async () => {
      await webTablesPage.isUserAppearsInWebTable(spareUserData.email, false)
    })
    await test.step('Clear search input field', async () => {
      await webTablesPage.clearSearchInput()
    })
    await test.step('Delete created users', async () => {
      await webTablesPage.deleteUserButtonClick(userData.email)
      await webTablesPage.deleteUserButtonClick(spareUserData.email)
    })
  })

  test('CASE_4: Check the functionality of the buttons "Next" and "Previous" on page', async () => {
    await test.step('Pre-conditions', async () => {
      const expRowsQuantity: rowsOptions = 5
      await test.step('Select the number of lines per page equal to 5', async () => {
        await webTablesPage.selectQuantityOfRows(expRowsQuantity)
      })
      await test.step('Create new users', async () => {
        await registrationFormPage.createSpecNumberOfUsers(userData, 7)
      })
      await test.step('Check that created users appears in web table', async () => {
        await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 2)
      })
    })
    await test.step('Click on "Next" button', async () => {
      await webTablesPage.clickNextButton()
    })
    await test.step('Check the number of users on a page to check if we have navigated to next page', async () => {
      await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 5)
    })
    await test.step('Click on "Previous" button', async () => {
      await webTablesPage.clickPreviousButton()
    })
    await test.step('Check the number of users on a page to check if we have navigated to previous page', async () => {
      await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 2)
    })
  })

  test('CASE_5: Check the functionality of navigating to a page by indicating its number', async () => {
    await test.step('Pre-conditions', async () => {
      const expRowsQuantity: rowsOptions = 5
      await test.step('Select the number of lines per page equal to 5', async () => {
        await webTablesPage.selectQuantityOfRows(expRowsQuantity)
      })
      await test.step('Create new users', async () => {
        await registrationFormPage.createSpecNumberOfUsers(userData, 7)
      })
      await test.step('Check that created users appears in web table', async () => {
        await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 2)
      })
    })
    await test.step('Go to page №2', async () => {
      await webTablesPage.goToPageByNumber(2)
    })
    await test.step('Check the number of users on a page to check if we have navigated to page №2', async () => {
      await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 5)
    })
    await test.step('Go to page №1', async () => {
      await webTablesPage.goToPageByNumber(1)
    })
    await test.step('Check the number of users on a page to check if we have navigated to page №1', async () => {
      await webTablesPage.verifyUsersQuantityOnWebTable(userData.email, 2)
    })
  })

  test.describe('Test the modal: Check functionality of Registration form on Web Tables page', () => {
    test('CASE_1: Open using "Add" button and close using "Close" button', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Check that "Registration Form" is visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeTruthy()
      })
      await test.step('Click on the cross in the upper right corner of the modal window', async () => {
        await registrationFormPage.clickCloseButton()
      })
      await test.step('Check that "Registration form" is not visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeFalsy()
      })
    })

    test('CASE_2: Open using "Add" button and close using "Escape" keyboard button', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Check that "Registration Form" is visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeTruthy()
      })
      await test.step('Click on the cross in the upper right corner of the modal window', async () => {
        await registrationFormPage.clickEscapeKeyboardButton()
      })
      await test.step('Check that "Registration form" is not visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeFalsy()
      })
    })

    test('CASE_3: Check the functionality of the error signal when entering incorrect data', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that "First Name", "Last Name", "Email", "Age", "Salary", "Department" fields signal an error',
        async () => {
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "First Name" field with ${userData.firstName}`, async () => {
        await registrationFormPage.enterFirstName(userData.firstName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name" field',
        async () => {
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "Last Name" field with ${userData.lastName}`, async () => {
        await registrationFormPage.enterLastName(userData.lastName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name" fields',
        async () => {
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "Email" field with ${userData.email}`, async () => {
        await registrationFormPage.enterEmail(userData.email)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name", "Email" fields',
        async () => {
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkForInputError('successColor', registrationFormPage.emailInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "Age" field with ${userData.age}`, async () => {
        await registrationFormPage.enterAge(userData.age)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name", "Email",' +
          ' "Age" fields',
      async () => {
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.firstNameInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.lastNameInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.emailInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.ageInput)
        await registrationFormPage.checkForInputError('errorColor', registrationFormPage.salaryInput)
        await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
      })
      await test.step(`Fill the "Salary" field with ${userData.salary}`, async () => {
        await registrationFormPage.enterSalary(userData.salary)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name", "Email",' +
        '"Age", "Salary" fields', async () => {
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.firstNameInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.lastNameInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.emailInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.ageInput)
        await registrationFormPage.checkForInputError('successColor', registrationFormPage.salaryInput)
        await registrationFormPage.checkForInputError('errorColor', registrationFormPage.departmentInput)
      })
      await test.step(`Fill the "Department" field with ${userData.department}`, async () => {
        await registrationFormPage.enterDepartment(userData.department)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that new user appears in the table', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, true)
      })
    })

    test('CASE_4: Create a new user and check if the data has been transformed in table', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Check that "Registration Form" is visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeTruthy()
      })
      await test.step(`Fill First Name input with ${userData.firstName}`, async () => {
        await registrationFormPage.enterFirstName(userData.firstName)
      })
      await test.step(`Fill Last Name input with ${userData.lastName}`, async () => {
        await registrationFormPage.enterLastName(userData.lastName)
      })
      await test.step(`Fill Email input with ${userData.email}`, async () => {
        await registrationFormPage.enterEmail(userData.email)
      })
      await test.step(`Fill Age input with ${userData.age}`, async () => {
        await registrationFormPage.enterAge(userData.age)
      })
      await test.step(`Fill Salary input with ${userData.salary}`, async () => {
        await registrationFormPage.enterSalary(userData.salary)
      })
      await test.step(`Fill Department input with ${userData.department}`, async () => {
        await registrationFormPage.enterDepartment(userData.department)
      })
      await test.step('Click Submit button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that user appears in web tables', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, true)
      })
      await test.step(`Check that user First Name in table is ${userData.firstName}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'firstName')
        cellContent != null ? expect(cellContent).toBe(userData.firstName) : process.exit(1)
      })
      await test.step(`Check that user Last Name in table is ${userData.lastName}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'lastName')
        cellContent != null ? expect(cellContent).toBe(userData.lastName) : process.exit(1)
      })
      await test.step(`Check that user Age in table is ${userData.age}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'age')
        cellContent != null ? expect(cellContent).toBe(userData.age) : process.exit(1)
      })
      await test.step(`Check that user Salary in table is ${userData.salary}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'salary')
        cellContent != null ? expect(cellContent).toBe(userData.salary) : process.exit(1)
      })
      await test.step(`Check that user Department in table is ${userData.department}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'department')
        cellContent != null ? expect(cellContent).toBe(userData.department) : process.exit(1)
      })
      await test.step('Delete created user', async () => {
        await webTablesPage.deleteUserButtonClick(userData.email)
      })
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })

    test('CASE_5: Check user data in the registration form window has not been transformed in registration form', async () => {
      await test.step('Pre-conditions', async () => {
        await test.step('Create new user', async () => {
          await registrationFormPage.makeUser(userData)
        })
        await test.step('Click on "Edit" button of test user', async () => {
          await webTablesPage.editUserButtonClick(userData.email)
        })
      })
      await test.step(`Check that user First Name in registration form is ${userData.firstName}`, async () => {
        const currentFirstName = await registrationFormPage.getValueFromElement('First Name')
        expect(userData.firstName).toBe(currentFirstName)
      })
      await test.step(`Check that user Last Name in registration form is ${userData.lastName}`, async () => {
        const currentLastName = await registrationFormPage.getValueFromElement('Last Name')
        expect(userData.lastName).toBe(currentLastName)
      })
      await test.step(`Check that user Email in table is ${userData.email}`, async () => {
        const currentEmail = await registrationFormPage.getValueFromElement('Email')
        expect(userData.email).toBe(currentEmail)
      })
      await test.step(`Check that user Age in table is ${userData.age}`, async () => {
        const currentAge = await registrationFormPage.getValueFromElement('Age')
        expect(userData.age).toBe(currentAge)
      })
      await test.step(`Check that user Salary in table is ${userData.salary}`, async () => {
        const currentSalary = await registrationFormPage.getValueFromElement('Salary')
        expect(userData.salary).toBe(currentSalary)
      })
      await test.step(`Check that user Department in table is ${userData.department}`, async () => {
        const currentDepartment = await registrationFormPage.getValueFromElement('Department')
        expect(userData.department).toBe(currentDepartment)
      })
      await test.step('Close registration form', async () => {
        await registrationFormPage.clickCloseButton()
      })
      await test.step('Delete created user', async () => {
        await webTablesPage.deleteUserButtonClick(userData.email)
      })
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })

    test('CASE_6: Check the functionality of the ability to edit an existing user', async () => {
      await test.step('Pre-conditions', async () => {
        await test.step('Create test user', async () => {
          await registrationFormPage.makeUser(userData)
        })
        await test.step('Check is user appears in the table', async () => {
          await webTablesPage.isUserAppearsInWebTable(userData.email, true)
        })
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(userData.email)
      })
      await test.step('Clear current First Name', async () => {
        await registrationFormPage.clearInputField('First Name')
      })
      await test.step(`Fill First Name input with ${spareUserData.firstName}`, async () => {
        await registrationFormPage.enterFirstName(spareUserData.firstName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user First Name in table is ${spareUserData.firstName}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'firstName')
        expect(cellContent).toBe(spareUserData.firstName)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(userData.email)
      })
      await test.step('Clear current Last Name', async () => {
        await registrationFormPage.clearInputField('Last Name')
      })
      await test.step(`Fill Last Name input with ${spareUserData.lastName}`, async () => {
        await registrationFormPage.enterLastName(spareUserData.lastName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user Last Name in table is ${spareUserData.lastName}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'lastName')
        expect(cellContent).toBe(spareUserData.lastName)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(userData.email)
      })
      await test.step('Clear current Email', async () => {
        await registrationFormPage.clearInputField('Email')
      })
      await test.step(`Fill Email input with ${spareUserData.email}`, async () => {
        await registrationFormPage.enterEmail(spareUserData.email)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user Email in table is ${spareUserData.email}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(spareUserData.email, 'email')
        cellContent != null ? expect(cellContent).toBe(spareUserData.email) : process.exit(1)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(spareUserData.email)
      })
      await test.step('Clear current Age', async () => {
        await registrationFormPage.clearInputField('Age')
      })
      await test.step(`Fill Age input with ${spareUserData.age}`, async () => {
        await registrationFormPage.enterAge(spareUserData.age)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user Age in table is ${spareUserData.age}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(spareUserData.email, 'age')
        cellContent != null ? expect(cellContent).toBe(spareUserData.age) : process.exit(1)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(spareUserData.email)
      })
      await test.step('Clear current Salary', async () => {
        await registrationFormPage.clearInputField('Salary')
      })
      await test.step(`Fill Salary input with ${spareUserData.salary}`, async () => {
        await registrationFormPage.enterSalary(spareUserData.salary)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user Email in table is ${spareUserData.salary}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(spareUserData.email, 'salary')
        cellContent != null ? expect(cellContent).toBe(spareUserData.salary) : process.exit(1)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.editUserButtonClick(spareUserData.email)
      })
      await test.step('Clear current Department', async () => {
        await registrationFormPage.clearInputField('Department')
      })
      await test.step(`Fill Department input with ${spareUserData.department}`, async () => {
        await registrationFormPage.enterDepartment(spareUserData.department)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step(`Check that user Department in table is ${spareUserData.department}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(spareUserData.email, 'department')
        cellContent != null ? expect(cellContent).toBe(spareUserData.department) : process.exit(1)
      })
      await test.step('Delete created user', async () => {
        await webTablesPage.deleteUserButtonClick(spareUserData.email)
      })
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })
    test('CASE_7: Check the functionality of protection against unwanted closing of the registration form', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step(`Enter ${userData.firstName} in "First Name" field`, async () => {
        await registrationFormPage.enterFirstName(userData.firstName)
      })
      await test.step('Close registration form', async () => {
        await registrationFormPage.clickCloseButton()
      })
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Check that data is saved', async () => {
        const currentFirstName = await registrationFormPage.getValueFromElement('First Name')
        expect(userData.firstName).toBe(currentFirstName)
      })
    })
  })
})
