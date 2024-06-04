// Este archivo es llamado 'Entity' o 'Entidad', y es algo que eventualmente va a terminar llegando a la base de datos, pero no graba directamente en la base de datos, si no que es quien va a gobernar la aplicacion cuando queramos trabajar con nuestras entidades

export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface logEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}

export class LogEntity {
  public level: LogSeverityLevel
  public message: string
  public createdAt: Date
  public origin: string

  constructor(options: logEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options

    this.level = level
    this.message = message
    this.createdAt = createdAt
    this.origin = origin
  }

  // Este metodo recibira los logs guardados en los archivos, los parseara para convertirlos en un objeto de js y los devolvera como un objeto
  static fromJson = (json: string): LogEntity => {
    json = json === '' ? '{}' : json

    const { level, message, createdAt, origin } = JSON.parse(json)
    const log = new LogEntity({ level, message, createdAt, origin })

    return log
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = object
    const log = new LogEntity({ level, message, createdAt, origin })

    return log
  }
}
