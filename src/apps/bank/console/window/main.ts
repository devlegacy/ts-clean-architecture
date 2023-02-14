import 'reflect-metadata'

import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

import { WindowCLIApp } from './WindowCLIApp'

const config = dotenv.config()
expand(config)

new WindowCLIApp().start()

// npx tsnd -r ts-node/register/transpile-only -r tsconfig-paths/register ./src/apps/bank/console/window/main.ts
