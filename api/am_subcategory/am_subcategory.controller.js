const { SubCategoryInsert, SubCategoryView, SubCategoryUpdate } = require('../am_subcategory/am_subcategory.services')
module.exports = {
    SubCategoryInsert: (req, res) => {
        const body = req.body;
        SubCategoryInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "SubCategory inserted successfully"
            })
        })
    },
    SubCategoryView: (req, res) => {

        SubCategoryView((err, results) => {
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

    SubCategoryUpdate: (req, res) => {
        const body = req.body;
        SubCategoryUpdate(body, (err, results) => {
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
                message: " Subcategory data Updated successfully"
            })
        })
    },
}