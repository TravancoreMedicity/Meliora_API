const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { handleDietFileUpload } = require('./Utils');

// ---------- Base Paths ----------
const basePath = "D:/DocMeliora/Meliora/DietFiles";
const itemMasterPath = path.join(basePath, "ItemMaster");

// ---------- Ensure Main Folder Exists ----------
if (!fs.existsSync(itemMasterPath)) {
    fs.mkdirSync(itemMasterPath, { recursive: true });
}

// ---------- Multer Storage ----------
const itemMasterStorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const id = req.body.id;
        if (!id) {
            return cb(new Error("Item ID is required"));
        }
        const itemFolder = path.join(itemMasterPath, id.toString());

        if (!fs.existsSync(itemFolder)) {
            fs.mkdirSync(itemFolder, { recursive: true });
        }
        cb(null, itemFolder);
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "_" + file.originalname;
        cb(null, uniqueName);
    }
});

// ---------- Upload Limits ----------
const maxSize = 3 * 1024 * 1024; // 3MB

// ---------- Multer Upload ----------
const uploadItemMasterFiles = multer({
    storage: itemMasterStorage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/png",
            "image/jpg",
            "image/jpeg",
            "application/pdf"
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PNG, JPG, JPEG, PDF files allowed"));
        }

    },
    limits: { fileSize: maxSize }
}).array('files', 10);

// ---------- Controllers ----------
module.exports = {

    // Upload files
    uploadItemMasterFiles: handleDietFileUpload(
        uploadItemMasterFiles,
        itemMasterPath
    ),

    getItemMasterFilesZip: (req, res) => {

        const id = req.params.id;
        const folderPath = path.join(itemMasterPath, id.toString());

        // 1) Folder not exists
        if (!fs.existsSync(folderPath)) {
            return res.status(200).json({
                success: 1,
                data: []
            });
        }

        // 2) Read files
        fs.readdir(folderPath, (err, files) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message
                });
            }

            if (!files || files.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: []
                });
            }

            // 3) Set headers for ZIP
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename="${id}_files.zip"`
            );

            // 4) Create archive
            const archive = archiver('zip', { zlib: { level: 9 } });

            archive.on('error', (archiveErr) => {
                console.error("Archive error:", archiveErr);
                if (!res.headersSent) {
                    res.status(500).end();
                }
            });

            archive.pipe(res);

            // 5) Add files
            files.forEach((filename) => {
                const filePath = path.join(folderPath, filename);
                archive.file(filePath, { name: filename });
            });

            // 6) Finalize
            archive.finalize();
        });
    }
};