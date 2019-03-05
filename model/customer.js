const mongoose = require('mongoose')
const joi = require('joi')

const Customer = mongoose.model('customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false,
        required: false,
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
}));

function validateCustomer(customer) {

    const schema = {
        name: joi.string().min(5).max(255).required(), //!!!
        // phone: joi.string.required.min(5).max(50),
        phone: joi.string().required().min(5).max(50),
        isGold: joi.boolean()
    }
    return joi.validate(customer, schema);
}



exports.Customer = Customer; //!!!
exports.validate = validateCustomer;
