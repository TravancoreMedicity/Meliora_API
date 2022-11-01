const { buildingInsert, checkInsertVal, checkBuildalias, getBuilding, checkUpdateVal, checkUpdateAlias,
    updateBuilding, inactiveBuilding } = require('../rm_buildingmast/building.service');
const { validateBuilding } = require('../../validation/validation_schema')
const logger = require('../../logger/logger')
module.exports = {
    buildingInsert: (req, res) => {
        const body = req.body;
        //validate department Instert function
        const body_result = validateBuilding.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.build_name = body_result.value.build_name;
        body.build_alias = body_result.value.build_alias;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                checkBuildalias(body, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        // Insert the values
                        buildingInsert(body, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Building Inserted Successfully"
                            });
                        });
                    } else {
                        logger.infologwindow("Building Alias Already Exist")
                        return res.status(200).json({
                            success: 6,
                            message: "Building Alias Already Exist"
                        })
                    }
                })
            } else {
                logger.infologwindow("Building Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Building Name Already Exist"
                })
            }
        })
    },
    getBuilding: (req, res) => {
        getBuilding((err, results) => {
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
    updateBuilding: (req, res) => {
        const body = req.body;
        const body_result = validateBuilding.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }
        body.build_name = body_result.value.build_name;
        body.build_alias = body_result.value.build_alias;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                checkUpdateAlias(body, (err, results) => {
                    const value = JSON.parse(JSON.stringify(results))
                    if (Object.keys(value).length === 0) {
                        updateBuilding(body, (err, results) => {
                            if (err) {
                                logger.logwindow(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Building Name Updated Successfully"
                            });
                        });
                    } else {
                        logger.infologwindow("Building Alias Already Exist")
                        return res.status(200).json({
                            success: 5,
                            message: "Building Alias Already Exist"
                        })
                    }
                })
            } else {
                logger.infologwindow("Building Name Already Exist")
                return res.status(200).json({
                    success: 6,
                    message: "Building Name Already Exist"
                })
            }
        })
    },
    inactiveBuilding: (req, res) => {
        const id = req.params.id
        inactiveBuilding(id, (err, results) => {
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
                message: "Building Deleted Successfully"
            });
        });
    },
}