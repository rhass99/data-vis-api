import app from './core/server';
import db from './models/index';
import { addUserAccount } from './core/helpers/db';
// Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv
if (process.env.NODE_ENV === 'dev') require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));

// Start DB
db.sequelize.authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.log('Not connected', err));