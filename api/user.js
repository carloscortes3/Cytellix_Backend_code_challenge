const express = require('express');
const crypto = require("crypto");
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');
const Role = require('../models/Role');


router.post('/', async (req, res) => {
    try{
        let companyAmount = await User.find({company: req.body.company});
        let roles = await Role.find({name: req.body.role});
        let companies = await Company.find({name: req.body.company});

        if (roles.length===0){
            res.json([{message: "The role you gave does not already exist, please try another one."}]);
        }else if (companies.length===0){
            res.json([{message: "The company you  gave does not already exist, please try another one."}]);
        }else{
            const salt = crypto.randomBytes(16).toString('base64');

            const usr = await new User({
                email: req.body.email,
                password: crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('base64'),
                salt: salt,
                role: req.body.role,
                company: req.body.company,
                authorized: (req.body.role!=="Admin" || companyAmount === 0)
            });

            const save_usr = await usr.save();
            res.status(200).json([save_usr]);

            const updateCompany = await Company.updateOne(
                {name: usr.company},
                {$set: {
                    users_quantity: (companyAmount.length + 1)
                }}
            );
        }
    }catch(err){
        res.json([{message: err}]);
    }
});


router.delete('/:usr_id', async (req, res) => {
    try{
        const usr = await User.findById(req.params.usr_id);
        const remove_usr = User.remove({_id: req.params.usr_id});
        const companyAmount = await User.find().filter({company: usr.company});

        const updateCompany = await Company.updateOne(
            {name: usr.company},
            {$set: {
                users_quantity: (companyAmount.length + 1)
            }}
        );
    }catch(err){
        res.json([{message: err}]);
    }
});

module.exports = router;