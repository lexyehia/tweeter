const mongoose = require("mongoose"),
      User     = require('./user'),
      Schema   = mongoose.Schema

/**
 * Tweet Model Schema
 */
let tweetSchema = new Schema({
    user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
    },
    content: {
        text: String
    },
    likes: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now }
}, {collection: 'tweets'})

module.exports = mongoose.model('Tweet', tweetSchema);