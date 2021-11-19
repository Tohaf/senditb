if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


let express = require('express');
let app = express();
let cors = require('cors');
let methodOverride = require('method-override');
const registerRouter = require('./routes/register');
const parcelRouter = require('./routes/parcel');
const adminRouter = require ('./routes/admin');





let router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.text({type: 'application/json'}));

app.use(cors());
app.use(methodOverride('_method'));


const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));  

router.get('/', (req, res)=>{
    res.send('wellcome');
})




app.use('/parcels/', router);
app.use('/register', registerRouter);
app.use('/user/', router);
app.use('/parcel', parcelRouter);
app.use('/admin', adminRouter);


app.listen(process.env.PORT  || 5000);

