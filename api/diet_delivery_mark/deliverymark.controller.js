const logger = require('../../logger/logger')
const { getItemDeliveryMark, updateprodetlstatus, getRoomByNSandDiet, getRoomByNSandDietAny,
    getRoomByNSandDietslno } = require('../diet_delivery_mark/deliverymark.service')
module.exports = {

    getItemDeliveryMark: (req, res) => {
        const id = req.params.id;
        getItemDeliveryMark(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No patient in selected Room Or No Food Pending to delivery"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateprodetlstatus: (req, res) => {
        const body = req.body;
        updateprodetlstatus(body, (err, results) => {

            if (err) {
                // logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Not Found"
                });
            }

            return res.status(200).json({
                success: 2,
                message: "Food Deliverd"
            });

        });
    },
    getRoomByNSandDiet: (req, res) => {
        const body = req.body;
        getRoomByNSandDiet(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No Rooms Under Nursing Station"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    getRoomByNSandDietAny: (req, res) => {
        const body = req.body;
        getRoomByNSandDietAny(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No menus in selected day under planed diet"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },
    getRoomByNSandDietslno: (req, res) => {
        const body = req.body;
        getRoomByNSandDietslno(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    messagee: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 2,
                    messagee: "No menus in selected day under planed diet"
                });
            }
            return res.status(200).json({
                succes: 1,
                dataa: results
            });
        });
    },


}