const { floorInsert, checkInsertVal, getFloor, updateFloor, inactiveFloor, checkUpdateVal, getBuild } = require('../rm_floormast/floor.service')
const logger = require('../../logger/logger')
const { validateFloor } = require('../../validation/validation_schema')

module.exports = {
    floorInsert: (req, res) => {
        const body = req.body;
        //validate floor insertion function
        const body_result = validateFloor.validate(body);
        if (body_result.error) {
            // logger.logwindow(body_result.error.details[0].message)
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let   body.hic_policy_name=body_result
        body.floor_desc = body_result.value.floor_desc;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                floorInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Floor Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Floor Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Floor Already Exist"
                })
            }
        })
    },
    getFloor: (req, res) => {
        getFloor((err, results) => {
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
    updateFloor: (req, res) => {
        const body = req.body;
        const body_result = validateFloor.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.floor_desc = body_result.value.floor_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updateFloor(body, (err, results) => {
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
                        message: "Floor  Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Floor  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Floor Name Already Exist"
                })
            }
        })
    },
    inactiveFloor: (req, res) => {
        const id = req.params.id
        inactiveFloor(id, (err, results) => {
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
                message: "Floor Deleted Successfully"
            });
        });
    },
    getBuild: (req, res) => {
        getBuild((err, results) => {
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