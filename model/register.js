const mongoose = require ('mongoose');

const registerSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    username: {
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
    }
    
});



module.exports = mongoose.model('register', registerSchema);
