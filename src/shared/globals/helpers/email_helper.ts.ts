import nodemailer, { Transporter } from 'nodemailer';
import { htmlToText } from 'html-to-text';
// email.helper.ts

interface User {
  name: string;
  email: string;
}

export class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;

  constructor(user: User, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Junaid <${process.env.EMAIL_FROM}>`;
  }

  private createNewTransport(): Transporter {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME!,
          pass: process.env.SENDGRID_PASSWORD!,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT!),
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });
  }

  private async send(template: string, subject: string): Promise<void> {
    // Placeholder: generate proper HTML later (e.g. with Pug or another templating engine)
    const html = `<div><p>Hi ${this.firstName},</p><p>Please visit: <a href="${this.url}">${this.url}</a></p></div>`;

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    const transporter = this.createNewTransport();
    await transporter.sendMail(mailOptions);
  }

  async sendWelcome(): Promise<void> {
    await this.send('Welcome', 'Welcome to our application!');
  }

  async sendPasswordReset(): Promise<void> {
    await this.send(
      'Password Reset',
      'Your password reset token is valid for only 10 minutes'
    );
  }
}




interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export class EmailHelper {
  static async sendEmail(options: EmailOptions): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: Number(process.env.EMAIL_PORT!),
      auth: {
        user: process.env.EMAIL_USERNAME!,
        pass: process.env.EMAIL_PASSWORD!,
      },
    });

    const mailOptions = {
      from: `Junaid <${process.env.EMAIL_FROM!}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Error sending email:', err);
    }
  }
}
