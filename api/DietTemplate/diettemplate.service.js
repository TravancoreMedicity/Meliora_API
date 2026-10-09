const { pool } = require('../../config/database');

module.exports = {

    insertDietTemplate: (data, callBack) => {

        pool.query(
            `INSERT INTO diet_template
            (
                diet_id,
                template_name,
                version_no,
                effective_from,
                effective_to,
                is_active,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.diet_id,
                data.template_name,
                data.version_no,
                data.effective_from,
                data.effective_to,
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


    updateDietTemplate: (data, callBack) => {

        pool.query(
            `UPDATE diet_template
            SET
                diet_id = ?,
                template_name = ?,
                version_no = ?,
                effective_from = ?,
                effective_to = ?,
                is_active = ?,
                updated_by = ?
            WHERE template_id = ?`,
            [
                data.diet_id,
                data.template_name,
                data.version_no,
                data.effective_from,
                data.effective_to,
                data.is_active,
                data.updated_by,
                data.template_id
            ],

            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );

    },


    getAllDietTemplate: (callBack) => {

        pool.query(
            `SELECT
                dt.template_id,
                dt.template_name,
                dt.diet_id,
                dt.version_no,
                dt.effective_from,
                dt.effective_to,
                dt.is_active,
                pdm.diet_name
            FROM
                diet_template dt
            LEFT JOIN patient_diet_master pdm 
            ON pdm.diet_id = dt.diet_id`,
            [],

            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );

    },
    checkDateOverlap: (data, callBack) => {
        pool.query(
            `SELECT *
         FROM diet_template
         WHERE diet_id = ?
         AND is_active = 1
         AND (
             (? <= effective_to) AND (? >= effective_from)
         )`,
            [
                data.diet_id,
                data.effective_from,
                data.effective_to
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },
    checkDateOverlapForUpdate: (data, callBack) => {
        pool.query(
            `SELECT *
         FROM diet_template
         WHERE diet_id = ?
         AND template_id != ?
         AND is_active = 1
         AND (
             (? <= effective_to) AND (? >= effective_from)
         )`,
            [
                data.diet_id,
                data.template_id,
                data.effective_from,
                data.effective_to
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

};