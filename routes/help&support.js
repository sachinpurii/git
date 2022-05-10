const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Help = require('../model/helpschema');
const uploads = require('../middleware/upload')


router.post('/nodemailer', async (req, res) => {

    const user = await Help.find({ email: req.body.email });
    !user && res.status(400).json("Wrong email, User Not Found !!")
    const email = req.body.email;
    const password = req.body.password;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password
      }
    });
  
    const mailOptions = {
      from: email,
      to: 'vikaspathran29mar@gmail.com',
      // subject: 'Password Reset Mail',
      subject: 'help and support mail',
      html: `<h2>hello user, welcome to help and support of service kart </h2>.`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send('Email sent: ' + email);
        // res.status(200).send('Email sent: ' + info.response);
      }
    });
  
  })
  
  // HELP AND SUPPORT BY USING ANOTHER METHOD
  
  router.post("/helpandsupport", uploads.single('attachmentImage'), async (req, res) => {
    // console.log('--------------->', req.body)
    try {
      const newUser = new Help({
        reason: req.body.reason,
        message: req.body.message,
        attachment: 'http://localhost:4001/uploads/' + req.file.filename,
      });
      const user = await newUser.save();
  
      res.status(200).json({ status: 200, message: "success", result: user });
    } catch (err) {
      res.status(502).json({ status: 502, message: err })
      console.log(err);
    }
  })
  
  
  
  
  
  module.exports = router;