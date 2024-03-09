const logger = require('../../logger/logger');
const { validateCensusNursingStation } = require('../../validation/validation_schema');

const { censusNursingStatInsert, censusNursingStationView, NursingStationUpdate, getNursingStationActive } = require('./census_nursing.service')
module.exports = {

    censusNursingStatInsert: (req, res) => {
        const body = req.body;
        const body_result = validateCensusNursingStation.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.census_ns_name = body_result.value.census_ns_name;
        censusNursingStatInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Nursing Station Created"
            })
        })
    },

    censusNursingStationView: (req, res) => {
        censusNursingStationView((err, results) => {
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

    NursingStationUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateCensusNursingStation.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 7,
                message: body_result.error.details[0].message
            });
        }
        body.census_ns_name = body_result.value.census_ns_name;
        NursingStationUpdate(body, (err, results) => {
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

    getNursingStationActive: (req, res) => {
        getNursingStationActive((err, results) => {
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

}