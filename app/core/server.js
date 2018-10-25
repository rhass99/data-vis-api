'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _encrypt = require('./encrypt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_bodyParser2.default.json());

// Authentication routes
//  - Signup
app.post('/auth/signup', (req, res, next) => {
  (0, _encrypt.genHash)(req.body.password).then(password => {
    (0, _encrypt.compareHash)(req.body.password, password).then(data => res.status(200).send(data)).catch(err => next(err));
  }).catch(err => next(err));
});

//  - Login

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes
// Admin routes


exports.default = app;
//# sourceMappingURL=server.js.map