const path = require('path');
const config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname + '/db/dbMessages.sqlite'),
  },
  useNullAsDefault: true,
};

module.exports = { config };