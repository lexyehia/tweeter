"use strict"

const express      = require('express')
const usersRoutes  = express.Router()
const User         = require('../models/user')
const bcrypt       = require('bcrypt')

/**
 * POST /users/new 
 * Persists the new user to database, then sends a set-cookie
 * response upon successful save
 */
usersRoutes.post("/new", (req, res) => {
    let user = new User({
        name:     req.body.name,        
        handle:   req.body.handle,
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

/**
 * POST /users/login
 * Compares the inputted password with user password from DB
 * then sends a set-cookie response to log the user in
 */
usersRoutes.post("/login", (req, res) => {
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