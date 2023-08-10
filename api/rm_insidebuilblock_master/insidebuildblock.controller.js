const { InsideBuildBlockInsert, InsideBuildBlockView, InsideBuildBlockUpdate } = require('../rm_insidebuilblock_master/insidebuildblock.service')
module.exports = {
    InsideBuildBlockInsert: (req, res) => {
        const body = req.body;
        InsideBuildBlockInsert(body, (err, result) => {

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
    InsideBuildBlockView: (req, res) => {
        InsideBuildBlockView((err, results) => {
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
    InsideBuildBlockUpdate: (req, res) => {
        const body = req.body;
        InsideBuildBlockUpdate(body, (err, results) => {
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
                message: "Data Updated successfully"
            })
        })
    },
}