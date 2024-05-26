import { LogDataSource } from '../../domain/datasources/log.datasource'
import { logEntity, LogSeverityLevel } from '../../domain/entities/log.entity'
import fs from 'fs'

// En este archivo es el unico lugar desde el que podemos llegar a la base de datos, file system, etc para el manejo de los logs
export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  constructor() {
    // Este this hace que en el momento que instanciemos la clase 'FileSystemDataSource', ejecutara el metodo createLogsFile()
    this.createLogsFile()
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath)
    }

    ;[this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return
        fs.writeFileSync(path, '')
      }
    )
  }

  async saveLog(newLog: logEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`

    fs.appendFileSync(this.allLogsPath, logAsJson)

    if (newLog.level === LogSeverityLevel.low) return

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson)
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson)
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<logEntity[]> {
    throw new Error('Method not implemented.')
  }
}
