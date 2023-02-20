import * as readline from 'readline-sync'

import { AtmAccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { Account } from '@/Contexts/Bank/Accounts/domain'
import { DomainError } from '@/Contexts/Shared/domain'

type Callback = (onSuccess: () => void, onError: (err: Error) => void) => void

export class AtmCLI {
  private readonly options: Callback[]

  constructor(private readonly useCase: AtmAccountUseCase) {
    this.options = [this.findAccount.bind(this), this.deposit.bind(this), this.withdraw.bind(this)]
  }

  render() {
    const options = this.options
      .map((option, index) => `\t${index + 1}) ${option.name.replace('bound ', '')}`)
      .join('\n')
    const message = `
      Welcome to our ATM CLI Bank!
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

  private findAccount(onSuccess: Parameters<Callback>['0'], onError: Parameters<Callback>['1']) {
    const id = readline.question('What is your account id? ')
    this.useCase
      .find(id)
      .then((account: Account) => {
        console.log(`Account: ${account.id}`)
        console.log(`Name: ${account.name}`)
        console.log(`Balance: ${account.balance.value} ${account.balance.currency}`)
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
        console.log('Your withdraw was completed successfully!')
      })
      .catch(onError)
      .finally(onSuccess)
  }
}
