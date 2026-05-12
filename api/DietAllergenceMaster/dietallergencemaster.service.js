const { pool } = require('../../config/database');

module.exports = {

    insertDietAllergenceService: (data, callBack) => {

        pool.query(
            `INSERT INTO allergen_master
            (
                allergen_name,
                allergen_description,
                severity_level,
                is_active,
                created_by
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.allergen_name,
                data.allergen_description,
                data.severity_level,
                data.is_active,
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

    updateAllergenceService: (data, callBack) => {

        pool.query(
            `UPDATE allergen_master
            SET
                allergen_name = ?,
                allergen_description = ?,
                severity_level = ?,
                is_active = ?,
                updated_by = ?
            WHERE allergen_id = ?`,
            [
                data.allergen_name,
                data.allergen_description,
                data.severity_level,
                data.is_active,
                data.updated_by,
                data.allergen_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllDietAllergenceService: (callBack) => {

        pool.query(
            `SELECT
                allergen_id,
                allergen_name,
                allergen_description,
                severity_level,
                is_active
            FROM allergen_master`,
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