import express from 'express';
import controller from './user.controller';
import mid from './user.middleware';

const userRouter = express.Router();

// userRouter.param('id', mid.checkToken);
// userRouter.param('email', mid.checkToken);

userRouter.route('/')
  .get(controller.get)
  .post(mid.createUser, controller.post);

userRouter.route('/id/:id')
  .get(mid.checkToken, controller.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)


userRouter.route('/login')
  .post(mid.loginUser, controller.login);

export default userRouter;
