
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { CrfImageStatusUpdate } = require('../crf_fileupload/crf_fileupload.service');
const logger = require('../../logger/logger');
const crfRegisterstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration', `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
    },
})

const maxSize = 2 * 1024 * 1024


const crfRegistration = multer({
    storage: crfRegisterstorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);

module.exports = {

    crfRegistration: (req, res) => {

        crfRegistration(req, res, async (err) => {
            const body = req.body;

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                });
            } else if (!req.files || req.files.length === 0) {
                return res.status(200).json({
                    status: 0,
                    message: "Files are required!",
                });
            } else {
                const data = {
                    req_slno: body.id
                }
                // Insert the em_id into the database using the reusable function


                CrfImageStatusUpdate(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No record found"

                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "File Also Updated"
                    })
                })
            }
        });

    },


    // for getting the file
    crfRegimageGet: (req, res) => {
        const id = req.params.id

        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                data: files
            });
        });

    }


}