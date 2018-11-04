import fs from 'fs';

// How to read JSON from file to JSON object
const allUsers = JSON.parse(fs.readFileSync('./indexkeys.json', 'utf8'));

allUsers.forEach((user) => {
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