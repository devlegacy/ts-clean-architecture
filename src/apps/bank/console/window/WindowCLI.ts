import * as readline from 'readline-sync'

import {
  AccountUseCase,
} from '#@/src/Contexts/Bank/Accounts/application/index.js'
import {
  Account,
} from '#@/src/Contexts/Bank/Accounts/domain/index.js'
import {
  DomainErrorHandler,
  Uuid,
} from '#@/src/Contexts/Shared/domain/index.js'

type onSuccess = () => void
type onError = (err: Error) => void
type Callback = (onSuccess: onSuccess, onError: onError) => void

export class WindowCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: AccountUseCase) {
    this.options = [
      this.createAccount.bind(this),
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
      Welcome to our Window CLI Bank!
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

  // private createAccount(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
  private createAccount(onSuccess: onSuccess, onError: onError) {
    const name = readline.question('What is the account name? ')
    const currency = readline.question(`${name}. Which currency do you operate?: `)

    this.useCase
      .create(Uuid.random().value, name, currency)
    // eslint-disable-next-line no-console
      .then((id: string) => console.log(`Congratulations ${name}. Your account ${id} was created!`))
      .catch(onError)
      .finally(onSuccess)
  }

  private findAccount(onSuccess: onSuccess, onError: onError) {
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

  private deposit(onSuccess: onSuccess, onError: onError) {
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

  private withdraw(onSuccess: onSuccess, onError: onError) {
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

// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/bank/console/main.ts
// 3c5da588-ca85-4908-a43f-0073530f5ef8
// ca2d1f53-8c44-4998-bcca-36418e6a9cc1
