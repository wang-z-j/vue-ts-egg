import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.post('/register', controller.user.create);
  router.get('/imageCode', controller.utils.imageCode);
  router.get('/emailCode', controller.utils.emailCode);
  // router.get('/verify', controller.utils.verifyImageCode);

};
