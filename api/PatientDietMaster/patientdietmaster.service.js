const { pool } = require('../../config/database');

module.exports = {

    insertPatientDietMaster: (data, callBack) => {

        pool.query(
            `INSERT INTO patient_diet_master
            (
                diet_name,
                speciality_id,
                calories_per_day,
                protein_per_day,
                description,
                is_active,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.diet_name,
                data.speciality_id,
                data.calories_per_day,
                data.protein_per_day,
                data.description,
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


    updatePatientDietMaster: (data, callBack) => {

        pool.query(
            `UPDATE patient_diet_master
            SET
                diet_name = ?,
                speciality_id = ?,
                calories_per_day = ?,
                protein_per_day = ?,
                description = ?,
                is_active = ?,
                updated_by = ?
            WHERE diet_id = ?`,
            [
                data.diet_name,
                data.speciality_id,
                data.calories_per_day,
                data.protein_per_day,
                data.description,
                data.is_active,
                data.updated_by,
                data.diet_id
            ],

            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );

    },


    getAllPatientDietMaster: (callBack) => {

        pool.query(
            `SELECT
                diet_id,
                diet_name,
                pdm.speciality_id,
                calories_per_day,
                protein_per_day,
                description,
                pdm.is_active,
                speciality_name
            FROM
                patient_diet_master pdm
            left join diet_speciality_master dsm on dsm.speciality_id = pdm.speciality_id`,
            [],

            (error, results, fields) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );

    }

};