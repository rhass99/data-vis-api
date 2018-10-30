import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { createUser } from './api/resources/user/user.controller';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
  next();
});

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes


export default app;