const mongoose = require('mongoose')

let Schema = mongoose.Schema;

const inventorySchema = new mongoose.Schema({
    itemCategory: {
        type: String,
        required: true,
        enum: ['milk', 'vegetables', 'wine', 'fruits','drinking water']
    },
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    itemPrice: {
        type: String,
        required: true
    },
    unitQuantity: {
        type: Number,
        required: true
    },
    unitType: {
        type: String,
        required: true
    },
    etaDelieveryTime:{
        type: String,
        required: true
    },
    itemsIn:{
        type: String,
        required: true
    },
    selectServiceType: {
        type: String,
        required: true,
        enum:['instantService','dailyService']
    },image:[{
        type:String
    }]
})
const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;