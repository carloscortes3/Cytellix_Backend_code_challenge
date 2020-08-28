const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

router.get('/', async (req, res) => {
    try{
        const roles = await Role.find();
        res.json(roles.map((obj) => {return {name: obj.name}}));
    } catch (err) {
        res.json([{message: err}]);
    }
});

router.post('/', async (req, res) => {
    const role = new Role({
        name: req.body.name
    });

    try{
        const save_role = await role.save();
        res.json(save_role);
    }catch(err){
        res.json([{message: err}]);
    }
});

router.delete('/:role_id', async (req, res) => {
    try{
        const remove_role = Role.remove({_id: req.params.role_id});
    }catch(err){
        res.json([{message: err}]);
    }
});

module.exports = router;