const multer = require('multer');
const path = require('path');
const fs = require("fs")

const { ItemMastUpdate, InsertFileDetails } = require('../fileupload/fileupload.services')

const itemDetailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/ItemDetails', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/ItemDetails', `${id}`), {}, (err) => {
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


const itemStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/Item', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/Item', `${id}`), {}, (err) => {
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
            cb(null, `${filepath}`);
        } else {
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


const storageCategory = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/AssetName/Category', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/DocMeliora/Meliora/AssetName/Category', `${id}`), {}, (err) => {
                if (err) {
                    return cb(new Error('Error Occured while Mkdir'));
                }
                cb(null, `${filepath}`);
            })
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname
        )
    },
})


const storageSubcategory = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/SubCategory', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/SubCategory', `${id}`), {}, (err) => {
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


const storageGroup = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/Group', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/Group', `${id}`), {}, (err) => {
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


const storageSubGroup = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/MelioraDoc/SubGroup', `${id}`)
        if (fs.existsSync(filepath)) {
            cb(null, `${filepath}`);
        } else {
            fs.mkdir(path.join('D:/MelioraDoc/SubGroup', `${id}`), {}, (err) => {
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

const uploadItemDetail = multer({
    storage: itemDetailStorage,
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
}).single('file');

//Model Files
const uploadItem = multer({
    storage: itemStorage,
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
}).single('file');

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

            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).single('file');


//category Files
const uploadCategory = multer({
    storage: storageCategory,
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
}).single('file');


//subcategory Files
const uploadSubCategory = multer({
    storage: storageSubcategory,
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
}).single('file');

//group files
const uploadGroup = multer({
    storage: storageGroup,
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
}).single('file');

//Subgroup files
const uploadSubGroup = multer({
    storage: storageSubGroup,
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
}).single('file');


module.exports = {
    uploadFileItemDetail: (req, res) => {
        uploadItemDetail(req, res, (err) => {
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
    uploadFileItem: (req, res) => {
        uploadItem(req, res, (err) => {
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
                const id = req.body.id;
                const data = {
                    item_creation_slno: id
                }
                ItemMastUpdate(data, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    if (results === 0) {
                        return res.status(200).json({
                            success: 1,
                            message: "No record found"

                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "File Uploaded SuccessFully"
                    });
                })
            }
        })
    },
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
    },


    uploadFileCategory: (req, res) => {
        uploadCategory(req, res, (err) => {
            const body = req.body;

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
            } else {
                const patchdata = {
                    mime_type: req.file.mimetype,
                    file_name: req.file.filename,
                    category_slno: body.id

                }
                InsertFileDetails(patchdata, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "File Uploaded SuccessFully"
                    })

                })
            }
        })
    },



    //subcategory
    uploadFileSubCategory: (req, res) => {
        uploadSubCategory(req, res, (err) => {
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
    uploadFileGroup: (req, res) => {
        uploadGroup(req, res, (err) => {
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
    //subgroup
    uploadFileSubGroup: (req, res) => {
        uploadSubGroup(req, res, (err) => {
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




    getCategoryFile: (req, res) => {
        const id = req.params.id;
        const folderPath = path.join('D:/DocMeliora/Meliora/AssetName/Category', id);
        // Check if the folder exists before reading
        fs.access(folderPath, fs.constants.F_OK, (err) => {
            if (err) {
                // If the folder does not exist, return an empty array as a dummy response          
                return res.status(200).json({
                    success: 1,
                    data: [] // Return an empty array if the folder doesn't exist
                });
            }

            // If the folder exists, read its contents
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: `Error reading the directory: ${err.message}`
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: files // Send the list of files
                });
            });
        });
    }
}