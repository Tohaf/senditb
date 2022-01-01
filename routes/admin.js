let express = require('express');
let router = express.Router();
const Admin = require('../model/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const JWT_SECRET = 'd8cd5cd30af19bcf07b59d5661a0690db51d5c95167a94d60e286d38ac05907fa';
const config = process.env.TOKEN_KEY;
app.use(express.json());



router.post('/pass',  async function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, Application/json;charset=utf-8");
    
        const { nama, namo, email, password, confirmPassword } = req.body;
        if(password != confirmPassword){
            return res.status(404).json(' and confirm password are not the same');
        }
    
        try {
            await Admin.findOne({email}, function(err, doc){
                if(err){
                    return res.status(400).send(err)
                }
                else if(doc != null){    
                    if(doc.email){
                        return res.json({status: 'error', error: "email already exist. please login"});
                    }
                    
                }
            } ).clone();

    
            encryptedPassword = await bcrypt.hash(password, 10);
    
            const response = await Admin.create({
                nama,
                namo,
                email: email.toLowerCase(),
                password: encryptedPassword
            });
            return res.status(201).json(response);
           
    
        } catch (err) {
            console.log(err);
            return res.json({status: 'error', error: 'problem tring to register'} );
    
        }

});


router.get('/log', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.send(admin);
});

/*
router.post('/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");

    var password = req.body.password;
    var email = req.body.email;

    Admin.findOne({ email }, (err, admin) => {
        if (err) {
            console.log(err);
            return res.status(500).send('not a success');

        }
         else if (!admin) {

            return res.json({status:'error', error:'invalid email/password'});
        } else {

            return res.status(200).send(admin);

        }


    });

});


*/


router.post('/login', async(req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");

    var password = req.body.password;
    var email = req.body.email;

    const user = await Admin.findOne({ email: email }).lean();

        if (!user) {
            return res.json({status:'error', error:'Invalid email/pasword'});
        } 

        if( await bcrypt.compare(password, user.password)){
            const token =  jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name:user.nama
                },
                JWT_SECRET
            )
            
            return res.json(token);
        }

         return res.json({status:'error', error:'invalidemail/password'});
 
      
});


/*

router.post('/add', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");

    try {
        var password = req.body.password;
        var email = req.body.email;

        var newAdmin = new admin({
            email: email,
            password: password
        });


        if (email == "w@gmail.com" && password === "toye") {
            newAdmin.save();
            return res.status(200).send(newAdmin);
        } else {
            return res.status(404).send('failure');
        }

    } catch (err) {
        console.log(err);

    }


});


router.get('/pass', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.send('admin', { admin: new admin() });
});


*/

module.exports = router;