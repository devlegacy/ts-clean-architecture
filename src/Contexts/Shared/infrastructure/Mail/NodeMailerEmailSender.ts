import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import * as aws from '@aws-sdk/client-ses'
import { Parser } from '@json2csv/plainjs'
import handlebars from 'handlebars'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import SESTransport from 'nodemailer/lib/ses-transport'

import { EmailSender, type EmailSenderOptions } from '../../domain/index.js'

export class NodeMailerEmailSender implements EmailSender {
  #transporter: nodemailer.Transporter

  constructor(transporter: nodemailer.Transporter) {
    this.#transporter = transporter
  }

  async send(options: EmailSenderOptions): Promise<void> {
    if (options.template) {
      // TODO: Ensure file exists
      const template = handlebars.compile(readFileSync(options.template, 'utf8'))

      options.html = template(options.context)
    }
    const mailOptions: Mail.Options = {
      from: options.from ?? (process.env.MAIL_FROM || '"No reply - default" <noreply@domain.com>'),
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    }
    await this.#transporter.sendMail(mailOptions)
  }
}

const sesTransport = nodemailer.createTransport({
  SES: {
    ses: new aws.SES({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: 'AKIAS2OAQ4K7SWM5HOU6',
        secretAccessKey: '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',
      },
    }),
    aws,
  },
} as SESTransport | SESTransport.Options)
const mailtrapTransport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  // secure: false, // true for 465, false for other ports
  auth: {
    user: 'f26a75eb7a6746', // generated ethereal Users
    pass: 'ab716898773103', // generated ethereal password
  },
})
const gmailTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
})

const parser = new Parser({})
const csv = parser.parse([
  {
    firstName: 'John',
    lastName: 'Bailey',
    purchasePrice: 1000,
    paymentsMade: 100,
  },
  {
    firstName: 'Leonard',
    lastName: 'Clark',
    purchasePrice: 1000,
    paymentsMade: 150,
  },
])

new NodeMailerEmailSender(sesTransport).send({
  to: 'srojas@domain.com',
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
new NodeMailerEmailSender(sesTransport).send({
  to: 'srojas@domain.com',
  from: '"No reply - custom" <noreply@domain.com>', // override default from
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
new NodeMailerEmailSender(mailtrapTransport).send({
  to: 'srojas@domain.com',
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
new NodeMailerEmailSender(mailtrapTransport).send({
  to: 'srojas@domain.com',
  from: '"No reply - custom" <noreply@domain.com>', // override default from
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
new NodeMailerEmailSender(gmailTransport).send({
  to: 'srojas@domain.com',
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
new NodeMailerEmailSender(gmailTransport).send({
  to: 'srojas@domain.com',
  from: '"No reply - custom" <noreply@domain.com>', // override default from
  subject: 'Welcome to Nice App! Confirm your Email',
  template: resolve(__dirname, './template.hbs'), // `.hbs` extension is appended automatically
  context: {
    name: 'Samuel R.',
    url: 'https://example.com/confirm/1234567890',
  },
  attachments: [
    {
      filename: 'data.csv',
      content: csv,
      contentType: 'text/csv',
    },
  ],
})
