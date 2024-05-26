import { LogSeverityLevel, logEntity } from '../entities/log.entity'

// La palabra 'abstract' es una forma de asegurarnos de que si alguien intenta hacer algo como 'const logDatasource = new LogDatasource', eso les va a dar error porque no se puede crear una instancia de una clase abstracta. La clase abstracta nos sirve para obligar el comportamiento que queremos definir en la clase LogDatasource sobre otras clases, es decir, que cualquier clase que tenga una implementacion de LogDatasource como por ejemplo 'export class FileSystemDataSource implements LogDataSource', esta implementacion obligara a la clase FileSystemDataSource que tenga los metodos que tiene la clase LogDatasource, de lo contrario data error
export abstract class LogDataSource {
  // Estos metodos son la implementacion de las reglas de negocio para los datasources, es como establecer un contrato en el cual todos los datasources tienen que cumplirlo, si no lo cumplen, no van a ser datasources para el LogDatasource
  abstract saveLog(log: logEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]>
}
