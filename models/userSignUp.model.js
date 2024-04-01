const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema ({
    name:{
        type: String,

    },
    userEmail:{
        type:String,
        required: true,
        unique: true
    },

   
    countryCode:{
        type:String,

    },
    phoneNumber:{
        type:String,

    },
    password:{
        type:String
    },
    
    userEmail_verification:{
      type:Boolean,
      default:false
    }
},{timestamps : true}
)

module.exports = mongoose.model("User Register" , userSchema)