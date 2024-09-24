var express = require('express');
var router = express.Router();
const Like = require("../model/like.model")
const Post = require('../model/post.model');
const Comment = require('../model/comment.model')
const likeComment = require('../model/photosLikeComment.model')
const User = require('../model/user.model');
const request = require('../model/requsts.model');
const { default: mongoose } = require('mongoose');
module.exports = {
  postLike: async function (req, res, next) {
    try {
      const { postId } = req.body;
      // const userId = req.user._id;
      const userId = await User.findById(req.user)
      const existingLike = await Like.findOne({ post: postId, user: userId });
      if (existingLike) {
        const like = await Like.findOneAndDelete({ post: postId, user: userId });
        return res.status(201).json({ message: 'Post disliked successfully' });
      }
      const newLike = new Like({
        post: postId,
        user: userId,
      });
      await newLike.save();
      return res.status(201).json({ message: 'Post liked successfully', data: newLike });
    }
    catch (error) {
      res.status(200).json({ message: error.message ? error.message : error, success: false })
    }
  },
  postComment: async function (req, res, next) {
    const { postId, comment } = req.body;
    const userId = req.user._id;
    const existingComment = await Comment.findOne({ post: postId, user: userId })
    if (existingComment) {
      return res.status(201).json({ message: 'already has been comment' });
    }
    const newComent = new Comment({
      post: postId,
      user: userId,
      text: comment,
    });
    await newComent.save();
    return res.status(201).json({ message: 'Post liked successfully', data: newComent });
  },







  Like: async function (req, res, next) {
    try {
      const likesAggregation = await Like.aggregate([
        {
          $group: {
            uaerId: { $push: '$user' },
            _id: "$post",
            totalLikes: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'uaerId',
            foreignField: '_id',
            as: 'userDetails'
          }
        },
        { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            totalLikes: 1,
            // _id: "$post",
            // userDetails: 1
          }
        }
      ])
      res.json(likesAggregation)
    }
    catch (error) {
      res.status(200).json({ message: error.message ? error.message : error, success: false })
    }
  },
  comments: async function (req, res, next) {
    try {
      const users = await Comment.aggregate([
        {
          $group: {
            userId: { $push: '$user' },
            _id: '$post',
            totalComments: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: "_id",
            as: 'userDetails',
          }
        },
        { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            totalComments: 1,
            _id: '$post',
            userDetails: 1
          }
        }
      ])
      res.json(users)
    }
    catch (error) {
      res.status(200).json({ message: error.message ? error.message : error, success: false })
    }

  },

}