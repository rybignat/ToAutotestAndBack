import type { Reporter, TestResult, TestStep, TestCase } from '@playwright/test/reporter'

export default class MyReporter implements Reporter {
  onTestEnd (test: TestCase, result: TestResult ) {
    console.log(`\nTest: ${test.title}\n`)

    if (result.steps && result.steps.length > 0) {
      result.steps.map((step: TestStep, index: number) => {
        const statusIcon: string = step.error ? '❌' : '✔️'

        // Определяем отступы для первого и последнего шагов
        const prefix: string = index === result.steps.length - 1 || (result.status !== 'passed' && index === result.steps.length - 2) ? '\n' : ''
        const suffix: string = index === 0 ? '\n' : ''

        console.log(`${prefix}    Step ${index + 1}: ${step.title} - ${step.duration}ms ${statusIcon}${suffix}`)
      })
    }

    console.log(`\nStatus: ${result.status}\n`)
  }
}