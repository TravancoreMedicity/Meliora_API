const fs = require('fs');
const path = require('path');
const multer = require('multer');

/**
 * Generic file upload handler
 * @param {Function} uploadMiddleware - multer upload middleware
 * @param {String} baseFolder - destination base path
 */
const handleFileUpload = (uploadMiddleware, baseFolder) => {
    return (req, res) => {
        uploadMiddleware(req, res, async (err) => {
            const body = req.body;

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    success: 0,
                    message: "Max file size 2MB allowed!",
                });
            } else if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }

            try {
                const files = req.files || [];
                const id = body.id;
                const keptFiles = req.body.keptFiles ? JSON.parse(req.body.keptFiles) : [];

                // Construct target folder dynamically
                const targetFolder = path.join(baseFolder, `${id}`);
                if (!fs.existsSync(targetFolder)) {
                    fs.mkdirSync(targetFolder, { recursive: true });
                }

                // Combine kept + new files
                const finalKeepList = [
                    ...keptFiles,
                    ...files.map(f => f.originalname)
                ];

                // Remove files not in keep list
                const existingFiles = fs.existsSync(targetFolder)
                    ? fs.readdirSync(targetFolder)
                    : [];

                existingFiles.forEach(file => {
                    if (!finalKeepList.includes(file)) {
                        console.log("Deleting:", file);
                        fs.unlinkSync(path.join(targetFolder, file));
                    }
                });

                // Move new uploads to target folder
                for (const file of files) {
                    const destinationPath = path.join(targetFolder, file.originalname);
                    if (!fs.existsSync(destinationPath)) {
                        fs.renameSync(file.path, destinationPath);
                    }
                }

                return res.status(200).json({
                    success: 1,
                    message: "Files updated successfully",
                });

            } catch (error) {
                console.error("Upload error:", error);
                return res.status(200).json({
                    success: 0,
                    message: "An error occurred during file upload.",
                });
            }
        });
    };
};


/**
 * Generic file ZIP download handler
 * @param {String} baseFolder - Base directory for file storage
 */
const handleGetIncidentFiles = (baseFolder) => {
    return (req, res) => {
        const id = req.params.id;
        const folderPath = path.join(baseFolder, id);

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error("Read error:", err);
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }

            if (!files || files.length === 0) {
                return res.status(200).json({
                    success: 1,
                    data: [], // Empty folder
                });
            }

            // Stream ZIP response
            res.setHeader('Content-Type', 'application/zip');
            res.setHeader(
                'Content-Disposition',
                `attachment; filename="${id}_files.zip"`
            );

            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.on('error', (archiveErr) => {
                console.error("Archive error:", archiveErr);
                res.status(500).json({
                    success: 0,
                    message: archiveErr.message,
                });
            });

            archive.pipe(res);

            // Filter image/pdf files
            files.forEach((filename) => {
                if (/\.(jpe?g|png|gif|pdf)$/i.test(filename)) {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                }
            });

            archive.finalize();
        });
    };
};

module.exports = { handleFileUpload, handleGetIncidentFiles };
