"use strict";

const express       = require('express');
const usersRoutes  = express.Router();
const User         = require('../models/user');
const bcrypt       = require('bcrypt');



usersRoutes.post("/new", function(req, res) {
  let newUser = new User({
    handle:   req.body.handle,
    name:     req.body.name,
    password: bcrypt.hashSync(req.body.password, 10),
    avatars:  {
      regular: '/images/avatar.png',
      large:   '/images/avatar.png',
      small:   '/images/avatar.png'
    }
  });
  
  newUser.save((err, user) => {
    if (err) throw err;
    res.cookie('user_id', newUser._id.toString());
    res.status(200).end();
  })
});

usersRoutes.post("/login", function(req, res) {
  User.findOne({handle: req.body.handle}, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(403).end();
      return;
    } else if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.cookie('user_id', user._id.toString())
      res.status(200).end()
    }
  })
});

module.exports = usersRoutes;