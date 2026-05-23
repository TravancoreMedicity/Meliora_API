const { pool } = require('../../config/database');
const { executeQuery } = require('./Helper');

module.exports = {

    /* CREATE ORDER + ITEMS (TRANSACTION) */
    // createOrder: (order, items, callback) => {

    //     pool.getConnection((err, conn) => {
    //         if (err) return callback(err);

    //         conn.beginTransaction(err => {
    //             if (err) return callback(err);

    //             const orderQuery = `
    //                 INSERT INTO canteen_order
    //                 (admission_id, party_type_id, nursing_station_id, room_id, created_by,order_status)
    //                 VALUES (?, ?, ?, ?, ?)
    //             `;

    //             conn.query(orderQuery, [
    //                 order.admission_id,
    //                 order.party_type_id,
    //                 order.nursing_station_id,
    //                 order.room_id,
    //                 order.created_by,
    //                 order.status || 'PENDING'
    //             ], (err, result) => {

    //                 if (err) return conn.rollback(() => callback(err));

    //                 const orderId = result.insertId;

    //                 const itemQuery = `
    //                     INSERT INTO canteen_order_item
    //                     (canteen_order_id, item_id, quantity, price, gst, gst_amount,is_active)
    //                     VALUES ?
    //                 `;

    //                 const itemValues = items.map(item => [
    //                     orderId,
    //                     item.item_id,
    //                     item.qty,
    //                     item.price,
    //                     item.gst,
    //                     item.gst_amount,
    //                     1
    //                 ]);

    //                 conn.query(itemQuery, [itemValues], (err) => {
    //                     if (err) return conn.rollback(() => callback(err));


    //                     if (order.isExtra) {
    //                         const mappedValues = items.map(item => ([
    //                             order.patient_id,
    //                             item.item_id,
    //                             item.qty,
    //                             order.order_status || 'PENDING',
    //                             item.price,
    //                             item.gst,
    //                             item.gst_amount,
    //                             order.created_by
    //                         ]));

    //                         const ExtraOrderQuery = `
    //                      INSERT INTO patient_extra_order (
    //                         patient_id,
    //                         item_id,
    //                         quantity,
    //                         order_status,
    //                         price,
    //                         gst,
    //                         gst_amount,
    //                         created_by
    //                     ) VALUES ?
    //                 `;

    //                     }
    //                     conn.commit(err => {
    //                         if (err) return conn.rollback(() => callback(err));

    //                         return callback(null, { orderId });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // },


    createOrder: (order, items, callback) => {

        pool.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction(err => {
                if (err) {
                    conn.release();
                    return callback(err);
                }

                const orderQuery = `
                INSERT INTO canteen_order
                (admission_id, party_type_id, nursing_station_id, room_id, created_by, order_status)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

                conn.query(orderQuery, [
                    order.admission_id,
                    order.party_type_id,
                    order.nursing_station_id,
                    order.room_id,
                    order.created_by,
                    order.status || 'PENDING'
                ], (err, result) => {

                    if (err) {
                        return conn.rollback(() => {
                            conn.release();
                            callback(err);
                        });
                    }

                    const orderId = result.insertId;

                    const itemQuery = `
                    INSERT INTO canteen_order_item
                    (canteen_order_id, item_id, quantity, price, gst,type_slno, gst_amount, is_active)
                    VALUES ?
                `;

                    const itemValues = items.map(item => [
                        orderId,
                        item.item_id,
                        item.qty,
                        item.price,
                        item.gst,
                        item.type_slno,
                        item.gst_amount,
                        1
                    ]);

                    conn.query(itemQuery, [itemValues], (err) => {
                        if (err) {
                            return conn.rollback(() => {
                                conn.release();
                                callback(err);
                            });
                        }

                        //  HANDLE EXTRA ORDER
                        if (order.isExtra) {

                            const extraValues = items.map(item => ([
                                order.patient_id,
                                item.item_id,
                                item.qty,
                                order.order_status || 'PENDING',
                                item.price,
                                item.gst,
                                item.gst_amount,
                                order.created_by
                            ]));

                            const extraQuery = `
                            INSERT INTO patient_extra_order (
                                patient_id,
                                item_id,
                                quantity,
                                order_status,
                                price,
                                gst,
                                gst_amount,
                                created_by
                            ) VALUES ?
                        `;

                            conn.query(extraQuery, [extraValues], (err) => {
                                if (err) {
                                    return conn.rollback(() => {
                                        conn.release();
                                        callback(err);
                                    });
                                }

                                // commit after extra insert
                                conn.commit(err => {
                                    if (err) {
                                        return conn.rollback(() => {
                                            conn.release();
                                            callback(err);
                                        });
                                    }

                                    conn.release();
                                    return callback(null, { orderId });
                                });
                            });

                        } else {
                            //  commit if no extra order
                            conn.commit(err => {
                                if (err) {
                                    return conn.rollback(() => {
                                        conn.release();
                                        callback(err);
                                    });
                                }

                                conn.release();
                                return callback(null, { orderId });
                            });
                        }
                    });
                });
            });
        });
    },

    /*  GET ALL */
    //     getFullOrders: (status, callback) => {
    //         const query = `
    //         SELECT 
    //     co.canteen_order_id,
    //     co.admission_id,
    //     co.order_time,
    //     co.order_status,

    //     ns.fb_ns_name,
    //     ns.fb_ns_code,
    //     fb.fb_bd_code,
    //     fb.fb_bdc_no,

    //     ip.fb_ptc_name,
    //     ip.fb_pt_no,
    //     ip.fb_ipad_slno,

    //     opt.party_name,
    //     opt.party_type_id,


    //     d.order_id,
    //     d.order_date,
    //     d.plan_id

    // FROM canteen_order co

    // LEFT JOIN fb_nurse_station_master ns 
    //     ON co.nursing_station_id = ns.fb_nurse_stn_slno

    // LEFT JOIN fb_bed fb 
    //     ON co.room_id = fb.fb_bed_slno


    // LEFT JOIN fb_ipadmiss ip 
    //     ON co.admission_id = ip.fb_ip_no

    // LEFT JOIN order_party_type opt
    //     ON co.party_type_id = opt.party_type_id

    // LEFT JOIN diet_order d 
    //     ON d.patient_id = ip.fb_ipad_slno
    //     AND co.party_type_id = 2 and d.order_status = ?

    // WHERE co.order_status = ?

    // ORDER BY 
    //     co.order_time ASC,
    //     co.canteen_order_id ASC`
    //         executeQuery(query, [status, status], callback);
    //     },


    getFullOrders: (status, callback) => {

        const includeDietJoin = status !== 'CONFIRMED';

        const query = `
SELECT 
    co.canteen_order_id,
    co.admission_id,
    co.order_time,
    co.order_status,

    ns.fb_ns_name,
    ns.fb_ns_code,

    fb.fb_bd_code,
    fb.fb_bdc_no,

    ip.fb_ptc_name,
    ip.fb_pt_no,
    ip.fb_ipad_slno,

    opt.party_name,
    opt.party_type_id

    ${includeDietJoin ? `,
    d.order_id,
    d.order_date,
    d.plan_id
    ` : ``}

FROM canteen_order co

LEFT JOIN fb_nurse_station_master ns 
    ON co.nursing_station_id = ns.fb_nurse_stn_slno

LEFT JOIN fb_bed fb 
    ON co.room_id = fb.fb_bed_slno

LEFT JOIN fb_ipadmiss ip 
    ON co.admission_id = ip.fb_ip_no

LEFT JOIN order_party_type opt
    ON co.party_type_id = opt.party_type_id

${includeDietJoin ? `
LEFT JOIN diet_order d 
    ON d.patient_id = ip.fb_ipad_slno
    AND co.party_type_id = 2
    AND d.order_status = ?
` : ``}

WHERE co.order_status = ?

ORDER BY 
    co.order_time ASC,
    co.canteen_order_id ASC
`;

        const params = includeDietJoin
            ? [status, status]
            : [status];

        executeQuery(query, params, callback);
    },
    /*  GET ONE */
    getOrderById: (id, callback) => {
        const query = `
           SELECT 
                co.*,
                coi.*,

                im.item_name,
                im.item_code,
                im.item_alias,
                im.description,

                ig.group_name,
                ic.category_name,
                dt.type_desc

            FROM canteen_order co

            LEFT JOIN canteen_order_item coi 
                ON co.canteen_order_id = coi.canteen_order_id

            LEFT JOIN item_master im 
                ON coi.item_id = im.item_id

            LEFT JOIN item_group_master ig
                ON im.item_group_id = ig.item_group_id

            LEFT JOIN item_category_master ic
                ON im.item_category_id = ic.item_category_id

            LEFT JOIN diet_type dt
                ON dt.type_slno = coi.type_slno

            WHERE co.canteen_order_id = ?
            AND coi.is_active = 1
        `;

        executeQuery(query, [id], callback);
    },

    /*  UPDATE STATUS */
    updateOrderStatus: (id, status, updated_by, callback) => {
        const query = `
            UPDATE canteen_order
            SET order_status = ?,
            updated_by = ?
            WHERE canteen_order_id = ?
        `;

        executeQuery(query, [status, updated_by, id], callback);
    },
    getBatchItemDetail: (canteenIds, callback) => {

        const placeholders = canteenIds.map(() => '?').join(',');

        const query = `
        SELECT
            coi.type_slno,
            coi.canteen_order_id,
            coi.item_id,
            im.item_name,
            dt.type_desc,
            SUM(coi.quantity) AS total_qty

        FROM canteen_order_item coi

        INNER JOIN canteen_order co
            ON co.canteen_order_id = coi.canteen_order_id

        LEFT JOIN diet_type dt
        ON dt.type_slno=coi.type_slno

         LEFT JOIN item_master im
                ON coi.item_id = im.item_id

        WHERE coi.canteen_order_id IN (${placeholders})
        AND co.order_status = 'CONFIRMED'

        GROUP BY
            coi.type_slno,
            coi.item_id
    `;

        executeQuery(query, canteenIds, callback);
    },


    /*  CANCEL */
    cancelOrder: (id, callback) => {
        const query = `
            UPDATE canteen_order
            SET order_status = 'CANCELLED'
            WHERE canteen_order_id = ?
        `;

        executeQuery(query, [id], callback);
    },
    UpdateItemQuantity: (canteen_order_item_id, updatedQty, callback) => {
        const query = `
            UPDATE canteen_order_item
            SET quantity = ?
            WHERE canteen_order_item_id = ?
        `;

        executeQuery(query, [updatedQty, canteen_order_item_id], callback);
    },



    CancelCanteenOrders: (is_active, canteen_order_item_id, callback) => {
        const query = `
            UPDATE canteen_order_item 
            SET is_active = ?
            WHERE canteen_order_item_id = ?
        `;

        executeQuery(query, [is_active, canteen_order_item_id], callback);
    },

    getActivePatientDetail: (bd_code, callback) => {
        const query = `
           
    SELECT 
        ip.fb_ipad_slno,
        ip.fb_ip_no,
        ip.fb_ipd_date,
        ip.fb_pt_no,
        ip.fb_ptc_name,
        ip.fb_ptc_sex,

   
        ip.fb_ptn_dayage,
        ip.fb_ptn_monthage,
        ip.fb_ptn_yearage,
        ip.fb_ptd_dob,

      
        ip.fb_ptc_loadd1,
        ip.fb_ptc_loadd2,
        ip.fb_ptc_loadd3,
        ip.fb_ptc_loadd4,

        
        ip.fb_ptc_mobile,

        -- DOCTOR / STATUS
        ip.fb_doc_name,
        ip.fb_ipc_curstatus,
        ip.fb_dep_desc,

        
        fb.fb_bd_code,
        fb.fb_bdc_no,
        fb.fb_bed_slno,

        
        ns.fb_ns_name,
        ns.fb_ns_code,
        ns.fb_nurse_stn_slno,

        -- DIET PLAN
        pdp.plan_id,
        pdp.diet_status,
        pdp.start_date,
        pdp.end_date,
        pdp.diet_id,

        -- DIET MASTER
        pdm.diet_name,
        pdm.calories_per_day,
        pdm.protein_per_day,
        pdm.description,

        -- DIETICIAN
        cm.em_name AS dietician_name

    FROM fb_ipadmiss ip

    INNER JOIN fb_bed fb 
        ON fb.fb_bd_code = ip.fb_bd_code

    INNER JOIN fb_nurse_station_master ns 
        ON ns.fb_ns_code = fb.fb_ns_code

    LEFT JOIN patient_diet_plan pdp 
        ON pdp.admission_id = ip.fb_ip_no
        AND pdp.is_active = 1

    LEFT JOIN patient_diet_master pdm 
        ON pdm.diet_id = pdp.diet_id 

    LEFT JOIN co_employee_master cm 
        ON cm.em_id = pdp.dietitian_id

    WHERE fb.fb_bd_code = ?
    AND (ip.fb_ipc_curstatus IS NULL OR ip.fb_ipc_curstatus <> 'PCO')
    AND ip.fb_ipd_disc IS NULL

    ORDER BY ip.fb_ip_no DESC`;

        executeQuery(query, bd_code, callback);
    },

    /*  DELETE */
    deleteOrder: (id, callback) => {

        const deleteItems = `
            DELETE FROM canteen_order_item 
            WHERE canteen_order_id = ?
        `;

        const deleteOrder = `
            DELETE FROM canteen_order 
            WHERE canteen_order_id = ?
        `;

        executeQuery(deleteItems, [id], (err) => {
            if (err) return callback(err);

            executeQuery(deleteOrder, [id], callback);
        });
    },

    /*  BULK INSERT ITEMS */
    insertExtraOrderItems: (values, callback) => {
        const query = `
            INSERT INTO canteen_order_item (
                canteen_order_id,
                item_id,
                quantity,
                price,
                gst,
                type_slno,
                gst_amount
            )
            VALUES ?
        `;

        executeQuery(query, [values], callback);
    },
    GetAllActiveBedDetail: (callback) => {
        const query = `
            SELECT 
                fb_bed_slno,
                fb_bd_code,
                fb_bdc_no
            FROM  fb_bed
            WHERE
                fb_bdc_status = 'Y'`;

        executeQuery(query, callback);
    },



    ExtraCanteenOrderDetail: (patient_id, callback) => {
        const query = `
            SELECT 
                eo.extra_order_id,
                eo.order_time,
                eo.order_status,

                eo.item_id,
                im.item_name,
                eo.quantity,
                eo.price,
                eo.gst,
                eo.gst_amount

            FROM patient_extra_order eo

            LEFT JOIN item_master im
                ON eo.item_id = im.item_id

            WHERE eo.patient_id = ? 
            AND eo.is_active = 1
            AND eo.order_status ='PENDING'

            ORDER BY eo.order_time DESC
        `;

        executeQuery(query, [patient_id], callback);
    },


    getAllActivePatients: (ns_code, callback) => {
        const query = `
               SELECT 
                ip.fb_ip_no,
                ip.fb_ipad_slno,
                ip.fb_ipd_date,
                ip.fb_pt_no,
                ip.fb_ptc_name,
                ip.fb_ptc_sex,
                ip.fb_ptd_dob,
                ip.fb_ptc_mobile,
                ip.fb_ptn_yearage,
                ip.fb_ipc_curstatus,
                ip.fb_doc_name,

                fb.fb_bd_code,
                fb.fb_bdc_no,
                fb.fb_bed_slno,

                ns.fb_ns_name,
                ns.fb_ns_code,

                -- Diet (OPTIONAL)
                pdp.plan_id,
                pdp.diet_status,
                pdp.start_date,
                pdp.end_date,
                pdp.diet_id,

                pdm.diet_name,
                pdm.calories_per_day,
                pdm.protein_per_day,
                pdm.description,

                cm.em_name AS dietician_name

            FROM fb_ipadmiss ip

            -- Bed + NS (mandatory)
            INNER JOIN fb_bed fb 
                ON fb.fb_bd_code = ip.fb_bd_code

            INNER JOIN fb_nurse_station_master ns 
                ON ns.fb_ns_code = fb.fb_ns_code

            LEFT JOIN patient_diet_plan pdp 
                ON ip.fb_pt_no = pdp.patient_id
                AND ip.fb_ip_no = pdp.admission_id
                AND pdp.is_active = 1

            LEFT JOIN patient_diet_master pdm 
                ON pdp.diet_id = pdm.diet_id

            LEFT JOIN co_employee_master cm 
                ON cm.em_id = pdp.dietitian_id

            -- FILTER
            WHERE ns.fb_ns_code = ?
            AND (ip.fb_ipc_curstatus IS NULL OR ip.fb_ipc_curstatus <> 'PCO')

            ORDER BY ip.fb_ip_no DESC
        `;

        executeQuery(query, [ns_code], callback);
    },

    CanteenOrderDetail: (admission_Id, party_type_id, callback) => {
        const query = `
            SELECT 
                o.canteen_order_id,
                o.order_time,
                o.order_status,

                i.item_id,
                im.item_name,
                i.quantity,
                i.price,
                i.gst,
                i.gst_amount,
                i.type_slno

            FROM canteen_order o

            LEFT JOIN canteen_order_item i
                ON o.canteen_order_id = i.canteen_order_id

            LEFT JOIN item_master im
                ON i.item_id = im.item_id

            WHERE o.admission_id = ? AND o.party_type_id = ? AND o.order_status = 'PENDING'

            ORDER BY o.order_time DESC
        `;
        executeQuery(query, [admission_Id, party_type_id], callback);
    },
    PatientLastWeekOrders: (admission_Id, party_type_id, callback) => {
        const query = `
            SELECT 
                o.canteen_order_id,
                o.order_time,
                o.order_status,

                i.item_id,
                im.item_name,
                i.quantity,
                i.price,
                i.gst,
                i.gst_amount,
                canteen_order_item_id

            FROM canteen_order o

            LEFT JOIN canteen_order_item i
                ON o.canteen_order_id = i.canteen_order_id and  is_active = 1

            LEFT JOIN item_master im
                ON i.item_id = im.item_id

            WHERE 
                o.admission_id = ?
                AND o.party_type_id = ?
                AND o.order_time >= NOW() - INTERVAL 7 DAY   

            ORDER BY 
                o.order_time DESC,
                o.canteen_order_id DESC
        `;
        executeQuery(query, [admission_Id, party_type_id], callback);
    },

    UpdateAllQuantitiesService: (canteen = [], diet = [], extra = [], callback) => {

        pool.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction(async err => {
                if (err) {
                    conn.release();
                    return callback(err);
                }

                try {

                    /*
                        * Builds a safe bulk UPDATE query using CASE WHEN for multiple rows
                        *
                        * Purpose:
                        * - Update multiple records with different values in a single query
                        * - Prevent SQL injection using parameterized values (?)
                        *
                        * Params:
                        * - table: table name (must be controlled, not user input)
                        * - idField: primary key column name (must be controlled)
                        * - items: array of objects containing update data
                        * - hasUpdatedBy: boolean → whether table contains updated_by column
                        *
                        * Returns:
                        * - { sql, values } → safe query + values array
                        * - { sql: null, values: [] } → if no valid data
                        */
                    const buildBulkUpdate = (table, idField, items, hasUpdatedBy = false) => {

                        if (!Array.isArray(items) || items.length === 0) {
                            return { sql: null, values: [] };
                        }

                        let quantityCase = `CASE ${idField} `;
                        let updatedByCase = hasUpdatedBy ? `CASE ${idField} ` : null;

                        const ids = [];
                        const values = [];

                        items.forEach(item => {

                            if (!item[idField]) return;

                            // quantity CASE → WHEN id THEN quantity
                            quantityCase += `WHEN ? THEN ? `;
                            values.push(item[idField], item.quantity);

                            // updated_by CASE → only if column exists
                            if (hasUpdatedBy) {
                                updatedByCase += `WHEN ? THEN ? `;
                                values.push(item[idField], item.updated_by);
                            }

                            ids.push(item[idField]);
                        });

                        if (ids.length === 0) {
                            return { sql: null, values: [] };
                        }

                        quantityCase += `ELSE quantity END`;

                        if (hasUpdatedBy) {
                            updatedByCase += `ELSE updated_by END`;
                        }

                        const wherePlaceholders = ids?.map(() => '?').join(',');

                        const sql = `
                            UPDATE ${table}
                            SET 
                                quantity = ${quantityCase}
                                ${hasUpdatedBy ? `, updated_by = ${updatedByCase}` : ''}
                            WHERE ${idField} IN (${wherePlaceholders})
                        `;

                        values.push(...ids);

                        return { sql, values };
                    };

                    /*
                     * Build queries
                     * Each may return null if no data present
                     */
                    const dietQuery = buildBulkUpdate("diet_order_detail", "order_detail_id", diet, false);
                    const canteenQuery = buildBulkUpdate("canteen_order_item", "canteen_order_item_id", canteen, false);
                    const extraQuery = buildBulkUpdate("patient_extra_order", "extra_order_id", extra, true);


                    /*
                     * Execute query only if SQL exists
                     */
                    const runQuery = (queryObj) => {
                        if (!queryObj.sql) return Promise.resolve();

                        return new Promise((resolve, reject) => {
                            conn.query(queryObj.sql, queryObj.values, (err, result) => {
                                if (err) reject(err);
                                else resolve(result);
                            });
                        });
                    };

                    /*
                     * Execute all updates
                     * Works for all combinations:
                     * - only canteen
                     * - only diet
                     * - only extra
                     * - canteen + diet
                     * - canteen + extra
                     * - diet + extra
                     * - all three
                     */
                    await runQuery(dietQuery);
                    await runQuery(canteenQuery);
                    await runQuery(extraQuery);

                    /*
                     * Commit transaction
                     */
                    conn.commit(err => {
                        if (err) {
                            return conn.rollback(() => {
                                conn.release();
                                callback(err);
                            });
                        }

                        conn.release();
                        callback(null, { success: true });
                    });

                } catch (error) {
                    /*
                     * Rollback on any failure
                     */
                    conn.rollback(() => {
                        conn.release();
                        callback(error);
                    });
                }
            });
        });
    }
};