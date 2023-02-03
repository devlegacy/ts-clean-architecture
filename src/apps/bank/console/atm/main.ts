// import 'reflect-metadata'

import { AtmAccountUseCase } from '@/Contexts/Bank/Accounts/application'
import { AccountRepository, EURRatioService } from '@/Contexts/Bank/Accounts/domain'
import { FileAccountRepository } from '@/Contexts/Bank/Accounts/infrastructure'

import { AtmCLI } from './AtmCLI'

const repository: AccountRepository = new FileAccountRepository()
const ratioAdapter = new EURRatioService()
const useCase = new AtmAccountUseCase(repository, ratioAdapter)
const cli = new AtmCLI(useCase)

cli.render()

//  npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/bank/console/atm/main.ts
// 3c5da588-ca85-4908-a43f-0073530f5ef8
// ca2d1f53-8c44-4998-bcca-36418e6a9cc1
