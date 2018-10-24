const checkAuth = options => (req, res, next) => {
  if (options.requireAuth === true) {
    if (req.body.name === 'Rami') {
      req.body.authorized = true;
    } else {
      req.body.authorized = false;
    }
  } else {
    req.body.authorized = 'not required';
  }
  next();
};

export default checkAuth;