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

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('connected to Mongoose'));


const options ={
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'PARCEL DELIVERY API',
            version: '1.0.0'
        },
        servers:[
            {
               url: 'https://web-app-senditb.herokuapp.com/api/v1'
            }
        ],

    },
    apis: ['./routes/parcel.js', './routes/admin.js'],
    customCss: '.swagger-ui .topbar { display: none }'
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/api-docs/swagger-jsdoc", (req, res) => res.json(swaggerJSDoc));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.text({type: 'application/json'}));

app.use('/', express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(methodOverride('_method'));





app.get('/', (req, res)=>{
    res.send(`<h1>parcel delivery API<h1>
                <a href="/api-docs"> Documentation </a>`);
})


app.use('/api/v1', adminRouter);
app.use('/register', registerRouter);

app.use('/api/v1', parcelRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(process.env.PORT  || 5000);

