import { LogDataSource } from '../../domain/datasources/log.datasource'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import { LogRepository } from '../../domain/repository/log.repository'

// La funcion de la implementacion de un repositorio simplemente es recibir algun tipo de datasource y llamar a los metodos del datasource. El objetivos de esta implementacion es que facilmente podamos cambiar el datasource que recibe la implementacion por cualquier otro
export class LogRepositoryImpl implements LogRepository {
  constructor(
    // Crear la propiedad logDataSource de esta forma, es literalmente lo mismo que hacer que el constructor reciba logDataSource como parametro y luego se lo establezca a la propiedad de la clase como 'this.logDataSource = logDataSource'
    //* Esto es una inyeccion de dependencia, se conoce como "inyeccion de dependencia" cuando un objeto de tipo clase, en este caso "LogRepositoryImpl", recibe a otro objeto de tipo clase a traves del constructor, en este caso es "logDataSource", entonces la clase logDataSource es una dependencia que se esta inyectando a la clase LogRepositoryImpl/
    private readonly logDataSource: LogDataSource
  ) {}

  async saveLog(log: LogEntity): Promise<void> {
    return this.logDataSource.saveLog(log)
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel)
  }
}
