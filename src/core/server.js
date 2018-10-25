import express from 'express';
import bodyParser from 'body-parser';
import {
  genHash,
  compareHash,
} from './encrypt';

const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Authentication routes
//  - Signup
app.post('/auth/signup', (req, res, next) => {
  genHash(req.body.password)
    .then((password) => {
      compareHash(req.body.password, password)
        .then(data => res.status(200).send(data))
        .catch(err => next(err));
    }).catch(err => next(err));
});

//  - Login

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes
// Admin routes


export default app;