import * as readline from 'readline-sync'

import {
  AnalyticAccountTrackerUseCase,
} from '#@/src/Contexts/Bank/Analytics/application/index.js'
import {
  AnalyticAccount,
} from '#@/src/Contexts/Bank/Analytics/domain/index.js'
import {
  DomainErrorHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

type onSuccess = () => void
type onError = (err: Error) => void
type Callback = (onSuccess: onSuccess, onError: onError) => void

export class AnalyticCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: AnalyticAccountTrackerUseCase) {
    this.options = [
      this.getAccountsPerCurrency.bind(this),
    ]
  }

  render() {
    const options = this.options
      .map((option, index) => `\t${index + 1}) ${option.name.replace('bound ', '')}`)
      .join('\n')
    const message = `
      Welcome to our Analytic CLI for EventBank!
      Please, choose an option:
      ${options}`
    // eslint-disable-next-line no-console
    console.log(message)

    const optionSelected = Number(readline.question('Option:'))
    const cb = this.options.at(optionSelected - 1)
    if (cb) {
      cb(this.render.bind(this), this.onError.bind(this))
    }
  }

  private onError(err: Error) {
    const message = DomainErrorHandler?.isDomainError(err)
      ? `[${err.constructor.name}]: : ${err.message}`
      : 'Something failed, please try again...'
    // eslint-disable-next-line no-console
    console.log(message)
  }

  // private getAccountsPerCurrency(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
  private getAccountsPerCurrency(onSuccess: onSuccess, onError: onError) {
    const currency = readline.question('Which currency do you want to analyze?: ')
    this.useCase
      .findAccountsPerCurrency(currency)
      .then((accounts: AnalyticAccount[]) => {
        const accountSize = accounts.length
        // eslint-disable-next-line no-console
        console.log(`There ${accountSize <= 1 ? 'is ' : 'are '}${accountSize} account(s) for currency ${currency}`)
      })
      .catch(onError)
      .finally(onSuccess)
  }
}
