const { RoomTypeInsert, RoomTypeView, RoomtypeUpdate, checkInsertVal, checkUpdateVal } = require('../rm_room_type_master/room_type.services')
const logger = require('../../logger/logger')
const { validateRoomTypeMast } = require('../../validation/validation_schema')
module.exports = {
    RoomTypeInsert: (req, res) => {
        const body = req.body;
        const body_result = validateRoomTypeMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_roomtype_name = body_result.value.rm_roomtype_name;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                RoomTypeInsert(body, (err, result) => {

                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        message: "Room Type inserted successfully"
                    });
                });
            } else {
                logger.infologwindow("Room Type Name Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Type Name Already Exist"
                })
            }
        })
    },
    RoomTypeView: (req, res) => {
        RoomTypeView((err, results) => {
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
    RoomtypeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateRoomTypeMast.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.rm_roomtype_name = body_result.value.rm_roomtype_name;
        checkUpdateVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                RoomtypeUpdate(body, (err, results) => {
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
                        message: "Data Updated Successfully"
                    })
                })
            } else {
                logger.infologwindow("Room Type Name  Already Exist")
                return res.status(200).json({
                    success: 7,
                    message: "Room Type Name Already Exist"
                })
            }
        })
    },
}