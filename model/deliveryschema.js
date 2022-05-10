const mongoose = require('mongoose')

let Schema = mongoose.Schema;
const deliveySchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     // ref:'_id'
    // },
    basedeliveyCharge: {
        type: String,
        required: true
    },
    deliveyChargePerkm: {
        type: String,
        required: true
    },

})
const Delivey = mongoose.model('Delivery', deliveySchema);
module.exports = Delivey