import Router from 'express';
import userRouter from './resources/user/user.restRouter';

const restRouter = Router();
restRouter.use('/users', userRouter);

export default restRouter;