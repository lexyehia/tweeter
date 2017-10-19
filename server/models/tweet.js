const mongoose = require("mongoose"),
        User = require('./user'),
      Schema   = mongoose.Schema;

let tweetSchema = new Schema({
    user: [{
          type: Schema.Types.ObjectId,
          ref: 'Story'
    }],
    content: {
        text: String
    },
    likes: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now }
}, {collection: 'tweets'});

tweetSchema.pre('save', function(next) {
    if(this.isNew && !this.user) {
        let _user = User.generateRandomUser()
        _user.save(function() {
            this.user = _user._id
            next()
        })
    }
})

module.exports = mongoose.model('Tweet', tweetSchema);