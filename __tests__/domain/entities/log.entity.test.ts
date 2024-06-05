import {
  LogEntity,
  LogSeverityLevel,
} from '../../../src/domain/entities/log.entity'
describe('tests in log.entity file', () => {
  const dataObj = {
    message: 'Hola mundo',
    level: LogSeverityLevel.high,
    origin: 'log.entity.test.ts',
  }

  test('should create a LogEntity instance', () => {
    const log = new LogEntity(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should create a LogEntity instance from json', () => {
    const json = `{"level":"low","message":"Service https://google.com working","createdAt":"2024-06-05T11:25:10.170Z","origin":"check-service.ts"}`

    const log = LogEntity.fromJson(json)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe('Service https://google.com working')
    expect(log.level).toBe('low')
    expect(log.origin).toBe('check-service.ts')
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should create a LogEntity instance from object', () => {
    const log = LogEntity.fromObject(dataObj)

    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})
