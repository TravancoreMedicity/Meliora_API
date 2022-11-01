const { roomcreationInsert, checkInsertVal, getroomCreation, checkUpdateVal, updateRoomCreation,
    getoraRoomByType, inactiveRoomCreation, getroomTypemeliora, getroomOraclermmaster, getMeliRoomMaster } = require('../rm_roomcreation/roomcreation.service')
const { validateRoomcreation } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    roomcreationInsert: (req, res) => {
        const body = req.body;
        //validate room creation insertion function
        const body_result = validateRoomcreation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rmc_name = body_result.value.rmc_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                roomcreationInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Room Created Successfully"
                    });
                });
            } else {
                logger.infologwindow("Room Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Already Exist"
                })
            }
        })
    },
    getroomCreation: (req, res) => {
        getroomCreation((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateRoomCreation: (req, res) => {
        const body = req.body;
        const body_result = validateRoomcreation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.rmc_name = body_result.value.rmc_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateRoomCreation(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        logger.infologwindow("Record Not Found")
                        return res.status(200).json({
                            success: 1,
                            message: "Record Not Found"
                        });
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Room  Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Room  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Name Already Exist"
                })
            }
        })
    },
    getroomTypemeliora: (req, res) => {
        getroomTypemeliora((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getroomOraclermmaster: (req, res) => {
        getroomOraclermmaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getoraRoomByType: (req, res) => {
        const id = req.params.id;
        getoraRoomByType(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No room found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getMeliRoomMaster: (req, res) => {
        getMeliRoomMaster((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

}