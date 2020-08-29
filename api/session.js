const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Session = require('../models/Session');


router.post('/by_ses/', async (req, res) => {
    try{
        const ses = await Session.find({session: req.body.session});
        if (ses.length && (ses[0].time+(15*60000)) - Date.now() > 0){
            const usr_info =  await User.find({email: ses[0].email});
            if (usr_info.length > 0){
                res.status(200).json([{
                    "_id": usr_info[0]._id,
                    "email": usr_info[0].email,
                    "role": usr_info[0].role,
                    "company": usr_info[0].company,
                    "authorized": usr_info[0].authorized,
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
        let user_info = await User.find({email: req.body.email, password: req.body.password});

        if (user_info.length!==0){
            const count =  await Session.find({email: req.body.email});
            if (count.length){
                const remove_ses = await Session.deleteOne({email: req.body.email});
            }
            const ses = await new Session({
                session: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 7),
                email: req.body.email,
                time: Date.now()
            });
            const save_ses = await ses.save();
            res.status(200).json([{
                "_id": user_info[0]._id,
                "email": user_info[0].email,
                "role": user_info[0].role,
                "company": user_info[0].company,
                "authorized": user_info[0].authorized,
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