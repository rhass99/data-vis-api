import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Authentication routes
//  - Signup
//  - Login

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes
// Admin routes


export default app;