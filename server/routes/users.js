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
    req.session = newUser._id.toString();
    res.status(200).send();
  })
});

module.exports = usersRoutes;