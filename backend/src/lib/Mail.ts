import nodemailer, { Transporter, SendMailOptions } from 'nodemailer'
import { join } from 'path'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import mailConfig from '../config/mail'

interface SendMailOptionsHBS extends SendMailOptions {
  template: string
  context: { [key: string]: any }
}

class Mail {
  public transporter: Transporter
  constructor() {
    const { host, port, secure, auth } = mailConfig

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })

    this.configureTemplate()
  }

  configureTemplate() {
    const viewPath = join(__dirname, '..', 'app', 'views', 'emails')

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: join(viewPath, 'layouts'),
          partialsDir: join(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs'
        }),
        viewPath,
        extName: '.hbs'
      })
    )
  }

  sendMail(message: SendMailOptionsHBS) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    })
  }
}

export default new Mail()