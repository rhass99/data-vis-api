import elasticsearch from 'elasticsearch';
import fs from 'fs';

const inputfile = './indexKeys.json';

const esClient = elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
});

esClient.ping({
  requestTimeout: 1000,
}, (err) => {
  if (err) {
    console.trace('els is down');
  } else {
    console.log('els is working');
  }
});

const makebulk = (list, callback) => {
  // How to read JSON from file to JSON object
  const allUsers = JSON.parse(fs.readFileSync(list, 'utf8'));
  const bulk = [];

  allUsers.forEach((user) => {
    bulk.push({ index: { _index: 'users', _type: 'user', _id: allUsers.indexOf(user) } },
      {
        user_email: user.email,
        drugname: user.drugname,
        info: user.info,
      });
  });
  callback(bulk);
};

const indexAll = (madebulk, callback) => {
  esClient.bulk({
    maxRetries: 5,
    index: 'users',
    type: 'user',
    body: madebulk,
  }, (err, resp, status) => {
    if (err) {
      console.log(err);
    } else {
      callback(resp.items);
    }
  });
};


makebulk(inputfile, (res) => {
  console.log('Bulk Content prepared');
  indexAll(res, (res) => {
    console.log(res);
  });
});