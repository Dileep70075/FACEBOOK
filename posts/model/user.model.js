
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  fname: { 
    type: String, required: true 
},
  lname: {
     type: String, required: true 
    },
  email: {
     type: String, required: true, unique: true 
    },
  address: { 
    type: String, required: true 
},
  password: { 
    type: String, required: true
 },
//  photo
   photo: {
    type: String,
    required: true 
  }
//  photo
});
const User = mongoose.model('users', userSchema);
module.exports = User;
