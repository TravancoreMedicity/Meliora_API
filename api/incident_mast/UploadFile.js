const multer = require('multer');
const path = require('path');
const fs = require("fs");
const archiver = require('archiver');
const { handleFileUpload, handleGetIncidentFiles } = require('./utils');

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

    uploadFileIncidentService: handleFileUpload(
        uploadFileIncidentService,
        'D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles'
    ),

    uploadFileIncidentActionFiles: handleFileUpload(
        uploadFileIncidentService,
        'D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles'
    ),

    uploadFileIncidentDataCollectionFiles: handleFileUpload(
        uploadFileIncidentService,
        'D:/DocMeliora/Meliora/IncidentManagement/IncidentDataCollectionFiles'
    ),


    // getDataCollectionFiles: handleGetIncidentFiles(
    //     'D:/DocMeliora/Meliora/IncidentManagement/IncidentDataCollectionFiles'
    // ),


    getIncidentFiles: (req, res) => {
        const id = req.params.id;
        // const folderPath = path.join('D:/DocMeliora/Meliora/IncidentManagement', id);
        const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/IncidentFiles/${id}`;
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

    getIncidenActiontFiles: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/IncidentActionFiles/${id}`;
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

    getDataCollectionFiles: (req, res) => {
        const id = req.params.id;
        const folderPath = `D:/DocMeliora/Meliora/IncidentManagement/IncidentDataCollectionFiles/${id}`;
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







};
