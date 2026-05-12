const { pool } = require('../../config/database');
const { executeQuery } = require('../Canteen_Orders/Helper');

module.exports = {


    insertNewDietOrder: (order, details, canteenorder, canteenorderdetail, isPending, callback) => {

        // pool.getConnection((err, conn) => {
        //     if (err) return callback(err);

        //     conn.beginTransaction(err => {
        //         if (err) {
        //             conn.release();
        //             return callback(err);
        //         }

        //         // 1 INSERT DIET ORDER

        //         const insertDietOrderQuery = `
        //         INSERT INTO diet_order 
        //         (patient_id, plan_id, order_date, nursing_station_id, room_id, order_status, collected_by)
        //         VALUES (?, ?, ?, ?, ?, ?, ?)
        //     `;

        //         const dietValues = [
        //             order.patient_id,
        //             order.plan_id,
        //             order.order_date,
        //             order.nursing_station_id,
        //             order.room_id,
        //             order.order_status,
        //             order.collected_by
        //         ];

        //         conn.query(insertDietOrderQuery, dietValues, (err, result) => {
        //             if (err) {
        //                 return conn.rollback(() => {
        //                     conn.release();
        //                     callback(err);
        //                 });
        //             }

        //             const order_id = result.insertId;
        //             // 2 INSERT DIET DETAILS
        //             const dietDetailQuery = `
        //             INSERT INTO diet_order_detail
        //             (order_id, diet_type_id, item_id, quantity, unit_id, is_substitute)
        //             VALUES ?
        //         `;

        //             const dietDetailValues = details.map(item => [
        //                 order_id,
        //                 item.diet_type_id,
        //                 item.item_id,
        //                 item.quantity,
        //                 item.unit_id,
        //                 item.is_substitute
        //             ]);

        //             conn.query(dietDetailQuery, [dietDetailValues], (err2) => {
        //                 if (err2) {
        //                     return conn.rollback(() => {
        //                         conn.release();
        //                         callback(err2);
        //                     });
        //                 }
        //                 if (isPending === false) {
        //                     const insertCanteenQuery = `
        //                 INSERT INTO canteen_order
        //                 (admission_id, party_type_id, nursing_station_id, room_id, order_status, created_by)
        //                 VALUES (?, ?, ?, ?, ?, ?)
        //             `;

        //                     const canteenValues = [
        //                         canteenorder.admission_id,
        //                         canteenorder.party_type_id,
        //                         canteenorder.nursing_station_id,
        //                         canteenorder.room_id,
        //                         canteenorder.order_status,
        //                         canteenorder.created_by
        //                     ];

        //                     conn.query(insertCanteenQuery, canteenValues, (err3, result3) => {
        //                         if (err3) {
        //                             return conn.rollback(() => {
        //                                 conn.release();
        //                                 callback(err3);
        //                             });
        //                         }

        //                         const canteen_order_id = result3.insertId;

        //                         //  INSERT CANTEEN ITEMS
        //                         const canteenItemQuery = `
        //                     INSERT INTO canteen_order_item
        //                     (canteen_order_id, item_id, quantity, price,gst,gst_amount)
        //                     VALUES ?
        //                 `;

        //                         const canteenItemValues = canteenorderdetail.map(item => [
        //                             canteen_order_id,
        //                             item.item_id,
        //                             item.quantity,
        //                             item.price,
        //                             item.gst,
        //                             item.gst_amount
        //                         ]);

        //                         conn.query(canteenItemQuery, [canteenItemValues], (err4) => {
        //                             if (err4) {
        //                                 return conn.rollback(() => {
        //                                     conn.release();
        //                                     callback(err4);
        //                                 });
        //                             }
        //                             // 5 FINAL COMMIT
        //                             conn.commit(err5 => {
        //                                 conn.release();

        //                                 if (err5) {
        //                                     return conn.rollback(() => {
        //                                         callback(err5);
        //                                     });
        //                                 }

        //                                 return callback(null, order_id);
        //                             });
        //                         });
        //                     });
        //                 }
        //                 // 3 INSERT CANTEEN ORDER

        //             });
        //         });
        //     });
        // });

        pool.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction(err => {
                if (err) {
                    conn.release();
                    return callback(err);
                }

                // Step 1: Insert diet_order
                const insertDietOrderQuery = `
                INSERT INTO diet_order 
                (patient_id, plan_id, order_date, nursing_station_id, room_id, order_status, collected_by)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

                const dietValues = [
                    order.patient_id,
                    order.plan_id,
                    order.order_date,
                    order.nursing_station_id,
                    order.room_id,
                    order.order_status,
                    order.collected_by
                ];

                conn.query(insertDietOrderQuery, dietValues, (err, result) => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            callback(err);
                        });
                    }

                    const order_id = result.insertId;

                    // Step 2: Insert diet_order_detail
                    const dietDetailQuery = `
                    INSERT INTO diet_order_detail
                    (order_id, diet_type_id, item_id, quantity, unit_id, is_substitute)
                    VALUES ?
                `;

                    const dietDetailValues = details.map(item => [
                        order_id,
                        item.diet_type_id,
                        item.item_id,
                        item.quantity,
                        item.unit_id,
                        item.is_substitute
                    ]);

                    conn.query(dietDetailQuery, [dietDetailValues], (err2) => {
                        if (err2) {
                            return conn.rollback(() => {
                                conn.release();
                                callback(err2);
                            });
                        }

                        // Step 3: If no existing canteen order, create new one
                        if (isPending === false) {

                            const insertCanteenQuery = `
                            INSERT INTO canteen_order
                            (admission_id, party_type_id, nursing_station_id, room_id, order_status, created_by)
                            VALUES (?, ?, ?, ?, ?, ?)
                        `;

                            const canteenValues = [
                                canteenorder.admission_id,
                                canteenorder.party_type_id,
                                canteenorder.nursing_station_id,
                                canteenorder.room_id,
                                canteenorder.order_status,
                                canteenorder.created_by
                            ];

                            conn.query(insertCanteenQuery, canteenValues, (err3, result3) => {
                                if (err3) {
                                    return conn.rollback(() => {
                                        conn.release();
                                        callback(err3);
                                    });
                                }

                                const canteen_order_id = result3.insertId;

                                // Step 4: Insert canteen items
                                const canteenItemQuery = `
                                INSERT INTO canteen_order_item
                                (canteen_order_id, item_id, quantity, price, gst,type_slno, gst_amount)
                                VALUES ?
                            `;

                                const canteenItemValues = canteenorderdetail.map(item => [
                                    canteen_order_id,
                                    item.item_id,
                                    item.qty,
                                    item.price,
                                    item.gst,
                                    item.type_slno,
                                    item.gst_amount
                                ]);

                                conn.query(canteenItemQuery, [canteenItemValues], (err4) => {
                                    if (err4) {
                                        return conn.rollback(() => {
                                            conn.release();
                                            callback(err4);
                                        });
                                    }

                                    // Step 5: Commit transaction
                                    conn.commit(err5 => {
                                        conn.release();
                                        if (err5) return callback(err5);
                                        return callback(null, order_id);
                                    });
                                });
                            });

                        } else {

                            // Step 3 (alternative): Only diet, no canteen creation
                            conn.commit(err3 => {
                                conn.release();
                                if (err3) {
                                    return conn.rollback(() => callback(err3));
                                }
                                return callback(null, order_id);
                            });
                        }
                    });
                });
            });
        });
    },

    getOrderByPatient: (patient_id, callback) => {
        const query = `
                SELECT 
                    o.order_id,
                    o.order_date,
                    o.collected_time,
                    o.order_status,

                    d.diet_type_id,
                    d.order_detail_id,
                    dt.type_desc AS diet_type_name,  

                    d.item_id,
                    im.item_name,

                    d.quantity,
                    um.unit_code

                FROM diet_order o

                LEFT JOIN (
                    SELECT order_id
                    FROM diet_order
                    WHERE patient_id = ?
                    AND order_status <> 'PENDING'
                    ORDER BY collected_time DESC
                    LIMIT 5
                ) latest ON o.order_id = latest.order_id

                LEFT JOIN diet_order_detail d 
                    ON o.order_id = d.order_id

                LEFT JOIN item_master im 
                    ON d.item_id = im.item_id

                LEFT JOIN unit_master um 
                    ON d.unit_id = um.unit_id

                LEFT JOIN diet_type dt 
                    ON d.diet_type_id = dt.type_slno

                WHERE o.patient_id = ?
                AND (
                    o.order_status = 'PENDING'
                    OR latest.order_id IS NOT NULL
                )
                ORDER BY 
                    (o.order_status = 'PENDING') DESC,   
                    o.collected_time DESC
    `;

        pool.query(query, [patient_id, patient_id], (err, results) => {
            if (err) return callback(err);

            return callback(null, results);
        });
    },
    getAllDietDeliveryDetail: (collected_by, callback) => {
        const query = `
                SELECT 
                    o.order_id,
                    o.order_date,
                    o.collected_time,
                    o.order_status,

                    p.fb_ipad_slno AS patient_id,
                    p.fb_ip_no,
                    p.fb_pt_no,
                    p.fb_ptc_name AS patient_name,
                    p.fb_ptc_sex,
                    p.fb_ptn_yearage AS age,
                    p.fb_doc_name,
                    p.fb_dep_desc,

                    b.fb_bed_slno,
                    b.fb_bdc_no AS bed_no,
                    b.fb_rm_code AS room_no,

                    ns.fb_nurse_stn_slno,
                    ns.fb_ns_name AS nurse_station_name,

                    pdp.plan_id,
                    pdp.diet_status,
                    pdp.start_date,
                    pdp.end_date,
                    pdp.diet_id,

                    pdm.diet_name,
                    pdm.calories_per_day,
                    pdm.protein_per_day,
                    im.description,
                    
                    cm.em_name AS dietitian_name,

                    d.diet_type_id,
                    d.order_detail_id,
                    dt.type_desc AS diet_type_name,  
                    d.item_id,
                    im.item_name,
                    d.quantity,
                    um.unit_code

                FROM diet_order o

                LEFT JOIN fb_ipadmiss p 
                    ON o.patient_id = p.fb_ipad_slno

                LEFT JOIN fb_bed b 
                    ON o.room_id = b.fb_bed_slno

                LEFT JOIN fb_nurse_station_master ns 
                    ON o.nursing_station_id = ns.fb_nurse_stn_slno

                LEFT JOIN patient_diet_plan pdp 
                    ON p.fb_pt_no = pdp.patient_id
                    AND p.fb_ip_no = pdp.admission_id
                    AND pdp.is_active = 1

                -- Diet Master
                LEFT JOIN patient_diet_master pdm 
                    ON pdp.diet_id = pdm.diet_id

                -- Dietitian
                LEFT JOIN co_employee_master cm 
                    ON cm.em_id = pdp.dietitian_id

                -- Food Items
                LEFT JOIN diet_order_detail d 
                    ON o.order_id = d.order_id

                LEFT JOIN item_master im 
                    ON d.item_id = im.item_id

                LEFT JOIN unit_master um 
                    ON d.unit_id = um.unit_id

                LEFT JOIN diet_type dt 
                    ON d.diet_type_id = dt.type_slno

                WHERE 
                    o.collected_by = ?
                    AND o.order_status = 'PENDING'

                ORDER BY 
                    o.collected_time DESC
    `;

        pool.query(query, [collected_by], (err, results) => {
            if (err) return callback(err);

            return callback(null, results);
        });
    },
    getDeliveryDetailStatus: (
        patient_diet_id,
        item_id,
        delivered_qty,
        delivery_status,
        delivery_remarks,
        develivered_by,
        callback
    ) => {

        const query = `
        INSERT INTO diet_delivery_log (
            patient_diet_id,
            item_id,
            delivered_qty,
            delivery_status,
            delivery_remarks,
            develivered_by,
            delivered_time
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

        pool.query(
            query,
            [
                patient_diet_id,
                item_id,
                delivered_qty,
                delivery_status,
                delivery_remarks,
                develivered_by
            ],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },

    NewPatientOrderDetail: (
        plan_id, type_id, batch_id,
        callback
    ) => {

        const query = `
        SELECT 
            dpi.plan_id,
            dpi.production_item_status,
            dpi.production_item_id,
            dpi.item_id,
            im.item_name,
            ig.group_name as itemtype,
            dpi.required_qty as qty,
            um.unit_name,
            um.unit_code as measure,
            im.description as description,
            cip.price,
            cip.gst_rate,
            cip.discount,
            cip.discount_rate
        FROM diet_production_item dpi

        JOIN diet_production_batch dpb 
            ON dpi.batch_id = dpb.batch_id

        JOIN item_master im 
            ON dpi.item_id = im.item_id
            AND im.is_active = 1

        LEFT JOIN item_group_master ig 
            ON im.item_group_id = ig.item_group_id

        LEFT JOIN unit_master um 
            ON dpi.unit_id = um.unit_id

        LEFT JOIN canteen_item_price cip
            ON cip.item_id = im.item_id
            AND cip.party_type_id = 1

        WHERE dpi.plan_id = ?       
        AND dpb.type_id = ? 
         AND dpb.batch_id = ?
        AND dpi.production_item_status =  1        
        ORDER BY im.item_name
    `;

        pool.query(query, [plan_id, type_id, batch_id], (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        }
        );
    },
    CancelledOrderDetails: (
        plan_id, type_id, batch_id,
        callback
    ) => {

        const query = `
        SELECT 
            dpi.plan_id,
            dpi.production_item_id,
            dpi.item_id,

            im.item_name,
            ig.group_name AS itemtype,

            dpi.required_qty AS qty,
            um.unit_name,
            um.unit_code AS measure,

            im.description,
            cip.price,
            cip.gst_rate,
            cip.discount,
            cip.discount_rate,

            dpi.cancelled_by,
            emp.em_name AS cancelled_by_name,
            emp.em_no AS cancelled_emp_no,

            dpi.cancelled_date,
            dpi.cancelled_reason,


            dpi.new_order_taken_by,
            emp2.em_name AS new_order_taken_by_name,
            dpi.new_order_taken_date

        FROM diet_production_item dpi

        JOIN diet_production_batch dpb 
            ON dpi.batch_id = dpb.batch_id

        JOIN item_master im 
            ON dpi.item_id = im.item_id
            AND im.is_active = 1

        LEFT JOIN item_group_master ig 
            ON im.item_group_id = ig.item_group_id

        LEFT JOIN unit_master um 
            ON dpi.unit_id = um.unit_id

        LEFT JOIN canteen_item_price cip
            ON cip.item_id = im.item_id
            AND cip.party_type_id = 1


        LEFT JOIN co_employee_master emp 
            ON emp.em_id = dpi.cancelled_by


        LEFT JOIN co_employee_master emp2 
            ON emp2.em_id = dpi.new_order_taken_by

        WHERE dpi.plan_id = ?       
        AND dpb.type_id = ? 
        AND dpb.batch_id = ?
        AND dpi.production_item_status = 0   

        ORDER BY dpi.cancelled_date DESC
    `;

        pool.query(query, [plan_id, type_id, batch_id], (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        }
        );
    },



    InacitveCurrentBatchOrder: (data, callback) => {
        const query = `
        UPDATE diet_production_item
        SET 
            production_item_status = 0,
            cancelled_by = ?,
            cancelled_date = ?
        WHERE plan_id = ? 
        AND production_item_id = ?         
    `;
        const currentDate = new Date(); // current date/time
        pool.query(
            query,
            [
                data.emp_id,
                currentDate,
                data.plan_id,
                data.production_item_id
            ],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        );
    },

    TakeExtraDietFoodOrders: (values, callback) => {

        const query = `
        INSERT INTO diet_production_item (
            batch_id,
            item_id,
            required_qty,
            unit_id,
            diet_id,
            plan_id,
            new_order_taken_by,
            new_order_taken_date
        )
        VALUES ?
    `;

        pool.query(query, [values], (err, results) => {
            if (err) return callback(err);
            return callback(null, results);
        });
    },

    CancelPatientBatch: (data, callback) => {


        const query = `
        UPDATE diet_production_item
        SET 
            production_item_status = 0,
            cancelled_by = ?,
            cancelled_date = NOW(),
            cancelled_reason = ?
        WHERE 
            plan_id = ? 
            AND batch_id = ?
    `;

        pool.query(
            query,
            [
                data.cancelled_by,
                data.cancel_reason,
                data.plan_id,
                data.batch_id
            ],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        )
    },
    UpdateDietStatus: (order_status, order_id, updated_by, callback) => {
        const query = `
        UPDATE diet_order
        SET 
            order_status = ?,
            updated_by = ?
        WHERE 
            order_id = ? 
    `;

        pool.query(
            query,
            [
                order_status,
                updated_by,
                order_id
            ],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        )
    },
    UpdateFoodStatus: (is_active, item_id, order_id, callback) => {
        const query = `
        UPDATE diet_order_detail
        SET 
            is_active = ? 
        WHERE 
            item_id = ? and order_id = ?
    `;
        pool.query(
            query,
            [
                is_active,
                item_id,
                order_id
            ],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        )
    },


    AddDietItem: (values, callback) => {
        const query = `
            INSERT INTO diet_order_detail
                    (order_id, diet_type_id, item_id, quantity, unit_id, is_substitute)
                    VALUES ?
        `;

        executeQuery(query, [values], callback);
    },
};





