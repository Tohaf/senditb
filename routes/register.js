if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const auth = require("../middleware/auth");

let express = require('express');
const register = require('../model/register');
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


router.get('/pass', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.send('register', { register: new register() });
});


router.post('/pass', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");

    try {
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.password;
        var email = req.body.email;
        var username = req.body.username;

        const doc = await register.findOne({ username });
        if (doc != null) {
            if (doc.username) {
                return res.status(409).json("email already exist. please login");
            }
           
        }

        encryptedPassword = await bcrypt.hash('password', 5);

        const Register = await register.create({
            firstname,
            lastname,
            username,
            email,
            password: encryptedPassword,
        });

        res.status(201).json(Register);

        
    } catch (err) {
        console.log(err);
    }


});


router.get('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.send(register);
});

router.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    var password = req.body.password;
    var username = req.body.username;

    register.findOne({ username: username, password: password }, (err, register) => {
        if (err) {
            console.log(err);
            return res.status(500).send('not a success');

        } else if (!register) {

            return res.status(404).send('unsuccesful');
        } else {
            return res.status(200).send(register);

        }



    });

});





module.exports = router;


