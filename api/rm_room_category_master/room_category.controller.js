const { RoomCategoryInsert, RoomCategoryView, RoomCategoryUpdate, checkInsertVal, checkUpdateVal } = require('../rm_room_category_master/room_category.services')
const logger = require('../../logger/logger')
const { validateRoomCategory } = require('../../validation/validation_schema')
module.exports = {
    RoomCategoryInsert: (req, res) => {
        const body = req.body;
        const body_result = validateRoomCategory.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_roomcategory_name = body_result.value.rm_roomcategory_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                RoomCategoryInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Room Category inserted successfully"
                    });
                });
            } else {
                logger.infologwindow("Room Category Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Category Name Already Exist"
                })
            }
        })
    },
    RoomCategoryView: (req, res) => {
        RoomCategoryView((err, results) => {
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
    RoomCategoryUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateRoomCategory.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_roomcategory_name = body_result.value.rm_roomcategory_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                RoomCategoryUpdate(body, (err, results) => {
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
                        message: "Room Ctaegory Name Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Room Category Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Category Name Already Exist"
                })
            }
        })
    },
}