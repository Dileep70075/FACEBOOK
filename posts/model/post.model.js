
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
   }, 
   photo: {
    type: String,
    required: true 
  },
  detail: {
    type: String,
    required: true 
  }
});
const post = mongoose.model('posts', userSchema);
module.exports = post;