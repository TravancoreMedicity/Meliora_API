const multer = require('multer');
const path = require('path');
const fs = require("fs")
const logger = require('../../logger/logger')

const { TaskFileUpload, SubTaskFileUpload } = require('../tm_task_file_upload/task_file_upload.service')





const taskfilestorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/MelioraDoc/TaskManagement', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'task' + uniqueSuffix + extension;
        cb(null, filename);
    },

});
const subtaskfilestorage = multer.diskStorage({

    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/MelioraDoc/SubTaskManagement', `${id}`);

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true });
        }

        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using a timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const filename = 'task' + uniqueSuffix + extension;
        cb(null, filename);
    },

});






const maxSize = 2 * 1024 * 1024

// for  multiple file upload
const uploadtask = multer({
    storage: taskfilestorage,
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

const uploadsubtask = multer({
    storage: subtaskfilestorage,
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

    uploadFileTask: (req, res) => {
        uploadtask(req, res, async (err) => {
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
                    const task_id_folder = path.join('D:/MelioraDoc/TaskManagement', `${id}`);

                    if (!fs.existsSync(task_id_folder)) {
                        fs.mkdirSync(task_id_folder, { recursive: true });
                    }

                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'task' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(task_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        tm_task_slno: body.id

                    }

                    TaskFileUpload(data, (err, results) => {
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
    getTaskFile: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/MelioraDoc/TaskManagement/${id}`;
        fs.readdir(folderPath, (err, files) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message // Return the error message
                });
            }
            return res.status(200).json({

                success: 1,

                data: files // Send the list of files
            });
        });
    },

    uploadFileSubTask: (req, res) => {
        uploadsubtask(req, res, async (err) => {
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
                    const task_id_folder = path.join('D:/MelioraDoc/SubTaskManagement', `${id}`);
                    // Create the em_id folder if it doesn't exist
                    if (!fs.existsSync(task_id_folder)) {
                        fs.mkdirSync(task_id_folder, { recursive: true });
                    }
                    for (const file of files) {
                        // Process each file individually
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const extension = path.extname(file.originalname);
                        const filename = 'task' + uniqueSuffix + extension;
                        // Move the file to the destination folder
                        const destinationPath = path.join(task_id_folder, filename);
                        fs.renameSync(file.path, destinationPath);
                    }
                    const data = {
                        tm_sub_task_slno: body.id
                    }

                    SubTaskFileUpload(data, (err, results) => {
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
    getSubTaskFile: (req, res) => {
        const id = req.params.id
        const folderPath = `D:/MelioraDoc/SubTaskManagement/${id}`;
        fs.readdir(folderPath, (err, files) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err.message // Return the error message
                });
            }
            return res.status(200).json({

                success: 1,

                data: files // Send the list of files
            });
        });
    },
}