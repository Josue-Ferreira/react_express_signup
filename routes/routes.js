const express = require('express');
const router = express.Router();
const usersHandlers = require('../model/users');

router.get('/seed', usersHandlers.usersSeeder);

router.get('/', usersHandlers.getUsers);
router.get('/:id', usersHandlers.getUserByID);

router.post('/',usersHandlers.createUser);

router.put('/:id',usersHandlers.updateUser);

router.delete('/:id', usersHandlers.deleteUser);

module.exports = router;