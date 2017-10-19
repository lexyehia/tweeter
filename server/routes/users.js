"use strict"

const express      = require('express')
const usersRoutes  = express.Router()
const User         = require('../models/user')
const bcrypt       = require('bcrypt')

usersRoutes.post("/new", (req, res) => {
    let user = new User({
        handle:   req.body.handle,
        name:     req.body.name,
        password: req.body.password
    })

    user.save((err) => {
        if (err) {
            res.status(403).json({error: err.message})
            return
        }

        res.cookie('user_id', user._id.toString())
        res.sendStatus(201)
    })
})

usersRoutes.post("/login", function(req, res) {
    User.comparePasswords(req.body.handle, req.body.password, (user) => {
        if (user) {
            res.cookie('user_id', user._id.toString())
            res.sendStatus(200)
            return
        } else {
            res.status(403).send()
        }
    })
})

module.exports = usersRoutes