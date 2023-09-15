import type { Container } from 'diod'

import { config } from '@/Contexts/User/Shared/infrastructure/index.js'

export const { container } = (await import(`./${config.get('app.env')}/index.js`)) as { container: Container }
