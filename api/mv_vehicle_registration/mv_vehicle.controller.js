const multer = require('multer');
const logger = require('../../logger/logger');
const { createnewRegistration, vehicleImageUpload } = require("./mv_vehicle.service");
const path = require("path");
const fs = require("fs");




const vehicleImageStroage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/MedWallet/Med_vallet_Assets/Vehicle_Registration/vehicle_image', `${id}`)

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true })
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//completelly optional
        const extension = path.extname(file.originalname);
        const filename = 'med_vehicle_image' + uniqueSuffix + extension;
        cb(null, filename);
    }
})

const PaymentImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.body.id;
        const filepath = path.join('D:/MedWallet/Med_vallet_Assets/Vehicle_Registration/payment_imag', `${id}`)

        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true })
        }
        cb(null, filepath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//completelly optional
        const extension = path.extname(file.originalname);
        const filename = 'med_payment_image' + uniqueSuffix + extension;
        cb(null, filename);
    }
})

const maxSize = 2 * 1024 * 1024;
// multer fileupload 

const vehilceimage_upload = multer({
    storage: vehicleImageStroage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Only .png , .jpg and  .jpeg are allowed'))
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 4)

const paymentImage_upload = multer({
    storage: PaymentImageStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and  .jpeg are allowed'))
        }
    },
    limits: { fileSize: maxSize }
}).array('files', 2)


module.exports = {
    createnewRegistration: (req, res) => {
        const {
            vallet_type,
            zone_slno,
            owner_name,
            mobile_number,
            vehicle_number,
            token_number,
            driver_emid,
            attachment_name,
            payment_type,
            upi_payment_transactionid,
            create_user
        } = req.body;

        const vehicle_registration_data = {
            vallet_type,
            zone_slno,
            owner_name,
            mobile_number,
            vehicle_number,
            token_number,
            driver_emid,
            attachment_name,
            payment_type,
            upi_payment_transactionid,
            create_user
        };

        createnewRegistration(vehicle_registration_data, async (err, result) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: 'Data inserted successfully',
               insertId:result.insertId
            })
           
        });
    },


    vehicleImageUpload: (req, res) => {
        vehilceimage_upload(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(300).status({
                    success: 0,
                    message: 'Max length of size 2MB is allowed'
                })
            } else if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err.message,
                })
            } else if (!req.files || req.files.length === 0) {
                return res.status(404).json({
                    success: 0,
                    message: "Files are reqired"
                });
            } else {
                try {
                    const files = req.files;
                    const id = body.id;
                    const med_veh_reg_folder = path.join('D:/MedWallet/Med_vallet_Assets/Vehicle_Registration/vehicle_image', `${id}`)

                    if (!fs.existsSync(med_veh_reg_folder)) {
                        fs.mkdirSync(med_veh_reg_folder, { recursive: true });
                    }
                    for (const file of files) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//completelly optional
                        const extension = path.extname(file.originalname);
                        const filename = 'med_veh_reg' + uniqueSuffix + extension;

                        const designationpath = path.join(med_veh_reg_folder, filename)
                        fs.renameSync(file.path, designationpath)
                    }
                    return res.status(200).json({
                        success: 1,
                        message: 'Vehilce Image uploaded Successfully'
                    })
                } catch (error) {
                    logger.errorLogger(error);
                    return res.status(500).json({
                        success: 0,
                        message: "An error occurred during file upload.",
                    })
                }
            }
        })

    },
    PatmentImageUpload: (req, res) => {
        paymentImage_upload(req, res, async (err) => {
            const body = req.body;
            if (err instanceof multer.MulterError) {
                return res.status(300).status({
                    success: 0,
                    message: 'Max length of size 2MB is allowed'
                })
            } else if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err.message,
                })
            } else {
                try {
                    const files = req.files;
                    const id = body.id;
                    const med_veh_reg_folder = path.join('D:/MedWallet/Med_vallet_Assets/Vehicle_Registration/payment_imag', `${id}`)

                    if (!fs.existsSync(med_veh_reg_folder)) {
                        fs.mkdirSync(med_veh_reg_folder, { recursive: true });
                    }
                    for (const file of files) {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);//completelly optional
                        const extension = path.extname(file.originalname);
                        const filename = 'med_veh_reg' + uniqueSuffix + extension;

                        const designationpath = path.join(med_veh_reg_folder, filename)
                        fs.renameSync(file.path, designationpath)
                    }
                    const data = {
                        registration_slno: body.id
                    }
                    vehicleImageUpload(data, (err, result) => {
                        if (err) {
                            logger.logwindow(err)
                            return res.status(200).json({
                                success: 2,
                                message: err
                            });
                        }
                        return res.status(200).json({
                            success: 1,
                            message: "File Upload succssfully Successfully!",
                        })
                    })
                } catch (error) {
                    logger.errorLogger(error);
                    return res.status(500).json({
                        success: 0,
                        message: "An error occurred during file upload.",
                    })
                }
            }
        })

    }
}


