const { create, update, getSelect, getModuleGroupByID, deleteModuleGroup, checkInsertVal, checkUpdateVal } = require('../module_group_mast/moduleGroup.service');
const { validateModuleGroup } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    createmodulegruop: (req, res) => {
        const body = req.body;
        const body_result = validateModuleGroup.validate(body);
        if (body_result.error) {
            logger.infologwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.mod_grp_name = body_result.value.mod_grp_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                create(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Created Successfully"
                    });
                });
            } else {
                logger.infologwindow("Module grp   Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Module grp  Already Exist"
                })
            }
        })
    },
    updatemodulegroup: (req, res) => {
        const body = req.body;
        const body_result = validateModuleGroup.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.mod_grp_name = body_result.value.mod_grp_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                update(body, (err, results) => {
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
                        message: "Data Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Module group Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Module group  Already Exist"
                })
            }
        })
    },
    getSelectgroupmast: (req, res) => {
        getSelect((err, results) => {
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
    getModuleGroupByID: (req, res) => {
        const id = req.params.id;
        getModuleGroupByID(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                logger.infologwindow("No Record Found")
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
    deleteModuleGroup: (req, res) => {
        const body = req.body;
        deleteModuleGroup(body, (err, results) => {
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
    }

}