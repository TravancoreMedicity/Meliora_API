
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/Model', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/Model', `${id}`), {}, (err) => {
                if (err) {
                    return cb(new Error('Error Occured while Mkdir'));
                }
                cb(null, `${filepath}`);
            })
        }
    },
    filename: function (req, file, cb) {
        cb(null, 'profilePic' + path.extname(file.originalname))
    },
})

const storageSubModel = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/SubModel', `${id}`)
        if (fs.existsSync(filepath)) {
            console.log("sdfgh");
            cb(null, `${filepath}`);
        } else {
            console.log("tryhg");
            fs.mkdir(path.join('D:/MelioraDoc/SubModel', `${id}`), {}, (err) => {
                if (err) {
                    return cb(new Error('Error Occured while Mkdir'));
                }
                cb(null, `${filepath}`);
            })
        }
    },
    filename: function (req, file, cb) {
        cb(null, 'profilePic' + path.extname(file.originalname))
    },
})

const maxSize = 2 * 1024 * 1024

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            // console.log('Only .png, .jpg and .jpeg format allowed!')
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).single('file');

//SubModel Files
const uploadSubModel = multer({
    storage: storageSubModel,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            // console.log('Only .png, .jpg and .jpeg format allowed!')
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).single('file');


module.exports = {
    uploadFileModel: (req, res) => {
        upload(req, res, (err) => {
            const body = req.body;
            // FILE SIZE ERROR
            if (err instanceof multer.MulterError) {
                // return res.end("Max file size 2MB allowed!");
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                })
            }
            // INVALID FILE TYPE, message will return from fileFilter callback
            else if (err) {
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                })
            }
            // FILE NOT SELECTED
            else if (!req.file) {
                return res.status(200).json({
                    status: 0,
                    message: "File is required!",
                })
            }
            // SUCCESS
            else {
                return res.status(200).json({
                    success: 1,
                    message: "File Uploaded SuccessFully"
                });
            }
        })
    },
    //SubModel
    uploadFilesubModel: (req, res) => {
        uploadSubModel(req, res, (err) => {
            const body = req.body;
            // FILE SIZE ERROR
            if (err instanceof multer.MulterError) {
                // return res.end("Max file size 2MB allowed!");
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                })
            }
            // INVALID FILE TYPE, message will return from fileFilter callback
            else if (err) {
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                })
            }
            // FILE NOT SELECTED
            else if (!req.file) {
                return res.status(200).json({
                    status: 0,
                    message: "File is required!",
                })
            }
            // SUCCESS
            else {
                return res.status(200).json({
                    success: 1,
                    message: "File Uploaded SuccessFully"
                });
            }
        })
    }

}