const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// Photo Schema
const photoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    photoUrl: { type: String, required: true }, 
    detail: { type: String, required: true }, 
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'likes' }], 
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }], 
    createdAt: { type: Date, default: Date.now } 
  });
  const LikeComments = mongoose.model('likeComments', photoSchema);
  module.exports = LikeComments;