import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, 
      auth: {
        user: 'example@example.com',
        pass: 'password',
      },
    });
  }

  async send(mailOptions: nodemailer.SendMailOptions): Promise<void> {
    await this.transporter.sendMail(mailOptions);
  }
}
