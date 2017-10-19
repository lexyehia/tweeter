"use strict";

const express       = require('express')
const tweetsRoutes  = express.Router()
const Tweet         = require('../models/tweet')
const User          = require('../models/user')

tweetsRoutes.get("/", function(req, res) {
    Tweet.find({}).sort('-created_at').populate('user').exec((err, tweets) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return
        } else {
            res.json(tweets)
        }
    })
})

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

            tweet.save((err) => {
                if (err) {
                    res.status(500).json({ error: err.message })
                    return
                } else {
                    res.sendStatus(201)
                }
            })
        })
    } else {
        tweet.save((err) => {
            if (err) {
                res.status(500).json({ error: err.message })
                return
            } else {
                res.sendStatus(201)
            }
        })
    }
})

tweetsRoutes.put("/like", function(req, res) {

    Tweet.findById(req.body.id, (err, tweet) => {
        if (err || tweet === null) {
            res.status(500).json({error: err.message})
            return
        }

        tweet.likes = (tweet.likes || 0) + 1
        tweet.save((err) => {
            if (err) {
                res.status(500).json({error: err.message})
                return
            } else {
                res.sendStatus(201)
            }
        })
    })
})

module.exports = tweetsRoutes

