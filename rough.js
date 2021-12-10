display.innerHTML = `
<br>
<div> ${output} </div> 
<br>
<h3> welcome  ${username}  to our parcel delivery website </h3>

`
window.document.location = "insert.html"
console.table(output);





const oldUser = register.findOne({username});
if(oldUser){
    return res.status(409).json("user already exist. please login");
}



const {Firstname, Lastname, username, password, email} = req.body;

       
encryptedPassword = await bcrypt.hash(password, 10);

const Register = await register.create({
    Firstname,
    Lastname,
    username,
    email: email.toLowerCase(),
    password: encryptedPassword,
});

const token = jwt.sign(
    {Register_id: Register._id, username},
    process.env.TOKEN_KEY,
    {
        expireIn: "2h",
    }
);

Register.token = token;

res.status(201).json(Register);



    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var email = req.body.email;
    var username = req.body.username;

    var newRegister = new register();

    newRegister.firstname = firstname;
    newRegister.lastname = lastname;
    newRegister.password = password;
    newRegister.email = email;
    newRegister.username = username;
 

    newRegister.save((err, saveRegister) => {

        if (err) {

           return res.status(500).send('unsuccesful')

        } 

           return res.status(200).send(saveRegister);
    });



    await register.findOne({username}, function(err, doc){
        if(err){
            return res.status(400).send(err)
        }else if(doc != null){    
            if(doc.username){
                return res.status(409).json("email already exist. please login");
            }
            
        }
    } ).clone();




    await register.findOne({ username }, function (err, doc) {
        if (err) {
            return res.status(400).send(err)
        } else if (doc != null) {
            if (doc.username) {
                return res.status(409).json("email already exist. please login");
            }

        }
    }).clone();




    const parcels = [];
    
    for (const key in data) {
        const sendData = {
            id: key,
            ...data[key]
        };

        parcels.push(sendData);
    }

    console.log(data);
    setLoadtData(parcels);