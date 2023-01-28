const { hallbookingInsert, getHallBooking, hallbookingUpdate } = require('../hall_booking/hallBooking.service');
const logger = require('../../logger/logger')
module.exports = {
    hallbookingInsert: (req, res) => {
        const body = req.body
        hallbookingInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully"
            })
        })
    },
    hallbookingUpdate: (req, res) => {
        const body = req.body
        hallbookingUpdate(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Updated Successfully"
            })
        })
    },
    getHallBooking: (req, res) => {
        getHallBooking((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (results.length == 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records Found"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },

}