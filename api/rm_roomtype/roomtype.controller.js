const logger = require('../../logger/logger')
const { validateRoomtype } = require('../../validation/validation_schema')
const { roomtypeInsert, checkInsertVal, checkUpdateVal, getRoomtype, updateRoomtype, inactiveRoomtype, getRoomoracle } = require('../rm_roomtype/roomtype.service')
module.exports = {
    roomtypeInsert: (req, res) => {
        const body = req.body;
        //validate room type insertion function
        const body_result = validateRoomtype.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let   body.hic_policy_name=body_result
        body.rmc_desc = body_result.value.rmc_desc;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                roomtypeInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Room Type Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Room Type Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Type Already Exist"
                })
            }
        })
    },
    getRoomtype: (req, res) => {
        getRoomtype((err, results) => {
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
    updateRoomtype: (req, res) => {
        const body = req.body;
        const body_result = validateRoomtype.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.rmc_desc = body_result.value.rmc_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateRoomtype(body, (err, results) => {
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
                        message: "Room Type Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Room Type  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Type Already Exist"
                })
            }
        })
    },
    inactiveRoomtype: (req, res) => {
        const id = req.params.id
        inactiveRoomtype(id, (err, results) => {
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
                message: "Room type Deleted Successfully"
            });
        });
    },
    getRoomoracle: (req, res) => {
        getRoomoracle((err, results) => {
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
    }
}