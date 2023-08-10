const { BuildBlockInsert, BuildBlockView, BuildBlockUpdate, checkInsertVal,checkUpdateVal } = require('../rm_buildblock_master/buildblock.service')
const logger = require('../../logger/logger')
const { validateBuildBlock } = require('../../validation/validation_schema')
module.exports = {

    BuildBlockInsert: (req, res) => {
        const body = req.body;
        const body_result = validateBuildBlock.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_buildblock_name = body_result.value.rm_buildblock_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                BuildBlockInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Building Block inserted successfully"
                    });
                });
            }
            else {
                logger.infologwindow("Building Block Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Building Block Name Already Exist"
                })
            }
        })
    },
    BuildBlockView: (req, res) => {
        BuildBlockView((err, results) => {
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
    BuildBlockUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateBuildBlock.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_buildblock_name = body_result.value.rm_buildblock_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                BuildBlockUpdate(body, (err, results) => {
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
                        message: "Building Block Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Building Block Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Building Block Name Already Exist"
                })
            }
        })
    },
}