const { SupplierDetailInsert, SupplierDetailView, SupplierDetailUpdate } = require('../it_bill_supplier_detail_master/supp_detail.service')
module.exports = {
    SupplierDetailInsert: (req, res) => {
        const body = req.body;
        SupplierDetailInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Supplier Details Inserted successully"
            })
        })
    },
    SupplierDetailView: (req, res) => {

        SupplierDetailView((err, results) => {
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

    SupplierDetailUpdate: (req, res) => {
        const body = req.body;
        SupplierDetailUpdate(body, (err, results) => {
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
                message: "Supplier Details Updated successully"
            })
        })
    },
}