const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


mongoose.connect(url).then(()=>{
    console.log("connected to the database ");
    
    app.get('/',(req,res)=>{
        res.status(200).send('It home page');
    })

    app.use('/auth',require('./routers/user_route'));
    app.use('/order',require('./routers/order_router'));

}).catch((error)=>console.log(error));

PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Listining on port " + PORT);
});
