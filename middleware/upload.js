const path = require('path')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, file.originalname + ext)
    }
})
var uploads = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (
            file.mimetype == "/image/png/jpg"
        ) {
            callback(null, true)
        }
        else {
            // console.log('only jpb and png file supported')
            callback(null, true)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 10
    }
})


module.exports = uploads
