const authenticateJWT = require('../middlewares/authMiddleware');
var express = require('express');
var router = express.Router();
requestController = require('../controllers/requests.controllers')
router.post('/',authenticateJWT, requestController.sendrequest);
router.post('/abc',authenticateJWT, requestController.acceptrequest); 
// router.get('/abcd',authenticateJWT, requestController.getPost); 
module.exports = router;