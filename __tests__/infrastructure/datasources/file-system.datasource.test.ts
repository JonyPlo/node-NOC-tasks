import path from 'path'
import fs from 'fs'
import { FileSystemDataSource } from '../../../src/infrastructure/datasources/file-system.datasource'
import {
  LogEntity,
  LogSeverityLevel,
} from '../../../src/domain/entities/log.entity'

describe('tests in file-system.datasource.ts', () => {
  const logPath = path.join(__dirname, '../../../logs')

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true })
  })

  test('should create log files if they do not exists', () => {
    new FileSystemDataSource()
    const files = fs.readdirSync(logPath)
    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })

  test('should save a log in logs-all.log file', async () => {
    const logDatasource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
    })

    await logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-medium.log files', async () => {
    const logDatasource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
    })

    await logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(mediumLogs).toContain(JSON.stringify(log))
  })

  test('should save a log in logs-all.log and logs-high.log files', async () => {
    const logDatasource = new FileSystemDataSource()
    const log = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
    })

    await logDatasource.saveLog(log)

    const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
    const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')

    expect(allLogs).toContain(JSON.stringify(log))
    expect(highLogs).toContain(JSON.stringify(log))
  })

  test('should return all logs', async () => {
    const logDatasource = new FileSystemDataSource()

    const logLow = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.low,
      origin: 'file-system.datasource.test.ts',
    })

    const logMedium = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.medium,
      origin: 'file-system.datasource.test.ts',
    })

    const logHigh = new LogEntity({
      message: 'test message',
      level: LogSeverityLevel.high,
      origin: 'file-system.datasource.test.ts',
    })

    await logDatasource.saveLog(logLow)
    await logDatasource.saveLog(logMedium)
    await logDatasource.saveLog(logHigh)

    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)

    expect(logsLow).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    )
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
  })

  test('should not throw an error if path exist', () => {
    new FileSystemDataSource()
    new FileSystemDataSource()
  })
})
