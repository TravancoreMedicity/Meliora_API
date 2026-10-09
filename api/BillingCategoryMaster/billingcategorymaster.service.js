const { pool } = require('../../config/database');

module.exports = {

    insertBillingCategoryService: (data, callBack) => {

        pool.query(
            `INSERT INTO billing_category_master
            (
                category_name,
                description,
                is_active
            )
            VALUES (?, ?, ?)`,
            [
                data.category_name,
                data.description,
                data.is_active
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateBillingCategoryService: (data, callBack) => {

        pool.query(
            `UPDATE billing_category_master
            SET
                category_name = ?,
                description = ?,
                is_active = ?
            WHERE category_id = ?`,
            [
                data.category_name,
                data.description,
                data.is_active,
                data.category_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllBillingCategoryService: (callBack) => {

        pool.query(
            `SELECT
                category_id,
                category_name,
                description,
                is_active
            FROM billing_category_master`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

};