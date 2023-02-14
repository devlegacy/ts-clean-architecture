import * as readline from 'readline-sync'

import { AccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { Account } from '@/Contexts/Bank/Accounts/domain'
import { AnalyticAccountTrackerUseCase } from '@/Contexts/Bank/Analytics/application'
import { AnalyticAccount } from '@/Contexts/Bank/Analytics/domain'
import { DomainError, Uuid } from '@/Contexts/Shared/domain'

type onSuccess = () => void
type onError = (err: Error) => void
type Callback = (onSuccess: onSuccess, onError: onError) => void

export class WindowCLI {
  private readonly options: Callback[]

  constructor(
    private readonly accountUseCase: AccountUseCase,
    private readonly analyticAccountUseCase: AnalyticAccountTrackerUseCase
  ) {
    this.options = [
      this.createAccount.bind(this),
      this.findAccount.bind(this),
      this.deposit.bind(this),
      this.withdraw.bind(this),
      this.getAccountsPerCurrency.bind(this),
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
    console.log(message)

    const optionSelected = Number(readline.question('Option: '))
    this.options[optionSelected - 1](this.render.bind(this), this.onError.bind(this))
  }

  private onError(err: Error) {
    const message = DomainError?.isKnownError(err)
      ? `[${err.constructor.name}]: : ${err.message}`
      : 'Something failed, please try again...'

    console.log(message)
    console.log(err)
  }

  // private createAccount(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
  private createAccount(onSuccess: onSuccess, onError: onError) {
    const name = readline.question('What is the account name? ')
    const currency = readline.question(`${name}. Which currency do you operate?: `)

    this.accountUseCase
      .create(Uuid.random().value, name, currency)
      .then((accountId: string) => console.log(`Congratulations ${name}. Your account ${accountId} was created!`))
      .catch(onError)
      .finally(onSuccess)
  }

  private findAccount(onSuccess: onSuccess, onError: onError) {
    const accountId = readline.question('What is your account id? ')
    this.accountUseCase
      .find(accountId)
      .then((account: Account) => {
        console.log(`Account: ${account.id}`)
        console.log(`Name: ${account.name}`)
        console.log(`Balance: ${account.balance.value} ${account.balance.currency}`)
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private deposit(onSuccess: onSuccess, onError: onError) {
    const accountId = readline.question('What is your account id?: ')
    const amount = readline.question('What is the amount to deposit?: ')
    const currency = readline.question('Which currency do you operate?: ')
    this.accountUseCase
      .deposit(accountId, Number(amount), currency)
      .then(() => {
        console.log('Your deposit was completed successfully!')
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private withdraw(onSuccess: onSuccess, onError: onError) {
    const accountId = readline.question('What is your account id?: ')
    const amount = readline.question('What is the amount to withdraw?: ')
    const currency = readline.question('Which currency do you operate?: ')
    this.accountUseCase
      .withdraw(accountId, Number(amount), currency)
      .then(() => {
        console.log('Your withdraw was completed successfully!')
      })
      .catch(onError)
      .finally(onSuccess)
  }

  private getAccountsPerCurrency(onSuccess: onSuccess, onError: onError) {
    const currency = readline.question('Which currency do you want to analyze?: ')
    this.analyticAccountUseCase
      .findAccountsPerCurrency(currency)
      .then((accounts: AnalyticAccount[]) => {
        const accountSize = accounts.length
        console.log(`There ${accountSize <= 1 ? 'is' : 'are'} ${accountSize} accounts for currency ${currency}`)
      })
      .catch(onError)
      .finally(onSuccess)
  }
}

// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/bank/console/main.ts
// 3c5da588-ca85-4908-a43f-0073530f5ef8
// ca2d1f53-8c44-4998-bcca-36418e6a9cc1
