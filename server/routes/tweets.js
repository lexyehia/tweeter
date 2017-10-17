"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const Tweet         = require('../models/tweet');

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      }
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/like", function(req, res) {

    Tweet.findById(req.body.id, (err, tweet) => {
      if (err) {
        res.status(500).json({error: err.message})
        return
      } else if (tweet === null) {
        res.status(500).json({error: 'No tweet found'});
      }

      tweet.likes = (tweet.likes || 0) + 1;
      tweet.save((err) => {
        if (err) {
          res.status(500).json({error: err.message})
        } else {
          res.status(200).end();
        }
      })
    })
  });

  return tweetsRoutes;

}
