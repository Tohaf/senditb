const mongoose = require ('mongoose');

const parcelSchema = new mongoose.Schema({

    destination: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status:{
        type: String
    },
    name:{
        type: String
    },
    email:{
        type: String
    },
    recipient:{
        type: String
    },
    phone:{
        type: String
    },
    token: {
        type: String
    }

});



module.exports = mongoose.model('parcel', parcelSchema);
