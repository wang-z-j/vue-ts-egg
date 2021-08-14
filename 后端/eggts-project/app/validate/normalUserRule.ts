export default {
  username: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9]{6,}$/,
    message: '用户名至少是6位',
  },
};
