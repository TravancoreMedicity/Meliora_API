const fs = require('fs');
const path = require('path');
const multer = require('multer');

/**
 * Generic file upload handler
 * @param {Function} uploadMiddleware - multer upload middleware
 * @param {String} baseFolder - destination base path
 */
// const handleDietFileUpload = (uploadMiddleware, baseFolder) => {
//     return (req, res) => {
//         uploadMiddleware(req, res, async (err) => {
//             if (err instanceof multer.MulterError) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: "Max file size 2MB allowed!",
//                 });
//             }

//             if (err) {
//                 return res.status(200).json({
//                     success: 0,
//                     message: err.message,
//                 });
//             }

//             try {

//                 const files = req.files || [];
//                 const { id } = req.body;

//                 if (!id) {
//                     return res.status(200).json({
//                         success: 0,
//                         message: "Invalid item id"
//                     });
//                 }

//                 const keptFiles = req.body.keptFiles
//                     ? JSON.parse(req.body.keptFiles)
//                     : [];

//                 // Create item folder
//                 const targetFolder = path.join(baseFolder, `${id}`);

//                 if (!fs.existsSync(targetFolder)) {
//                     fs.mkdirSync(targetFolder, { recursive: true });
//                 }

//                 // 1 Move uploaded files first
//                 const uploadedNames = [];

//                 for (const file of files) {

//                     if (!fs.existsSync(file.path)) {
//                         console.warn("Temp file missing:", file.path);
//                         continue;
//                     }

//                     const cleanName = file.originalname;
//                     const destinationPath = path.join(targetFolder, cleanName);

//                     fs.renameSync(file.path, destinationPath);

//                     uploadedNames.push(cleanName);
//                 }

//                 // 2Final keep list
//                 const finalKeepList = [
//                     ...keptFiles,
//                     ...uploadedNames
//                 ];

//                 // 3 Delete files not in keep list
//                 const existingFiles = fs.existsSync(targetFolder)
//                     ? fs.readdirSync(targetFolder)
//                     : [];

//                 for (const file of existingFiles) {

//                     if (!finalKeepList.includes(file)) {
//                         const filePath = path.join(targetFolder, file);
//                         if (fs.existsSync(filePath)) {
//                             console.log("Deleting:", file);
//                             fs.unlinkSync(filePath);
//                         }
//                     }
//                 }
//                 return res.status(200).json({
//                     success: 1,
//                     message: "Files updated successfully"
//                 });

//             } catch (error) {
//                 console.error("Upload error:", error);
//                 return res.status(200).json({
//                     success: 0,
//                     message: "An error occurred during file upload."
//                 });
//             }
//         });
//     };
// };


const handleDietFileUpload = (uploadMiddleware, baseFolder) => {
    return (req, res) => {
        uploadMiddleware(req, res, async (err) => {

            if (err instanceof multer.MulterError) {
                return res.status(200).json({
                    success: 0,
                    message: "Max file size 2MB allowed!",
                });
            }

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }

            try {

                const files = req.files || [];
                const { id } = req.body;

                if (!id) {
                    return res.status(200).json({
                        success: 0,
                        message: "Invalid item id"
                    });
                }

                // files user wants to keep
                const keptFiles = req.body.keptFiles
                    ? JSON.parse(req.body.keptFiles)
                    : [];

                // OPTIONAL: only delete when explicitly allowed
                const allowReplace = req.body.replace === "true";

                const targetFolder = path.join(baseFolder, `${id}`);

                if (!fs.existsSync(targetFolder)) {
                    fs.mkdirSync(targetFolder, { recursive: true });
                }

                /* ----------------------------
                   1. MOVE NEW UPLOADED FILES
                -----------------------------*/
                const uploadedNames = [];

                for (const file of files) {

                    if (!fs.existsSync(file.path)) {
                        console.warn("Temp file missing:", file.path);
                        continue;
                    }

                    // prevent duplicate overwrite
                    const uniqueName = `${Date.now()}-${file.originalname}`;
                    const destinationPath = path.join(targetFolder, uniqueName);

                    fs.renameSync(file.path, destinationPath);

                    uploadedNames.push(uniqueName);
                }

                /* ----------------------------
                   2. FINAL KEEP LIST
                -----------------------------*/
                const finalKeepList = [
                    ...keptFiles,
                    ...uploadedNames
                ];

                /* ----------------------------
                   3. DELETE ONLY IF ALLOWED
                -----------------------------*/
                if (allowReplace) {

                    const existingFiles = fs.existsSync(targetFolder)
                        ? fs.readdirSync(targetFolder)
                        : [];

                    for (const file of existingFiles) {

                        if (!finalKeepList.includes(file)) {

                            const filePath = path.join(targetFolder, file);

                            if (fs.existsSync(filePath)) {
                                console.log("Deleting:", file);
                                fs.unlinkSync(filePath);
                            }
                        }
                    }
                }

                return res.status(200).json({
                    success: 1,
                    message: "Files uploaded successfully",
                    data: {
                        uploaded: uploadedNames
                    }
                });

            } catch (error) {
                console.error("Upload error:", error);
                return res.status(200).json({
                    success: 0,
                    message: "An error occurred during file upload."
                });
            }
        });
    };
};


/**
 * Generic file ZIP download handler
 * @param {String} baseFolder - Base directory for file storage
 */
const handleDIetImageFiles = (baseFolder) => {
    return (req, res) => {
        const id = req.params.id;
        const folderPath = path.join(baseFolder, id);

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
                    data: [], // No files found
                });
            }

            // Stream ZIP
            res.setHeader("Content-Type", "application/zip");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${id}_files.zip"`
            );

            const archive = archiver("zip", { zlib: { level: 9 } });

            archive.on("error", (archiveErr) => {
                console.error("Archive error:", archiveErr);
                return res.status(500).json({
                    success: 0,
                    message: archiveErr.message,
                });
            });

            archive.pipe(res);

            // Filter accepted file types
            const allowedExtensions = /\.(jpe?g|png|gif|pdf)$/i;

            files.forEach((filename) => {
                if (allowedExtensions.test(filename)) {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                }
            });

            archive.finalize();
        });
    };
};


module.exports = { handleDietFileUpload, handleDIetImageFiles };
