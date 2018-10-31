import bodyParser from 'body-parser';
import morgan from 'morgan';
// setup global middleware here

const appMiddlewate = (app) => {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};

export default appMiddlewate;