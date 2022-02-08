const mongoose = require ('mongoose');

const adminSchema = new mongoose.Schema({
    
    nama:{
        type: String,
        required:true

    },
    namo:{
        type: String,
        required:true
    
    },
    email:{
        type: String,
        required:true

        
    },
    password:{
        type: String,
        required:true
        
    },
    phone:{
        type: String,
        required:true
        
    },
    address:{
        type: String,
        required:true
        
    },
    confirmPassword:{
        type: String
        
    },
    token:{
        type:String
    }
   
});

adminSchema.index({email: 1}, {unique: true});


module.exports = mongoose.model('admin', adminSchema);
