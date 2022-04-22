const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options ={
    definition: {
        openapi : '3.0.0',
        info : {
            title: 'PARCEL DELIVERY API',
            version: '1.0.0'
        },
        servers:[
            {
               url: 'http://localhost:5000/api/v1/parcels'
            }
        ],
        explorer: true,
    },
    apis: ['./routes/parcel.js'],
};

const swaggerSpec = swaggerJSDoc(options);
