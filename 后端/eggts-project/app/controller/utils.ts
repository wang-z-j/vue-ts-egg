import { Controller } from 'egg';
import svgCaptcha = require('svg-captcha');
export default class UtilsController extends Controller {
  public async imageCode() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    console.log(captcha);
     ctx.session.captcha = {
       code: captcha.text,
       expire: Date.now() + 60 * 1000
     }
    ctx.body = captcha.data
  }
}
