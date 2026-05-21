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
    },
    deleteItemMasterFile: (req, res) => {
        try {
            const { id, filename } = req.body;
            if (!id || !filename) {
                return res.status(200).json({
                    success: 0,
                    message: "id and filename required"
                });
            }

            const filePath = path.join(
                itemMasterPath,
                id.toString(),
                filename
            );
            /* FILE NOT EXIST */

            if (!fs.existsSync(filePath)) {
                return res.status(200).json({
                    success: 0,
                    message: "File not found"
                });
            }
            /* DELETE FILE */
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err.message
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "File deleted successfully"
                });
            });

        } catch (error) {

            return res.status(200).json({
                success: 0,
                message: error.message
            });
        }
    },

    getAllItemMasterFilesZip: (req, res) => {

        const basePath = itemMasterPath;

        // 1) Check base folder exists
        if (!fs.existsSync(basePath)) {
            return res.status(200).json({
                success: 1,
                data: []
            });
        }

        // 2) Read all item folders
        fs.readdir(basePath, (err, folders) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message
                });
            }

            if (!folders || folders.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: []
                });
            }

            // 3) Set ZIP response headers
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename="all_item_files.zip"`
            );

            const archive = archiver('zip', {
                zlib: { level: 9 }
            });

            archive.on('error', (archiveErr) => {
                console.error("Archive error:", archiveErr);
                if (!res.headersSent) {
                    res.status(500).end();
                }
            });

            archive.pipe(res);

            // 4) Loop through all folders
            folders.forEach((folder) => {

                const folderPath = path.join(basePath, folder);

                // only process directories
                if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {

                    const files = fs.readdirSync(folderPath);

                    files.forEach((file) => {

                        const filePath = path.join(folderPath, file);

                        if (fs.existsSync(filePath)) {

                            // IMPORTANT:
                            // keep folder structure inside zip
                            archive.file(filePath, {
                                name: `${folder}/${file}`
                            });
                        }
                    });
                }
            });

            // 5) finalize ZIP
            archive.finalize();
        });
    }
};