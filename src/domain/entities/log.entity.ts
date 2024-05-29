// Este archivo es llamado 'Entity' o 'Entidad', y es algo que eventualmente va a terminar llegando a la base de datos, pero no graba directamente en la base de datos, si no que es quien va a gobernar la aplicacion cuando queramos trabajar con nuestras entidades

export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface logEntityOptions {
  level: LogSeverityLevel
  message: string
  createAt?: Date
  origin: string
}

export class logEntity {
  public level: LogSeverityLevel
  public message: string
  public createAt: Date
  public origin: string

  constructor(options: logEntityOptions) {
    const { level, message, createAt = new Date(), origin } = options

    this.level = level
    this.message = message
    this.createAt = createAt
    this.origin = origin
  }

  // Este metodo recibira los logs guardados en los archivos, los parseara para convertirlos en un objeto de js y los devolvera como un objeto
  static fromJson = (json: string): logEntity => {
    const { level, message, createAt } = JSON.parse(json)
    if (!message) throw new Error('Message is required')
    if (!level) throw new Error('Level is required')

    const log = new logEntity({ level, message, createAt, origin })

    return log
  }
}
