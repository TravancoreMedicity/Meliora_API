const logger = require('../../logger/logger')
const { validateComEmpmapping } = require('../../validation/validation_schema');
const { inserEmpmap, getEmpMapping, updateEmpMap, CheckinsertVal, selectallEmpMapping } = require('../com_emp_mapping/com_emp_mapping.service')

module.exports = {
    inserEmpmap: (req, res) => {

        const body = req.body;
        const body_result = validateComEmpmapping.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.map_slno = body_result.value.map_slno
        // CheckinsertVal(body, (err, results) => {
        //     const value = JSON.parse(JSON.stringify(results))
        //     if (Object.keys(value).length === 0) {
        inserEmpmap(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully",
            });
        })
        // }
        // else {
        //     logger.infologwindow("daily activity in this date is all ready added")
        //     return res.status(200).json({
        //         success: 7,
        //         message: "item code is all ready  added"
        //     })
        // }


        // })
    },
    getEmpMapping: (req, res) => {
        getEmpMapping((err, results) => {
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
    },
    updateEmpMap: (req, res) => {
        const body = req.body;
        updateEmpMap(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data updated successfully",
            });
        });
    },
    selectallEmpMapping: (req, res) => {
        const id = req.params.id
        selectallEmpMapping(id, (err, results) => {
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
}