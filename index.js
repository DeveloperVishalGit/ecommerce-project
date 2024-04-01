const express=require('express');
const app=express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const db = require("./models/db.connection.on");
const http = require('http');
const https = require('https');


//cors option
let corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));


app.use('/uploads',express.static(path.resolve(__dirname, 'uploads')));



app.use(express.json())
 mongoose.set('strictQuery', false);
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

.then(() => {
    console.log('Successfully connected to the MongoDB database');
})
.catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});

 require('./routes/User.route')(app);
 

app.listen(80, () => { console.log("server run on port 80") });



