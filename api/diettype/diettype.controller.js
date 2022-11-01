const { diettypeInsert, diettypeUpdate, diettypeSelect, diettypeGetById, checkInsertVal, checkUpdateVal } = require("../diettype/diettype.service");
const logger = require('../../logger/logger')
const { ValidateDietType } = require('../../validation/validation_schema')
module.exports = {
    diettypeInsertData: (req, res) => {
        const body = req.body;
        //validate diet type insertion function
        const body_result = ValidateDietType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.type_desc = body_result.value.type_desc;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                diettypeInsert(body, (err, results) => {
                    if (err) {
                        return res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Inserted Successfully..."
                    });
                })
            } else {
                logger.infologwindow("Diet type Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Diet type Already Exist"
                })
            }
        })
    },
    diettypeUpdateData: (req, res) => {
        const body = req.body;
        //validate diet type insertion function
        const body_result = ValidateDietType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.type_desc = body_result.value.type_desc;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                diettypeUpdate(body, (err, results) => {
                    if (err) {
                        res.status(400).json({
                            success: 0,
                            message: err
                        });
                    }
                    if (!results) {
                        return res.status(400).json({
                            success: 2,
                            message: "No Data to Update"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results,
                        message: "Data Updated Successfully ..."
                    });
                })
            } else {
                logger.infologwindow("Diet type  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Diet type Already Exist"
                })
            }
        })



    },
    diettypeSelectData: (req, res) => {
        diettypeSelect((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (results.length === 0) {
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
    diettypeGetDataById: (req, res) => {
        const id = req.id;
        diettypeGetById(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    }
}