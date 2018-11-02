// Get UserAccount by email or ID based on params
const getOne = (req, res, next) => {
  if (res.locals.data) {
    res.json(res.locals.data);
  } else {
    res.json({
      user: false,
    });
  }
  next();
};

// Signup user
const post = (req, res, next) => {
  if (res.locals.data) {
    res.json(res.locals.data);
  }
  next();
};

// Get all users
const get = (req, res, next) => {
  res.json({ users: 'all users' });
  next();
};

// Login User
const login = (req, res, next) => {
  res.json(res.locals.data);
  next();
};


export default {
  post,
  get,
  getOne,
  login,
};