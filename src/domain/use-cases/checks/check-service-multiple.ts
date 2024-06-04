import { LogSeverityLevel, LogEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  // Dentro de este constructor estamos haciendo algo que se llama inyeccion de dependencias, y una inyeccion de dependencias no es mas que los 'casos de uso' reciban las dependencias que necesitan para poder funcionar
  // Casi siempre los casos de uso van a terminar implementando algun repository y asi respetar el flujo del 'repository pattern' que es 'use cases -> repositories -> datasources'
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => logRepository.saveLog(log))
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: 'check-service.ts',
      })

      this.callLogs(log)
      this.successCallback && this.successCallback()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: 'check-service.ts',
      })

      this.callLogs(log)
      this.errorCallback && this.errorCallback(errorMessage)
      return false
    }
  }
}
