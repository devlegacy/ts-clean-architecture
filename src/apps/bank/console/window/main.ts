// import 'reflect-metadata'

import { AccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { AccountRepository, EURRatioService } from '@/Contexts/Bank/Accounts/domain'
import { FileAccountRepository } from '@/Contexts/Bank/Accounts/infrastructure'

import { WindowCLI } from './WindowCLI'

const repository: AccountRepository = new FileAccountRepository()
const ratioAdapter = new EURRatioService()
const useCase = new AccountUseCase(repository, ratioAdapter)
const cli = new WindowCLI(useCase)

cli.render()

// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/bank/console/window/main.ts
// 7c1e3a5f-b4fd-4215-aaf4-1b3bb28e7ae3
