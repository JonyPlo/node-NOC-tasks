import { EmailService } from '../../../presentation/email/email.service'
import { LogSeverityLevel, logEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to)

      const log = new logEntity({
        message: `Log email sent`,
        level: LogSeverityLevel.low,
        origin: 'send-email.logs.ts',
      })

      this.logRepository.saveLog(log)

      if (!sent) {
        throw new Error('Error sending email')
      }

      return true
    } catch (error) {
      console.log(error)

      const log = new logEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: 'send-email.logs.ts',
      })

      this.logRepository.saveLog(log)

      return false
    }
  }
}
