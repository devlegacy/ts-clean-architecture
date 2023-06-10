import { Container } from 'diod'

import { config } from '@/Contexts/Mooc/Shared/infrastructure'

// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
const { container } = require(`./${config.get('app.env')}/`) as { container: Container }

export { container }
