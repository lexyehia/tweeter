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
        handle: String,
        user_id: String
   },
   content: {
       text: String
   },
   likes: {type: Number, default: 0},
   created_at: { type: Date, default: Date.now }
}, {collection: 'tweets'});

module.exports = mongoose.model('Tweet', tweetSchema);