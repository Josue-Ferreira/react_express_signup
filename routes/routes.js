const express = require('express');
const router = express.Router();
const usersHandlers = require('../model/users');

router.get('/seed', usersHandlers.usersSeeder);

module.exports = router;