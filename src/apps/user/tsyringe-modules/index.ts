// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-require-imports
export default require(`./container/${process.env.APP_ENV || 'development'}.ts`)
