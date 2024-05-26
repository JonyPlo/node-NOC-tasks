import { LogSeverityLevel, logEntity } from '../../entities/log.entity'
import { LogRepository } from '../../repository/log.repository'

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void

export class CheckService implements CheckServiceUseCase {
  // Dentro de este constructor estamos haciendo algo que se llama inyeccion de dependencias, y una inyeccion de dependencias no es mas que los 'casos de uso' reciban las dependencias que necesitan para poder funcionar
  // Casi siempre los casos de uso van a terminar implementando algun repository y asi respetar el flujo del 'repository pattern' que es 'use cases -> repositories -> datasources'
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`)
      }

      const log = new logEntity(LogSeverityLevel.low, `Service ${url} working`)

      this.logRepository.saveLog(log)
      this.successCallback()

      return true
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`
      const log = new logEntity(LogSeverityLevel.high, errorMessage)

      this.logRepository.saveLog(log)
      this.errorCallback(errorMessage)
      return false
    }
  }
}
