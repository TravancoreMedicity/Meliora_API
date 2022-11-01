const logger = require('../../logger/logger');
const { directcomplaintRegistInsert, getdirectcomplaintList, directcomplaintUpdate } = require('../cm_directcomplaintRegister/directcmReg.service');
const { validateComplaintRegist } = require('../../validation/validation_schema');
module.exports = {
    directcomplaintRegistInsert: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        directcomplaintRegistInsert(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Complaint Inserted Successfully"
            });
        });
    },
    getdirectcomplaintList: (req, res) => {
        const id = req.params.id;
        getdirectcomplaintList(id, (err, results) => {
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
    directcomplaintUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        directcomplaintUpdate(body, (err, results) => {
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
                message: "Complaint Updated Successfully"
            });
        });
    },
}