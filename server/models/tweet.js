const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

let tweetSchema = new Schema({
    user: {
        name: String,
        avatars: {
            small: String,
            regular: String,
            large: String
        },
        handle: String
   },
   content: {
       text: String
   },
   created_at: { type: Date, default: Date.now }
}, {collection: 'tweets'});

module.exports = mongoose.model('Tweet', tweetSchema);