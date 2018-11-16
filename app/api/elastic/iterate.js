'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// How to read JSON from file to JSON object
const allUsers = JSON.parse(_fs2.default.readFileSync('./indexkeys.json', 'utf8'));

allUsers.forEach(user => {
  if (user.info.sex === 'Male') {
    user.info.sex = 'male';
  } else {
    user.info.sex = 'female';
  }
});

// How to write a JSON object to file.
// fs.writeFile('./src/db/editedIndex.json', JSON.stringify(allUsers), (err) => {
//   if (err) {
//     console.log(err);
//   }
// });
//# sourceMappingURL=iterate.js.map