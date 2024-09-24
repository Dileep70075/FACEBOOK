const Customer = require('../model/customer.model')
var express = require('express');
var router = express.Router();
module.exports = {
    postCustomer: async function (req, res, next) {
        try {

            const existingCustomer = await Customer.findOne({ email: req.body.email })
            if (existingCustomer) {
                return res.status(200).json({ message: 'Email already exists', success: false })
            }
            const user = new Customer(req.body);
            await user.save();
            res.status(200).json({ message: 'customer added successfully', data: user, success: true });

        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },
    getCustomers: async function (req, res, next) {
        try {
            const customers = await Customer.find({status:'active'})
            if (customers) {
                return res.status(200).json({ message: 'get customer successfully', data: customers, success: true })
            }
            else {
                return res.status(200).json({ message: 'get not access data', success: false })
            }
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },
    getCustomer: async function (req, res, next) {
        try {
            const customer = await Customer.findOne({ _id: req.query.customerId })
            if (!customer)
                return res.status(200).json({ message: 'user not found', success: false })
            return res.status(200).json({ message: 'update successfully', success: true, data: customer })
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },
    updateCustomer: async function (req, res, next) {
        try {
            const oldUser = await Customer.findOne({ _id: req.body.userId })
            if (!oldUser)
                return res.status(200).json({ message: 'user not found', success: false })
            const user = await Customer.findByIdAndUpdate(req.body.userId, { $set: req.body })
            if (!user) {
                return res.status(200).json({ message: 'not found CustomerId', success: false })
            }
            else {
                return res.status(200).json({ message: 'update successfully', success: true, data: user })
            }
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },
    deleteCustomer: async function (req, res, next) {
        try {
            if (!req.query.id) 
                return res.status(200).json({ message: 'user not found', success: false })
            const user = await Customer.findByIdAndUpdate(req.query.id, { $set: {status:'deleted'} })

            res.status(200).json({ message: 'deleted successfull', success: true,data:user })
        }
        catch (error) {
            res.status(200).json({ message: error.message ? error.message : error, success: false })
        }
    },
}  