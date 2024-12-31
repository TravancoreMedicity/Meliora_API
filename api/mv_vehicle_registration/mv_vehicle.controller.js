const multer = require('multer');
const logger = require('../../logger/logger');
const {
    vehicleImageUpload,
    getallvehicledetail,
    createPractiseRegistration,
    searchVehicle,
    getTodayVehicles,
    getvehicleBetweenData,
    updatevehicleDetail,
    getAllVehicleReport,
    checkTokenexist
} = require("./mv_vehicle.service");
const path = require("path");
const fs = require("fs");
const { upload } = require('./uploadFiles');



module.exports = {


    getallvehicledetail: (req, res) => {
        getallvehicledetail((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'Error in  Fetching result!'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 2,
                    message: "No result Found Here"
                })
            }
            //this will trigger if  resutls exists
            //the promise will send response once all condition or all single vehicle fethces their corresponding images
            Promise.all(results.map(data => {
                const folderPath = `D:/DocMeliora/Meliora/MedVallet/ImageofVehicle/${data.file_path}`;
                return new Promise((resolve) => {
                    fs.readdir(folderPath, (err, files) => {
                        if (err) {
                            // console.log(err, "message");
                            resolve({
                                ...data,
                                images: [],
                                error: err.message
                            });
                        } else {
                            const vehicleImages = files.filter(file => file.startsWith('vehicle_'));
                            resolve({
                                ...data,
                                images: vehicleImages || []
                            });
                        }
                    });
                });
            })
            ).then(resultswithImage => {
                res.status(200).json({
                    success: 1,
                    data: resultswithImage
                    //the above data have all information along with the data;
                });
            }).catch(err => {
                logger.logwindow(err);
                res.status(500).json({
                    success: 2,
                    message: 'Error while processing data!',
                    error: err.message
                });
            });

        })
    },

    createPractiseRegistration: (req, res) => {
        upload(req, res, (err) => {
            const obj = JSON.parse(req.body.postData);
            const objdata = {
                ...obj,
                filePath: req.filePath
            }
            const isPayFileExist = req.isPaymentFile;
            if (err) {
                console.error("Upload Error:", err);
                return res.status(400).json({ success: 0, message: err });
            }


            if (!objdata || objdata === null || objdata === undefined || !req.filePath) {
                console.error("Upload Erroror:", err);
                return res.status(200).json({ success: 0, message: "Error in inseting data" });
            }
            checkTokenexist(objdata, (err, results) => { 
                if (err) {
                    return res.status(200).json({ success: 0, message: err });
                }
                if (results.length > 0) {
                    return res.status(200).json({
                        success: 3,
                        message: "Token Exist Select Another"
                    })
                }

                if (results.length === 0) {
                    createPractiseRegistration(objdata, (err, result) => {
                        if (err) {
                            return res.status(200).json({ success: 0, message: err });
                        }
                        let data = {
                            registration_slno: result.insertId
                        }
                        if (isPayFileExist && data) {
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
                        } else {
                            return res.status(200).json({
                                success: 1,
                                message: "Inserted Successfully"
                            })
                        }
                    });
                }
            })

        });
    },
    searchVehicle: (req, res) => {
        const data = req.body;
        if (data === undefined && data === '' && data === null) {
            return res.status(200).json({
                message: 'Search Token is empty',
                success: 2
            })
        };

        searchVehicle(data, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: 'Error in  Fetching result!'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 2,
                    message: "No result Found Here"
                })
            }
            Promise.all(results.map(data => {
                const folderPath = `D:/DocMeliora/Meliora/MedVallet/ImageofVehicle/${data.file_path}`;
                return new Promise((resolve) => {
                    fs.readdir(folderPath, (err, files) => {
                        if (err) {
                            console.log(err, "message");

                            resolve({
                                ...data,
                                images: [],
                                error: err.message
                            });
                        } else {
                            const vehicleImages = files.filter(file => file.startsWith('vehicle_'));
                            resolve({
                                ...data,
                                images: vehicleImages || []
                            });
                        }
                    });
                });
            })
            ).then(resultswithImage => {
                res.status(200).json({
                    success: 1,
                    data: resultswithImage
                    //the above data have all information along with the data;
                });
            }).catch(err => {
                logger.logwindow(err);
                res.status(500).json({
                    success: 2,
                    message: 'Error while processing data!',
                    error: err.message
                });
            });
        })
    },
    getTodayVehicles: (req, res) => {
        const data = req.body;
        if (data === undefined && data === '' && data === null) {
            return res.status(200).json({
                message: 'Search Token is empty',
                success: 2
            })
        };
        getTodayVehicles(data, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: 'Error in  Fetching result!'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 2,
                    message: "No result Found Here"
                })
            }
            return res.status(200).json({
                data: results,
                success: 1
            })
        })
    },
    getvehicleBetweenData: (req, res) => {
        const data = req.body;

        if (data === undefined && data === '' && data === null) {

            return res.status(200).json({
                message: 'Search Token is empty',
                success: 2
            })
        };
        getvehicleBetweenData(data, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'Error in  Fetching result!'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 2,
                    message: "No result Found Here"
                })
            }
            return res.status(200).json({
                data: results,
                success: 1
            })
        })
    },
    updatevehicleDetail: (req, res) => {
        const data = req.body;
        updatevehicleDetail(data, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'Error in  Fetching result!'
                })
            }
            return res.status(200).json({
                message: "updated successfully",
                success: 1
            })
        })
    },
    UploadImageSeparate: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.error("Upload Error:", err);
                return res.status(400).json({ success: 0, message: err });
            }
            return res.status(200).json({
                success: 1,
                message: "File Upload succssfully Successfully!",
            })
        })

    },
    getAllVehicleReport: (req, res) => {
        getAllVehicleReport((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 2,
                    message: 'Error in  Fetching result!'
                })
            }
            if (!results) {
                return res.status(404).json({
                    success: 2,
                    message: "No result Found Here"
                })
            }
            return res.status(200).json({
                data: results,
                success: 1
            })
        })
    }

};

