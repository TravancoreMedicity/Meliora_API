const { usergroupInsert, usergroupupdate, getUsergroup, getUsergroupByid, getdataById, deleteUsergroup, checkInsertVal, checkUpdateVal } = require('../usergroup/usergroup.service')
const logger = require('../../logger/logger');
const { validateUserGroup } = require('../../validation/validation_schema');
module.exports = {
    usergroupInsert: (req, res) => {
        const body = req.body;
        //validate usergroup insert functions
        const body_result = validateUserGroup.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.user_grp_name=body_result
        body.user_grp_name = body_result.value.user_grp_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                usergroupInsert(body, (err, result) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Data Inserted Successfully"
                    });
                })
            } else {
                logger.infologwindow("User group  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "User group  Already Exist"
                })
            }
        })
    },
    usergroupupdate: (req, res) => {
        const body = req.body;
        const body_result = validateUserGroup.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let  body.user_grp_name=body_result
        body.user_grp_name = body_result.value.user_grp_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                usergroupupdate(body, (err, results) => {
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
                logger.infologwindow("Usergroup Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Usergroup Name Already Exist"
                })
            }
        })
    },
    getUsergroup: (req, res) => {
        getUsergroup((err, results) => {
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
    getUsergroupByid: (req, res) => {
        const id = req.params.id;
        getUsergroupByid(id, (err, results) => {
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
            })
        });
    },
    deleteUsergroup: (req, res) => {
        const body = req.body;
        deleteUsergroup(body, (err, results) => {
            if (err) {
                logger.logwindow(res.err)
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