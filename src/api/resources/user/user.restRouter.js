import express from 'express';
import controller from './user.controller';
import { createUser, findByParam, authUser } from './user.middleware';

const userRouter = express.Router();

userRouter.param('id', findByParam);

userRouter.route('/')
  .get(controller.get)
  .post(createUser, controller.post);

userRouter.route('/:id')
  .get(controller.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)

userRouter.route('/login')
  .post(authUser, controller.login);

// router.route('/')
//   .get(controller.get)
//   .post(controller.post)

// router.route('/:id')
//   .get(controller.getOne)
//   .put(checkUser, controller.put)
//   .delete(checkUser, controller.delete)

export default userRouter;
