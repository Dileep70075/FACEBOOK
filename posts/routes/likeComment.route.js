const authenticateJWT = require('../middlewares/authMiddleware');
var express = require('express');
var router = express.Router();
const Like = require("../model/like.model")
const Comment = require('../model/comment.model')
const likeComment = require('../model/photosLikeComment.model')
const User = require('../model/user.model');
const likecommentController = require('../controllers/likeComment.controllers');
router.post('/like',authenticateJWT, likecommentController.postLike)
router.post('/comment',authenticateJWT,likecommentController.postComment)
router.get('/',authenticateJWT,likecommentController.Like)
router.get('/c',authenticateJWT,likecommentController.comments)
module.exports = router;
