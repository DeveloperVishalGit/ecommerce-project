module.exports = (app) => {

    const userSign = require('../controllers/userSignUp.controller');

   

    const authJwt = require("../middleware/authjwt")

    const product = require('../controllers/product.controller')

    

    // ---------------user api start from here--------------------------------

    // api route for user signup

    app.post('/api/userSignUP' ,userSign.userSignUP);

        // api route for user login

    app.post('/api/UserLogin' ,userSign.UserLogin);

    
     //  api route for add product  and [authJwt.verifyToken], is used for token validtion for security purpose
    app.post('/api/addProduct',[authJwt.verifyToken], product.addProduct)

    //  api route for get product  and [authJwt.verifyToken], is used for token validtion for security purpose

    app.get('/api/getProduct/:allActive',[authJwt.verifyToken], product.getProduct)

    //  api route for update product  and [authJwt.verifyToken], is used for token validtion for security purpose

    app.put('/api/updateProduct/:productId',[authJwt.verifyToken], product.updateProduct)

    //  api route for update product  and [authJwt.verifyToken], is used for token validtion for security purpose

    app.delete('/api/deleteProduct/:productId',[authJwt.verifyToken],product.deleteProduct)


   

}