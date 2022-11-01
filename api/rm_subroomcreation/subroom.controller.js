const { validateSubroomcreation } = require('../../validation/validation_schema')
const logger = require('../../logger/logger');
const { subroomcreationInsert, checkInsertVal, getsubroomCreation, checkUpdateVal, updatesubRoomCreation, getroomMasteremeliora } = require('../rm_subroomcreation/subroom.service')
module.exports = {
    subroomcreationInsert: (req, res) => {
        const body = req.body;
        //validate room creation insertion function
        const body_result = validateSubroomcreation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.subrm_desc = body_result.value.subrm_desc;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                subroomcreationInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Subroom Created Successfully"
                    });
                });
            } else {
                logger.infologwindow("Subroom Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Subroom Already Exist"
                })
            }
        })
    },
    getsubroomCreation: (req, res) => {
        getsubroomCreation((err, results) => {
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
    updatesubRoomCreation: (req, res) => {
        const body = req.body;
        const body_result = validateSubroomcreation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.subrm_desc = body_result.value.subrm_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                updatesubRoomCreation(body, (err, results) => {
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
                        message: "Subroom  Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Room  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Subroom Already Exist"
                })
            }
        })
    },
    getroomMasteremeliora: (req, res) => {
        getroomMasteremeliora((err, results) => {
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