// Este archivo funciona como un 'patron adaptador' que adapta un paquete de terceros que en este caso en 'cron', hacemos esto de esta forma para que en un futuro si necesitamos cambiar cron por otro paquete, entonces al cambio solo hay que realizarlo en este archivo y asi evitamos tener que modificar otros archivos

import { CronJob } from 'cron'

type CronTime = string | Date
type OnTick = () => void

export class CronService {
  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    // Implementacion de CronJob para poder ejecutar funciones de maneras periodicas
    const job = new CronJob(cronTime, onTick)

    job.start()

    return job
  }
}
