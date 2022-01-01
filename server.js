if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');
const registerRouter = require('./routes/register');
const parcelRouter = require('./routes/parcel');
const adminRouter = require ('./routes/admin');
const path = require('path');
const router = express.Router();

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));




app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.text({type: 'application/json'}));

app.use('/', express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(methodOverride('_method'));



router.get('/', (req, res)=>{
    res.send('wellcome');
})



app.use('/admin', adminRouter);
app.use('/parcels/', router);
app.use('/register', registerRouter);
app.use('/user/', router);
app.use('/parcel', parcelRouter);


app.listen(process.env.PORT  || 5000);

