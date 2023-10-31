const { validateScheduleTimeCreate } = require('../../validation/validation_schema');
const { scheduleTimeInsert, getScheduleTime, ScheduleTimeUpdate, DropDownViewTime } = require('./scheduletimemast.service')
const logger = require('../../logger/logger');
module.exports = {
    scheduleTimeInsert: (req, res) => {
        const body = req.body;
        const body_result = validateScheduleTimeCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.schedule_time_name = body_result.value.schedule_time_name;
        scheduleTimeInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Schedule Time Created"
            })
        })
    },

    getScheduleTime: (req, res) => {
        getScheduleTime((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Data Found",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    ScheduleTimeUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateScheduleTimeCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.schedule_time_name = body_result.value.schedule_time_name;
        ScheduleTimeUpdate(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (Object.keys(results).length === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No record found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated successfully"
            })
        })
    },

    DropDownViewTime: (req, res) => {
        DropDownViewTime((err, results) => {
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

}
