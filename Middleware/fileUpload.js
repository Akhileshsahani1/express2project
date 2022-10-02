const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/images')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

var upload = multer({storage: storage}).array('file', 10)

module.exports = (req, res, next) => {
    upload(req, res, (err) => {

        if (err) {

            return res.end('Error uploading file.')
        }
        next()
    })
}
