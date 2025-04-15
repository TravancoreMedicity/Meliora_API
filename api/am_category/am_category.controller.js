const { validateCategoryCreate } = require('../../validation/validation_schema');
const { CategoryInsert, CategoryView, CategoryUpdate } = require('../am_category/am_category.services')
module.exports = {
    CategoryInsert: (req, res) => {
        const body = req.body;
        // validate category Instert function
        const body_result = validateCategoryCreate.validate(body);
        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.category_name = body_result.value.category_name;
        CategoryInsert(body, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Category inserted successfully"
            })
        })
    },
    // CategoryInsert: (req, res) => {
    //     const body = req.body;
    //     CategoryInsert(body, (err, result) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }
    //         return res.status(200).json({
    //             success: 1,
    //             message: "Category inserted successfully",
    //             insertId: result.insertId,
    //         })
    //     })
    // },

    CategoryView: (req, res) => {
        CategoryView((err, results) => {
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
    CategoryUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateCategoryCreate.validate(body);
        if (body_result.error) {
            logger.warnlogwindow(body_result.error.details[0].message)
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }
        body.category_name = body_result.value.category_name;
        CategoryUpdate(body, (err, results) => {
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
                message: "Category data Updated successfully"
            })
        })
    },
}