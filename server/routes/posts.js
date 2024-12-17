const express = require('express');
const postControllers = require('../controllers/posts');
const router = express.Router();
const {verify, verifyAdmin} = require('../auth.js');

// 1) Create blog
router.post('/', verify, postControllers.createPost);

// 2) Edit blog
router.patch('/editPost/:postId', verify, postControllers.updatePost);

// 3) Get blog
router.get('/', verify, postControllers.getPost);

// 4) Delete blog
router.delete('/deletePost/:postId', verify, postControllers.deletePost);

module.exports = router;