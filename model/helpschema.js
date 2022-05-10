const mongoose = require("mongoose")

const helpSchema = new mongoose.Schema({
reason:{

    type:String,
    enum: ['order cancel automatically', 'paymentissue', 'serverissue'],
    required:true
},

message:{

    type:String,
    required:true,
},
attachment:{

    type:String,
    // required:true
}
})


module.exports = mongoose.model("Help", helpSchema)