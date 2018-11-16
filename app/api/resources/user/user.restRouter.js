'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./user.controller');

var _user2 = _interopRequireDefault(_user);

var _user3 = require('./user.middleware');

var _user4 = _interopRequireDefault(_user3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userRouter = _express2.default.Router();

// userRouter.param('id', mid.checkToken);
// userRouter.param('email', mid.checkToken);

userRouter.route('/').get(_user2.default.get).post(_user4.default.createUser, _user2.default.post);

userRouter.route('/id/:id').get(_user4.default.checkToken, _user2.default.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)


userRouter.route('/login').post(_user4.default.loginUser, _user2.default.login);

exports.default = userRouter;
//# sourceMappingURL=user.restRouter.js.map