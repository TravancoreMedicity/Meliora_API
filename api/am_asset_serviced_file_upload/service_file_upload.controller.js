const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger')
const archiver = require('archiver');

const { AssetServiceFileUpload } = require('./service_file_upload.service')


const assetservicefilestorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/AssetService', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'service' + uniqueSuffix + extension;
        cb(null, filename);
    },

});

const maxSize = 3 * 1024 * 1024

// for  multiple file upload
const uploadAssetService = multer({
    storage: assetservicefilestorage,
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

    uploadFileAssetService: (req, res) => {
        uploadAssetService(req, res, async (err) => {
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
                    const service_id_folder = path.join('D:/DocMeliora/Meliora/AssetService', `${id}`);

                    if (!fs.existsSync(service_id_folder)) {
                        fs.mkdirSync(service_id_folder, { recursive: true });
                    }

                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'service' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(service_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        am_service_details_slno: body.id

                    }

                    AssetServiceFileUpload(data, (err, results) => {
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
                            message: "File Updated"
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


    // getAssetServiceFile: (req, res) => {
    //     const id = req.params.id
    //     const folderPath = `D:/DocMeliora/Meliora/AssetService/${id}`;
    //     fs.readdir(folderPath, (err, files) => {

    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err.message // Return the error message
    //             });
    //         }
    //         return res.status(200).json({

    //             success: 1,

    //             data: files // Send the list of files
    //         });
    //     });
    // },

getAssetServiceFile: (req, res) => {

     const id = req.params.id; 
     const folderPath = `D:/DocMeliora/Meliora/AssetService/${id}`;
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