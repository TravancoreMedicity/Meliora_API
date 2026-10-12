const { pool } = require('../../config/database');

module.exports = {
    insertItemCatMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO item_category_master
        (
            item_group_id,
            category_name,
            category_code,
            display_order,
            is_active,
            created_by
        ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.item_group_id,
                data.category_name,
                data.category_code,
                data.display_order,
                data.is_active,
                data.created_by
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateItemCatMaster: (data, callBack) => {
        pool.query(
            `UPDATE item_category_master
            SET 
                item_group_id = ?,
                category_name = ?,
                category_code = ?,
                display_order = ?,
                is_active = ?,
                updated_by = ?
            WHERE item_category_id = ?`,
            [
                data.item_group_id,
                data.category_name,
                data.category_code,
                data.display_order,
                data.is_active,
                data.updated_by,
                data.item_category_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }, getAllItemCatMaster: (callBack) => {
        pool.query(
            `
            SELECT 
                group_name,
                item_category_id,
                icm.item_group_id,
                category_name,
                category_code,
                icm.display_order,
                icm.is_active
            FROM
                item_category_master icm
                    LEFT JOIN
                item_group_master igm ON igm.item_group_id = icm.item_group_id
                `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAllItemCategory: (data, callBack) => {
        pool.query(
            `
            SELECT 
                item_category_id,
                item_group_id,
                category_name,
                category_code,
                display_order,
                is_active
            FROM item_category_master  WHERE item_group_id = ?
                `,
            [
                data.item_group_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}