import {
  EmailService,
  SendMailOptions,
} from '../../../src/presentation/email/email.service'
import nodemailer from 'nodemailer'

describe('tests in email.service.ts', () => {
  const mockSendMail = jest.fn()

  // Mock al createTransport
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  })

  const emailService = new EmailService()

  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'joonyyplo@gmail.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>',
    }
    await emailService.sendEmail(options)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: '<h1>Test</h1>',
      subject: 'Test',
      to: 'joonyyplo@gmail.com',
    })
  })

  test('should send email with attachments', async () => {
    const email = 'joonyyplo@gmail.com'
    await emailService.sendEmailWithFileSystemLogs(email)

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.arrayContaining([
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
      ]),
      html: expect.any(String),
      subject: 'Server Logs',
      to: email,
    })
  })
})
