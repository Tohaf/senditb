let express = require('express');
let router = express.Router();

const register = require('../model/register');








router.post('/pass', async(req, res) => {

    var Firstname = req.body.Firstname;
    var Lastname = req.body.Lastname;
    var password = req.body.password;
    var email = req.body.email;
    var username = req.body.username;

    var newRegister = new register();

    newRegister.Firstname = Firstname;
    newRegister.Lastname = Lastname;
    newRegister.password = password;
    newRegister.email = email;
    newRegister.username = username;

    newRegister.save((err, saveRegister)=>{
        if(err){
            
            res.status(500).send();
        }

        res.status(200).send(saveRegister);
    });

});



router.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    var password = req.body.password;
    var email = req.body.email;

    register.findOne({email: email, password: password}, (err, register) => {
        if(err){
            console.log(err);
            return res.status(500).send('not a success');
            
        }
        if(!register){

            return res.status(404).send();
        }

        res.send('succesful');
    });


    
});



module.exports= router;


