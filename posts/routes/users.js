var express = require('express');
var router = express.Router();
const User = require('../model/user.model');
const Customer = require('../model/customer.model')
const authenticateJWT = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/users.controller')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  } 
});
const upload = multer({ storage: storage });
router.post('/signup',upload.single('photo'), userController.sinnUp);
router.post('/login', userController.login);
router.get('/',authenticateJWT, userController.getUser);
router.put('/',authenticateJWT, userController.updateUser); 
router.delete('/',userController.deleteUser);
router.put('/updatePassword', authenticateJWT, userController.updatePassword);
router.get('/my-profile',authenticateJWT, userController.myProfile);
router.get('/getLoginUser',authenticateJWT, userController.getLoginUser);

module.exports = router;
