let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const parcel = require('../model/parcel');



router.get('/getall', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

    try {
        const parcels = await parcel.find();
        res.status(200).send(parcels);

    } catch {
        res.status(404).send('unsuccesful');

    }

});


router.get('/:id/search', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

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



router.get('/', (req, res)=> {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.send('parcel', {parcel: new parcel()});
});




router.post('/',  (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    var name = req.body.name;
    var destination = req.body.destination;
    var password = req.body.password;
    var email = req.body.email;
    var location = req.body.location;
    var status = req.body.status;

    var newParcel = new parcel();

    newParcel.name = name;
    newParcel.destination = destination;
    newParcel.password = password;
    newParcel.email = email;
    newParcel.location = location;
    newParcel.status = status;


    newParcel.save((err, saveParcel) => {
        if (err) {

            res.status(500).send();
        }

        res.status(200).send(saveParcel);
    });

});





router.put('/:id/location', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels;

    try {

        const myD = req.params.id;
        const location = req.body.location;

        parcels = await parcel.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(myD.trim())},
         {new: true}).then(parcels => {
             parcels.location = location;
             parcels.save();
             res.send(parcels);
             
         });
        

    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(400).send('error null')
        } else{
            res.status(404).send('unsuccesful')
        }
    }

});


router.put('/:id/status', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels;

    try {

        const myD = req.params.id;
        const status = req.body.status;

        parcels = await parcel.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(myD.trim())},
         {new: true}).then(parcels => {
             parcels.status = status;
             parcels.save();
             res.send(parcels);
             
         });
        

    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(400).send('error null')
        } else{
            res.status(404).send('unsuccesful')
        }
    }

});





router.put('/:id/destination', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "PUT");

    let parcels

    try {

        const id = req.params.id;
        const destination = req.body.destination;

        parcels = await parcel.findByIdAndUpdate({"_id":mongoose.Types.ObjectId(id.trim())},
         {new: true}).then(parcels => {
             parcels.destination = destination;
             parcels.save();
             res.send(parcels);
             
         });
    
    } catch (err) {
        console.log(err);

        if (parcels == null) {
            res.status(404).send('error nul')
        } else{
            res.send('unsuccesful')
        }
    }

});



router.get('/:id/cancel', async(req, res)=> {

    try{ 
        const parcels = await parcel.findById(req.params.id);
        parcels.remove();
        res.status(200).send( 'deleted succefully');

    }catch{

        res.send('not get');
      
    }

   
});

router.delete('/:id/cancel', async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "DELETE");
    let parcels

    try {

        parcels = await parcel.findById(req.params.id);
    
        await parcels.remove()
        res.send('seccusfully deleted');


    } catch {
        res.send('unsuccessful');
    }
});


module.exports = router;



