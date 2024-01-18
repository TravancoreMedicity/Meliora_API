// const { validateCommunicationCreate } = require('../../validation/validation_schema');
const { CommunicationDeviceInsert, CommunicationDeviceView, CommunicationDeviceUpdate, SimMastInsert, SimMastView,
    SimMastUpdate } = require('../it_communication_device_details/communication.services')
module.exports = {
    CommunicationDeviceInsert: (req, res) => {
        const body = req.body;

        CommunicationDeviceInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data inserted successfully"
            })
        })
    },
    CommunicationDeviceView: (req, res) => {

        CommunicationDeviceView((err, results) => {
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
    CommunicationDeviceUpdate: (req, res) => {
        const body = req.body;

        CommunicationDeviceUpdate(body, (err, results) => {
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
                message: " Details Updated successfully"
            })
        })
    },
    SimMastInsert: (req, res) => {
        const body = req.body;
        SimMastInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "SiM details inserted successfully"
            })
        })
    },


    SimMastView: (req, res) => {
        SimMastView((err, results) => {
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
    SimMastUpdate: (req, res) => {
        const body = req.body;
        SimMastUpdate(body, (err, results) => {
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
                message: "Sim details Updated successfully"
            })
        })
    },



}