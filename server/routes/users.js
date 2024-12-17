const express = require('express');
const {verify, verifyAdmin} = require('../auth.js');
const router = express.Router();
const userControllers = require('../controllers/users');

// 1) Register User
router.post('/register', userControllers.registerUser);

// 2) Login USer
router.post('/login', userControllers.loginUser);

module.exports = router;