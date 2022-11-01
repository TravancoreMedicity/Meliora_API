const { dietInsert, dietUpdate, dietSelect, dietGetById, roomSelect, checkInsertVal, checkUpdateVal } = require("../diet/diet.service")
const logger = require('../../logger/logger')
const { ValidateDietMaster } = require('../../validation/validation_schema')
module.exports = {
    dietInsertData: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = ValidateDietMaster.validate(body);
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
                dietInsert(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Diet Master Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Diet Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Diet Name Already Exist"
                })
            }
        })
    },
    dietUpdateData: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = ValidateDietMaster.validate(body);
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
                dietUpdate(body, (err, results) => {
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
    dietSelectData: (req, res) => {
        dietSelect((err, results) => {
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
    dietGetDataById: (req, res) => {
        const id = req.id;
        dietGetById(id, (err, results) => {
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
            });
        })
    },
    roomSelectData: (req, res) => {
        roomSelect((err, results) => {

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
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });

        });

    }

}