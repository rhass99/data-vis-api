const getOne = (req, res, next) => {
  if (res.locals.data) {
    res.json({
      id: res.locals.data.id,
      email: res.locals.data.email,
    });
  } else {
    res.json({
      user: false,
    });
  }
  next();
};

const post = (req, res, next) => {
  res.json({
    id: res.locals.data.id,
    email: res.locals.data.email,
    user_existed: res.locals.data.exists,
  });
  next();
};

const get = (req, res, next) => {
  res.send({
    users: 'all Users',
  });
  next();
};


export default {
  post,
  get,
  getOne,
};