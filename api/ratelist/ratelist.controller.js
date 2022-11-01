const { ratelistInsert, ratelistUpdate, ratelistSelect, ratelistGetById, roomcatSelect, dietSelect, dietTypeSelect } = require("../ratelist/ratelist.service");
module.exports = {
    ratelistInsertData: (req, res) => {
        const body = req.body;
        ratelistInsert(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Data Inserted Successfully ..."
            });
        })
    },
    ratelistUpdateData: (req, res) => {
        const body = req.body;
        ratelistUpdate(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 2,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Updated Successfully ..."
            });
        });
    },
    ratelistSelectData: (req, res) => {
        ratelistSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
                message: "Data Selected Successfully ..."
            });
        });
    },
    ratelistGetDataById: (req, res) => {
        const id = req.id;
        ratelistGetById(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data"
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    },
    roomcatSelect: (req, res) => {
        roomcatSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    dietSelect: (req, res) => {
        dietSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },
    dietTypeSelect: (req, res) => {
        dietTypeSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 2,
                    message: err
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No results found"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    }
}