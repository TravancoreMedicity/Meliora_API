const { moduleInsert, checkInsertVal, getModule, moduleMasterById, getdataById, checkUpdateVal, moduleUpdate, moduleDelete } = require('../module_master/moduleMaster.service')
const { validateModulemaster } = require('../../validation/validation_schema');
const logger = require('../../logger/logger');

module.exports = {
    moduleInsert: (req, res) => {
        const body = req.body;
        //validate modulemaster Insert function
        const body_result = validateModulemaster.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.module_name=body_result
        body.module_name = body_result.value.module_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                moduleInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Module master Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Module master  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Module master  Already Exist"
                })
            }
        })
    },
    getModule: (req, res) => {
        getModule((err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
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
    moduleMasterById: (req, res) => {
        const id = req.params.id;
        moduleMasterById(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Records Found")
                return res.status(400).json({
                    success: 0,
                    message: "No Records Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    moduleUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateModulemaster.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.module_name = body_result.value.module_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                moduleUpdate(body, (err, results) => {
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
                        message: "Module master Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Module master Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Module master Name Already Exist"
                })
            }
        })
    },
    moduleDelete: (req, res) => {
        const body = req.body;
        moduleDelete(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Record Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Record Deleted Successfully"
            });
        });
    },
    getdataById: (req, res) => {
        const body = req.body;
        getdataById(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },


}