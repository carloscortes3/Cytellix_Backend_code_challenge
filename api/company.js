const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');

router.get('/', async (req, res) => {
    try{
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/by_name/:company_name', async (req, res) => {
    try{
        const cmp = await Company.find({name: req.params.company_name});
        res.status(200).json([{
            name: cmp[0].name,
            address: cmp[0].address,
            customer_quantity: cmp[0].customer_quantity,
            users_quantity: cmp[0].users_quantity
        }]);
    }catch(err){
        res.json([{message: err}]);
    }

});

router.post('/', async (req, res) => {
    const company = new Company({
        name: req.body.name,
        address: req.body.address,
        customer_quantity: req.body.customer_quantity,
        users_quantity: 0
    });

    try{
        const save_company = await company.save();
        res.json([save_company]);
    }catch(err){
        console.log(err)
        res.json([{message: err}]);
    }
});

router.delete('/:company_id', async (req, res) => {
    try{
        const remove_company = Company.remove({_id: req.params.company_id});
    }catch(err){
        res.json([{message: err}]);
    }
});

router.patch('/:company_name', async (req, res) => {
    try{
        const updateCompany = await Company.updateOne(
            {name: req.params.company_name},
            {$set: {
                address: req.body.address,
                customer_quantity: req.body.customer_quantity
            }}
        );
        res.json(updateCompany);
    }catch(err){
        res.json([{ message: err}]);
    }
});

module.exports = router;