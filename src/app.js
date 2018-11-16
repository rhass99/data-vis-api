import app from './server';
import db from './models/index';

// Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv
if (process.env.NODE_ENV === 'dev') require('dotenv').config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));

// Start DB
db.sequelize.authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.log('Not connected', err));