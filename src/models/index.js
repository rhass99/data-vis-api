// Import filesystem to recognize where the models are
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

// Load dotenv environment variable DB_URI and PORT 3000
if (process.env.NODE_ENV === 'dev') require('dotenv').config();

// Set up the internals of sequelize
const basename = path.basename(__filename);
// const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};
let sequelize;

// Check if the application is running in development or running on heroku
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'st') {
  // the application is executed on Heroku ... use the postgres staging or production database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // false -- Check Logging and Sync options???
    native: true,
    pool: {
      max: 5,
      min: 0,
    },
    sync: true,
    forceSync: false,
    operatorsAliases: false,
  });
} else if (process.env.NODE_ENV === 'dev') {
  // the application is executed on the local machine ... use postgres development
  // DATABASE_DEV_URL
  sequelize = new Sequelize(process.env.DB_URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false, // false -- Check Logging and Sync options???
    native: true,
    pool: {
      max: 5,
      min: 0,
    },
    sync: true,
    forceSync: false,
    operatorsAliases: false,
  });
}

// Export the model object that is the exact similar to db object
// Import this in the server.js file to run queries on the db based on models
// Use the model object to create new rows in the database

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the database object
// Use to Authenticate db in the server.js file, while use model to query db
export default db;