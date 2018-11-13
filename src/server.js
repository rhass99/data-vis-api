import express from 'express';
import restRouter from './api/api';
import appMiddleware from './api/middleware/rest.middleware';

const app = express();
appMiddleware(app);

app.use('/api/', restRouter);

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'User already exists':
      res.status(200).json({ user: true });
      next();
      break;
    default:
      console.error(err.message);
      res.status(500).send(err);
      next();
  }
});

// User routes
//  - Profile
//  - Tables
//  - Upload

// Guest routes


export default app;