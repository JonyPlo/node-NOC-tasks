import { LogDataSource } from '../../../src/domain/datasources/log.datasource'
import {
  LogEntity,
  LogSeverityLevel,
} from '../../../src/domain/entities/log.entity'
describe('tests in log.datasource.ts', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test message',
    level: LogSeverityLevel.low,
  })

  // En este caso creo un mock de la clase LogDataSource ya que no podemos instanciar la clase LogDataSource porque es una clase abstracta
  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog]
    }
  }

  test('should test the abstract class', async () => {
    const mockLogDatasource = new MockLogDatasource()
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
    expect(typeof mockLogDatasource.saveLog).toBe('function')
    expect(typeof mockLogDatasource.getLogs).toBe('function')

    await mockLogDatasource.saveLog(newLog)
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
    expect(logs).toHaveLength(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)
  })
})
