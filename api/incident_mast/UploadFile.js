const multer = require('multer');
const path = require('path');
const fs = require("fs");
const archiver = require('archiver');
const { handleFileUpload } = require('./utils');

// ---------- Multer Storage ----------
const incidentservicefileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/DocMeliora/Meliora/IncidentManagement', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }
        cb(null, filepath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const maxSize = 3 * 1024 * 1024; // 3MB

// Multer uploader for multiple files
const uploadFileIncidentService = multer({
    storage: incidentservicefileStorage,
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
            return cb(new Error('Only .png, .jpg, .jpeg, and .pdf format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 10);

// ---------- Controllers ----------
module.exports = {
    // uploadFileIncidentService: (req, res) => {
    //     uploadFileIncidentService(req, res, async (err) => {
    //         const body = req.body;

    //         if (err instanceof multer.MulterError) {
    //             return res.status(200).json({
    //                 status: 0,
    //                 message: "Max file size 2MB allowed!",
    //             });
    //         } else if (err) {
    //             return res.status(200).json({
    //                 status: 0,
    //                 message: err.message,
    //             });
    //         } else {
    //             // D:\DocMeliora\Meliora\IncidentManagement\IncidentActionFiles
    //             try {
    //                 const files = req.files || [];
    //                 const id = body.id;
    //                 const service_id_folder = path.join('D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles', `${id}`);
    //                 const keptFiles = req.body.keptFiles ? JSON.parse(req.body.keptFiles) : [];

    //                 if (!fs.existsSync(service_id_folder)) {
    //                     fs.mkdirSync(service_id_folder, { recursive: true });
    //                 }

    //                 // Merge kept files + newly uploaded file names
    //                 const finalKeepList = [
    //                     ...keptFiles,
    //                     ...files.map(f => f.originalname)
    //                 ];

    //                 // 1. Delete files that are not in keep list
    //                 const existingFiles = fs.existsSync(service_id_folder) ? fs.readdirSync(service_id_folder) : [];
    //                 existingFiles.forEach(file => {
    //                     if (!finalKeepList.includes(file)) {
    //                         console.log("Deleting:", file);
    //                         fs.unlinkSync(path.join(service_id_folder, file));
    //                     }
    //                 });

    //                 // 2. Ensure uploaded files are placed in the folder
    //                 for (const file of files) {
    //                     const destinationPath = path.join(service_id_folder, file.originalname);
    //                     if (!fs.existsSync(destinationPath)) {
    //                         fs.renameSync(file.path, destinationPath);
    //                     }
    //                 }

    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Files updated successfully"
    //                 });

    //             } catch (error) {
    //                 console.log(error, "error");
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "An error occurred during file upload.",
    //                 });
    //             }
    //         }
    //     });
    // },
    // uploadFileIncidentActionFiles: (req, res) => {
    //     uploadFileIncidentActionFiles(req, res, async (err) => {
    //         const body = req.body;

    //         if (err instanceof multer.MulterError) {
    //             return res.status(200).json({
    //                 status: 0,
    //                 message: "Max file size 2MB allowed!",
    //             });
    //         } else if (err) {
    //             return res.status(200).json({
    //                 status: 0,
    //                 message: err.message,
    //             });
    //         } else {
    //             try {
    //                 const files = req.files || [];
    //                 const id = body.id;
    //                 const service_id_folder = path.join('D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles', `${id}`);
    //                 const keptFiles = req.body.keptFiles ? JSON.parse(req.body.keptFiles) : [];

    //                 if (!fs.existsSync(service_id_folder)) {
    //                     fs.mkdirSync(service_id_folder, { recursive: true });
    //                 }

    //                 // Merge kept files + newly uploaded file names
    //                 const finalKeepList = [
    //                     ...keptFiles,
    //                     ...files.map(f => f.originalname)
    //                 ];

    //                 // 1. Delete files that are not in keep list
    //                 const existingFiles = fs.existsSync(service_id_folder) ? fs.readdirSync(service_id_folder) : [];
    //                 existingFiles.forEach(file => {
    //                     if (!finalKeepList.includes(file)) {
    //                         console.log("Deleting:", file);
    //                         fs.unlinkSync(path.join(service_id_folder, file));
    //                     }
    //                 });

    //                 // 2. Ensure uploaded files are placed in the folder
    //                 for (const file of files) {
    //                     const destinationPath = path.join(service_id_folder, file.originalname);
    //                     if (!fs.existsSync(destinationPath)) {
    //                         fs.renameSync(file.path, destinationPath);
    //                     }
    //                 }

    //                 return res.status(200).json({
    //                     success: 1,
    //                     message: "Files updated successfully"
    //                 });

    //             } catch (error) {
    //                 console.log(error, "error");
    //                 return res.status(200).json({
    //                     success: 0,
    //                     message: "An error occurred during file upload.",
    //                 });
    //             }
    //         }
    //     });
    // },


    uploadFileIncidentService: handleFileUpload(
        uploadFileIncidentService,
        'D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles'
    ),

    uploadFileIncidentActionFiles: handleFileUpload(
        uploadFileIncidentService,
        'D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles'
    ),


    // getIncidentFiles: handleGetIncidentFiles(
    //     'D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles'
    // ),

    // getIncidentActionFiles: handleFileUpload.handleGetIncidentFiles(
    //     'D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles'
    // )
    // getIncidentFiles: (req, res) => {
    //     const id = req.params.id;
    //     const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/${id}`;

    //     fs.readdir(folderPath, (err, files) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err.message
    //             });
    //         }

    //         if (!files || files.length === 0) {
    //             return res.status(200).json({
    //                 success: 2,
    //                 message: "No files found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: files
    //         });
    //     });
    // },

    //grt file 


    getIncidentFiles: (req, res) => {
        const id = req.params.id;
        // const folderPath = path.join('D:/DocMeliora/Meliora/IncidentManagement', id);
        const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles/${id}`;
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

    getIncidenActiontFiles: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles/${id}`;
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






};
