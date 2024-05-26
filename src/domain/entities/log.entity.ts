// Este archivo es llamado 'Entity' o 'Entidad', y es algo que eventualmente va a terminar llegando a la base de datos, pero no graba directamente en la base de datos, si no que es quien va a gobernar la aplicacion cuando queramos trabajar con nuestras entidades

export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class logEntity {
  public level: LogSeverityLevel
  public message: string
  public createAt: Date

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level
    this.message = message
    this.createAt = new Date()
  }

  // Este metodo recibira los los guardados en los archivos, los parseara para convertirlos en un objeto de js y los devolvera como un objeto
  static fromJson = (json: string): logEntity => {
    const { level, message, createAt } = JSON.parse(json)
    if (!message) throw new Error('Message is required')
    if (!level) throw new Error('Level is required')

    const log = new logEntity(level, message)
    log.createAt = new Date(createAt)

    return log
  }
}
