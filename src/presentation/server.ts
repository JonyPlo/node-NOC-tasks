import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource'
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
)

export class Server {
  // La palabra 'public' en estos casos esta de mas, pero igual se lo agrega para que se sobre entienda que es un metodo publico, y la palabra static es para poder invocar al metodo start() si instanciar el objeto Server, o sea Server.start() sin la palabra 'new' delante
  public static start() {
    console.log('Server is running')

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com'

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url)
    })
  }
}

Server.start()
