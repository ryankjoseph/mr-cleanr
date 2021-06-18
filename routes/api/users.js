const express = require('express');
const usersCtrl = require('../../controllers/users');
const router = express.Router();

// POST /api/users/signup
router.post('/signup', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);
module.exports = router;