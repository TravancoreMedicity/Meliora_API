const { assetTypeInsert, checkInsertVal, checkUpdateVal, assetTypeUpdate, getAssetType,
    deleteAssetType, getAssetTypeById, getAssetTypeStatus } = require('../assettype/assettype.service')
const { validateAssetType } = require('../../validation/validation_schema');
const logger = require('../../logger/logger')

module.exports = {
    assetTypeInsert: (req, res) => {
        const body = req.body;
        //validate assettype Insert function
        const body_result = validateAssetType.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        //let body.asset_type_name=body_result
        body.asset_type_name = body_result.value.asset_type_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                assetTypeInsert(body, (err, results) => {
                    if (err) {
                        logger.logwindow(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        })
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "AssetType Inserted Successfully"
                    });
                });
            } else {
                logger.infologwindow("AssetType  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "AssetType Already Exist"
                })
            }
        })
    },
    getAssetTypeById: (req, res) => {
        const id = req.params.id;
        getAssetTypeById(id, (err, results) => {
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
    assetTypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateAssetType.validate(body);
        body.asset_type_name = body_result.value.asset_type_name;
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 3,
                message: body_result.error.details[0].message
            });
        }

        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                assetTypeUpdate(body, (err, results) => {
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
                        message: "Assettype Updated Successfully"
                    });
                });

            } else {
                logger.infologwindow("Assettype Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Assettype Name Already Exist"
                })
            }
        })
    },
    getAssetType: (req, res) => {
        getAssetType((err, results) => {
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
    deleteAssetType: (req, res) => {
        const body = req.body;
        deleteAssetType(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: res.err
                });
            }
            if (!results) {
                logger.infologwindow("Assettype Not Found")
                return res.status(400).json({
                    success: 1,
                    message: "Assettype Not Found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Assettype Deleted Successfully"
            });
        });
    },
    getAssetTypeStatus: (req, res) => {
        getAssetTypeStatus((err, results) => {
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
    }
}

