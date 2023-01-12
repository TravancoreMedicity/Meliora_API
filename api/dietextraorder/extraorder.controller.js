const logger = require('../../logger/logger')
const { getExtraorder, getItemrate, ExtraOrderInsert, ExtraOrderListInsert, getDietType, getExtraOrder,
    getExtraOrderDetail, updateExta, deleteExtraOrderDetail } = require('../dietextraorder/extrorder.sevice')
module.exports = {
    getExtraorder: (req, res) => {
        const body = req.body
        getExtraorder(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
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
    getItemrate: (req, res) => {
        const body = req.body
        getItemrate(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
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
    ExtraOrderInsert: (req, res) => {
        const body = req.body;
        ExtraOrderInsert(body, (err, results) => {
            const insertId = results.insertId
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully",
                insertId: insertId
            });
        })
    },
    ExtraOrderListInsert: (req, res) => {
        const body = req.body;
        var orderList = body.map((val, index) => {
            return [val.prod_slno, val.item_slno, val.hos_rate, val.cant_rate, val.type_slno, val.extra_status,
            val.count
            ]
        })
        ExtraOrderListInsert(orderList, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully",
            });
        })
    },
    getDietType: (req, res) => {
        const body = req.body
        getDietType(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
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
    getExtraOrder: (req, res) => {
        getExtraOrder((err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (!results) {
                // logger.infologwindow("No Results Found")
                return res.status(400).json({
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
    getExtraOrderDetail: (req, res) => {
        const id = req.params.id;
        getExtraOrderDetail(id, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length == 0) {
                // logger.infologwindow("No Record Found")
                return res.status(200).json({
                    success: 2,
                    message: "their is no complaint under this department"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    updateExta: (req, res) => {
        const body = req.body
        updateExta(body, (err, results) => {
            if (err) {
                // logger.logwindow(err)
                return res.status(400).json({
                    success: 10,
                    message: err
                });
            }
            if (results.length === 0) {
                // logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Results Found"
                });
            }

            const id = body.prod_slno


            deleteExtraOrderDetail(id, (err, results) => {
                if (err) {
                    // logger.logwindow(err)
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (results.length == 0) {
                    // logger.infologwindow("No Record Found")
                    return res.status(200).json({
                        success: 2,
                        message: "No data found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });




        });
    },
}