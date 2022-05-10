const express = require('express');
const router = express.Router();
const User = require('../model/userschema');

router.get('/my_Account', (req, res) => {
    User.find((err, docs) => {
      if (!err) {
        res.status(200).json({ status: 200, message: "Success", data: docs });
      } else {
        res.status(404).json({ status: 404, message: err });
      }
    });
  })
  
  // update my account details 
  
  router.put("/:id/update_accountdetails", async (req, res) => {
    try {
      const updatedDetails = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ "status": 200, "message": "Success", "result": updatedDetails });
    } catch (err) {
      res.status(404).json({ status: 404, message: err });
    }
  });
  
  
  
  
  
  
  module.exports = router;