import * as readline from 'readline-sync'

import {
  AtmAccountUseCase,
} from '#@/src/Contexts/Bank/Accounts/application/index.js'
import {
  Account,
} from '#@/src/Contexts/Bank/Accounts/domain/index.js'
import {
  DomainErrorHandler,
} from '#@/src/Contexts/Shared/domain/index.js'

type Callback = (onSuccess: () => void, onError: (err: Error) => void) => void

export class AtmCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: AtmAccountUseCase) {
    this.options = [
      this.findAccount.bind(this),
      this.deposit.bind(this),
      this.withdraw.bind(this),
    ]
  }

  render() {
    const options = this.options
      .map((option, index) => `\t${index + 1}) ${option.name.replace('bound ', '')}`)
      .join('\n')
    const message = `
      Welcome to our ATM CLI Bank!
      Please, choose an option:
      ${options}`
    // eslint-disable-next-line no-console
    console.log(message)

    const optionSelected = Number(readline.question('Option: '))
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
    // eslint-disable-next-line no-console
    console.log(err)
  }

  private findAccount(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const id = readline.question('What is your account id? ')
    this.useCase
      .find(id)
      .then((account: Account) => {
        // eslint-disable-next-line no-console
        console.log(`Account: ${account.id}`)
        // eslint-disable-next-line no-console
        console.log(`Name: ${account.name}`)
        // eslint-disable-next-line no-console
        console.log(`Balance: ${account.balance.amount} ${account.balance.currency}`)
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private deposit(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const id = readline.question('What is your account id?: ')
    const amount = readline.question('What is the amount to deposit?: ')
    const currency = readline.question('Which currency do you operate?: ')
    this.useCase
      .deposit(id, Number(amount), currency)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Your deposit was completed successfully!')
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private withdraw(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const id = readline.question('What is your account id?: ')
    const amount = readline.question('What is the amount to withdraw?: ')
    const currency = readline.question('Which currency do you operate?: ')
    this.useCase
      .withdraw(id, Number(amount), currency)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Your withdraw was completed successfully!')
      })
      .catch(onError)
      .finally(onSuccess)
  }
}
