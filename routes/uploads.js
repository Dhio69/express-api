var express = require('express');
var router = express.Router();

const multer  = require('multer')
const path = require('path');

require('dotenv').config()

const {
    BASE_URL
} = process.env



const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })

router.post('/', upload.single('file') ,async (req, res) => {
    return res.status(200).json({
        code : 200,
        path : BASE_URL + `upload/retrive/${req.file.filename}`
    })
})

router.use('/retrive', express.static('uploads/'))

module.exports = router;