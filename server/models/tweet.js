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

/**
 * Pre-save hook, if the new tweet is not assigned a user
 * (posted by someone who is not logged in), it calls 
 * User.generateRandomUser() and assigns that random user
 * to the new tweet before being persisted
 */
tweetSchema.pre('save', function(next) {
    if(this.isNew && !this.user) {
        let newTweet = this
        let user = User.generateRandomUser()
        user.save(function() {
            newTweet.user = user._id
            next()
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('Tweet', tweetSchema);