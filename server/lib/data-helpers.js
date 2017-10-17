"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const Tweet = require('../models/tweet');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers() {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        let tweet = new Tweet(newTweet);
        tweet.save((err) => {
          if (err) throw err;
          callback(null, true);          
        })
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        Tweet.find({}, (err, tweets) => {
          if (err) throw err;
          callback(null, tweets);          
      });
    }

  };
}
