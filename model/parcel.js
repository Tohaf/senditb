const mongoose = require ('mongoose');

const parcelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true

    }
    
});



module.exports = mongoose.model('parcel', parcelSchema);
