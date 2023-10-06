const { validateAssetType } = require('../../validation/validation_schema');
const { checkDetailInsertOrNot, ItemDetailsInsert, checkInsetOrNot
} = require('../am_item_creation_detail/am_itemdetail.service')
module.exports = {
    checkDetailInsertOrNot: (req, res) => {
        const id = req.params.id;
        checkDetailInsertOrNot(id, (err, results) => {
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

    ItemDetailsInsert: (req, res) => {
        const body = req.body;

        checkInsetOrNot(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results));
            if (Object.keys(value).length === 0) {
                ItemDetailsInsert(body, (err, result) => {
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
            }
        })

    },


}