const { omTableInsert, omTableUpdate, checkInsertVal, checkUpdateVal, omtableGet, omtableGetselect
} = require('../om_table_mast/omTableMast.service')
const { validateOmTableMast } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {

    omTableInsert: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateOmTableMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.diet_name = body_result.value.diet_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                omTableInsert(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Om Table Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Diet Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Om Table Name Already Exist"
                })
            }
        })
    },
    omTableUpdate: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateOmTableMast.validate(body);
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
                omTableUpdate(body, (err, results) => {
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
                        message: "Diet Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Diet Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Diet Name Already Exist"
                })
            }
        })
    },
    omtableGet: (req, res) => {
        omtableGet((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    omtableGetselect: (req, res) => {
        omtableGetselect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

}