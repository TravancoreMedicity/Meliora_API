const { create, update, getSelect, getModuleMasterByID, deleteMenuMaster, checkInsertVal, checkUpdateVal } = require('../menu_master/menuMaster.service');
const { validateMenuMaster } = require('../../validation/validation_schema')
const logger = require('../../logger/logger');
module.exports = {
    createmodulegruop: (req, res) => {
        const body = req.body;
        const body_result = validateMenuMaster.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.menu_name=body_result
        body.menu_name = body_result.value.menu_name;
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
                        message: "Menu master Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("Menu master Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Menu master  Already Exist"
                })
            }
        })
    },
    updatemodulegroup: (req, res) => {
        const body = req.body;
        const body_result = validateMenuMaster.validate(body);
        if (body_result.error) {
            logger.logwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.menu_name = body_result.value.menu_name;
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
                        message: "Menu Master Updated Successfully"
                    });
                });
            } else {
                logger.infologwindow("Menu Master  Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Menu Master Name Already Exist"
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
        getModuleMasterByID(id, (err, results) => {
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
    deleteMenuMaster: (req, res) => {
        const body = req.body;
        deleteMenuMaster(body, (err, results) => {
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
                message: "Menu Master Deleted Successfully"
            });
        });
    },
    insertMenuMaster: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            };

            if (results && results?.length > 0) {
                return res.status(200).json({
                    success: 7,
                    message: "Menu master  Already Exist"
                })
            };

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
                    message: "Menu master Inserted Successfully"
                });
            });
        })
    },

    updateMenuMaster: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            };

            if (results && results?.length > 0) {
                return res.status(200).json({
                    success: 7,
                    message: "Menu master  Already Exist"
                })
            };

            update(body, (err, results) => {
                if (err) {
                    logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Menu master Inserted Successfully"
                });
            });
        })
    },


}