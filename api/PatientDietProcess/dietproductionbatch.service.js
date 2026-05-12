const { pool } = require('../../config/database');

module.exports = {


    insertDietProductionBatch: (data, itemDetail, callBack) => {

        pool.getConnection((err, connection) => {
            if (err) return callBack(err);

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }

                // 1. INSERT BATCH
                const batchValues = data.map(item => [
                    item.production_date,
                    item.type_id,
                    item.is_active ?? true,
                    item.remark ?? null,
                    item.processed_by ?? null,
                    item.processed_at ?? null
                ]);

                connection.query(
                    `INSERT INTO diet_production_batch
                (production_date, type_id, is_active, remarks, processed_by, processed_at)
                VALUES ?`,
                    [batchValues],
                    (error, results) => {

                        if (error) {
                            return connection.rollback(() => {
                                connection.release();
                                callBack(error);
                            });
                        }


                        // 2. GET batch_ids

                        const batchIds = [];
                        for (let i = 0; i < results.affectedRows; i++) {
                            batchIds.push(results.insertId + i);
                        }


                        // 3. BUILD FAST LOOKUP MAP

                        // KEY = type_id + diet_id
                        const itemMap = {};

                        itemDetail.forEach(item => {
                            const key = `${item.type_id}_${item.diet_id}`;

                            if (!itemMap[key]) {
                                itemMap[key] = [];
                            }

                            itemMap[key].push(item);
                        });

                        // 4. MAP ITEMS TO BATCH (NO NESTED LOOP)
                        const itemValues = [];
                        data.forEach((batchRow, index) => {
                            const batch_id = batchIds[index];
                            batchRow.diet_ids.forEach(dietId => {
                                const key = `${batchRow.type_id}_${dietId}`;
                                const matchedItems = itemMap[key] || [];
                                matchedItems?.forEach(item => {
                                    itemValues.push([
                                        batch_id,
                                        item.item_id,
                                        item.diet_id,
                                        item.quantity,
                                        item.unit_id,
                                        item.plan_id ?? null,
                                        item.canteen_order_id ?? null,
                                        item.extra_order_id ?? null
                                    ]);
                                });
                            });
                        });

                        // 5. INSERT ITEMS
                        if (itemValues.length === 0) {
                            return connection.commit(err => {
                                connection.release();
                                if (err) return callBack(err);

                                return callBack(null, { batchIds, itemInserted: 0 });
                            });
                        }
                        connection.query(
                            `INSERT INTO diet_production_item
                        (batch_id, item_id,diet_id, required_qty, unit_id,plan_id,canteen_order_id,extra_order_id)
                        VALUES ?`,
                            [itemValues],
                            (err2, result2) => {

                                if (err2) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callBack(err2);
                                    });
                                }
                                // 6. COMMIT
                                connection.commit(err3 => {
                                    connection.release();
                                    if (err3) {
                                        return callBack(err3);
                                    }
                                    return callBack(null, {
                                        batchIds,
                                        itemInserted: result2.affectedRows
                                    });
                                });
                            }
                        );
                    }
                );
            });
        });
    },

    updateDietProductionBatch: (data, callBack) => {

        pool.query(
            `UPDATE diet_production_batch
            SET
                production_date = ?,
                type_id = ?,
                is_active = ?,
                remarks = ?,
                processed_by = ?,
                processed_at = ?,
                cancelled_by = ?,
                cancelled_at = ?
            WHERE batch_id = ?`,
            [
                data.production_date,
                data.type_id,
                data.is_active,
                data.remarks,
                data.processed_by,
                data.processed_at,
                data.cancelled_by,
                data.cancelled_at,
                data.batch_id
            ],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },




    getAllDietProductionBatch: (date, callBack) => {
        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        pool.query(
            `   
            SELECT 
                    dpb.batch_id,
                        dpb.type_id,
                        dt.type_desc,
                        dpi.diet_id,
                        dm.diet_name,
                        dpb.processed_at,
                COUNT(DISTINCT dpi.plan_id) AS total_plans,
                GROUP_CONCAT(DISTINCT dpi.plan_id) AS plan_ids
            FROM diet_production_batch dpb
            LEFT JOIN diet_type dt 
                ON dt.type_slno = dpb.type_id
            LEFT JOIN diet_production_item dpi
                ON dpi.batch_id = dpb.batch_id
                LEFT JOIN patient_diet_master dm
                        ON dm.diet_id = dpi.diet_id
            WHERE dpb.production_date BETWEEN ? AND ?
            GROUP BY dpb.batch_id
            ORDER BY dpb.type_id`,
            [startDate, endDate],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    },

    getAllBatchProductionItem: (date, callBack) => {

        const startDate = `${date} 00:00:00`;
        const endDate = `${date} 23:59:59`;

        pool.query(
            `   
            SELECT 
                dpb.batch_id,
                dpb.type_id,
                dt.type_desc,

                dpi.diet_id,
                dm.diet_name,

                dpb.processed_at,

                pdm.plan_id, 
                pdm.patient_id, 
                pdm.admission_id, 

                dp.fb_ip_no        AS ip_no,
                dp.fb_pt_no        AS pt_no,
                dp.fb_ptc_name     AS ptc_ptname,

                fb.fb_bd_code,
                fns.fb_ns_code,
                fns.fb_ns_name,

                pdm.diet_status

            FROM diet_production_item dpi

            LEFT JOIN diet_production_batch dpb
                ON dpi.batch_id = dpb.batch_id

            LEFT JOIN patient_diet_master dm
                ON dm.diet_id = dpi.diet_id

            LEFT JOIN patient_diet_plan pdm
                ON pdm.plan_id = dpi.plan_id  

            LEFT JOIN fb_ipadmiss dp  
                ON pdm.patient_id = dp.fb_pt_no
                AND pdm.admission_id = dp.fb_ip_no

            LEFT JOIN fb_bed fb
                ON fb.fb_bd_code = dp.fb_bd_code
                            
            LEFT JOIN fb_nurse_station_master fns
                ON fns.fb_ns_code = fb.fb_ns_code

            LEFT JOIN diet_type dt
                ON dpb.type_id = dt.type_slno

            WHERE DATE(dpb.production_date) BETWEEN ? AND ?

            GROUP BY 
                dpb.batch_id,
                dpb.type_id,
                pdm.plan_id
    `,
            [startDate, endDate],
            (error, results) => {
                if (error) return callBack(error);
                return callBack(null, results);
            }
        );
    }



};