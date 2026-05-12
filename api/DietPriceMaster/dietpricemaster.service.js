const { pool } = require('../../config/database');

module.exports = {

    // INSERT WITH TRANSACTION
    insertDietPrice: (data, callBack) => {
        const {
            diet_id,
            diet_rm_category_slno,
            party_type_id,
            daily_rate,
            half_day_rate,
            gst_rate,
            created_by
        } = data;

        const gst_amount = ((Number(daily_rate || 0) * Number(gst_rate || 0)) / 100);

        pool.query(
            `INSERT INTO diet_price_master
        (diet_id, diet_rm_category_slno, party_type_id,
         daily_rate, half_day_rate, gst_rate, gst_amount, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                diet_id,
                diet_rm_category_slno,
                party_type_id,
                daily_rate,
                half_day_rate,
                gst_rate,
                gst_amount,
                created_by
            ],
            (error, results) => {

                if (error) {

                    let customMessage = error;

                    // Optional duplicate handling
                    if (error.code === "ER_DUP_ENTRY") {
                        customMessage = "This Diet + Room + Party already exists";
                    }

                    return callBack({
                        stage: "INSERT",
                        message: customMessage
                    });
                }

                return callBack(null, results);
            }
        );
    },
    // GET
    getDietPrice: (data, callBack) => {
        pool.query(
            `SELECT 
                dp.price_id,
                dp.diet_id,
                d.diet_name,

                dp.diet_rm_category_slno,
                rc.diet_rm_name,

                dp.party_type_id,
                pt.party_name,

                dp.daily_rate,
                dp.half_day_rate,
                dp.gst_rate,
                dp.gst_amount

            FROM diet_price_master dp

            LEFT JOIN patient_diet_master d
                ON d.diet_id = dp.diet_id

            LEFT JOIN diet_room_category_master rc
                ON rc.diet_rm_category_slno = dp.diet_rm_category_slno

            LEFT JOIN order_party_type pt
                ON pt.party_type_id = dp.party_type_id

            WHERE dp.diet_id = ? `,
            [data.diet_id],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    // UPDATE
    updateDietPrice: (data, callBack) => {

        const {
            diet_price_id,
            diet_rm_category_slno,
            party_type_id,
            daily_rate,
            half_day_rate,
            gst_rate,
            updated_by
        } = data;

        const gst_amount = ((Number(daily_rate || 0) * Number(gst_rate || 0)) / 100);

        pool.query(
            `UPDATE diet_price_master
         SET
            diet_rm_category_slno = ?,
            party_type_id = ?,
            daily_rate = ?,
            half_day_rate = ?,
            gst_rate = ?,
            gst_amount = ?,
            updated_by = ?
         WHERE price_id = ?`,
            [
                diet_rm_category_slno,
                party_type_id,
                daily_rate,
                half_day_rate,
                gst_rate,
                gst_amount,
                updated_by,
                diet_price_id
            ],
            (error, results) => {
                if (error) {
                    let customMessage = error;
                    if (error.code === "ER_DUP_ENTRY") {
                        customMessage = "This Diet + Room + Party already exists";
                    }
                    return callBack({
                        stage: "UPDATE",
                        message: customMessage
                    });
                }
                return callBack(null, results);
            }
        );
    }
};