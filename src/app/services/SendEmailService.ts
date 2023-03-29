import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'dc5b8de3260f12',
        pass: '60bd4a18bddd9d',
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string) {
    const mailOptions = {
      from: 'dummy@gmail.com',
      to,
      subject,
      text: body,
    };

    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} with result: ${result.response}`);
    } catch (error) {
      console.error(`Failed to send email to ${to} with error: ${error}`);
    }
  }
}
