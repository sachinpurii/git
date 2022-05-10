const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum:['milk','vegetables','fruits','car wash','drinking water']
    },

})
const Product = mongoose.model('Product', productSchema);
module.exports = Product