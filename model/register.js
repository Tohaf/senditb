const mongoose = require ('mongoose');

const registerSchema = new mongoose.Schema({
    firstname: {
        type: String
        
    },
    lastname: {
        type: String,
        require:true
        
    },
    email: {
        type: String,
        unique: true
        
    },
    username: {
        type: String,
        require: true
        
    },
    password: {
        type: String,
        required: true
    }
    
});



module.exports = mongoose.model('register', registerSchema);
