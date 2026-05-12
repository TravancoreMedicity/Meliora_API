const { pool } = require('../../config/database');

module.exports = {
    insertDietSpecialityDetail: (data, callBack) => {
        pool.query(
            `INSERT INTO diet_speciality_master
        (
            speciality_name,
            clinical_description,
            applicable_condition,
            is_active,
            created_by
        ) VALUES (?, ?, ?, ?, ?)`,
            [
                data.speciality_name,
                data.clinical_description,
                data.applicable_condition,
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
    updateinsertDietSpecialityDetail: (data, callBack) => {
        pool.query(
            `UPDATE diet_speciality_master
            SET 
                speciality_name = ?,
                clinical_description = ?,
                applicable_condition = ?,
                is_active = ?,
                updated_by = ?
            WHERE speciality_id = ?`,
            [
                data.speciality_name,
                data.clinical_description,
                data.applicable_condition,
                data.is_active,
                data.updated_by,
                data.speciality_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }, getAllinsertDietSpecialityDetail: (callBack) => {
        pool.query(
            `
            SELECT 
                speciality_id,
                speciality_name,
                clinical_description,
                applicable_condition,
                is_active
            FROM
                diet_speciality_master;
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


}