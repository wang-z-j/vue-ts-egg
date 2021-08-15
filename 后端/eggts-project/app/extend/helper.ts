import ImageCode from '../util/imageCode'
import EmailCode from '../util/emailCode'
module.exports = {
  createImageCode() {
    return ImageCode.createImageCode(this.ctx)
  },
  verifyImageCode(clientCode) {
    return ImageCode.verifyImageCode(this.ctx, clientCode)
  },
  createEmailCode(to: string) {
    return EmailCode.sendEmailCode(this.ctx, to)
  },
  verifyEmailCode(clientCode) {
    return EmailCode.verifyEmailCode(this.ctx, clientCode)
  }

}
