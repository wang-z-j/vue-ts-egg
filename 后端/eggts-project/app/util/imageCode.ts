import svgCaptcha = require('svg-captcha');

export default {
  createImageCode(ctx) {
    const captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      width: 160,// 验证码图片宽度
      height: 60,// 验证码图片高度
      fontSize: 50, // 验证码文字大小
      ignoreChars: '0oO1ilI', // 验证码字符中排除内容 0o1i
      noise: 4, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#eee' // 验证码图片背景颜色s
    });
    console.log(captcha);
    ctx.session.captcha = {
      code: captcha.text,
      expire: Date.now() + 60 * 1000
    }
    return captcha.data
  },
  verifyImageCode(ctx, clientCode) {
    const captcha = ctx.session.captcha
    let code;
    let expire;
    try {
      code = captcha.code
      expire = captcha.expire
    } catch (error) {
      ctx.session.captcha = null;
      throw new Error('请重新获取验证码')
    }
    if (code !== clientCode) {
      ctx.session.captcha = null;
      throw new Error('验证码不正确')
    } else if (Date.now() > expire) {
      ctx.session.captcha = null;
      throw new Error('验证码已过期')
    }
    ctx.session.captcha = null;
  }
}