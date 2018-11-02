import express from 'express';
import controller from './user.controller';
import mid from './user.middleware';

const userRouter = express.Router();

userRouter.param('id', mid.findById);
userRouter.param('email', mid.findByEmail);

userRouter.route('/')
  .get(controller.get)
  .post(mid.createUser, controller.post);

userRouter.route('/id/:id')
  .get(controller.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)

userRouter.route('/email/:email')
  .get(controller.getOne);
// .put(userController.updateOne)
// .delete(userController.createOne)


userRouter.route('/login')
  .post(mid.loginUser, controller.login);

export default userRouter;
