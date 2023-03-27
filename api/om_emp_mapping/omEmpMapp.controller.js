const { omEmpInsert, omEmpUpdate, checkInsertVal, checkUpdateVal, omEmpGet, omEmpGetselect
} = require('../om_emp_mapping/omEmpMap.service')
const { validateOmEmpmapping } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {

    omEmpInsert: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateOmEmpmapping.validate(body);
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
                omEmpInsert(body, (err, results) => {
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
    omEmpUpdate: (req, res) => {
        const body = req.body;
        //validate diet master insertion function
        const body_result = validateOmEmpmapping.validate(body);
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
                omEmpUpdate(body, (err, results) => {
                    console.log("controller");
                    console.log(body);
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
                        message: "Mapping Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Mapping Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Mapping Already Exist"
                })
            }
        })
    },
    omEmpGet: (req, res) => {
        omEmpGet((err, results) => {
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

    omEmpGetselect: (req, res) => {
        omEmpGetselect((err, results) => {
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