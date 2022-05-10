const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/userschema');
const uploads = require('../middleware/upload')
const jwt = require('jsonwebtoken');
//..register.........

router.post("/register", uploads.array('documentImage', 3), async (req, res, next) => {
  console.log("result", req.files);
  const salt = await bcrypt.genSalt(10);
  const hashsedPassword = await bcrypt.hash(req.body.Password, salt);
  try {
    const user = new User({
      image1: 'http://localhost:4001/uploads/' + req.files[0].filename,
      image2: 'http://localhost:4001/uploads/' + req.files[1].filename,
      image3: 'http://localhost:4001/uploads/' + req.files[2].filename,
      StoreName: req.body.StoreName,
      BusinessCategory: req.body.BusinessCategory,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      RestaurantAddress: {
        address: req.body.address,
        flatno: req.body.flatno,
        landmark: req.body.landmark
      },
      RegistrationNumber: req.body.RegistrationNumber,
      GSTNumber: req.body.GSTNumber,
      Password: hashsedPassword,
      Currency: req.body.Currency,
      Minimumorderacceptamount: req.body.Minimumorderacceptamount,
      otp: req.body.otp,
      facebooklink: req.body.facebooklink,
      twitterlink: req.body.twitterlink,
      instagramlink: req.body.instagramlink,
      storetiming: {
        sunday: req.body.sunday,
        monday: req.body.monday,
        tuesday: req.body.tuesday,
        wednesday: req.body.wednesday,
        thursday: req.body.thursday,
        friday: req.body.friday,
        saturday: req.body.saturday
      }
    });
    user.save()
      .then(result => {
        res.status(200).send({ status: 200, message: "success", result: result })
      })
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
/// .....login....

router.post('/login', async (req, res) => {

  const user = await User.findOne({ Email: req.body.Email })
  const secret = process.env.secret;
  if (!user) {
    res.status(400).send({ status: 400, message: 'email is not found!!!!' });
  }
  // console.log('------>',user)
  const validate = await bcrypt.compare(req.body.Password, user.Password)
  if (!validate) {
    res.status(400).send({ status: 400, message: 'incorrect password!!!!' });
  } const token = jwt.sign(
    {
      _id: user._id,
    },
    secret,
    { expiresIn: '24hrs' }
  )
  user.token.push(token);
  await user.save();
  return res.status(200).json({
    status: 201,
    message: "Login Succesfully  ",
    data: {
      token: token
    }
  })

})


router.put('/changePassword', async (req, res) => {
  try {
    const { userId } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashsedPassword = await bcrypt.hash(req.body.Password, salt);
    const userPassword = await User.findByIdAndUpdate({ _id: userId }, { Password: hashsedPassword }, { new: true });
    return res.status(200).json({ status: true, data: userPassword });
  } catch (error) {
    return res.status(400).json({ status: false, error: "Error Occured" });
  }
})

router.get("/:id/logout", async (req, res) => {
  try {
    let checkUser = await User.findOne({ _id: req.params.id });
    console.log("asdfgh", checkUser)
    if (!checkUser) {
      console.log("Invalid User Id");
      return res.status(501).send("Invalid Token");
    }
    let result = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { token: " ", } },
      { new: true }
    );
    console.log("Logout successfully", result);
    return res.status(200).send("User Logout");
  } catch (error) {
    console.log("Error is=========>", error);
    return res.status(500).send("Interval server");

  }
});

module.exports = router;