
const { DeviceTypeInsert, DeviceTypeView, DeviceTypeUpdate } = require('../it_communication_device_type/device_type.services')
module.exports = {
    DeviceTypeInsert: (req, res) => {
        const body = req.body;
        DeviceTypeInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Device type inserted successfully"
            })
        })
    },
    DeviceTypeView: (req, res) => {

        DeviceTypeView((err, results) => {
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
    DeviceTypeUpdate: (req, res) => {
        const body = req.body;

        DeviceTypeUpdate(body, (err, results) => {
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
                message: "Device type Updated successfully"
            })
        })
    },
}