import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // 邮箱相关配置
  config.smtp = {
    host: "smtp.qq.com",
    port: 465,
    user: '794401136@qq.com', // 发送邮件的邮箱
    pass: `seejkyqxyftfbfda`, // 邮箱对应的授权码
  };
  return config;
};
