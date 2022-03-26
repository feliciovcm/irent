import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from './IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });
        this.client = transporter;
      })
      .catch((error) => console.error(error));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    // read de template filet with html and css
    const templateContent = fs.readFileSync(path).toString('utf-8');

    // parse the template file into html
    const templateParse = Handlebars.compile(templateContent);

    // Pass the variables into html content
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'IRent <noreplay@irent.com.br>',
      subject,
      html: templateHTML
    });

    console.log('Message send: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
