import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/phoneUserRule'
const enum RegisterTypeEnum{
  Normal = "normal",
  Email = "email",
  Phone = "phone",
}
export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    try {
      this.validateUserInfo()
      // ctx.body = '注册';
      ctx.success({})
    } catch (error) {
      if (error.errors) {
        ctx.success(400, error.errors)
        // ctx.body = error.errors;
      } else {
        // ctx.body = error.message;
        ctx.success(400, error.message)
      }
    }
  }
  private validateUserInfo() {
    const { ctx } = this;
    const data = ctx.request.body
    switch (data.registerType) {
      case RegisterTypeEnum.Normal:
        console.log('normal登录');
        ctx.validate(NormalUserRule, data)
        break;
      case RegisterTypeEnum.Email:
        console.log('Email登录');
        ctx.validate(EmailUserRule, data)
        break;
      case RegisterTypeEnum.Phone:
        console.log('Phone登录');
        ctx.validate(PhoneUserRule, data)
        break;
      default:
        throw new Error('注册类型不存在')
    }

  }
}
