import { LogSeverityLevel, logEntity } from '../entities/log.entity'

// Esta clase, por mas que sea igual que la clase 'LogDatasource', su funcion es permitirnos a nosotros poder llamar metodos que se encuentran en la clase LogDatasource, ya que nosotros no tenemos que interactuar directamente con el LogDatasource, pero si lo podemos hacer mediante otra clase
export abstract class LogRepository {
  abstract saveLog(log: logEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]>
}
