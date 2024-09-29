import type { Reporter, TestResult, TestStep, TestCase } from '@playwright/test/reporter'

export default class MyReporter implements Reporter {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  onTestEnd (test: TestCase, result: TestResult) {
    console.log(`\nTest: ${test.title}\n`)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (result.steps && result.steps.length > 0) {
      // eslint-disable-next-line array-callback-return
      result.steps.map((step: TestStep, index: number) => {
        const statusIcon: string = (step.error != null) ? '❌' : '✔️'
        const prefix: string = index === result.steps.length - 1 || (result.status !== 'passed' && index === result.steps.length - 2) ? '\n' : ''
        const suffix: string = index === 0 ? '\n' : ''

        console.log(`${prefix}    Step ${index + 1}: ${step.title} - ${step.duration}ms ${statusIcon}${suffix}`)
      })
    }

    console.log(`\nStatus: ${result.status}\n`)
  }
}
