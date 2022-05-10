const express = require('express');
const router = express.Router(); 
const Delivery = require('../model/deliveryschema');
const User = require('../model/userschema'); 
const { findById } = require('../model/userschema');  
    
    router.get('/User/:id/deliveries', async (req, res) => {

    try {
      const user = await User.findById(req.params.id);
      res.send({ delivery: user.deliveries });
    }
    catch (e) {
      res.send(e);
    }
  })
  
  
  router.post("/delivery_charges/deliveries/:id", async (req, res) => {
    try {
      const newDelivery = new Delivery({
        basedeliveyCharge: req.body.basedeliveyCharge,
        deliveyChargePerkm: req.body.deliveyChargePerkm,
      });
  
      const delivery = await newDelivery.save();
      const user = await User.findById(req.params.id)
      user.deliveries.push(delivery)
      await user.save()
      // console.log('product', user)
      res.status(200).json
        ({ "status": 200, "message": "Success", "result": user });
    } catch (err) {
      res.status(404).json({ status: 404, message: err });
      console.log(err);
    }
  })
  
  router.get('/delivery_charges/deliveries/:id', async (req, res) => {
    // const user=await User.findById(req.params.id)
    Delivery.find((err, docs) => {
      if (!err) {
        res.status(200).json({ status: 200, message: "Success", data: docs });
      } else {
        res.status(404).json({ status: 404, message: err });
      }
    });
  })
  
  router.put("/delivery_charges/deliveries/:id", async (req, res) => {
    try {
      const updatedAddress = await Delivery.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.send(updatedAddress);
    } catch (err) {
      res.send(err);
    }
  
  });


  module.exports = router;  