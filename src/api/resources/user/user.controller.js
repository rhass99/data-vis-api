import db from '../../../models/index';
import addUserAccount from '../../modules/dbhelpers';

// const findByParam = () => {
//   // function to find user by id
// };

const findByEmail = async (email) => {
  // function to find user by email
  let data;
  try {
    data = await db.UserAccount.findOne({ where: { email } });
    if (!data) {
      return null;
    }
  } catch (err) {
    throw err;
  }
  data.exists = true;
  return data;
};

const createUser = async (req, res, next) => {
  // function to create a new user (signup)
  try {
    const userCheck = await findByEmail(req.body.email);
    if (!userCheck) {
      res.locals.data = await addUserAccount(req.body);
      res.locals.data.exists = false;
    } else {
      res.locals.data = userCheck;
    }
  } catch (err) {
    next(err);
  }
  next();
};

export default createUser;