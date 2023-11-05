import { Parser } from '@json2csv/plainjs'
import mailchimp, { type ApiClient, type MessagesMessage } from '@mailchimp/mailchimp_transactional'

import { EmailSender, type EmailSenderOptions } from '../../domain/index.js'

export class MailchimpEmailSender implements EmailSender {
  #client: mailchimp.ApiClient

  constructor(client: ApiClient) {
    this.#client = client
  }

  async send(options: EmailSenderOptions): Promise<void> {
    const vars = [
      {
        name: 'CURRENT_YEAR',
        content: `${new Date().getFullYear().toString()} - custom`,
      },
      {
        name: 'COMPANY',
        content: 'Company',
      },
      {
        name: 'DESCRIPTION',
        content: 'E-Sports',
      },
      {
        name: 'LIST_ADDRESS_HTML',
        content: `
        <p>The potted Planter II</p>
        <p>305 Myra Lane</p>
        <p>Barrington, RI 02809</p>
      `,
      },
    ]
    const message: MessagesMessage = {
      from_email: 'noreply@domain.com',
      from_name: 'No reply - default',
      subject: options.subject,
      to: [
        {
          email: options.to!,
          type: 'to',
        },
      ],
      global_merge_vars: vars,
      // merge_vars: [
      //   {
      //     rcpt: options.to,
      //     vars: [
      //       {
      //         name: 'DESCRIPTION',
      //         content: 'E-Sports',
      //       },
      //     ],
      //   },
      // ],
      // @ts-expect-error TODO: Fix this
      attachments:
        options.attachments?.map(({ filename: name, content, contentType: type }) => ({
          name,
          content,
          type,
        })) || [],
    }
    const response = await this.#client.messages.sendTemplate({
      template_name: options.template!,
      // https://mailchimp.com/developer/transactional/docs/templates-dynamic-content/#providing-dynamic-content-for-mc-edit-regions
      template_content: [],
      message,
    })
    console.log(response)
  }
}

const bootstrap = () => {
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

  // const client = mailchimp(config.get('mailchimp.transactional.apiKey'))
  const client = mailchimp('md-wJ9bcVvztLg7xSgPKCwJug')
  const emailSender = new MailchimpEmailSender(client)
  emailSender.send({
    to: 'srojas@domain.com',
    subject: 'Welcome',
    template: 'development-confirmed-user-test',
  })

  emailSender.send({
    to: 'srojas@domain.com',
    subject: 'Welcome',
    template: 'development-confirmed-user-test',
    attachments: [
      {
        filename: 'data.csv',
        content: Buffer.from(csv).toString('base64'),
        contentType: 'text/csv',
      },
    ],
  })
}
bootstrap()
// DEBT: Etiquetas Merge de pie de página recomendadas *|LIST:COMPANY|* como editar?
