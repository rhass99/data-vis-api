import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
// setup global middleware here

const appMiddlewate = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // app.use(session());
};

export default appMiddlewate;