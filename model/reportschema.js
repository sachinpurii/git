const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    totalOrders: [{
        image1: {
            type: String
        }, file1: {
            type: String,
            required: true
        }
    }],
    totalTransactions: [{
        image2: {
            type: String
        }, file2: {
            type: String,
            required: true
        }
    }],
    salesReport: [{
        image3: {
            type: String
        }, file3: {
            type: String,
            required: true
        }
    }],
})


module.exports = mongoose.model("Report", reportSchema)