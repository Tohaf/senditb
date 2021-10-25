if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


let express = require('express');
let app = express();
let parcelRepo = require('./repos/parcelRepo');
let cors = require('cors');
let methodOverride = require('method-override');
const registerRouter = require('./routes/register');





let router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.text({type: 'application/json'}));

app.use(cors());
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));  



router.get('/', function (req, res) {
    parcelRepo.get(function(data){
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
       res.send(data);
    });  

    
})



router.get('/:id/parcels', function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    parcelRepo.search(searchObject, function (data){
        res.status(200).json({
            "status": 200,
            "statusText": "ok",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function (err) {
        next(err);
    });
})




router.post('/', function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "POST");


    parcelRepo.insert(req.body, function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "created",
            "message": "new parcel added",
            "data": data
        });
    },    
        function(err){
            next(err);
        });
    
})

router.post('/po', function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Method", "POST");


    parcelRepo.insert(req.body, function(data){
        res.status(201).json({
            "status": 201,
            "statusText": "created",
            "message": "new parcel added",
            "data": data
        });
    },    
        function(err){
            next(err);
        });
    
})

router.delete('/:id/cancel', function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, application/json;charset=utf-8");
    parcelRepo.getById(req.params.id, function(data){
        if(data){
            parcelRepo.delete(req.params.id, function(data){
                res.status(200).json({
                    "status": 200,
                    "statusText": 'ok',
                    "message": "the parcel ' " + req.params.id + " ' is deleted",
                    "data": "parcel '" + req.params.id + "' deleted"
                });
            });
        }
        else{
            res.status(404).json({
                "status": 404,
                "statusText": "not found",
                "message": "the parcel '" + req.params.id + " ' could not be deleted",
                "error":{
                    "code": "not found",
                    "message": "the parcel '" + req.params.id + "' could not delete"
                } 
            });
        }
    },  function(err){
        next(err);
    });
})






app.use('/parcels/', router);
app.use('/register', registerRouter);
app.use('/user/', router);



app.listen(process.env.PORT  || 5000);

