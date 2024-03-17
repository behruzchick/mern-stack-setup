const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    isLogged:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:''
    },

})

const userModel = mongoose.model('User',userSchema);

module.exports = {
    userModel
}