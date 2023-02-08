const { hallbookingInsert, getHallBooking, hallbookingUpdate, gethallnameSlno,
    HalldeptApproval, getHallBookingApproval, updateCeoApproval, gethallbookslno,
    updateInchargeaproval, updatehodApproval } = require('../hall_booking/hallBooking.service');
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
                message: "Data Inserted Successfully",
                insertid: results.insertId
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
    gethallnameSlno: (req, res) => {
        gethallnameSlno((err, results) => {
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
    HalldeptApproval: (req, res) => {
        const body = req.body;
        HalldeptApproval(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Hall booked succesfully"
            });
        });
    },
    getHallBookingApproval: (req, res) => {
        getHallBookingApproval((err, results) => {
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
    updateCeoApproval: (req, res) => {
        const body = req.body
        updateCeoApproval(body, (err, results) => {
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
    updateCeoApproval: (req, res) => {
        const body = req.body
        updateCeoApproval(body, (err, results) => {
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
    updateInchargeaproval: (req, res) => {
        const body = req.body
        updateInchargeaproval(body, (err, results) => {
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
    updatehodApproval: (req, res) => {
        const body = req.body
        updatehodApproval(body, (err, results) => {
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
    gethallbookslno: (req, res) => {
        const id = req.params.id;
        gethallbookslno(id, (err, results) => {
            const idip = results.insertId
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Result Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
                insertId: idip
            });
        });
    }
}