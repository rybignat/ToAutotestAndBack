import { test, expect } from '@playwright/test'
import { UserRegistration, rowsOptions } from '../Utils/types'
import MainPage from '../pageObjects/main.page'
import RegistrationFormPage from '../Utils/Components/registrationForm.page'
import NavigationBar from '.././Utils/Components/navigationBar.page'
import { removeMainAds, removeSideAds, env } from '../Utils/functions'
import WebTablesPage from '../pageObjects/webTables.page'

test.describe('Check functionality of WebTables page', () => {
  let mainPage: MainPage
  let navigationBar: NavigationBar
  let webTablesPage: WebTablesPage
  let registrationFormPage: RegistrationFormPage

  const userData: UserRegistration = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: env('TEST_EMAIL'),
    age: '21',
    salary: '30000',
    department: 'Apple'
  }
  const spareUserData: UserRegistration = {
    firstName: 'John',
    lastName: 'Doe',
    email: env('SECOND_TEST_EMAIL'),
    age: '25',
    salary: '30000',
    department: 'Google'
  }
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page)

    const newPage = await mainPage.navigateToMainPage()
    if (newPage !== page) { page = newPage }

    navigationBar = new NavigationBar(page)
    webTablesPage = new WebTablesPage(page)
    registrationFormPage = new RegistrationFormPage(page)

    await mainPage.clickElementsOnMainPageByName('Elements')
    await navigationBar.clickOnElementByParentAndName('Web Tables')
    await removeMainAds(page)
    await removeSideAds(page)
  })

  test('CASE_1: Verify the functionality of the "Delete" button', async () => {
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

  test('CASE_2: Verify row selection updates the table display', async () => {
    const expRowsQuantity: rowsOptions = 5
    await test.step(`Select ${expRowsQuantity} rows per page`, async () => {
      await webTablesPage.selectQuantityOfRows(expRowsQuantity)
    })
    await test.step(`Verify ${expRowsQuantity} rows are displayed`, async () => {
      await webTablesPage.verifyRowsQuantityOnWebTable(expRowsQuantity)
    })
  })

  test('CASE_3: Verify the functionality of the search field', async () => {
    await test.step('Pre-conditions', async () => {
      await test.step('Create a new users for test', async () => {
        await registrationFormPage.makeUser(userData)
        await registrationFormPage.makeUser(spareUserData)
      })
    })
    await test.step(`Fill search input with ${userData.email}`, async () => {
      await webTablesPage.enterSearchData(userData.email)
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

  test('CASE_4: Verify the "Next" and "Previous" buttons functionality', async () => {
    await test.step('Pre-conditions', async () => {
      const expRowsQuantity: rowsOptions = 5
      await test.step('Select the number of lines per page equal to 5', async () => {
        await webTablesPage.selectQuantityOfRows(expRowsQuantity)
      })
      await test.step('Create new users', async () => {
        await registrationFormPage.createSpecifiedNumberOfUsers(userData, 7)
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

  test('CASE_5: Verify page navigation by entering a page number', async () => {
    await test.step('Pre-conditions', async () => {
      const expRowsQuantity: rowsOptions = 5
      await test.step('Select the number of lines per page equal to 5', async () => {
        await webTablesPage.selectQuantityOfRows(expRowsQuantity)
      })
      await test.step('Create new users', async () => {
        await registrationFormPage.createSpecifiedNumberOfUsers(userData, 7)
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
    test('CASE_1:Verify opening and closing of the Registration Form using the "Add" and "Close" buttons', async () => {
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

    test('CASE_2: Verify opening and closing of the Registration Form using the "Add" button and the "Escape" key', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Check that "Registration Form" is visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeTruthy()
      })
      await test.step('Press "Escape" keyboard button', async () => {
        await registrationFormPage.clickEscapeKeyboardButton()
      })
      await test.step('Check that "Registration form" is not visible', async () => {
        const modalWindowState = await registrationFormPage.isModalWindowHeaderVisible()
        expect(modalWindowState).toBeFalsy()
      })
    })

    test('CASE_3: Verify error indicators when entering invalid or incomplete data in the Registration Form', async () => {
      await test.step('Click "Add" button', async () => {
        await webTablesPage.clickAddButton()
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that "First Name", "Last Name", "Email", "Age", "Salary", "Department" fields signal an error',
        async () => {
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "First Name" field with ${userData.firstName}`, async () => {
        await registrationFormPage.enterFirstName(userData.firstName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name" field',
        async () => {
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "Last Name" field with ${userData.lastName}`, async () => {
        await registrationFormPage.enterLastName(userData.lastName)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name" fields',
        async () => {
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.emailInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
        })
      await test.step(`Fill the "Email" field with ${userData.email}`, async () => {
        await registrationFormPage.enterEmail(userData.email)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name", "Email" fields',
        async () => {
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.firstNameInput)
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.lastNameInput)
          await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.emailInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.ageInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.salaryInput)
          await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
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
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.firstNameInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.lastNameInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.emailInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.ageInput)
        await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.salaryInput)
        await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
      })
      await test.step(`Fill the "Salary" field with ${userData.salary}`, async () => {
        await registrationFormPage.enterSalary(userData.salary)
      })
      await test.step('Click "Submit" button', async () => {
        await registrationFormPage.clickSubmitButton()
      })
      await test.step('Check that the error signal has changed to a confirmation signal only in "First Name", "Last Name", "Email",' +
        '"Age", "Salary" fields', async () => {
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.firstNameInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.lastNameInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.emailInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.ageInput)
        await registrationFormPage.checkInputValidationState('successColor', registrationFormPage.salaryInput)
        await registrationFormPage.checkInputValidationState('errorColor', registrationFormPage.departmentInput)
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

    test('CASE_4: Verify user data is correctly added to the Web Table after registration', async () => {
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
        expect(cellContent).toBe(userData.firstName)
      })
      await test.step(`Check that user Last Name in table is ${userData.lastName}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'lastName')
        expect(cellContent).toBe(userData.lastName)
      })
      await test.step(`Check that user Age in table is ${userData.age}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'age')
        expect(cellContent).toBe(userData.age)
      })
      await test.step(`Check that user Salary in table is ${userData.salary}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'salary')
        expect(cellContent).toBe(userData.salary)
      })
      await test.step(`Check that user Department in table is ${userData.department}`, async () => {
        const cellContent: string | null = await webTablesPage.checkTextContentOfTableCellByCellName(userData.email, 'department')
        expect(cellContent).toBe(userData.department)
      })
      await test.step('Delete created user', async () => {
        await webTablesPage.deleteUserButtonClick(userData.email)
      })
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })

    test('CASE_5: Verify user data remains unchanged when displayed in the Registration Form', async () => {
      await test.step('Pre-conditions', async () => {
        await test.step('Create new user', async () => {
          await registrationFormPage.makeUser(userData)
        })
        await test.step('Click on "Edit" button of test user', async () => {
          await webTablesPage.clickEditUserButton(userData.email)
        })
      })
      await test.step(`Check that user First Name in registration form is ${userData.firstName}`, async () => {
        const currentFirstName = await registrationFormPage.getValueFromInputField('First Name')
        expect(userData.firstName).toBe(currentFirstName)
      })
      await test.step(`Check that user Last Name in registration form is ${userData.lastName}`, async () => {
        const currentLastName = await registrationFormPage.getValueFromInputField('Last Name')
        expect(userData.lastName).toBe(currentLastName)
      })
      await test.step(`Check that user Email in table is ${userData.email}`, async () => {
        const currentEmail = await registrationFormPage.getValueFromInputField('Email')
        expect(userData.email).toBe(currentEmail)
      })
      await test.step(`Check that user Age in table is ${userData.age}`, async () => {
        const currentAge = await registrationFormPage.getValueFromInputField('Age')
        expect(userData.age).toBe(currentAge)
      })
      await test.step(`Check that user Salary in table is ${userData.salary}`, async () => {
        const currentSalary = await registrationFormPage.getValueFromInputField('Salary')
        expect(userData.salary).toBe(currentSalary)
      })
      await test.step(`Check that user Department in table is ${userData.department}`, async () => {
        const currentDepartment = await registrationFormPage.getValueFromInputField('Department')
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

    test('CASE_6: Verify the ability to edit an existing user in Web Tables', async () => {
      await test.step('Pre-conditions', async () => {
        await test.step('Create test user', async () => {
          await registrationFormPage.makeUser(userData)
        })
        await test.step('Check is user appears in the table', async () => {
          await webTablesPage.isUserAppearsInWebTable(userData.email, true)
        })
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.clickEditUserButton(userData.email)
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
        await webTablesPage.clickEditUserButton(userData.email)
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
        await webTablesPage.clickEditUserButton(userData.email)
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
        expect(cellContent).toBe(spareUserData.email)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.clickEditUserButton(spareUserData.email)
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
        expect(cellContent).toBe(spareUserData.age)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.clickEditUserButton(spareUserData.email)
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
        expect(cellContent).toBe(spareUserData.salary)
      })
      await test.step('Click "Edit" button of test user', async () => {
        await webTablesPage.clickEditUserButton(spareUserData.email)
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
        expect(cellContent).toBe(spareUserData.department)
      })
      await test.step('Delete created user', async () => {
        await webTablesPage.deleteUserButtonClick(spareUserData.email)
      })
      await test.step('Check that created user is deleted', async () => {
        await webTablesPage.isUserAppearsInWebTable(userData.email, false)
      })
    })
    test('CASE_7: Verify protection against accidental closure of the Registration Form', async () => {
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
        const currentFirstName = await registrationFormPage.getValueFromInputField('First Name')
        expect(userData.firstName).toBe(currentFirstName)
      })
    })
  })
})
