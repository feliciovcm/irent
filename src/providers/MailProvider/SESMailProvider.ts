import { SES } from 'aws-sdk';
import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from './IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_BUCKET_REGION
      })
    });
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

    await this.client.sendMail({
      to,
      from: 'IRent <vitor.felicio@feliciovcm.com>',
      subject,
      html: templateHTML
    });
  }
}

export { SESMailProvider };
