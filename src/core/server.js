import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';


const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(morgan('short'));


// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

//  - Login

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes
// Admin routes


export default app;