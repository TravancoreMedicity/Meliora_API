const { NotificationInsert,NotificationView,NotificationUpdate} = require('./notification.service');
const { validateMenuMaster } = require('../../validation/validation_schema')
const logger = require('../../logger/logger');
module.exports = {

    NotificationInsert: (req, res) => {
        const body = req.body;
        NotificationInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Notification inserted successfully"
            })
        })
    },
    NotificationView: (req, res) => {
        NotificationView((err, results) => {
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
    NotificationUpdate: (req, res) => {
        const body = req.body;
        NotificationUpdate(body, (err, results) => {
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
                message: "Notification Updated successfully"
            })
        })
    },
}