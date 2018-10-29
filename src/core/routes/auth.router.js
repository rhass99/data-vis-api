import app from '../server';
import {
  genHash,
  compareHash,
} from '../auth/encrypt';

// Authentication routes
//  - Signup

app.post('/auth/signup', (req, res, next) => {
  genHash(req.body.password)
    .then((password) => {
      compareHash(req.body.password, password)
        .then(data => res.status(200).send(data))
        .catch(err => next(err));
    }).catch(err => next(err));
});