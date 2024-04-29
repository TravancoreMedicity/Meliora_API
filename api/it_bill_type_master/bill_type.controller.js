
const { BillTypeInsert, BillTypeView, BillTypeUpdate } = require('../it_bill_type_master/bill_type.service')
module.exports = {
    BillTypeInsert: (req, res) => {
        const body = req.body;
        BillTypeInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Bill Category inserted successfully"
            })
        })
    },
    BillTypeView: (req, res) => {

        BillTypeView((err, results) => {
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
    BillTypeUpdate: (req, res) => {
        const body = req.body;

        BillTypeUpdate(body, (err, results) => {
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
                message: "Bill Category Updated successfully"
            })
        })
    },
}