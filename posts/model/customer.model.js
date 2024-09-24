const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    name: { 
      type: String, required: [true, 'Name is required']
  },
    email: {
       type: String, required: true, unique: true 
      },
      mobileNumbar: { 
        type: Number, required: [true, 'mobileNumbar is required'] 
    }, 
    address: { 
      type: String, required: true 
  },
  items: { 
    type: String, required: [true, 'Items is required'] 
  },
    price: { 
      type: Number, required: [true, 'Price is required'] 
  },
  status:{
    type: String,
    default:'active'
  }
  });
  const Customer = mongoose.model('customers', customerSchema);
  module.exports = Customer;