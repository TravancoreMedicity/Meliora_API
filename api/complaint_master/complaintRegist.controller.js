const { complaintRegistInsert, complaintRegistUpdate,
    getcomplaintRegistByID, getcomplaintListbylogin, getcomplaintListbydept,
    getcomplaintAll } = require('../complaint_master/complaintRegist.service');
const { validateComplaintRegist } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    complaintRegistInsert: (req, res) => {

        // console.log(req.io)
        req.io.emit("message", `New Complaint Registed ! Please Check`)
        const body = req.body;
        //validate complaintdept Insert function
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        complaintRegistInsert(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Complaint  Inserted Successfully"
            });
        });
    },
    complaintRegistUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateComplaintRegist.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        complaintRegistUpdate(body, (err, results) => {
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
                message: "Complaint Department Updated Successfully"
            });
        });
    },

    getcomplaintRegistByID: (req, res) => {
        const body = req.body
        getcomplaintRegistByID(body, (err, results) => {
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
    getcomplaintListbylogin: (req, res) => {
        const id = req.params.id;
        getcomplaintListbylogin(id, (err, results) => {
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
    getcomplaintListbydept: (req, res) => {
        const id = req.params.id;
        getcomplaintListbydept(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "their is no complaint under this department"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getcomplaintAll: (req, res) => {
        getcomplaintAll((err, results) => {
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

