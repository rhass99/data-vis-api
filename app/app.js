'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _index = require('./models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv
if (process.env.NODE_ENV === 'dev') require('dotenv').config();

const PORT = process.env.PORT;

_server2.default.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));

// Start DB
_index2.default.sequelize.authenticate().then(() => console.log('Connected')).catch(err => console.log('Not connected', err));
//# sourceMappingURL=app.js.map