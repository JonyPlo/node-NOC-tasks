import { LogRepository } from '../../../../src/domain/repository/log.repository'
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs'

describe('tests in send-email-logs.ts', () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
  }

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }

  const to = 'joonyyplo@gmail.com'

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  )

  beforeEach(() => jest.clearAllMocks())

  test('should call sendEmail and saveLog', async () => {
    const result = await sendEmailLogs.execute(to)

    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    )
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(Object))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'low',
      message: 'Log email sent',
      origin: 'send-email.logs.ts',
    })
  })

  test('should log in case of error', async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute(to)

    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledWith(
      to
    )
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    )
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(Object))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: 'high',
      message: 'Error: Error sending email',
      origin: 'send-email.logs.ts',
    })
  })
})
