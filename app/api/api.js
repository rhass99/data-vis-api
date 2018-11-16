'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./resources/user/user.restRouter');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const restRouter = (0, _express2.default)();
restRouter.use('/users', _user2.default);

exports.default = restRouter;
//# sourceMappingURL=api.js.map