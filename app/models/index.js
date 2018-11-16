'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load dotenv environment variable DB_URI and PORT 3000
if (process.env.NODE_ENV === 'dev') require('dotenv').config();

// Set up the internals of sequelize
// Import filesystem to recognize where the models are
const basename = _path2.default.basename(__filename);
// const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};
let sequelize;
let model;

// Check if the application is running in development or running on heroku
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'st') {
  // the application is executed on Heroku ... use the postgres staging or production database
  sequelize = new _sequelize2.default(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // false -- Check Logging and Sync options???
    native: true,
    pool: {
      max: 5,
      min: 0
    },
    sync: true,
    forceSync: false,
    operatorsAliases: false
  });
} else if (process.env.NODE_ENV === 'dev') {
  // the application is executed on the local machine ... use postgres development
  // DATABASE_DEV_URL
  sequelize = new _sequelize2.default(process.env.DB_URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // false -- Check Logging and Sync options???
    native: true,
    pool: {
      max: 5,
      min: 0
    },
    sync: true,
    forceSync: false,
    operatorsAliases: false
  });
}

// Export the model object that is the exact similar to db object
// Import this in the server.js file to run queries on the db based on models
// Use the model object to create new rows in the database

_fs2.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

// Export the database object
// Use to Authenticate db in the server.js file, while use model to query db
exports.default = db;
//# sourceMappingURL=index.js.map