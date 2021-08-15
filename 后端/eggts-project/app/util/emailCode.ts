const nodemailer = require("nodemailer");
let transporter;
export default {
  createTransporterInstance(ctx) {
    if (transporter) {
      return transporter
    } else {
      transporter = nodemailer.createTransport({
        host: ctx.app.config.smtp.host,
        port: ctx.app.config.smtp.port,
        secure: true, // true for 465, false for other ports
        auth: {
          user: ctx.app.config.smtp.user, // generated ethereal user
          pass: ctx.app.config.smtp.pass, // generated ethereal password
        },
      });
    }
    return transporter
  },
  createEmailInfo(ctx, to: string) {
    let code = Math.random().toString(16).slice(2, 6).toUpperCase();
    let info = {
      from: ctx.app.config.smtp.user, // sender address
      to, // list of receivers
      subject: "发送的测试", // Subject line
      text: `您的验证码是：${code}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    };
    console.log('info', info);

    ctx.session.email = {
      code,
      expire: Date.now() + 60 * 1000
    }
    return info
  },
  async sendEmailCode(ctx, to: string) {
    let transporter = this.createTransporterInstance(ctx)
    let info = this.createEmailInfo(ctx, to)
    return new Promise((resolve, reject) => {
      transporter.sendMail(info, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  verifyEmailCode(ctx, clientCode) {
    const email = ctx.session.email
    console.log('email', email);
    console.log('接受的emailcode', clientCode);

    let code;
    let expire;
    try {
      code = email.code
      expire = email.expire
    } catch (error) {
      ctx.session.email = null;
      throw new Error('请重新获取验证码')
    }
    if (code !== clientCode) {
      ctx.session.email = null;
      throw new Error('验证码不正确')
    } else if (Date.now() > expire) {
      ctx.session.email = null;
      throw new Error('验证码已过期')
    }
    ctx.session.email = null;
  }
}