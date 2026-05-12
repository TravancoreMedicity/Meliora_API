const { pool } = require('../../config/database');

module.exports = {

    insertItemAlias: (data, callBack) => {
        pool.query(
            `INSERT INTO item_alias
                (item_id, alias_name, created_by)
            VALUES (?, ?, ?)`,
            [
                data.item_id,
                data.alias_name,
                data.created_by
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    getAllItemAlias: (callBack) => {
        pool.query(
            `SELECT 
                alias_id,
                ia.item_id,
                alias_name,
                ia.is_active,
                im.item_name
            FROM item_alias ia
            LEFT JOIN item_master im on im.item_id = ia.item_id
            ORDER BY alias_name`,
            [],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    updateItemAlias: (data, callBack) => {
        pool.query(
            `UPDATE item_alias
            SET
                item_id=?,
                alias_name = ?,
                is_active = ?,
                updated_by = ?
            WHERE alias_id = ?`,
            [
                data.item_id,
                data.alias_name,
                data.is_active,
                data.updated_by,
                data.alias_id
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    }

};