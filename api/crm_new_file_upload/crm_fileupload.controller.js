
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { CrfImageStatusUpdate, CrfDataColectionImageStatusUpdate, ImageInsertHODStatusUpdate,
    ImageInsertDMSStatusUpdate, ImageInsertMSStatusUpdate, ImageInsertMOStatusUpdate, ImageInsertSMOStatusUpdate,
    ImageInsertGMStatusUpdate, ImageInsertMDStatusUpdate, ImageInsertEDStatusUpdate
}
    = require('../crm_new_file_upload/crm_fileupload.service');
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
        cb(null, file.originalname

        )
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'crf' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
})

// const em_id_folder = path.join('D:/DocMeliora/Inteliqo/', "PersonalRecords", `${em_id}`, "checklist", `${checklistid}`);

const crfDataCollectionstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "datacollection", `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'crfDataCollect' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertHODstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "HodUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'HodUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
})

const ImageInsertDMSstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "DMSUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'DMSUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
})

const ImageInsertMSstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "MSUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'MSUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertMOstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "MOUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'MOUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertSMOstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "SMOUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'SMOUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertGMstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "GMUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'GMUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertMDstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "MDUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'MDUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const ImageInsertEDstorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration/', `${reqslno}`, "EDUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
    // filename: function (req, file, cb) {
    //     // Generate a unique filename using a timestamp
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const extension = path.extname(file.originalname);
    //     const filename = 'EDUpload' + uniqueSuffix + extension;
    //     cb(null, filename);
    // },
})
const maxSize = 25 * 1024 * 1024


const crfRegistration = multer({
    storage: crfRegisterstorage,
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



const crfDataCollection = multer({
    storage: crfDataCollectionstorage,
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


const ImageInsertHOD = multer({
    storage: ImageInsertHODstorage,
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


const ImageInsertDMS = multer({
    storage: ImageInsertDMSstorage,
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


const ImageInsertMS = multer({
    storage: ImageInsertMSstorage,
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


const ImageInsertMO = multer({
    storage: ImageInsertMOstorage,
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


const ImageInsertSMO = multer({
    storage: ImageInsertSMOstorage,
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


const ImageInsertGM = multer({
    storage: ImageInsertGMstorage,
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


const ImageInsertMD = multer({
    storage: ImageInsertMDstorage,
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


const ImageInsertED = multer({
    storage: ImageInsertEDstorage,
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

    },


    crfDataCollection: (req, res) => {

        crfDataCollection(req, res, async (err) => {
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
                    crf_data_collect_slno: body.id
                }

                CrfDataColectionImageStatusUpdate(data, (err, results) => {
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

    getDataCollectionImage: (req, res) => {

        const reqslno = req.body.req_slno
        const datacollslno = req.body.crf_data_collect_slno

        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${reqslno}/datacollection/${datacollslno}`;
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

    ImageInsertHOD: (req, res) => {

        ImageInsertHOD(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertHODStatusUpdate(data, (err, results) => {
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

    ImageInsertDMS: (req, res) => {

        ImageInsertDMS(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertDMSStatusUpdate(data, (err, results) => {
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


    ImageInsertMS: (req, res) => {

        ImageInsertMS(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertMSStatusUpdate(data, (err, results) => {
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


    ImageInsertMO: (req, res) => {

        ImageInsertMO(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertMOStatusUpdate(data, (err, results) => {
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


    ImageInsertSMO: (req, res) => {

        ImageInsertSMO(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertSMOStatusUpdate(data, (err, results) => {
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


    ImageInsertGM: (req, res) => {

        ImageInsertGM(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertGMStatusUpdate(data, (err, results) => {
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


    ImageInsertMD: (req, res) => {

        ImageInsertMD(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertMDStatusUpdate(data, (err, results) => {
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


    ImageInsertED: (req, res) => {

        ImageInsertED(req, res, async (err) => {
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
                    req_slno: body.reqslno
                }

                ImageInsertEDStatusUpdate(data, (err, results) => {
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

    // for getting HOD Upload file the file
    crfHodImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/HodUpload`;
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

    crfDMSImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/DMSUpload`;
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

    crfMSImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MSUpload`;
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

    crfMOImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MOUpload`;
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

    crfSMOImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/SMOUpload`;
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

    crfGMImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/GMUpload`;
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

    crfMDImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MDUpload`;
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

    crfEDImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/EDUpload`;
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