const express = require("express");
const router = express.Router();
const order = require('../models/order_model');

router.post('/save',async(req,res)=>{
    try {
        console.log(req.body);
        const {userId,userName,tableNo,productName,price,quantity,orderTime,orderImage,orderStatus,paymentStatus,deliveredStatus} = req.body;
        // if(!userId||userName||!tableNo||!productName||!price||!quantity||!orderTime||!orderImage){
        //     return res.status(400).json({message: "Field is empty"});
        // }
        
        const newOrder = new order({
            userId,
            userName,
            tableNo,
            productName,
            price,
            quantity,
            orderTime,
            orderImage,
            orderStatus,
            paymentStatus,
            deliveredStatus
        });

        await newOrder.save();
        return res.status(200).json({message : "Order is conform "});

    } catch (error) {
        console.log(error);
        return res.status(400).send({message : "Server side error "});
    }
});

router.get('/getOrder',async(req,res)=>{
    try {
        const respond = await order.find({});
    return res.status(200).send(respond);
    } catch (error) {
        console.log(error);
        return res.status(400).send({message : "Server side error "});
    }
    
});

router.post('/updateOrder',async(req,res)=>{
    const orderId = req.body.orderId;
    if(!orderId){
        return res.status(400).send({message : "Fill all the boxes "});
    }
    const getOrder = await order.findOne({_id : orderId});

    if(!getOrder){
        return res.status(400).send({message: "there is no order"});
    }

    const sk = await order.updateOne({_id : orderId},
        {
            $set : {
                deliveredStatus : true,
            },
        }
    );

    console.log(sk);
    return res.status(200).send({message : "Updated sucessfully"});
});

module.exports = router;
