const { pool } = require('../../config/database');

module.exports = {

    insertDietTemplateFood: (data, callBack) => {

        const values = data.map(item => [
            item.template_id,
            item.week_day,
            item.type_id,
            item.item_id,
            item.quantity,
            item.unit_id,
            item.created_by
        ]);

        pool.query(
            `INSERT INTO diet_template_food
            (
                template_id,
                week_day,
                type_id,
                item_id,
                quantity,
                unit_id,
                created_by
            )
            VALUES ?`,
            [values],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllDietTemplateFood: (data, callBack) => {
        pool.query(
            `SELECT 
            dtf.template_food_id,
            dtf.template_id,
            dtf.week_day,
            dtf.type_id,
            dtf.item_id,
            im.item_name,
            im.item_code,
            ig.group_name,
            ic.category_name,
            dtf.quantity,
            dtf.unit_id,
            um.unit_name,
            dtf.is_active
        FROM diet_template_food dtf

        LEFT JOIN item_master im 
            ON dtf.item_id = im.item_id

        LEFT JOIN item_group_master ig 
            ON im.item_group_id = ig.item_group_id

        LEFT JOIN item_category_master ic 
            ON im.item_category_id = ic.item_category_id

        LEFT JOIN unit_master um 
            ON dtf.unit_id = um.unit_id

        WHERE dtf.template_id = ?`,

            [data.template_id],

            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateDietTemplateFoodBulk: (dataArray, callBack) => {

        // Validate input
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return callBack(null, { success: 1, message: "No data to update" });
        }

        // Get single connection for transaction
        pool.getConnection((err, connection) => {
            if (err) return callBack(err);

            // Start transaction
            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }

                let completed = 0;
                let hasError = false;

                dataArray.forEach((item) => {

                    connection.query(
                        `UPDATE diet_template_food
                     SET item_id = ?, quantity = ?, unit_id = ?, updated_by = ?
                     WHERE template_food_id = ?`,
                        [
                            item.item_id,
                            item.quantity,
                            item.unit_id,
                            item.updated_by,
                            item.template_food_id
                        ],
                        (error, results) => {

                            if (hasError) return;

                            // If query fails → rollback بالكامل
                            if (error) {
                                hasError = true;

                                return connection.rollback(() => {
                                    connection.release();
                                    return callBack({
                                        success: 0,
                                        message: "Update failed",
                                        failedItem: item,
                                        error: error.message
                                    });
                                });
                            }

                            // If no row updated → treat as failure
                            if (results.affectedRows === 0) {
                                hasError = true;

                                return connection.rollback(() => {
                                    connection.release();
                                    return callBack({
                                        success: 0,
                                        message: "No row updated",
                                        failedItem: item
                                    });
                                });
                            }

                            completed++;

                            // All updates successful → commit
                            if (completed === dataArray.length) {
                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return callBack(err);
                                        });
                                    }

                                    connection.release();
                                    return callBack(null, {
                                        success: 2,
                                        message: "Bulk update successful"
                                    });
                                });
                            }
                        }
                    );
                });
            });
        });
    },
    inactiveDietFoodItem: (data, callBack) => {
        const {
            is_active,
            updated_by,
            template_food_id
        } = data;

        pool.query(
            `UPDATE diet_template_food
         SET
            is_active = ?,
            updated_by = ?
         WHERE template_food_id = ?`,
            [
                is_active,
                updated_by,
                template_food_id
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