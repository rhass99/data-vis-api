import express from 'express';
import userController from './user.controller';
import { createUser, playme, findByParam } from './user.middleware';

const userRouter = express.Router();

userRouter.param('id', findByParam);

userRouter.route('/')
  // .get(playme, userController.get)
  .post(createUser, userController.post);

userRouter.route('/:id')
  .get(userController.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)

export default userRouter;
