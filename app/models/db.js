// database initialization

const mongoose = require('mongoose');
const config = require('../config/database');

mongoose.connect(config.database, function () {
  console.log('mongodb connected')
});

module.exports = mongoose;