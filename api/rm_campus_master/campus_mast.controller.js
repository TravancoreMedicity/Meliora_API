const { CampusInsert, CampusView, CampusUpdate, checkInsertVal, checkUpdateVal } = require('../rm_campus_master/campus_mast.services')
const logger = require('../../logger/logger')
const { validateCampus } = require('../../validation/validation_schema')
module.exports = {
    CampusInsert: (req, res) => {
        const body = req.body;
        const body_result = validateCampus.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_campus_name = body_result.value.rm_campus_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                CampusInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Campus inserted successfully"
                    })
                });
            }
            else {
                logger.infologwindow(" Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Campus Name Already Exist"
                })
            }
        })
    },
    CampusView: (req, res) => {
        CampusView((err, results) => {
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
    CampusUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateCampus.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.diet_name = body_result.value.diet_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                CampusUpdate(body, (err, results) => {
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
                        message: "Campus Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Campus Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "campus Name Already Exist"
                })
            }
        })
    }
}
