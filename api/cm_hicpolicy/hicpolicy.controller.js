const { hicPolicyInsert, hicPolicyUpdate, checkInsertVal, checkUpdateVal, getHicpolicy, getHicpolicyById,
    getHicpolicyStatus, hicPolicyDelete } = require('../cm_hicpolicy/hicpolicy.service');
const { validateHicPolicy } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')
module.exports = {
    hicPolicyInsert: (req, res) => {
        const body = req.body;
        // //validate hicpolicy insertion function
        // const body_result = validateHicPolicy.validate(body);
        // if (body_result.error) {
        //     // logger.logwindow(body_result.error.details[0].message)
        //     logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        // //let   body.hic_policy_name=body_result
        // body.hic_policy_name = body_result.value.hic_policy_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                hicPolicyInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Hicpolicy Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Hicpolicyname Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Hicpolicyname Already Exist"
                })
            }
        })
    },
    getHicpolicyById: (req, res) => {
        const body = req.body
        getHicpolicyById(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                logger.infologwindow("No Record Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    hicPolicyUpdate: (req, res) => {

        const body = req.body;
        const body_result = validateHicPolicy.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.hic_policy_name = body_result.value.hic_policy_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {

                hicPolicyUpdate(body, (err, results) => {

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
                        message: "Hicpolicy Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Hicpolicy Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Hicpolicy Name Already Exist"
                })
            }
        })
    },

    getHicpolicy: (req, res) => {
        getHicpolicy((err, results) => {
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

    getHicpolicyStatus: (req, res) => {
        getHicpolicyStatus((err, results) => {
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















    hicPolicyDelete: (req, res) => {
        const body = req.body;
        hicPolicyDelete(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Hic policy Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Hic policy Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Hic policy Successfully"
            });
        });
    }
}

