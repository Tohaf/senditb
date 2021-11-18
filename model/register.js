const mongoose = require ('mongoose');

const registerSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: false
    },
    Lastname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
    
});



module.exports = mongoose.model('register', registerSchema);
