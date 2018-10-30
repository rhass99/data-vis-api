import express from 'express';
import app from '../../../server';
import createUser from './user.controller';

const userRouter = express.Router();

// userRouter.param('id', userController.findByParam);

app.post('/getuser', createUser, (req, res, next) => {
  console.log('Route', res.locals.data);
  if (res.locals.data.status === 'old') {
    res.json({
      id: res.locals.data.id,
      email: res.locals.data.email,
      user_existed: 'bibi',
    });
  } else {
    res.json({
      user: res.locals.data,
      user_existed: false,
    });
  }
  next();
});


export default userRouter;
