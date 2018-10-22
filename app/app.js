'use strict';

var _server = require('./core/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'development') require('dotenv').config(); // Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv


const PORT = process.env.PORT || 4000;

_server2.default.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));
//# sourceMappingURL=app.js.map