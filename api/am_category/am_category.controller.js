const { validateCategoryCreate } = require('../../validation/validation_schema');
const { CategoryInsert, CategoryView, CategoryUpdate } = require('../am_category/am_category.services')
const path = require('path');
const fs = require("fs")
const archiver = require('archiver');

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


    RegimageGet: (req, res) => {
        const id = req.params.id;
        const folderPath = path.join('D:/DocMeliora/Meliora/AssetName/Category', id);
        fs.readdir(folderPath, (err, files) => {
            if (err) {      
                return res.status(200).json({
                    success: 0,
                    message: err.message,
                });
            }
            else if (!files || files.length === 0) {
                // No images found
                return res.status(200).json({
                    success: 1,
                    data: [] // or files if you prefer to return the empty array
                });
            }
            else {
                // Otherwise, create the ZIP archive and pipe it
                res.setHeader('Content-Type', 'application/zip');
                res.setHeader('Content-Disposition', `attachment; filename="${id}_images.zip"`);
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.on('error', (archiveErr) => {            
                    res.status(500).json({ success: 0, message: archiveErr.message });
                });
                archive.pipe(res);
                // Optionally, filter for image extensions only
                files.forEach((filename) => {
                    const filePath = path.join(folderPath, filename);
                    archive.file(filePath, { name: filename });
                });
                archive.finalize();
            }
        });
    },
}