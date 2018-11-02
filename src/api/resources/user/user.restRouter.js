import express from 'express';
import controller from './user.controller';
import { createUser, findById, findByEmail } from './user.middleware';

const userRouter = express.Router();

userRouter.param('id', findById);
userRouter.param('email', findByEmail);

userRouter.route('/')
  .get(controller.get)
  .post(createUser, controller.post);

userRouter.route('/id/:id')
  .get(controller.getOne);
//   .put(userController.updateOne)
//   .delete(userController.createOne)

userRouter.route('/email/:email')
  .get(controller.getOne);
// .put(userController.updateOne)
// .delete(userController.createOne)


// userRouter.route('/login')
//   .post(authUser, controller.login);

export default userRouter;


/*
  router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete)

*/
