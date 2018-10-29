const createUserMw = (req, res, next) => {
  // Check if user exists
  // Create ID from email
  // Create Password Hash
  // Save User to DB
  // Return User to calling function
};

app.get('/user', (req, res) => {
  const email = req.param('email');
  console.log(email);
  model.User.findOne({ where: { email } })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

// const checkAuth = options => (req, res, next) => {
//   if (options.requireAuth === true) {
//     if (req.body.name === 'Rami') {
//       req.body.authorized = true;
//     } else {
//       req.body.authorized = false;
//     }
//   } else {
//     req.body.authorized = 'not required';
//   }
//   next();
// };

// export default checkAuth;