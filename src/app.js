// Importing dotenv to be used only in development
// Heroku has NODE_ENV = 'production' so will not require dotenv
import app from './core/server';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Serving on: http://localhost:${PORT}`));