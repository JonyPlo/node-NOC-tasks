import { envs } from '../../../src/config/plugins/env.plugin'
describe('tests in env.plugins.ts', () => {
  test('should return env options', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERICE: 'gmail',
      MAILER_EMAIL: 'joonyyplo@gmail.com',
      MAILER_SECRET_KEY: 'hacfhgirvxygrxxg',
      PROD: true,
      MONGO_URL: 'mongodb://JonyPlo:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'JonyPlo',
      MONGO_PASS: '123456',
    })
  })

  test('should return error if not found env', async () => {
    jest.resetModules()
    process.env.PORT = 'ABC'

    try {
      await import('../../../src/config/plugins/env.plugin')
      expect(true).toBeFalsy()
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer')
    }
  })
})
