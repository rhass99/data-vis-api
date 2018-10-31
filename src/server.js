import express from 'express';
import restRouter from './api/api';
import appMiddleware from './api/middleware/rest.middleware';

const app = express();
appMiddleware(app);

app.use('/api/', restRouter);

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