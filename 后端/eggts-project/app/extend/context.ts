module.exports = {
  success (data, code = 200, msg:string='成功'):void {
    this.body = {
      data,
      code,
      msg
    }
  },
  error (code = 500, msg:string='错误'):void {
    this.body = {
      code,
      msg
    }
  }
}
