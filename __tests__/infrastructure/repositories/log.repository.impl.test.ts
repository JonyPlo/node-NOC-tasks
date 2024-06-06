import {
  LogEntity,
  LogSeverityLevel,
} from '../../../src/domain/entities/log.entity'
import { LogRepositoryImpl } from '../../../src/infrastructure/repositories/log.repository.impl'

describe('tests in log.repository.impl.ts', () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('saveLog should call the datasource with arguments', async () => {
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'log.repository.impl.test.ts',
    })

    await logRepositoryImpl.saveLog(log)

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async () => {
    const lowSeverity = LogSeverityLevel.low

    await logRepositoryImpl.getLogs(lowSeverity)

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity)
  })
})
