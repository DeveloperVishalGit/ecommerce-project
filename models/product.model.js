const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;



const productSchema = mongoose.Schema({

   
    
        title:{
            type:String,
            required: true,

        },
        product_price:{
            type:Number,
            required: true,
        },
        product_description:{
            type:String,
            required:true
        },
     
        status:{
            type:Boolean,
            default:true   // true means product is available now
        }
 
    
},{timestamps : true}
)

module.exports = mongoose.model("product", productSchema)
