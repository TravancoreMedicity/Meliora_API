const { validateAssetType } = require('../../validation/validation_schema');
const { CustodianDeptInsert, CustodianDepView, CustodianDepUpdate, CustodianDepSelect, getDeptSecAsset,
    selectById
} = require('../am_custodian_department/am_custodian_dept.services')
module.exports = {
    CustodianDeptInsert: (req, res) => {
        const body = req.body;
        //validate asset Instert function
        // const body_result = validateAssetType.validate(body);
        // if (body_result.error) {
        //     // logger.warnlogwindow(body_result.error.details[0].message)
        //     return res.status(200).json({
        //         success: 2,
        //         message: body_result.error.details[0].message
        //     });
        // }
        // body.asset_type_name = body_result.value.asset_type_name;
        CustodianDeptInsert(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });

            }
            return res.status(200).json({
                success: 1,
                message: "Custodian Department inserted successfully"
            })
        })
    },

    CustodianDepView: (req, res) => {

        CustodianDepView((err, results) => {
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
    CustodianDepUpdate: (req, res) => {
        const body = req.body;
        const body_result = validateAssetType.validate(body);

        CustodianDepUpdate(body, (err, results) => {
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
                message: "Asset Type data Updated successfully"
            })
        })
    },

    CustodianDepSelect: (req, res) => {

        CustodianDepSelect((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Records"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })

        })
    },

    selectById: (req, res) => {
        const id = req.params.id;
        selectById(id, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },


    // getDeptSecAsset: (req, res) => {
    //     const body = req.body

    //     getDeptSecAsset(body, (err, results) => {
    //         if (err) {
    //             logger.logwindow(err)
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             });
    //         }

    //         if (results.length == 0) {
    //             logger.infologwindow("No Results Found")
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: "No Record Found"
    //             });
    //         }

    //         return res.status(200).json({
    //             success: 1,
    //             data: results

    //         });
    //     })
    // },


}