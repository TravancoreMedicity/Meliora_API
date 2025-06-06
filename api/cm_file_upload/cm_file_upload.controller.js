const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger')

const { ComplaintFileUpload } = require('./cm_file_upload.service')

const complaintfilestorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/ComplaintManagement', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname
        )
    },

});





const maxSize = 3 * 1024 * 1024

// for  multiple file upload
const uploadComplaint = multer({
    storage: complaintfilestorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf" // Add PDF mimetype
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);


module.exports = {

    uploadFilecomplaint: (req, res) => {
        uploadComplaint(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
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
                try {
                    const files = req.files;
                    const id = body.id;
                    const complaint_id_folder = path.join('D:/DocMeliora/Meliora/ComplaintManagement', `${id}`);
                    if (!fs.existsSync(complaint_id_folder)) {
                        fs.mkdirSync(complaint_id_folder, { recursive: true });
                    }
                    for (const file of files) {
                        const filename = file.filename;
                        const destinationPath = path.join(complaint_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        complaint_slno: body.id
                    }

                    ComplaintFileUpload(data, (err, results) => {
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
                } catch (error) {
                    logger.errorLogger(error);
                    return res.status(200).json({
                        success: 0,
                        message: "An error occurred during file upload.",
                    });
                }
            }
        });
    },
    getComplaintFile: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/ComplaintManagement/${id}`;
        fs.readdir(folderPath, (err, files) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message // Return the error message
                });
            }
            return res.status(200).json({

                success: 1,

                data: files // Send the list of files
            });
        });
    },

}