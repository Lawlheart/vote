'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  info: String,
  choices: Array,
  active: Boolean,
  user: String
});

module.exports = mongoose.model('Poll', PollSchema);