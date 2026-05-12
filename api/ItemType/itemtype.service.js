const { pool } = require('../../config/database');

module.exports = {

    insertItemType: (data, callBack) => {

        pool.query(
            `INSERT INTO item_type
            (item_type_name, created_by)
            VALUES (?, ?)`,
            [
                data.item_type_name,
                data.created_by
            ],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    },


    getAllItemType: (callBack) => {

        pool.query(
            `SELECT 
                item_type_id,
                item_type_name,
                is_active,
                created_by,
                updated_by
            FROM item_type
            ORDER BY item_type_name`,
            [],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    },


    updateItemType: (data, callBack) => {

        pool.query(
            `UPDATE item_type
            SET
                item_type_name = ?,
                is_active = ?,
                updated_by = ?
            WHERE item_type_id = ?`,
            [
                data.item_type_name,
                data.is_active,
                data.updated_by,
                data.item_type_id
            ],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);

            }
        );

    }

};