const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const product = require("../models/product.model")

// this api for add product on ecommerce site
exports.addProduct = async(req,res)=>{
  
    let title = req.body.title ? req.body.title :"";
    let product_price = req.body.product_price ? req.body.product_price :"";
    let product_description = req.body.product_description ? req.body.product_description :"";

     try {
        if(!title){
            return res.status(400).send({message:"Product title is requiured",status:400})
        }
        if(!product_price){
            return res.status(400).send({message:"Product price is requiured",status:400})

        }
        if(!product_description){
            return res.status(400).send({message:"Product description is requiured",status:400})

        }

//  Save data in database
        let data = await product.create({
           
            title:title,
            product_price:product_price,
            product_description:product_description,
            
        })

        return res.status(200).send({data:data,message:"Product added successfully",status:200})
     } catch (error) {
        return res.status(500).send({message:error.message,status:500})
     }



}

// this api for get product on ecommerce site
exports.getProduct = async(req,res)=>{
    try {
          
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getUserCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':   // get all product list
            getUserCondition = {}; 
              break;
              
          case 'id':    // get specific product list
            getUserCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getUserCondition = { message:"Please provide valid type"};
              break;
      }

    //    this is get data based on switch case contditions
        let data = await product.find(getUserCondition)

        if(data.length ===0){
            return res.status(404).send({message:"No data found", status:404})
        }
        else{
            return res.status(200).send({data:data,message:"Success", status:200})

        }
        
    } catch (error) {
        return res.status(500).send({message:message.error,status:500})
    }
}

// this api for update product on ecommerce site
exports.updateProduct = async(req,res)=>{
    let productId = req.params.productId;
    let title = req.body.title ? req.body.title :"";
    let product_price = req.body.product_price ? req.body.product_price :"";
    let product_description = req.body.product_description ? req.body.product_description :"";
     let status = req.body.status ;

    try {

        if(!title){
            return res.status(400).send({message:"Product title is requiured",status:400})
        }
        if(!product_price){
            return res.status(400).send({message:"Product price is requiured",status:400})

        }
        if(!product_description){
            return res.status(400).send({message:"Product description is requiured",status:400})

        }

        
        if( status !== true && status !== false){
            return res.status(400).send({message:"Status field can only contain true or false value",status:400})

        }
 

       
     

//  this is for get product data which need to update and set method for update theproduct data
        let data = await product.findOneAndUpdate({_id:productId},{
            $set:{
                title:title,
                product_price:product_price,
                product_description:product_description,
               
                status:status
            }
        },{new:true})
        return res.status(200).send({data:data,message:"Product updated successfully",status:200})
    } catch (error) {
       return res.status(500).send({message:error.message,status:500})
    }

}

// this api for update product on ecommerce site
exports.deleteProduct = async(req,res)=>{
    let productId = req.params.productId;
    try {

        // this is for delete product from database
        let data = await product.findOneAndDelete({_id:productId})

        return res.status(200).send({message:"product delete successFully",status:200})
     } catch (error) {
        return res.status(500).send({message:error.message,status:500})

     }
}