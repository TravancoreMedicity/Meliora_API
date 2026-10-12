const { pool } = require('../../config/database');

module.exports = {

    insertUnitMaster: (data, callBack) => {
        pool.query(
            `INSERT INTO unit_master
            (
                unit_name,
                unit_code,
                unit_type,
                is_active,
                created_by
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.unit_name,
                data.unit_code,
                data.unit_type,
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

    updateUnitMaster: (data, callBack) => {
        pool.query(
            `UPDATE unit_master
            SET
                unit_name = ?,
                unit_code = ?,
                unit_type = ?,
                is_active = ?,
                updated_by = ?
            WHERE unit_id = ?`,
            [
                data.unit_name,
                data.unit_code,
                data.unit_type,
                data.is_active,
                data.updated_by,
                data.unit_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllUnitMaster: (callBack) => {
        pool.query(
            `SELECT
                unit_id,
                unit_name,
                unit_code,
                unit_type,
                is_active
            FROM unit_master`,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}