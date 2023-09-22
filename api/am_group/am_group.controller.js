const { validateGroupCreate } = require('../../validation/validation_schema');
const { GroupInsert, GroupView, GroupUpdate } = require('../am_group/am_group.services')
module.exports = {
    GroupInsert: (req, res) => {
        const body = req.body;
        //validate group Instert function
        const body_result = validateGroupCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.group_name = body_result.value.group_name;
        GroupInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Group inserted successfully"
            })
        })
    },
    GroupView: (req, res) => {

        GroupView((err, results) => {
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
    GroupUpdate: (req, res) => {
        const body = req.body;
        //validate group update function
        const body_result = validateGroupCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.group_name = body_result.value.group_name;
        GroupUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"

                })
            }
            return res.status(200).json({
                success: 2,
                message: "Group data Updated successfully"
            })
        })
    },
}