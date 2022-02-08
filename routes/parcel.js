let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const parcel = require('../model/parcel');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const JWT_SECRET = 'd8cd5cd30af19bcf07b59d5661a0690db51d5c95167a94d60e286d38ac05907fa';
const config = process.env.TOKEN_KEY;

router.get('/getall', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");

    try {
        const parcels = await parcel.find();
        res.status(200).send(parcels);

    } catch {
        res.status(404).send('unsuccesful');

    }

});


router.get('/:id/search', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");

    let searchOptions = {};

    if (req.query.name != null && req.query.name !== '') {

        searchOptions.name = new RegExp(req.query.name, 'i');
    }

    try {
        const parcels = await parcel.find(searchOptions);
        res.status(200).send(parcels);

    } catch {
        res.status(404).send('unsuccesful');

    }

});



router.get('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.send('parcel', { parcel: new parcel() });
});




router.post('/', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    /*
    try {
        const { name, email, destination, location, status } = req.body;

        var newParcel = new parcel();

        newParcel.destination = destination;
        newParcel.location = location;
        newParcel.status = status;
        newParcel.name = name;
        newParcel.email = email;

        newParcel.save();

        res.status(200).send(newParcel);

    } catch (err) {
        console.log(err)
    }
    */

    var destination = req.body.destination;
    var location = req.body.location;
    var status = req.body.status;
    var name = req.body.name;
    var email = req.body.email;
    var recipient = req.body.recipient;
    var phone = req.body.phone;
    /*
    var token = req.body.token;
    const user = jwt.verify(token, JWT_SECRET)
    var email = user.email;
    var name = user.name;
    */
    
    var newParcel = new parcel();
    
    newParcel.destination = destination;
    newParcel.location = location;
    newParcel.status = status;
    newParcel.email = email;
    newParcel.name = name;
    newParcel.recipient = recipient;
    newParcel.phone = phone;

    
    console.log(newParcel);

    newParcel.save((err, saveParcel) => {
        if (err) {

            res.status(500).send();
        }

        res.status(200).send(saveParcel);
        
    });

});





router.put('/:id/location', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels;

    try {

        const myD = req.params.id;
        const location = req.body.location;

        parcels = await parcel.findByIdAndUpdate({ "_id": mongoose.Types.ObjectId(myD.trim()) },
            { new: true }).then(parcels => {
                parcels.location = location;
                parcels.save();
                res.send(parcels);

            });


    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(400).send('error null')
        } else {
            res.status(404).send('unsuccesful')
        }
    }

});


router.put('/:id/status', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels;

    try {

        const myD = req.params.id;
        const status = req.body.status;

        parcels = await parcel.findByIdAndUpdate({ "_id": mongoose.Types.ObjectId(myD.trim()) },
            { new: true }).then(parcels => {
                parcels.status = status;
                parcels.save();
                res.send(parcels);

            });


    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(400).send('error null')
        } else {
            res.status(404).send('unsuccesful')
        }
    }

});





router.put('/:id/destination', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels

    try {

        const id = req.params.id;
        const destination = req.body.destination;

        parcels = await parcel.findByIdAndUpdate({ "_id": mongoose.Types.ObjectId(id.trim()) },
            { new: true }).then(parcels => {
                parcels.destination = destination;
                parcels.save();
                res.send(parcels);

            });

    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(404).send('error nul')
        } else {
            res.send('unsuccesful')
        }
    }

});





router.delete('/:id/cancel', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "DELETE");
    let parcels

    try {

        parcels = await parcel.findById(req.params.id);

        await parcels.remove()
        res.send(parcels);


    } catch {
        res.send('unsuccessful');
    }
});


router.get('/:id/cancel', async (req, res) => {

    try {
        const parcels = await parcel.findById(req.params.id);
        parcels.remove();
        res.status(200).send('deleted succefully');

    } catch {

        res.send('not get');

    }


});


module.exports = router;



