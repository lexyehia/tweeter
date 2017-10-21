"use strict";

const express       = require('express')
const tweetsRoutes  = express.Router()
const Tweet         = require('../models/tweet')
const User          = require('../models/user')

/**
 * GET /tweets 
 * returns all Tweets and populated with users (in JSON)
 */
tweetsRoutes.get("/", function(req, res) {
    Tweet.find({}).sort('-created_at').populate('user', '-password').exec((err, tweets) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        } else {
            res.json(tweets)
        }
    })
})

/**
 * POST /tweets
 * Saves new tweet in database, and sends back saved tweet with user data
 * back to the client
 */
tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
        res.status(400).json({
            error: 'invalid request: no data in POST body'
        })
        return
    }

    let tweet = new Tweet({
        content: {
            text: req.body.text
        }
    })

    if(req.cookies['user_id']) {
        User.findById(req.cookies['user_id'], (err, user) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return
            }
            tweet.user = user._id
            saveTweet(tweet)
        })
    } else {
        saveTweet(tweet)
    }

    function saveTweet(tweet) {
        tweet.save((err) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return
            } else {
                tweet.populate('user', '-password', (err, tweet) => {
                    if (err) throw err
                    res.json(tweet)
                })
            }
        })
    }
})

/**
 * PUT /tweets/like
 * Increases the Like property of a specific tweet
 */
tweetsRoutes.put("/like", function(req, res) {

    Tweet.findById(req.body.id, (err, tweet) => {
        if (err || tweet === null) {
            res.status(500).json({error: err.message})
            return
        }

        tweet.likes++

        tweet.save((err) => {
            if (err) {
                res.status(500).json({error: err.message})
                return
            } else {
                res.sendStatus(200)
            }
        })
    })
})

module.exports = tweetsRoutes

