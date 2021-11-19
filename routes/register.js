let express = require('express');
let router = express.Router();

const register = require('../model/register');


router.get('/pass', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", " https://tohaf.github.io");
    res.send('register', { register: new register() });
});


router.post('/pass', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", " https://tohaf.github.io");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");

    try {

        var newRegister = await new register({
            Firstname : req.body.Firstname,
            Lastname : req.body.Lastname,
            password : req.body.password,
            email : req.body.email,
            username : req.body.username

        });

        await newRegister.save();

        res.status(200).send(newRegister);

    } catch (err) {
        console.log(err);
        res.status(500).send();

    }

});


router.get('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", " https://tohaf.github.io");
    res.send(register);
});

router.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", " https://tohaf.github.io");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    var password = req.body.password;
    var username = req.body.username;

    register.findOne({ username: username, password: password }, (err, register) => {
        if (err) {
            console.log(err);
            return res.status(500).send('not a success');

        } else if (!register) {

            return res.status(404).send('unsuccesful');
        }

        return res.status(200).send(register);

    });

});





module.exports = router;


