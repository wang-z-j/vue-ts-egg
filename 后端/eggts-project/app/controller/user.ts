import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
export default class UserController extends Controller {
  public async create() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const data = ctx.request.body
    try {
      ctx.validate(NormalUserRule, data)
      ctx.body = '注册';
    } catch (error) {
      ctx.body = error;
      // console.log(error);
    }
  }
}
