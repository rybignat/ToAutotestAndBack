# To autotest and back

## 🚀 Review

"To autotest and back" - This is my pet-project, in which I get acquainted with practices and approaches in auto-tests using TypeScript and the Playwright framework. The project is organized according to the Page Object Model principle, which helps improve testing skills.

## 🛠️ Functions

- Practicing skills with the Playwright framework.
- Writing tests in TypeScript.
- Organizing code using the Page Object Model pattern.
- Integration with ESLint to maintain code quality

## 📦 Install

To install and run my project, make sure you have Node.js and Git installed! Then follow these steps:

1. **Clone the repository:**

```bash
git clone [https://github.com/rybignat/ToAutotestAndBack.git]
```

2. Installing dependencies:

```bash
npm install
npx playwright install --with-deps
```

3. **Check functionality:**

Run tests to make sure everything works:

```bash
npm run test
```

## 🚀 Use

The following commands are available in this project:

- `npm run tests`: Run all tests using Playwright.
- `npm run lint`: Code inspection using ESLint.
- `npm run lint fix`: Automatically fix errors found by ESLint.

##    Testing

The project uses Playwright to write and run tests. To run the tests, use the `npm run test` command.

Project structure:

```plaintext
.github/
└── workflows/
    └── playwright.yml

interfaces/
└──datePicker.t.ts

node_modules/

pageObjects/
├──brokenlinks_images.ts
├──buttons.page.ts
├──checkBox.page.ts
├──commonObjects.page.ts
├──dynamicProperties.page.ts
├──links.page.ts
├──main.page.ts
├──radioButton.page.ts
├──textBox.page.ts
├──uploadAndDownload.page.ts
└──webTables.page.ts

test-results/

tests/
├──widgets/
    └──datePicker.spec.ts
├──brokenlinks_images.spec.ts
├──buttons.spec.ts
├──checkBox.spec.ts
├──dynamicProperties.spec.ts
├──links.spec.ts
├──radioButton.spec.ts
├──textBox.spec.ts
├──uploadAndDownload.spec.ts
└──webTables.spec.ts

Utils/
├──Components/
    ├──datePicker.page.ts
|   ├──navigationBar.page.ts
|   └──registrationForm.page.ts
├──Uploads
|    └──sampleFile.jpeg
├──cusomReporter.ts
├──functions.ts
└──types.ts

.eslintignore
.eslintrc.js
.gitignore
package-lock.json
package.json
playwright.config.ts
README.md
tsconfig.json
```

Main files and folders:

- **Utils/Components**: Contains application components.
- **Utils/Uploads**: Contains samples for tests.
- **pageObjects/main.page.js**: An example of a page organized according to the Page Object Model.
- **Utils/**: Utility functions, such as `functions.ts` or `customReporter.ts`.
- **.github/workflows/playwright.yml**: CI configuration to run tests automatically.
