
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
   }, 
   reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
   status: {
    type: String,
    enum: ['pending','accepted', 'rejected'],
    required: true,
    default:'pending' 
  }
});
const request = mongoose.model('requests', userSchema);
module.exports = request;


