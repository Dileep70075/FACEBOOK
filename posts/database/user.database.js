
const mongoose = require('mongoose');
const mongoDB = async () =>{
try{

    mongoose.connect('mongodb://127.0.0.1:27017/third_project')
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((err) => console.error('Connection error', err));
}
catch(error){
    console.error('internal error:', error);
}
}

module.exports = mongoDB;

