import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

export interface Attachment {
  filename?: string
  path?: string
}

// Patron adaptador para la dependencia Nodemailer
export class EmailService {
  // Creamos la propiedad transporter para almacenar el contenido de nodemailer
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  constructor() {}

  // Metodo para enviar correos
  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      })

      return true
    } catch (error) {
      console.log(error)

      return false
    }
  }

  // Metodo para enviar correos con archivos
  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Server Logs'
    const htmlBody = `
    <h3>Logs de sistema - NOC</h3>
    <p>In sit quis laborum qui aliqua fugiat fugiat labore ex est deserunt laboris sint. Minim fugiat aliqua esse aliqua in do nostrud deserunt. Quis duis aliquip magna ullamco. Mollit fugiat laborum occaecat incididunt nostrud aute aut.</p>
    <p>Ver logs adjuntos</p>
    `

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log',
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log',
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log',
      },
    ]

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }
}
