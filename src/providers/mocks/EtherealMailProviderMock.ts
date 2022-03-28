import { IMailProvider } from '../MailProvider/IMailProvider';

class EtherealMailProviderMock implements IMailProvider {
  private mails: any[] = [];
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.mails.push({
      to,
      subject,
      variables,
      path
    });
  }
}

export { EtherealMailProviderMock };
