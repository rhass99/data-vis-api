// Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv
import app from './core/server';
import db, { model } from './models/index';
// import { genHash, compareHash, idGenerator } from './core/helpers/encrypt';

if (process.env.NODE_ENV === 'dev') require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));

// Start DB
db.sequelize.authenticate()
  .then(() => console.log('Connected'))
  .catch(err => console.log('Not connected', err));

app.post('/api/signup', (req, res) => {
  db.UserAccount.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_hash: req.body.password,
    password_strength: 32,
    password_salt: 'hi',
  })
    .then((data) => {
      res.json(data);
    }).catch(err => console.log(err));
});