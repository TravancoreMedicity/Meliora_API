const logger = require('../../logger/logger');
const { ItemcreationdeptInsert, insertItemAdditional, getInsertData } = require('../am_Item_creation_mast/item_creation_mast.service')
module.exports = {
    ItemcreationdeptInsert: (req, res) => {
        const body = req.body;
        var newList = body.map((val, index) => {
            return [val.item_creation_slno, val.item_dept_slno, val.item_deptsec_slno, val.item_create_status,
            val.create_user]
        })

        ItemcreationdeptInsert(newList, (err, result) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Item creation data inserted successfully"
            })
        })
    },


    insertItemAdditional: (req, res) => {
        const body = req.body;

        insertItemAdditional(body, (err, result) => {

            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                success: 1,
                insertid: result.insertId,
                message: "Item Added successfully"
            })
        })
    },

    getInsertData: (req, res) => {
        const body = req.body
        getInsertData(body, (err, results) => {
            if (err) {
                logger.logwindow(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length == 0) {
                logger.infologwindow("No Results Found")
                return res.status(200).json({
                    success: 0,
                    message: "No Record Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
}