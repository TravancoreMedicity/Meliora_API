const { timeslampInsert, timeslampUpdate, timeslampSelect, timeslampGetById } = require("../timeslamp/timeslamp.service");
module.exports = {
    timeslampInsertData: (req, res) => {
        const body = req.body;
        timeslampInsert(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Data Inserted Successfully ..."
            });
        })
    },
    timeslampUpdateData: (req, res) => {
        const body = req.body;
        timeslampUpdate(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "Data not found"
                });
            }
            return res.status(200).json({
                success: 2,
                message: "Data Updated Successfully ..."
            })

        })
    },
    timeslampSelectData: (req, res) => {
        timeslampSelect((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                })
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No Data found"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            })
        })
    },
    timeslampGetDataById: (req, res) => {
        const id = req.id;
        timeslampGetById(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (!results) {
                return res.status(400).json({
                    success: 1,
                    message: "No data"
                });
            }
            return res.status(200).json({
                success: 2,
                data: results
            });
        })
    }
}