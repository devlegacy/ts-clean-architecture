import { createHash } from 'node:crypto'

import mailchimp, { lists } from '@mailchimp/mailchimp_marketing'
import { v4 } from 'uuid'

import { config } from '@/Contexts/Mooc/Shared/infrastructure/config/index.js'

type MailchimpDefaults = {
  audienceId?: string
}

export class MailchimpEmailMarketing {
  #client: typeof mailchimp
  #defaults: MailchimpDefaults
  constructor(client: typeof mailchimp, defaults?: MailchimpDefaults) {
    this.#client = client
    this.#defaults = defaults ?? {}
  }

  async subscribe(email: string, to?: string): Promise<void> {
    const hash = this.#createHash(email)
    to ??= this.#defaults.audienceId
    if (!to) {
      // TODO: Log or handle an error
      return
    }
    const member: lists.SetListMemberBody = {
      email_address: email,
      status_if_new: 'subscribed',
    }
    await this.#client.lists.setListMember(to, hash, member)
  }

  #createHash(data: string) {
    const hash = createHash('md5').update(data).digest('hex')
    return hash
  }
}

mailchimp.setConfig({
  apiKey: config.get('mailchimp.marketing.apiKey'),
  server: config.get('mailchimp.dataCenter'),
})

const emailMarketing = new MailchimpEmailMarketing(mailchimp, {
  audienceId: config.get('mailchimp.marketing.audienceId'),
})
emailMarketing.subscribe(`srojas+${v4()}@domain.com`)
