
const multer = require('multer');
const path = require('path');
const fs = require("fs")
const { AmcCmcImageUpdate, BillMstImageUpdate, LeaseMstImageUpdate, GaurenteeWarrentefileUpdate, CondemImageUpdate}= require('../am_file_upload/am_fileupload.service');
const archiver = require('archiver');
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
        cb(null, file.originalname

        )
    },
})

const GaurenteeWarrenteefilestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        // File or directtory check 
        const filepath = path.join('D:/DocMeliora/Meliora/Asset/GuaranteeWarranty', `${id}`)
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

const condemFilestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { id, detailId } = req.body;
        if (!id || !detailId) {
            return cb(new Error("Both id (condem_mast_slno) and detailId (am_condem_detail_slno) are required."));
        }
        const filepath = path.join('D:/DocMeliora/Meliora/AssetCondemDetails', `${id}`, `${detailId}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: (req, file, cb) => {
        const filename = file.originalname;
        cb(null, filename);
    }
});

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

const GaurenteeWarrenteeFile = multer({
    storage: GaurenteeWarrenteefilestorage,
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



const uploadCondemFile = multer({
    storage: condemFilestorage,
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
                        message: "File  Updated"
                    })
                })
            }
        });

    },
    // AmcCmcImageView: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/Asset/AMCCMC/${id}`;
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

    AmcCmcImageView: (req, res) => {
    const id = req.params.id;
    const folderPath = `D:/DocMeliora/Meliora/Asset/AMCCMC/${id}`;
    const fs = require('fs');
    const path = require('path');
    const archiver = require('archiver');

    fs.readdir(folderPath, (err, files) => {
        if (err) {     
            return res.status(200).json({
                success: 0,
                message: err.message,
            });
        }

        if (!files || files.length === 0) {
            return res.status(200).json({
                success: 1,
                data: []
            });
        }

        // Create ZIP archive and send response
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', `attachment; filename="${id}.zip"`);
        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.on('error', (archiveErr) => {         
            return res.status(500).json({
                success: 0,
                message: archiveErr.message
            });
        });

        archive.pipe(res);

        // Keep original filenames (don’t rename)
        files.forEach((filename) => {
            const filePath = path.join(folderPath, filename);
            archive.file(filePath, { name: filename });
        });

        archive.finalize();
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
                        message: "File  Updated"
                    })
                })
            }
        });

    },

    // BillMasterImageView: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/Asset/BillMaster/${id}`;
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


    BillMasterImageView: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/Asset/BillMaster/${id}`;
        fs.readdir(folderPath, (err, files) => {
            if (err) {              
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {           
                return res.status(200).json({
                    success: 1,
                    data: [] 
                });
            }
            else {              
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {
             
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);         
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },


    GaurenteeWarrenteeFile: (req, res) => {
        GaurenteeWarrenteeFile(req, res, async (err) => {
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
                    am_item_wargar_slno: body.id
                }

                GaurenteeWarrentefileUpdate(data, (err, results) => {
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
                        message: "File  Updated"
                    })
                })
            }
        });

    },
    GaurenteeWarrenteeFileView: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/DocMeliora/Meliora/Asset/GuaranteeWarranty/${id}`;
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
                        message: "File  Updated"
                    })
                })
            }
        });

    },
    // LeaseMasterImageView: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/Asset/LeaseMaster/${id}`;
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

     LeaseMasterImageView: (req, res) => {
            const id = req.params.id;
            const folderPath = `D:/DocMeliora/Meliora/Asset/LeaseMaster/${id}`;
            fs.readdir(folderPath, (err, files) => {
                if (err) {                
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

    uploadCondemFile: (req, res) => {
        uploadCondemFile(req, res, async (err) => {
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
                    condem_mast_slno: body.id,
                    am_condem_detail_slno: body.detailId,
                }
       

                CondemImageUpdate(data, (err, results) => {
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
                        message: "File  Updated"
                    })
                })
            }
        });

    },

    
 getCondemFile : (req, res) => {
  const { id, detailId } = req.body;

  if (!id || !detailId) {
    return res.status(400).json({
      success: 0,
      message: 'Missing required fields: id and detailId',
    });
  }

  const folderPath = `D:/DocMeliora/Meliora/AssetCondemDetails/${id}/${detailId}`;

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      logger.logwindow(err);

      return res.status(200).json({
        success: 0,
        message: err.message,
      });
    }

    if (!files || files.length === 0) {
      return res.status(200).json({
        success: 1,
        data: [],
      });
    }

    // Stream ZIP response
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Condemnation_${id}_${detailId}.zip"`
    );
    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.on('error', (archiveErr) => {
      res.status(500).json({
        success: 0,
        message: archiveErr.message,
      });
    });

    archive.pipe(res);

    files.forEach((filename) => {
      const filePath = path.join(folderPath, filename);
      archive.file(filePath, { name: filename });
    });

    archive.finalize();
  });
},


    

}