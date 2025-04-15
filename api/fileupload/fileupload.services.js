const { pool } = require('../../config/database')
module.exports = {

    ItemMastUpdate: (data, callback) => {
        pool.query(
            `UPDATE am_item_name_creation SET 
            image_status=1
            WHERE 
            item_creation_slno=?`,
            [
                data.item_creation_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    InsertFileDetails: (data, callback) => {
        pool.query(
            `UPDATE am_category SET 
            mime_type=?,
            file_name=?
            WHERE 
            category_slno=?`,
            [
                data.mime_type,
                data.file_name,
                data.category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}