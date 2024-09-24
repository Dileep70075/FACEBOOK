var express = require('express');
var router = express.Router();
const authenticateJWT = require('../middlewares/authMiddleware');
const postCopntroller = require('../controllers/post.controllers');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

router.post('/',authenticateJWT,upload.single('photos'), postCopntroller.add)
router.get('/get-posts',authenticateJWT, postCopntroller.getPosts)
router.get('/get-my-posts',authenticateJWT, postCopntroller.getMyPosts)


module.exports = router;
