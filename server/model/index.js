const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.agency = require('./agency.model');
db.client = require('./client.model');

module.exports = db;