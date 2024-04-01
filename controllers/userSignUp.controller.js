const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const userSignup = require("../models/userSignUp.model")


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}



exports.userSignUP = async (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let userEmail = req.body.userEmail ? req.body.userEmail : '';
    let password = req.body.password ? req.body.password : '';
  
    let countryCode = req.body.countryCode ? req.body.countryCode : '';

    let phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : '';
    let confirmPassword = req.body.confirmPassword ? req.body.confirmPassword : '';
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
    try {
        if (name === null || name === '') {
            return res.status(400).send({ message: "Full name is required", "status": 400 });
        } else {
            if (userEmail === null || userEmail === '') {
                return res.status(400).send({ message: "Email is required", "status": 400 });

            } else {
                if (!userEmail.match(mailformat)) {
                    return res.status(400).send({ message: "Please provide a valid email address", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        return res.status(400).send({ message: "Password is required", "status": 400 });

                    } else {
                        if (password.length < 8) {
                            return res.status(400).send({ message: 'Password must be atleast 8 characters long', "status": 400 })
                        } else {
                            if (!password.match(passformat)) {
                                return res.status(400).send({ message: 'Password should contain atleast one number, one capital latter,one small letter and one special character', "status": 400 })
                            } else {
                                if (confirmPassword === null || confirmPassword === "") {
                                    return res.status(400).send({ message: 'Confirm password is required', "status": 400 })

                                } else {
                                    if (confirmPassword !== password) {
                                        return res.status(400).send({ message: 'Confirm password and password not matched', "status": 400 })
                                       }
                                    else {
                                        if (countryCode === null || countryCode === '') {
                                            return res.status(400).send({ message: 'Country Code is required', "status": 400 })
                                        } else {
                                            if (countryCode.length > 5) {
                                                return res.status(400).send({ message: 'Country Code must be atmost 5 characters long', "status": 400 })
                                            } else {
                                                if (phoneNumber === null || phoneNumber === '') {
                                                    return res.status(400).send({ message: 'Please provide a valid Mobile number !', "status": 400 })
                                                } else {
                                                    if (phoneNumber.length < 7) {
                                                        return res.status(400).send({ message: "Mobile numbers cannot be less than 7 digits.", "status": 400 });
                                                    } else {
                                                        if (phoneNumber.length > 15) {
                                                            return res.status(400).send({ message: 'Mobile numbers cannot be more than 15 digits long.', "status": 400 });
                                                        } else {
                                                            if (isNaN(phoneNumber)) {
                                                                return res.status(400).send({ message: 'Phone number must only contains digits', "status": 400 })
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }           



                            //check if phone number already exists
        let checkPhoneNumber = await userSignup.find({ phoneNumber: phoneNumber }).lean()
        if (checkPhoneNumber.length > 0) {
            return res.status(403).send({ message: 'Phone number already exists', "status": 403 })
        }


         //check if email already exists
        let checkuserEmail = await userSignup.find({ userEmail: userEmail }).lean()
        if (checkuserEmail.length > 0) {
            return res.status(403).send({ message: 'Email already exists', "status": 403 })
        }


        //  For save the data in database
        let data = await userSignup.create({
            name: name,
            userEmail: userEmail.toLowerCase(),
             countryCode: countryCode,
            phoneNumber: phoneNumber,
            password: bcrypt.hashSync(password, 8)

        })

        

       
        return res.status(200).send({ data: data, message: "User signUp successfuly", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}


exports.UserLogin = async (req, res) => {
    let userEmail = (req.body.userEmail).toLowerCase() ? (req.body.userEmail).toLowerCase() : '';
    let password = req.body.password ? req.body.password : '';





    //validation request
    if (userEmail === null || userEmail === '') {
        return res.status(400).send({ message: 'userEmail is required', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

     //check, get and verify login data from database
     userSignup.findOne({ "userEmail": userEmail })
     .then(data => {
         if (data == null || data == '') {
             return res.status(404).send({
                 message: 'email does not exist',
                 "status": 404
             });
         }

            else {
                
                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else {
                    let token = generateToken(data._id);
                    return res.status(200).send({
                        accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200
                    });
                }
            }

             

        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}
