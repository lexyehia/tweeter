const mongoose = require("mongoose"),
Schema   = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  avatars: {
      small: String,
      regular: String,
      large: String
  },
  handle: String,
  password: String,
  created_at: { type: Date, default: Date.now }
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);