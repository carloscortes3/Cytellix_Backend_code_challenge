const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const User = require('../models/User');
const Session = require('../models/Session');

router.get('/user_data', async (req, res) => {
    const session_obj = await Session.findOne({session: req.header("session-token")});
    if (session_obj.time > Date.now()){
        try{
            const usr = await User.findOne({email: session_obj.email});
            if (usr){
                res.json({
                    email: usr.email,
                    company: usr.company,
                    role: usr.role,
                    authorized: usr.authorized
                })
            }
            else{
                res.json({message: "User for this session does not exist. Please log in again!"})
            }
        }catch(err){
            res.json({message: err});
        }
    }else{
        return res.json({message: "Session has expired! Please log in again."})
    }

});

//Need to make this one work after initial changes have been finished
router.post('/by_ses/', async (req, res) => {
    try{
        const ses = await Session.find({session: req.body.session});
        if (ses.length && (ses[0].time > Date.now())){
            const usr_info =  await User.find({email: ses[0].email});
            if (usr_info.length > 0){
                res.status(200).json([{
                    "session": req.body.session
                }]);
            }else{
                res.json([{message: "Your email no longer exists. Please create another account and try again."}])
            }
        }else{
            res.json([{message: "The email or session you have entered does not exist in the session repo. Please login again."}])
        }
    }catch(err){
        res.json([{message: err}]);
    }

});

router.post('/auth/', async (req, res) => {
    try{
        let user_info = await User.find({email: req.body.email});

        if (user_info.length!==0 && user_info[0].password === crypto.pbkdf2Sync(req.body.password, user_info[0].salt, 1000, 64, 'sha512').toString('base64')){
            const count =  await Session.find({email: req.body.email});
            if (count.length){
                const remove_ses = await Session.deleteOne({email: req.body.email});
            }
            const d = new Date();
            const ses = new Session({
                session: crypto.randomBytes(16).toString('base64'),
                email: req.body.email,
                time: d.setMinutes(d.getMinutes() + 15)
            });
            const save_ses = await ses.save();
            res.status(200).json([{
                "session": ses.session
            }]);
        }else{
            res.json([{message: "Incorrect email or passsword, please try again"}]);
        }
    }catch(err){
        res.json([{message: err}]);
    }
});

router.delete('/:session', async (req, res) => {
    try{
        const remove_ses = Session.remove({session: req.params.session});
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