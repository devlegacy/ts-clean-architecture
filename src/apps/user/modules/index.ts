// eslint-disable-next-line security/detect-non-literal-require
export default require(`./container/${process.env.APP_ENV || 'development'}.ts`)
