const logger = require('../../logger/logger')
const { InsertHighBiotic, updateHighBiotic, gethighantibio, checkInsertVal } = require('../HighAntiBioticMaster/HighAntiBiotic.service')
const { validationhighbiotic } = require('../../validation/validation_schema');


module.exports = {
    InsertHighBiotic: (req, res) => {
        const body = req.body;
        const body_result = validationhighbiotic.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.high_item_code = body_result.value.high_item_code
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                InsertHighBiotic(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Antibiotic Inserted successfully",
                    });
                })

            }
            else {
                logger.infologwindow("daily activity in this date is all ready added")
                return res.status(200).json({
                    success: 7,
                    message: "item code is all ready  added"
                })
            }
        })
        // InsertHighBiotic(body, (err, results) => {
        //     if (err) {
        //         return res.status(200).json({
        //             success: 0,
        //             message: err
        //         });
        //     }
        //     if (results.length === 0) {
        //         return res.status(200).json({
        //             success: 2,
        //             message: "No Results Found"
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         message: "Antibiotic Inserted successfully",
        //     });
        // });
    },
    updateHighBiotic: (req, res) => {
        const body = req.body;
        updateHighBiotic(body, (err, results) => {
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
                message: "Daily Activity Updated succesfully"
            });
        });

    },
    gethighantibio: (req, res) => {
        gethighantibio((err, results) => {
            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,

            });
        });
    }


}