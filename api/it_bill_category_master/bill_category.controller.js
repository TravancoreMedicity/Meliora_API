
const { BillCategoryInsert, BillCategoryView, BillCategoryUpdate } = require('../it_bill_category_master/bill_category.service')
module.exports = {
    BillCategoryInsert: (req, res) => {
        const body = req.body;
        BillCategoryInsert(body, (err, result) => {
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
    BillCategoryView: (req, res) => {

        BillCategoryView((err, results) => {
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
    BillCategoryUpdate: (req, res) => {
        const body = req.body;

        BillCategoryUpdate(body, (err, results) => {
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