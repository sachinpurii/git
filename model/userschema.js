
const mongoose = require("mongoose");


let Schema = mongoose.Schema;


const loginSchema = new mongoose.Schema({
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    StoreName: {
        type: String,
        required: true,
    },
    BusinessCategory: {
        type: String,
        required: true,
        enum: ['Food', 'Grocery', 'Jewelery', 'stationary']

    },
    Email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        unique: true,
        required: true,
    },
    PhoneNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10,
    },
    token: [{
        type: String,
    }],
    RestaurantAddress: [
        {
            address: {
                type: String
            },
            flatno: {
                type: String
            },
            landmark: {
                type: String
            },
        }],
    RegistrationNumber: {
        type: Number,
        required: true
    },
    GSTNumber: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
        required: true
    },
    Minimumorderacceptamount: {
        type: Number,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    deliveries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery'

    }],
    inventorys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'

    }],
    storetiming: {
        sunday: {
            type: Boolean,
            // required:true
            // default: false
        },
        monday: {
            type: Boolean,
            // required:true
            // default: true
        },
        tuesday: {
            type: Boolean,
            // required:true
            // default: false
        },
        wednesday: {
            type: Boolean,
            // required:true
            // default: false
        },
        thursday: {
            type: Boolean,
            // required:true
            // default: false
        },
        friday: {
            type: Boolean,
            // required:true
            // default: false
        },
        saturday: {
            type: Boolean,
            // required:true
            // default: false
        },
    },
    facebooklink: {
        type: String,
        required: false
    },
    twitterlink: {
        type: String,
        required: false
    },
    instagramlink: {
        type: String,
        required: false
    },


}, { timestamps: true });
const User = mongoose.model("User", loginSchema);

module.exports = User




// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const signSchema = new mongoose.Schema({
//     storeName: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     businessCategory: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         unique: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//     },
//     phoneNumber: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     resturantAddress: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     registerationNumber: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     gstNumber: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     // currency: {
//     //     type: String,
//     //     required: true,
//     //     enum:[INR,USD]
//     // },
//     // otp: {
//     //     type: String,
//     //     required: true,
//     // },
// });
// signSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(this.password, salt);
//         this.password = hash
//         next()
//     } catch (error) {
//         next(error)
//     }
// })
// const User = mongoose.model('User', signSchema);
// module.exports = User;