if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Route = require('./routes/auth');
const Delivery = require('./routes/Delivery');
const helpsupport = require('./routes/help&support');
const Inventorys = require('./routes/Inventorys');
const Reports = require('./routes/Report');
const account = require('./routes/account');
const dotenv = require("dotenv");

//KZMtQyBefqDWBjFaAVYW

app.use(express.json());
app.use('/auth', Route);
app.use('/delivery',Delivery);
app.use('/helpsupport', helpsupport);
app.use('/inventorys', Inventorys);
app.use('/reports', Reports);
app.use('/account', account);

app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
// app.use('/', smsverify);


mongoose.connect('mongodb://localhost:27017/store', {
    useNewUrlParser: true,
    useUniFiedTopology: true,
})

    .then(() => {
        console.log("Connected Sucessfully.......");
    })
    .catch((err) => {
        console.log("error");
        console.log(err);
    })
app.listen(4001);