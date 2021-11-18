let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const admin = require('../model/admin');




router.get('/add', (req, res)=> {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.send('admin', {admin: new admin()});
});

router.post('/add',async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    
    try{
        var password = req.body.password;
        var username = req.body.username;

        var newAdmin = new admin({
            username: username,
            password: password
        });
        newAdmin.save();
    
    
        res.send('successful');

    }catch (err){
        console.log(err);

    }


});





module.exports = router;