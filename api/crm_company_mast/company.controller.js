
const { validateCompanyName } = require('../../validation/validation_schema');
const { companyInsert, checKCompany, viewCompany, updateCompany, getActiveCompany } = require('./company.service')
module.exports = {
    companyInsert: (req, res) => {
        const body = req.body;
        const body_result = validateCompanyName.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.company_name = body_result.value.company_name;
        checKCompany(body, (err, checkResult) => {
            const value = JSON.parse(JSON.stringify(checkResult))
            if (Object.keys(value).length === 0) {
                companyInsert(body, (err, results) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err.message
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Inserted Successfully"
                    })
                })
            }
            else {
                return res.status(200).json({
                    success: 2,
                    message: "Company Name Exist"
                })
            }
        })
    },

    viewCompany: (req, res) => {
        viewCompany((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },

    updateCompany: (req, res) => {
        const body = req.body;
        //validate model update function
        const body_result = validateCompanyName.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.company_name = body_result.value.company_name;
        updateCompany(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 7,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            })
        })
    },

    getActiveCompany: (req, res) => {
        getActiveCompany((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },
}