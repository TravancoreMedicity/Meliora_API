const { FloorInsert, FloorView, FloorUpdate, checkInsertVal,checkUpdateVal } = require('../rm_floor_master/floor_mast.services')
const logger = require('../../logger/logger')
const { validateFloorMast } = require('../../validation/validation_schema')
module.exports = {
    FloorInsert: (req, res) => {
        const body = req.body;
        const body_result = validateFloorMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_floor_name = body_result.value.rm_floor_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                FloorInsert(body, (err, result) => {
                 
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Floor  inserted successfully"
                    });
                });
            } else {
                logger.infologwindow("Floor Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Floor Name Already Exist"
                })
            }
        })
    },
    FloorView: (req, res) => {
        FloorView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    FloorUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateFloorMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_floor_name = body_result.value.rm_floor_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                FloorUpdate(body, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        logger.infologwindow("Record Not Found")
                        return res.status(400).json({
                            success: 1,
                            message: "Record Not Found"
                        })
                    }
                    return res.status(200).json({
                        success: 2,
                        message: "Floor Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Floor Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Floor Name Already Exist"
                })
            }
        })
    },
}