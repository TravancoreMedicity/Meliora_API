const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger')
const { BillImageUpdateMonthly, BillImageUpdateQuaterly, BillImageUpdateYearly, OtherBillImageUpdate,
    TeleMonthlyBills } = require('../it_managemnt_file_upload/it_file_upload.service')

// for monthly bill multiple file upload
const monthlystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/Bills/MonthlyBill', `${id}`);
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'bill' + uniqueSuffix + extension;
        cb(null, filename);
    },
});
const quaterlystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/Bills/QuarterlyBill', `${id}`);
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'bill' + uniqueSuffix + extension;
        cb(null, filename);
    },
});
// for yearly bill multiple file upload
const yearlystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/Bills/YearlyBill', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'bill' + uniqueSuffix + extension;
        cb(null, filename);
    },
});
// for other bill multiple file upload
const otherbillstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/Bills/OtherBill', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'bill' + uniqueSuffix + extension;
        cb(null, filename);
    },
});
const maxSize = 2 * 1024 * 1024
// for monthly bill multiple file upload
const uploadmonthly = multer({
    storage: monthlystorage,
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

const uploadquaterly = multer({
    storage: quaterlystorage,
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

const uploadYearly = multer({
    storage: yearlystorage,
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

// for monthly bill multiple file upload
const uploadotherbill = multer({
    storage: otherbillstorage,
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
    uploadFileMonthly: (req, res) => {
        uploadmonthly(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
                return res.status(200).json({
                    status: 0,
                    message: err.message,
                });
            } else if (!req.files || req.files.length === null) {
                return res.status(200).json({
                    status: 0,
                    message: "Files are required!",
                });
            } else {
                try {
                    const files = req.files;
                    const id = body.id;
                    const em_id_folder = path.join('D:/DocMeliora/Meliora/Bills/MonthlyBill', `${id}`);
                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(em_id_folder)) {
                        fs.mkdirSync(em_id_folder, { recursive: true });
                    }
                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'bill' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(em_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        index_no: body.id
                    }

                    BillImageUpdateMonthly(data, (err, results) => {
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
    getMonthlyBillImages: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Bills/MonthlyBill/${id}`;
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
    getQuaterlyBillImages: (req, res) => {

        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Bills/QuarterlyBill/${id}`;
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
    getYearlyBillImages: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Bills/YearlyBill/${id}`;
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
    getOtherBillImages: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Bills/OtherBill/${id}`;
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

    uploadFileQuaterly: (req, res) => {
        uploadquaterly(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
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
                    const em_id_folder = path.join('D:/DocMeliora/Meliora/Bills/QuarterlyBill', `${id}`);
                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(em_id_folder)) {
                        fs.mkdirSync(em_id_folder, { recursive: true });
                    }

                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'bill' + uniqueSuffix + extension;

                        // Move the file to the destination folder
                        const destinationPath = path.join(em_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        index_no: body.id
                    }

                    BillImageUpdateQuaterly(data, (err, results) => {
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

    uploadFileYearly: (req, res) => {
        uploadYearly(req, res, async (err) => {
            const body = req.body;

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
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
                    const em_id_folder = path.join('D:/DocMeliora/Meliora/Bills/YearlyBill', `${id}`);

                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(em_id_folder)) {
                        fs.mkdirSync(em_id_folder, { recursive: true });
                    }

                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'bill' + uniqueSuffix + extension;

                        // Move the file to the destination folder
                        const destinationPath = path.join(em_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        index_no: body.id
                    }

                    BillImageUpdateYearly(data, (err, results) => {
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
    uploadOtherFile: (req, res) => {
        uploadotherbill(req, res, async (err) => {
            const body = req.body;

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.errorLogger(err);
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
                    const em_id_folder = path.join('D:/DocMeliora/Meliora/Bills/OtherBill', `${id}`);

                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(em_id_folder)) {
                        fs.mkdirSync(em_id_folder, { recursive: true });
                    }
                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'bill' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(em_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        index_no: body.id
                    }

                    OtherBillImageUpdate(data, (err, results) => {

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
                            message: "Bill Updated with file attach successfully"
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


    TeleMonthlyBills: (req, res) => {
        TeleMonthlyBills((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
}