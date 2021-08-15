import { Controller } from 'egg';
export default class UtilsController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    const res = ctx.helper.createImageCode()
    ctx.body = res
  }
  public async emailCode() {
    const { ctx } = this;
    try {
      const email = ctx.query.email
      const res = ctx.helper.createEmailCode(email)
      ctx.success(res)
    } catch (error) {
      ctx.error(400, error.message)
    }
  }
  // public async verifyImageCode() {
  //   const { ctx } = this;
  //   const { code, expire } = ctx.session.captcha
  //   const { clientCode } = ctx.query;
  //   if (code !== clientCode) {
  //     ctx.body = '验证码不正确'
  //   } else if (Date.now() > expire) {
  //     ctx.body = '验证码已过期'
  //   } else {
  //     ctx.body = '验证通过'
  //   }
  // }
}
