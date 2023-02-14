import { AccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { EURRatioService } from '@/Contexts/Bank/Accounts/domain'
import { InMemoryAccountRepository } from '@/Contexts/Bank/Accounts/infrastructure'
import { InvalidArgumentError, Money } from '@/Contexts/Shared/domain'
import { EventBusFactory } from '@/Contexts/Shared/infrastructure'
import { UuidMother } from '@/tests/Contexts/Shared/domain'

describe(`Bank use case`, () => {
  describe('Bank TestAdapter', () => {
    let testAdapter: AccountUseCase
    beforeAll(() => {
      testAdapter = new AccountUseCase(new InMemoryAccountRepository(), new EURRatioService(), EventBusFactory.instance)
    })

    it('should create and retrieve an account', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
      const account = await testAdapter.find(accountId)
      expect(account).toBeDefined()
    })

    it('should deposit same currency amount', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
      await testAdapter.deposit(accountId, 100, 'EUR')
      const account = await testAdapter.find(accountId)
      expect(account.balance).toEqual(Money.eur(100))
    })

    it('should reject deposit other currency amount', async () => {
      await expect(async () => {
        const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
        await testAdapter.deposit(accountId, 100, 'USD')
      }).rejects.toThrow(new InvalidArgumentError('Incompatible currency'))
    })

    it('should withdraw same currency amount', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
      await testAdapter.deposit(accountId, 100, 'EUR')
      await testAdapter.withdraw(accountId, 99, 'EUR')
      const account = await testAdapter.find(accountId)
      expect(account.balance).toEqual(new Money(1, 'EUR'))
    })

    // it('should allow 10 EUR credit', async () => {
    //   const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
    //   await testAdapter.withdraw(accountId, 10, 'EUR')
    //   const account = await testAdapter.find(accountId)
    //   expect(account.balance).toEqual(new Money(-10, 'EUR'))
    // })

    it('should allow 10 USD debit', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'USD')
      await testAdapter.withdraw(accountId, 10, 'USD')
      const account = await testAdapter.find(accountId)
      expect(account.balance).toEqual(Money.usd(-10))
    })

    it('should allow 11 USD debit', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'USD')
      await testAdapter.withdraw(accountId, 11, 'USD')
      const account = await testAdapter.find(accountId)
      expect(account.balance).toEqual(Money.usd(-11))
    })

    it('should reject withdraw more than balance', async () => {
      await expect(async () => {
        const accountId = await testAdapter.create(UuidMother.random(), 'John', 'USD')
        await testAdapter.deposit(accountId, 100, 'USD')
        await testAdapter.withdraw(accountId, 112, 'USD') // The max credit is the usd equivalent to Account.MAX_CREDIT_IN_EUROS in eur
      }).rejects.toThrow(new InvalidArgumentError('Insufficient funds'))
    })

    it('should allow 10 EUR credit', async () => {
      const accountId = await testAdapter.create(UuidMother.random(), 'John', 'EUR')
      await testAdapter.withdraw(accountId, 10, 'EUR')
      const account = await testAdapter.find(accountId)

      expect(account.balance).toEqual(Money.eur(-10))
    })
  })
})
