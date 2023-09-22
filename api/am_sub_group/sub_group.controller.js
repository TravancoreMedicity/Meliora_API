const { validateSubGroupCreate } = require('../../validation/validation_schema');
const { SubGroupInsert, SubGroupView, SubGroupUpdate } = require('../am_sub_group/sub_group.services')
module.exports = {
    SubGroupInsert: (req, res) => {
        const body = req.body;
        //validate subgroup Instert function
        const body_result = validateSubGroupCreate.validate(body);
        if (body_result.error) {

            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.sub_group_name = body_result.value.sub_group_name;
        SubGroupInsert(body, (err, result) => {
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
    SubGroupView: (req, res) => {

        SubGroupView((err, results) => {
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
    SubGroupUpdate: (req, res) => {
        const body = req.body;
        //validate subgroup Instert function
        const body_result = validateSubGroupCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.sub_group_name = body_result.value.sub_group_name;
        SubGroupUpdate(body, (err, results) => {
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