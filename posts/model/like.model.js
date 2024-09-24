const mongoose = require('mongoose');
// Like Schema
const likeSchema = new mongoose.Schema({
  post:{type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, 
  createdAt: { type: Date, default: Date.now } 
});
const Like = mongoose.model('likes', likeSchema);

module.exports = Like;

