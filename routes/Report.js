const express = require('express');
const router = express.Router();
const Report = require('../model/reportschema');
const uploads = require('../middleware/upload')

router.get("/getreports", async (req, res) => {
      try {
        const report = await Report.findOne(req.body.name);
        res.status(200).json(report);
      } catch (err) {
        res.status(404).json({ status: 404, message: err });
      }
});


router.post("/reports", uploads.array('documentImage1', 6), async (req, res) => {
    try {
      const report = new Report({
        totalOrders: [{
          image1: 'http://localhost:4001/uploads/' + req.files[0].filename,
          file1: 'http://localhost:4001/uploads/' + req.files[1].filename,
        }],
        totalTransactions: [{
          image2: 'http://localhost:4001/uploads/' + req.files[2].filename,
          file2: 'http://localhost:4001/uploads/' + req.files[3].filename,
        }],
        salesReport: [{
          image3: 'http://localhost:4001/uploads/' + req.files[4].filename,
          file3: 'http://localhost:4001/uploads/' + req.files[5].filename,
        }]
      });
      const user = await report.save();
      res.status(200).json
        ({ "status": 200, "message": "Success", "result": user });
    } catch (err) {
      res.status(404).json({ status: 404, message: err });
      console.log(err);
    }
  })
  
  module.exports = router;