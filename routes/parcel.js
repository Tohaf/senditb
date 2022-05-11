let express = require('express');
const app = express();
app.use(express.json());
let router = express.Router();
const mongoose = require('mongoose');
const parcel = require('../model/parcel');

const jwt = require('jsonwebtoken');
const auth = require('./auth');
require("dotenv").config();
const config = process.env.TOKEN_KEY;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


/**
 * @swagger
 * components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *         parcelOrder:
 *             type: object
 *             properties:
 *                 destination:
 *                     type: string
 *                 location:
 *                     type: string
 *                 status:
 *                     type: string
 *                 email:
 *                     type: string
 *                 name:
 *                     type: string
 *                 recipient:
 *                     type: string
 *                 phone:
 *                     type: string
 *         locate:
 *             type: object
 *             properties:
 *                 location:
 *                     type: string
 *         status:
 *             type: object
 *             properties:
 *                 status:
 *                     type: string
 *         destination:
 *             type: object
 *             properties:
 *                 destination:
 *                     type: string
 */



/**
 * @swagger
 * /parcels:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Parcels]  
 *      summary: To get all parcel delivery order
 *      description: This is use to fetch data
 *      explorer: true
 *      responses:
 *          UnauthorizedError:
 *            description: access token not available 
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/parcelOrder'       
 */


router.get('/parcels', auth, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");

    try {
        const parcels = await parcel.find();
        res.status(200).send(parcels);

    } catch {
        res.status(404).send('unsuccesful');

    }

});


/**
 * @swagger
 * /parcels/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Parcels]  
 *      summary: To get a specific parcel delivery order
 *      description: This is use to fetch data
 *      explorer: true
 *      responses:
 *          UnauthorizedError:
 *            description: access token not available 
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/parcelOrder'       
 */

router.get('/parcels/:id', auth, async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "https://tohaf.github.io");

    try {
        const parcels = await parcel.find({ "_id": mongoose.Types.ObjectId(req.params.id.trim()) });
        res.status(200).send(parcels);

    } catch {
        res.status(404).send('unsuccesful');

    }

});


/**
 * @swagger
 * /users/{id}/parcels:
 *  get:
 *      tags: [users]  
 *      summary: To get specific parcel delivery order
 *      description: This is use to fetch specific data
 *      explorer: true
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numerical ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: This is use to fetch specific data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/parcelOrder'       
 */

router.get('/users/:id/parcels',auth, async (req, res) => {
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


/**
 * @swagger
 * /parcels:
 *  post:
 *      tags: [Parcels]  
 *      summary: To post parcel delivery order
 *      description: This is use to post data
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/parcelOrder'
 *                      
 *      responses:
 *          200:
 *              description: This is use to add data
 */


router.post('/parcels', auth, (req, res) => {
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


/**
 * @swagger
 * /parcels/{id}/presentLocation:
 *  put:
 *      tags: [Parcels]  
 *      summary: To update parcel delivery order
 *      description: This is use to update data
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numerical ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/locate'
 *      responses:
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/locate'       
 */


router.put('/parcels/:id/presentLocation', auth, async (req, res) => {
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


/**
 * @swagger
 * /parcels/{id}/status:
 *  put:
 *      tags: [Parcels] 
 *      summary: To update parcel delivery order
 *      description: This is use to update data status
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numerical ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/status'
 *      responses:
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/status'       
 */


router.put('/parcels/:id/status', auth, async (req, res) => {
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



/**
 * @swagger
 * /parcels/{id}/destination:
 *  put:
 *      tags: [Parcels] 
 *      summary: To update parcel delivery order
 *      description: This is use to update data destination
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numerical ID required
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/destination'
 *      responses:
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/destination'       
 */



router.put('/parcels/:id/destination', auth, async (req, res) => {
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


/**
 * @swagger
 * /parcels/{id}/cancel:
 *  delete:
 *      tags: [Parcels]   
 *      summary: To delete specific parcel delivery order
 *      description: This is use to delete data
 *      explorer: true
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numerical ID required
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: This is use to fetch data
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/parcelOrder'       
 */


router.delete('/parcels/:id/cancel', auth, async (req, res) => {
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

/*
router.get('/:id/cancel', async (req, res) => {

    try {
        const parcels = await parcel.findById(req.params.id);
        parcels.remove();
        res.status(200).send('deleted succefully');

    } catch {

        res.send('not get');

    }


});
*/

module.exports = router;



