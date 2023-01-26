
const { getRectifycomplt, Updatecomplit, UpdateVerify, getAssignEmps, updateassignDetail
} = require('../Rectifycomplit/Rectifycomplit.service')
const logger = require('../../logger/logger');
module.exports = {
    getRectifycomplt: (req, res) => {
        const id = req.params.id
        getRectifycomplt(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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
    Updatecomplit: (req, res) => {
        const body = req.body;
        console.log(body)
        Updatecomplit(body[0], (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            const result = updateassignDetail(body)
                .then((r) => {
                    return res.status(200).json({
                        success: 2,
                        data: r,
                        message: "Rectified Sucessfully"
                    });
                }).catch((e) => {
                    return res.status(400).json({
                        success: 1,
                        message: e.sqlMessage
                    });
                })

        })
    },
    UpdateVerify: (req, res) => {
        const body = req.body;
        UpdateVerify(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("Record Not Found")
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                })
            }
            return res.status(200).json({
                success: 2,
                message: "Verified complaint successfully"
            })
        })
    },
    getAssignEmps: (req, res) => {
        const id = req.params.id
        getAssignEmps(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
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
    }
}