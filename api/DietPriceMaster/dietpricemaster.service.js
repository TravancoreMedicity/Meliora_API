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

    getDietPriceDetailService: (data, callBack) => {
        pool.query(
            `SELECT
                dpd.detail_id,
                dpd.price_id,
                dpd.type_slno,
                dt.type_desc,
                dpd.meal_rate,
                dpd.is_active,
                dpd.created_by,
                dpd.created_at,
                dpd.updated_by,
                dpd.updated_at
            FROM diet_price_detail dpd
            INNER JOIN diet_type dt
                ON dpd.type_slno = dt.type_slno
            WHERE dpd.price_id = ?
            ORDER BY dt.start_time `,
            [data.price_id],
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
    },
    insertDietMealPriceService: (data, callBack) => {
        pool.query(
            ` INSERT INTO diet_price_detail
        (
            price_id,
            type_slno,
            meal_rate,
            is_active,
            created_by
        )
        VALUES (?,?,?,?,?)
    `,
            [
                data.price_id,
                data.type_slno,
                data.meal_rate,
                data.is_active,
                data.created_by
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    updateDietMealPriceService: (data, callBack) => {
        pool.query(
            `UPDATE diet_price_detail
            SET
                meal_rate = ?,
                is_active = ?,
                updated_by = ?
            WHERE detail_id = ?
    `,
            [
                data.meal_rate,
                data.is_active,
                data.updated_by,
                data.detail_id
            ],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },


};