
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
   }, 
   post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    required: true
  }, 
   comment: {
    type: String,
    required: true 
  }
});
const post = mongoose.model('requests', userSchema);
module.exports = post;


