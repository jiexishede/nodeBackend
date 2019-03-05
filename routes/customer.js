const mongoose = require('mongoose')
const express = require('express')
const { Customer, validate } = require('../model/customer')
    // const router = express.router;   //!!!
const router = express.Router();

router.post('/', async(req, res) => {

    //  const error = validate(req.body); //!!!
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message); // 400请求不合法

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    const result = await customer.save();

    res.send(result);

})


router.get('/', async(req, res) => {
    const customers = await Customer.find().sort({ name: -1 });
    res.send(customers);
})

router.put(':id', async(req, res) => {
    //  const error = validate(req.body); //!!!
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message); // 400请求不合法
    const customer = await Customer.findByIdAndUpdate(req.params.customerId, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true })
    if (!customer) {
        res.status(404).error.message('This customer with the given id is not found')
    }
    res.send(customer)
})

// router.delete(':id', async(req, res) => {  //!!!
router.delete('/:id', async(req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
        res.status(404).error.message('This customer with the given id is not found')
    }
    res.send(customer)
})


router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        res.status(404).error.message('This customer with the given id is not found');
    }
    res.send(customer);
})

// export.router = router; //!!!
// module.export= router; // index.js 中.. TypeError: Router.use() requires a middleware function but got a Object
module.exports = router; // exports  不是 export 有提示的