'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api/api');

var _api2 = _interopRequireDefault(_api);

var _rest = require('./api/middleware/rest.middleware');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
(0, _rest2.default)(app);

app.use('/api/', _api2.default);

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'User already exists':
      res.status(200).json({ user: true });
      next();
      break;
    default:
      console.error(err.message);
      res.status(500).send(err);
      next();
  }
});

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes


exports.default = app;
//# sourceMappingURL=server.js.map