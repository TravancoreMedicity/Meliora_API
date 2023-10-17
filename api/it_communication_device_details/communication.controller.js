// const { validateCommunicationCreate } = require('../../validation/validation_schema');
const { CommunicationDeviceInsert, CommunicationDeviceView, CommunicationDeviceUpdate } = require('../it_communication_device_details/communication.services')
module.exports = {
    CommunicationDeviceInsert: (req, res) => {
        const body = req.body;
        // validate model Instert function
        // const body_result = validateCommunicationCreate.validate(body);
        // if (body_result.error) {
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        // body.reciver_name = body_result.value.reciver_name;
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
                message: " Device Details type Updated successfully"
            })
        })
    },
}