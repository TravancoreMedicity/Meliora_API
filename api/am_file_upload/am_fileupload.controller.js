
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { AmcCmcImageUpdate, BillMstImageUpdate, LeaseMstImageUpdate
}
    = require('../am_file_upload/am_fileupload.service');
const logger = require('../../logger/logger');

const AmcCmcImagestorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/Asset/AMCCMC', `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'crf' + uniqueSuffix + extension;
        cb(null, filename);
    },
})

const BillMastImagestorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/Asset/BillMaster', `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'crf' + uniqueSuffix + extension;
        cb(null, filename);
    },
})

const LeaseMastImagestorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/Asset/LeaseMaster', `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'crf' + uniqueSuffix + extension;
        cb(null, filename);
    },
})

const maxSize = 25 * 1024 * 1024


const AmcCmcImage = multer({
    storage: AmcCmcImagestorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);

const BillMasterImage = multer({
    storage: BillMastImagestorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);

const LeaseMasterImage = multer({
    storage: LeaseMastImagestorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);


module.exports = {

    AmcCmcImage: (req, res) => {

        AmcCmcImage(req, res, async (err) => {
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
                    amccmc_slno: body.id
                }

                AmcCmcImageUpdate(data, (err, results) => {
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
    AmcCmcImageView: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Asset/AMCCMC/${id}`;
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

    },

    BillMasterImage: (req, res) => {

        BillMasterImage(req, res, async (err) => {
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
                    am_bill_mastslno: body.id
                }

                BillMstImageUpdate(data, (err, results) => {
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
    BillMasterImageView: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Asset/BillMaster/${id}`;
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

    },

    LeaseMasterImage: (req, res) => {

        LeaseMasterImage(req, res, async (err) => {
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
                    am_lease_mastslno: body.id
                }

                LeaseMstImageUpdate(data, (err, results) => {
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
    LeaseMasterImageView: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Asset/LeaseMaster/${id}`;
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

    },
}