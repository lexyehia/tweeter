"use strict";

const express       = require('express');
const usersRoutes  = express.Router();
const Tweet         = require('../models/user');



usersRoutes.post("/", function(req, res) {

});

module.exports = usersRoutes;