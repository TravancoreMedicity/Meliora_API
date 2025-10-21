
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { CrfImageStatusUpdate, CrfDataColectionImageStatusUpdate, ImageInsertHODStatusUpdate,
    ImageInsertDMSStatusUpdate, ImageInsertMSStatusUpdate, ImageInsertMOStatusUpdate, ImageInsertSMOStatusUpdate,
    ImageInsertGMStatusUpdate, ImageInsertMDStatusUpdate, ImageInsertEDStatusUpdate, ImageInsertMAangeStatusUpdate,
}
    = require('../crm_new_file_upload/crm_fileupload.service');
const logger = require('../../logger/logger');
const sanitize = require('sanitize-filename');
const archiver = require('archiver');

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

// kmch
const ImageInsertMDstorageKMCH = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/KMCMeliora/CRF/crf_registration/', `${reqslno}`, "MDUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})
const ImageInsertManagestorage = multer.diskStorage({
    destination: (req, file, cb) => {

        const reqslno = req.body.reqslno;

        const id = req.body.id;

        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/KMCMeliora/CRF/crf_registration/', `${reqslno}`, "ManageUpload")
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
})

const crfDeliverystorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/CRF/DeliveryMarking/', `${id}`)
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname

        )
    },
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


const ImageInsertMDKmch = multer({
    storage: ImageInsertMDstorageKMCH,
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

const ImageInsertManaging = multer({
    storage: ImageInsertManagestorage,
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


const crfDeliveryMarking = multer({
    storage: crfDeliverystorage,
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
    // crfRegimageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files

    //         });
    //     });

    // },
    crfRegimageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration', id);
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
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
    // crfManageImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/KMCMeliora/CRF/crf_registration/${id}/ManageUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfManageImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/KMCMeliora/CRF/crf_registration/${id}/ManageUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // getDataCollectionImage: (req, res) => {
    //     const reqslno = req.body.req_slno
    //     const datacollslno = req.body.crf_data_collect_slno
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${reqslno}/datacollection/${datacollslno}`;
    //     fs.readdir(folderPath, (err, files) => {

    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });
    // },


    getDataCollectionImage: (req, res) => {
        const reqslno = req.body.req_slno
        const datacollslno = req.body.crf_data_collect_slno
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${reqslno}/datacollection/${datacollslno}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${datacollslno}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
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

    ImageInsertMDKmch: (req, res) => {

        ImageInsertMDKmch(req, res, async (err) => {
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

    ImageInsertManaging: (req, res) => {

        ImageInsertManaging(req, res, async (err) => {
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

                ImageInsertMAangeStatusUpdate(data, (err, results) => {
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
    // crfHodImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/HodUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfHodImageGet: (req, res) => {
        const id = req.params.id;
        // const folderPath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration', id);
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/HodUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfDMSImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/DMSUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfDMSImageGet: (req, res) => {
        const id = req.params.id;
        // const folderPath = path.join('D:/DocMeliora/Meliora/CRF/crf_registration', id);
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/DMSUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfMSImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MSUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },
    crfMSImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MSUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfMOImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MOUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfMOImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MOUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfSMOImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/SMOUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfSMOImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/SMOUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfGMImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/GMUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },



    crfGMImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/GMUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfMDImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MDUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },

    crfMDImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/MDUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },


    // crfEDImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/EDUpload`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },
    crfEDImageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/EDUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },



    crfManageImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/KMCMeliora/CRF/crf_registration/${id}/ManageUpload`;
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
    crfKMCHMDImageGet: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/KMCMeliora/CRF/crf_registration/${id}/MDUpload`;
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
    crfDeliveryMarking: (req, res) => {
        crfDeliveryMarking(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    status: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                logger.logwindow(err);
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
                // File upload was successful, no DB update needed
                return res.status(200).json({
                    status: 1,
                    message: "File upload success"
                });
            }
        });

    },
    // crfDMimageGet: (req, res) => {
    //     // const id = req.params.id
    //     const baseDirectory = 'D:/DocMeliora/Meliora/CRF/DeliveryMarking/';
    //     const id = sanitize(req.params.id);
    //     const folderPath = path.resolve(baseDirectory, id);
    //     // const folderPath = `D:/DocMeliora/Meliora/CRF/DeliveryMarking/${id}`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files

    //         });
    //     });

    // },

    crfDMimageGet: (req, res) => {
        // const id = req.params.id;
        const baseDirectory = 'D:/DocMeliora/Meliora/CRF/DeliveryMarking/';
        const id = sanitize(req.params.id);
        const folderPath = path.resolve(baseDirectory, id);
        // const folderPath = `D:/DocMeliora/Meliora/CRF/crf_registration/${id}/EDUpload`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    // crfNabhImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/fileshows/HOSPITAL MANUAL`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },
    crfNabhImageGet: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/HOSPITAL MANUAL`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    // crfNabhGuidImageGet: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/fileshows/STANDARD TREATMENT GUIDLINE`;
    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });

    // },


    crfNabhGuidImageGet: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/STANDARD TREATMENT GUIDLINE`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },


    GetEmployeeGuide: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Employee Guide`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    GetSoundAlike: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Sound Alike Drugs`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    GetSradhaPolicy: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Saradha Policy`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    GetMSDS: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/MSDS`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },


    GetMEDF: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/MEDF`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    GetAbbreviation: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Abbrevation`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },

    GetFridge: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Fridge Medicines`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    GetHighRisk: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/High Risk Drugs`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    GetLookAlike: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Look Alike`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
    GetPsychotropic: (req, res) => {
        const folderPath = `D:/DocMeliora/Meliora/fileshows/Psychotropic Drugs`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
                    console.error('Archive error:', archiveErr);
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
}