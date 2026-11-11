const { pool } = require('../../config/database');
const { executeQuery } = require('./Helper');

module.exports = {


    createOrder: (order, items, urgentItems = [], callback) => {
        pool.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction((err) => {
                if (err) {
                    conn.release();
                    return callback(err);
                }

                let orderId;

                const rollback = (error) => {
                    conn.rollback(() => {
                        conn.release();
                        callback(error);
                    });
                };

                const commit = () => {
                    conn.commit((err) => {
                        if (err) return rollback(err);

                        conn.release();
                        callback(null, { orderId });
                    });
                };

                const orderQuery = `
                INSERT INTO canteen_order (
                    admission_id,
                    party_type_id,
                    nursing_station_id,
                    room_id,
                    created_by,
                    order_status,
                    order_remarks
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

                conn.query(
                    orderQuery,
                    [
                        order.admission_id,
                        order.party_type_id,
                        order.nursing_station_id,
                        order.room_id,
                        order.created_by,
                        order.order_status || "PENDING",
                        order.remarks || null,
                    ],
                    (err, result) => {
                        if (err) return rollback(err);

                        orderId = result.insertId;

                        const itemQuery = `
                        INSERT INTO canteen_order_item (
                            canteen_order_id,
                            item_id,
                            quantity,
                            price,
                            gst,
                            type_slno,
                            gst_amount,
                            patient_diet_id,
                            is_active
                        )
                        VALUES ?
                    `;

                        const itemValues = items.map((item) => [
                            orderId,
                            item.item_id,
                            item.qty,
                            item.price,
                            item.gst,
                            item.type_slno,
                            item.gst_amount,
                            item.patient_diet_id ?? null,
                            1,
                        ]);

                        conn.query(itemQuery, [itemValues], (err) => {
                            if (err) return rollback(err);

                            const insertUrgentItems = (next) => {
                                if (!urgentItems?.length) {
                                    return next();
                                }

                                const emergencyQuery = `
                                INSERT INTO order_emergency (
                                    order_type,
                                    order_id,
                                    item_id,
                                    emergency_level,
                                    emergency_reason,
                                    type_slno,
                                    created_by
                                )
                                VALUES ?
                            `;

                                const emergencyValues = urgentItems.map((item) => [
                                    "CANTEEN",
                                    orderId,
                                    item.item_id,
                                    "ITEM",
                                    item.emergency_reason || "Urgent canteen item",
                                    item.type_slno,
                                    order.created_by
                                ]);

                                conn.query(
                                    emergencyQuery,
                                    [emergencyValues],
                                    (err) => {
                                        if (err) return rollback(err);
                                        next();
                                    }
                                );
                            };

                            insertUrgentItems(() => {
                                if (order.isExtra) {
                                    const extraValues = items.map((item) => [
                                        order.patient_id,
                                        item.item_id,
                                        item.qty,
                                        order.order_status || "PENDING",
                                        item.price,
                                        item.gst,
                                        item.gst_amount,
                                        order.created_by,
                                        order.remarks || null,
                                    ]);

                                    const extraQuery = `
                                    INSERT INTO patient_extra_order (
                                        patient_id,
                                        item_id,
                                        quantity,
                                        order_status,
                                        price,
                                        gst,
                                        gst_amount,
                                        created_by,
                                        extra_remark
                                    )
                                    VALUES ?
                                `;

                                    conn.query(
                                        extraQuery,
                                        [extraValues],
                                        (err) => {
                                            if (err) return rollback(err);
                                            commit();
                                        }
                                    );
                                } else {
                                    commit();
                                }
                            });
                        });
                    }
                );
            });
        });
    },


    getFullOrders: (status, callback) => {

        const includeDietJoin = status !== "CONFIRMED";

        const dateCondition =
            status === "PENDING"
                ? ""
                : `
                AND co.order_time >= CURDATE() - INTERVAL 1 DAY
                AND co.order_time < CURDATE() + INTERVAL 2 DAY
              `;

        const query = `
        SELECT
            co.canteen_order_id,
            co.admission_id,
            co.order_time,
            co.order_status,
            co.order_remarks AS canteen_remarks,

            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM order_emergency oe
                    WHERE oe.order_type = 'CANTEEN'
                      AND oe.order_id = co.canteen_order_id
                      AND oe.emergency_status <> 'CANCELLED'
                )
                OR (
                    ${includeDietJoin ? `
                        EXISTS (
                            SELECT 1
                            FROM order_emergency oe
                            WHERE oe.order_type = 'DIET'
                              AND oe.order_id = d.order_id
                              AND oe.emergency_status <> 'CANCELLED'
                        )
                    ` : `FALSE`}
                )
                THEN 1
                ELSE 0
            END AS is_urgent,

            ns.fb_ns_name,
            ns.fb_ns_code,

            fb.fb_bd_code,
            fb.fb_bdc_no,

            ip.fb_ptc_name,
            ip.fb_pt_no,
            ip.fb_ipad_slno,
            ip.fb_ipc_curstatus,

            opt.party_name,
            opt.party_type_id

            ${includeDietJoin ? `
                ,
                d.order_id,
                d.order_date,
                d.plan_id,
                d.diet_order_remark AS diet_remarks
            ` : `
                ,
                NULL AS order_id,
                NULL AS order_date,
                NULL AS plan_id,
                NULL AS diet_remarks
            `}

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
        ${dateCondition}

        ORDER BY
            co.order_time ASC,
            co.canteen_order_id ASC
    `;

        const params = includeDietJoin
            ? [status, status]
            : [status];

        executeQuery(query, params, callback);
    },


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
            dt.type_desc,

            /* Patient Diet Plan */
            pdp.plan_id,
            pdp.diet_type,
            pdp.remarks AS diet_plan_remarks,
            pdp.diet_status,
            pdp.start_date AS diet_start_date,
            pdp.end_date AS diet_end_date,

            /* Patient Diet Master */
            pdm.diet_id,
            pdm.diet_name,
            pdm.calories_per_day,
            pdm.protein_per_day,
            pdm.description AS diet_description,

            pda.remarks as dietician_remarks,

            /* Emergency Details */
            oe.emergency_id,
            oe.emergency_level,
            oe.emergency_reason,
            oe.emergency_status,
            oe.created_by AS emergency_created_by,
            oe.created_at AS emergency_created_at,
            oe.acknowledged_by,
            oe.acknowledged_at,
            oe.completed_by,
            oe.completed_at,
            oe.cancelled_by,
            oe.cancelled_at

        FROM canteen_order co

        LEFT JOIN canteen_order_item coi 
            ON co.canteen_order_id = coi.canteen_order_id
            AND coi.is_active = 1

        LEFT JOIN item_master im 
            ON coi.item_id = im.item_id

        LEFT JOIN item_group_master ig
            ON im.item_group_id = ig.item_group_id

        LEFT JOIN item_category_master ic
            ON im.item_category_id = ic.item_category_id

        LEFT JOIN diet_type dt
            ON dt.type_slno = coi.type_slno

        /* Only active patient diet plan */
        LEFT JOIN patient_diet_plan pdp
            ON pdp.admission_id = co.admission_id
            AND pdp.is_active = 1
            AND pdp.diet_status = 'ACTIVE'

        LEFT JOIN patient_diet_master pdm
            ON pdm.diet_id = pdp.diet_id
            AND pdp.diet_type <> 'NPO'

        LEFT JOIN patient_diet_assignment pda
            ON pda.plan_id = pdp.plan_id
            AND pda.is_current = 1

        /* Latest matching order/item emergency */
        LEFT JOIN order_emergency oe
            ON oe.emergency_id = (
                SELECT e.emergency_id
                FROM order_emergency e
                WHERE e.order_type = 'CANTEEN'
                  AND e.order_id = co.canteen_order_id
                  AND (
                      e.emergency_level = 'ORDER'
                      OR (
                          e.emergency_level = 'ITEM'
                          AND e.item_id = coi.item_id
                          AND (
                              e.type_slno = coi.type_slno
                              OR e.type_slno IS NULL
                          )
                      )
                  )
                ORDER BY e.created_at DESC, e.emergency_id DESC
                LIMIT 1
            )

        WHERE co.canteen_order_id = ?

        ORDER BY
            coi.item_id ASC,
            coi.canteen_order_item_id ASC
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
    coi.item_id,
    im.item_name,
    dt.type_desc,
    SUM(coi.quantity) AS total_qty,
    GROUP_CONCAT(DISTINCT coi.canteen_order_id) AS order_ids
FROM canteen_order_item coi
INNER JOIN canteen_order co
    ON co.canteen_order_id = coi.canteen_order_id
LEFT JOIN diet_type dt
    ON dt.type_slno = coi.type_slno
LEFT JOIN item_master im
    ON im.item_id = coi.item_id
WHERE coi.canteen_order_id IN (${placeholders})
AND co.order_status = 'CONFIRMED' AND coi.is_active = 1
GROUP BY
    coi.type_slno,
    coi.item_id,
    im.item_name,
    dt.type_desc`

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
                gst_amount,
                patient_diet_id
            )
            VALUES ?
        `;

        executeQuery(query, [values], callback);
    },

    insertCanteenUrgentItems: (values, callback) => {
        const query = `
        INSERT INTO order_emergency (
            order_type,
            order_id,
            item_id,
            emergency_level,
            emergency_reason,
            type_slno,
            created_by
        )
        VALUES ?
    `;

        executeQuery(query, [values], callback);
    },
    UpdateCanteenOrderStatus: (payload, callback) => {
        const query = `
        UPDATE canteen_order
        SET order_remarks = CONCAT_WS(
            '\n',
            NULLIF(TRIM(order_remarks), ''),
            NULLIF(TRIM(?), '')
        )
        WHERE canteen_order_id = ?
    `;

        executeQuery(
            query,
            [payload.remarks, payload.canteen_order_id],
            callback
        );
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
            o.order_remarks,

            i.item_id,
            im.item_name,
            i.quantity,
            i.price,
            i.gst,
            i.gst_amount,
            i.type_slno,
            i.canteen_order_item_id,

            CASE 
                WHEN EXISTS (
                    SELECT 1
                    FROM order_emergency oe
                    WHERE oe.order_type = 'CANTEEN'
                    AND oe.order_id = o.canteen_order_id
                    AND (
                        oe.emergency_level = 'ORDER'
                        OR (
                            oe.emergency_level = 'ITEM'
                            AND oe.item_id = i.item_id
                        )
                    )
                    AND oe.emergency_status <> 'CANCELLED'
                )
                THEN 1
                ELSE 0
            END AS is_urgent,

            (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'emergency_id', oe.emergency_id,
                        'emergency_level', oe.emergency_level,
                        'emergency_reason', oe.emergency_reason,
                        'emergency_status', oe.emergency_status,
                        'item_id', oe.item_id,
                        'type_slno', oe.type_slno,
                        'created_by', oe.created_by,
                        'created_at', oe.created_at,
                        'acknowledged_by', oe.acknowledged_by,
                        'acknowledged_at', oe.acknowledged_at,
                        'completed_by', oe.completed_by,
                        'completed_at', oe.completed_at,
                        'cancelled_by', oe.cancelled_by,
                        'cancelled_at', oe.cancelled_at
                    )
                )
                FROM order_emergency oe
                WHERE oe.order_type = 'CANTEEN'
                AND oe.order_id = o.canteen_order_id
                AND (
                    oe.emergency_level = 'ORDER'
                    OR (
                        oe.emergency_level = 'ITEM'
                        AND oe.item_id = i.item_id
                    )
                )
                      AND oe.emergency_status <> 'CANCELLED'
            ) AS emergency_details

        FROM canteen_order o

        LEFT JOIN canteen_order_item i
            ON o.canteen_order_id = i.canteen_order_id
            AND i.is_active = 1

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

    CancelOrderEmergency: (emergency_id, cancelled_by, callback) => {
        const query = `
        UPDATE order_emergency
        SET
            emergency_status = 'CANCELLED',
            cancelled_by = ?,
            cancelled_at = CURRENT_TIMESTAMP
        WHERE emergency_id = ?
          AND emergency_status IN (
              'PENDING_ACKNOWLEDGEMENT',
              'ACKNOWLEDGED',
              'IN_PROGRESS'
          )
    `;

        executeQuery(
            query,
            [cancelled_by, emergency_id],
            (err, result) => {
                if (err) return callback(err);

                if (result.affectedRows === 0) {
                    return callback(null, {
                        success: 0,
                        message: "Emergency not found or cannot be cancelled",
                    });
                }

                return callback(null, {
                    success: 1,
                    message: "Emergency cancelled successfully",
                });
            }
        );
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
    },


    AcknowledgeOrderEmergency: (emergency_ids, acknowledged_by, callback) => {
        const placeholders = emergency_ids.map(() => "?").join(",");

        const query = `
        UPDATE order_emergency
        SET
            emergency_status = 'ACKNOWLEDGED',
            acknowledged_by = ?,
            acknowledged_at = CURRENT_TIMESTAMP
        WHERE emergency_id IN (${placeholders})
          AND emergency_status = 'PENDING_ACKNOWLEDGEMENT'
    `;

        executeQuery(
            query,
            [acknowledged_by, ...emergency_ids],
            (err, result) => {
                if (err) return callback(err);

                return callback(null, {
                    requested_count: emergency_ids.length,
                    acknowledged_count: result.affectedRows,
                    message: result.affectedRows > 0
                        ? "Emergency records acknowledged successfully"
                        : "No pending emergency records found",
                });
            }
        );
    },


    createOpenBatchOrderDetail: (data, callback) => {

        const {
            batchItems,
            dietPayload,
            canteenPayload,
            assignDetail,
            batchIds
        } = data;

        pool.getConnection((err, conn) => {
            if (err) return callback(err);

            conn.beginTransaction(async (err) => {
                if (err) {
                    conn.release();
                    return callback(err);
                }

                const runQuery = (sql, values = []) => {
                    return new Promise((resolve, reject) => {
                        conn.query(sql, values, (error, results) => {
                            if (error) reject(error);
                            else resolve(results);
                        });
                    });
                };

                const rollback = (error) => {
                    conn.rollback((rollbackError) => {
                        conn.release();
                        if (rollbackError) {
                            console.error("Transaction rollback failed:", rollbackError);
                        }
                        callback(error);
                    });
                };

                try {

                    // 1. Get unique batch IDs from batchItems
                    // const batchIds = [
                    //     ...new Set(batchItems.map(item => Number(item.batch_id)))
                    // ];

                    // 2. Validate batches
                    const batches = await runQuery(
                        `SELECT batch_id
                     FROM diet_production_batch
                     WHERE batch_id IN (?)
                     AND batch_mode = 'DIRECT_DELIVERY'
                     AND batch_status = 'ACTIVE'
                     FOR UPDATE`,
                        [batchIds]
                    );

                    if (batches.length !== batchIds.length) {
                        throw new Error("One or more production batches are invalid or inactive");
                    }

                    // 3. Insert DIET ORDER
                    const dietResult = await runQuery(
                        `INSERT INTO diet_order (
                        patient_id,
                        plan_id,
                        order_date,
                        nursing_station_id,
                        room_id,
                        order_status,
                        collected_by,
                        diet_order_remark
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            dietPayload.patient_id,
                            dietPayload.plan_id,
                            dietPayload.order_date,
                            dietPayload.nursing_station_id,
                            dietPayload.room_id,
                            dietPayload.order_status,
                            dietPayload.collected_by,
                            dietPayload.remarks
                        ]
                    );

                    const order_id = dietResult.insertId;

                    // 4. Insert DIET ORDER DETAILS
                    const dietDetailValues = dietPayload.details.map(item => [
                        order_id,
                        item.diet_type_id,
                        item.item_id,
                        item.quantity,
                        item.unit_id,
                        item.is_substitute,
                        item.patient_diet_id ?? null
                    ]);

                    await runQuery(
                        `INSERT INTO diet_order_detail (
                        order_id,
                        diet_type_id,
                        item_id,
                        quantity,
                        unit_id,
                        is_substitute,
                        patient_diet_id
                    ) VALUES ?`,
                        [dietDetailValues]
                    );

                    // 5. Insert DIET emergency records
                    if (dietPayload.urgentItems?.length > 0) {

                        const emergencyValues = dietPayload.urgentItems.map(item => [
                            "DIET",
                            order_id,
                            item.item_id,
                            "ITEM",
                            item.emergency_reason || "Urgent item",
                            item.type_slno,
                            dietPayload.collected_by
                        ]);

                        await runQuery(
                            `INSERT INTO order_emergency (
                            order_type,
                            order_id,
                            item_id,
                            emergency_level,
                            emergency_reason,
                            type_slno,
                            created_by
                        ) VALUES ?`,
                            [emergencyValues]
                        );
                    }

                    // 6. Insert CANTEEN ORDER
                    const canteenResult = await runQuery(
                        `INSERT INTO canteen_order (
                        admission_id,
                        party_type_id,
                        nursing_station_id,
                        room_id,
                        order_status,
                        created_by,
                        order_remarks
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                        [
                            canteenPayload.admission_id,
                            canteenPayload.party_type_id,
                            canteenPayload.nursing_station_id,
                            canteenPayload.room_id,
                            canteenPayload.order_status,
                            canteenPayload.created_by,
                            canteenPayload.remarks
                        ]
                    );

                    const canteen_order_id = canteenResult.insertId;

                    // 7. Insert CANTEEN ORDER ITEMS
                    const canteenValues = canteenPayload.items.map(item => [
                        canteen_order_id,
                        item.item_id,
                        item.qty,
                        item.price ?? null,
                        item.gst ?? null,
                        item.type_slno,
                        item.gst_amount ?? 0,
                        item.patient_diet_id ?? null
                    ]);

                    await runQuery(
                        `INSERT INTO canteen_order_item (
                        canteen_order_id,
                        item_id,
                        quantity,
                        price,
                        gst,
                        type_slno,
                        gst_amount,
                        patient_diet_id
                    ) VALUES ?`,
                        [canteenValues]
                    );

                    // 8. Insert PRODUCTION ORDER MAPPING
                    for (const batch_id of batchIds) {

                        await runQuery(
                            `INSERT INTO diet_production_order_map (
                            batch_id,
                            canteen_order_id
                        ) VALUES (?, ?)`,
                            [batch_id, canteen_order_id]
                        );
                    }

                    // 9. Insert PRODUCTION ITEMS
                    // Group quantities by batch_id and item_id
                    const productionItems = {};

                    for (const item of batchItems) {

                        const key = `${item.batch_id}_${item.item_id}`;

                        if (!productionItems[key]) {
                            productionItems[key] = {
                                batch_id: item.batch_id,
                                item_id: item.item_id,
                                required_qty: 0
                            };
                        }

                        productionItems[key].required_qty += Number(item.qty);
                    }

                    for (const item of Object.values(productionItems)) {

                        const existingItem = await runQuery(
                            `SELECT batch_id
                         FROM diet_production_items
                         WHERE batch_id = ?
                         AND item_id = ?
                         FOR UPDATE`,
                            [item.batch_id, item.item_id]
                        );

                        if (existingItem.length > 0) {

                            await runQuery(
                                `UPDATE diet_production_items
                             SET required_qty = required_qty + ?
                             WHERE batch_id = ?
                             AND item_id = ?`,
                                [
                                    item.required_qty,
                                    item.batch_id,
                                    item.item_id
                                ]
                            );

                        } else {

                            await runQuery(
                                `INSERT INTO diet_production_items (
                                batch_id,
                                item_id,
                                required_qty
                            ) VALUES (?, ?, ?)`,
                                [
                                    item.batch_id,
                                    item.item_id,
                                    item.required_qty
                                ]
                            );
                        }
                    }

                    // 10. Insert DELIVERY ASSIGNMENT MASTER
                    const assignmentResult = await runQuery(
                        `INSERT INTO diet_delivery_assignment (
                        assigned_to,
                        assigned_by,
                        remarks
                    ) VALUES (?, ?, ?)`,
                        [
                            assignDetail.assigned_to,
                            assignDetail.assigned_by,
                            assignDetail.remarks || null
                        ]
                    );

                    const assignment_id = assignmentResult.insertId;

                    // 11. Insert DELIVERY ASSIGNMENT DETAILS
                    // One detail for each unique type_slno
                    const typeIds = [
                        ...new Set(
                            batchItems.map(item => Number(item.type_slno))
                        )
                    ];

                    const assignmentValues = typeIds.map(type_slno => [
                        assignment_id,
                        canteen_order_id,
                        type_slno,
                        "NORMAL",
                        "PENDING",
                        null
                    ]);

                    await runQuery(
                        `INSERT INTO diet_delivery_assignment_detail (
                        assignment_id,
                        canteen_order_id,
                        type_slno,
                        delivery_priority,
                        delivery_status,
                        remarks
                    ) VALUES ?`,
                        [assignmentValues]
                    );

                    // 12. COMMIT
                    conn.commit((commitError) => {

                        if (commitError) {
                            return rollback(commitError);
                        }

                        conn.release();

                        return callback(null, {
                            order_id,
                            canteen_order_id,
                            assignment_id,
                            batch_ids: batchIds
                        });
                    });

                } catch (error) {
                    rollback(error);
                }
            });
        });
    },
};