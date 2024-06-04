import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource'
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource())
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource())
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDatasource())

const emailService = new EmailService()

export class Server {
  // La palabra 'public' en estos casos esta de mas, pero igual se lo agrega para que se sobre entienda que es un metodo publico, y la palabra static es para poder invocar al metodo start() si instanciar el objeto Server, o sea Server.start() sin la palabra 'new' delante
  public static async start() {
    console.log('Server is running')

    // Mandar email
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   'joonyyplo@gmail.com',
    //   'jonathanPlod@gmail.com',
    // ])

    // const logs = await logRepository.getLogs(LogSeverityLevel.low)
    // console.log(logs)

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com'

    //   new CheckServiceMultiple(
    //     [fsLogRepository, mongoLogRepository, postgresLogRepository],
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url)
    // })
  }
}

Server.start()
