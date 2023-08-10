const { BuildingInsert, BuildingView, BuildingUpdate, checkInsertVal, checkUpdateVal } = require('../rm_building_master/building_mast.services')
const logger = require('../../logger/logger')
const { validateBuildingMast } = require('../../validation/validation_schema')
module.exports = {
    BuildingInsert: (req, res) => {
        const body = req.body;
        const body_result = validateBuildingMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_building_name = body_result.value.rm_building_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                BuildingInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Building inserted successfully"
                    })
                })
            }
            else {
                logger.infologwindow("Building Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Building Name Already Exist"
                })
            }
        })
    },
    BuildingView: (req, res) => {
        BuildingView((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    BuildingUpdate: (req, res) => {
        const body = req.body;

        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                BuildingUpdate(body, (err, results) => {
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
                        message: "Building Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Building Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Building Name Already Exist"
                })
            }
        })
    },
}