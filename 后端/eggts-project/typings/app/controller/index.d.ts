// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';
import ExportUtils from '../../../app/controller/utils';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    utils: ExportUtils;
  }
}
