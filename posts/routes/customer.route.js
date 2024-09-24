var express = require('express');
var router = express.Router();
const Customer = require('../model/customer.model')
const authenticateJWT = require('../middlewares/authMiddleware');
const checkRequestBody = require('../middlewares/checkBody');
const customerController = require('../controllers/customer.controllers');

router.route('/')
.post(authenticateJWT,checkRequestBody, customerController.postCustomer)
.get(authenticateJWT, customerController.getCustomers)
.put(authenticateJWT, customerController.updateCustomer)
.delete(authenticateJWT, customerController.deleteCustomer);


router.get('/get-customer-by-id',authenticateJWT, customerController.getCustomer)


module.exports = router;
