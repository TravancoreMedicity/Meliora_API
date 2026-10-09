const { pool } = require("../../config/database");
const { executeQuery } = require("../Canteen_Orders/Helper");

module.exports = {

    createProductionBatch: (
        BatchDetail,
        SelectedOrders,
        processed_by,
        remark,
        ProductionDate,
        callback
    ) => {

        pool.getConnection((err, conn) => {
            if (err) {
                return callback(err);
            }
            conn.beginTransaction(async (err) => {

                if (err) {
                    conn.release();
                    return callback(err);
                }

                try {

                    const createdBatchIds = [];

                    // SIMPLE PROMISE QUERY FUNCTION
                    const runQuery = (sql, values = []) => {
                        return new Promise((resolve, reject) => {

                            conn.query(sql, values, (err, results) => {

                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(results);
                                }
                            });
                        });
                    };

                    // LOOP EACH TYPE
                    for (const batch of BatchDetail) {

                        // 1 INSERT BATCH
                        const batchResult = await runQuery(
                            `
                            INSERT INTO diet_production_batch
                            (
                                production_date,
                                type_id,
                                processed_by,
                                remarks,
                                processed_at
                            )
                            VALUES
                            (
                                ?,
                                ?,
                                ?,
                                ?,
                                NOW()
                            )
                            `,
                            [ProductionDate,
                                batch.type_id,
                                processed_by,
                                remark
                            ]
                        );

                        const batch_id = batchResult.insertId;

                        createdBatchIds.push(batch_id);

                        // 2 INSERT ITEMS
                        for (const item of batch.items) {

                            await runQuery(
                                `
                                INSERT INTO diet_production_items
                                (
                                    batch_id,
                                    item_id,
                                    required_qty
                                )
                                VALUES
                                (
                                    ?,
                                    ?,
                                    ?
                                )
                                `,
                                [
                                    batch_id,
                                    item.item_id,
                                    item.required_qty
                                ]
                            );
                        }

                        // 3 MAP ORDERS
                        for (const orderId of batch.order_ids) {
                            await runQuery(
                                ` INSERT INTO diet_production_order_map
                                (
                                    batch_id,
                                    canteen_order_id
                                )
                                VALUES
                                (
                                    ?,
                                    ?
                                )
                                `,
                                [
                                    batch_id,
                                    orderId
                                ]
                            );
                        }
                    }

                    // COMMIT
                    conn.commit((err) => {

                        if (err) {

                            return conn.rollback(() => {
                                conn.release();
                                callback(err);
                            });
                        }

                        conn.release();

                        return callback(null, {
                            batch_ids: createdBatchIds
                        });
                    });

                } catch (error) {

                    conn.rollback(() => {

                        conn.release();

                        return callback(error);
                    });
                }
            });
        });
    },
    GetProductionMapingData: (callback) => {
        pool.query(
            `
            SELECT 
                canteen_order_id,
                GROUP_CONCAT(batch_id ORDER BY batch_id) AS batch_ids,
                MIN(mapped_at) AS first_mapped_at
            FROM diet_production_order_map
            GROUP BY canteen_order_id
            ORDER BY canteen_order_id
            `,
            [],
            (err, results) => {
                if (err) return callback(err);
                return callback(null, results);
            }
        )
    },

    getKitchenItemList: (callback) => {
        const query = `
                SELECT
                    dpb.batch_id,
                    dpb.production_date,
                    dpb.kitchen_status,
                    dpb.remarks as remark,
                    dpb.cancelled_at,
                   
                    dt.type_desc AS meal_type,

                    dpi.production_item_id,
                    dpi.item_id,
                    im.item_name,

                    dpi.required_qty AS ordered_qty,
                
                    emp.em_name AS prepared_by_name,
                    emc.em_name AS Cancelled_by_name
        

                FROM diet_production_batch dpb

                LEFT JOIN diet_type dt
                    ON dt.type_slno = dpb.type_id

                LEFT JOIN diet_production_items dpi
                    ON dpi.batch_id = dpb.batch_id

                LEFT JOIN item_master im
                    ON im.item_id = dpi.item_id

                LEFT JOIN co_employee_master emp
                    ON emp.em_id = dpb.processed_by
                
                LEFT JOIN co_employee_master emc
                    ON emc.em_id = dpb.cancelled_by

                WHERE
                    DATE(dpb.production_date) = CURDATE()

                ORDER BY
                    dpb.batch_id,
                    im.item_name
             `
        executeQuery(query, callback);
    },

    getAllOrderStatusDetail: (callback) => {
        const query = `
    SELECT

        -- =========================================
        -- Order Details
        -- =========================================
        co.canteen_order_id,
        co.order_time,
        co.order_status AS canteenOrderStatus,
        co.created_at AS order_created_at,

        -- =========================================
        -- Party Type
        -- =========================================
        opt.party_type_id,
        opt.party_name,

        -- =========================================
        -- Patient / Admission Details
        -- =========================================
        ip.fb_ipad_slno,
        ip.fb_ip_no,
        ip.fb_pt_no,
        ip.fb_ptc_name,
        ip.fb_ptc_sex,
        ip.fb_ptn_yearage,
        ip.fb_doc_name,
        ip.fb_dep_desc,
        ip.fb_ipc_curstatus,

        -- =========================================
        -- Bed Details
        -- =========================================
        bed.fb_bed_slno,
        bed.fb_bd_code,
        bed.fb_bdc_no AS bed_no,

        -- =========================================
        -- Nursing Station
        -- =========================================
        ns.fb_nurse_stn_slno,
        ns.fb_ns_code,
        ns.fb_ns_name AS nursing_station,

        -- =========================================
        -- Batch Details
        -- =========================================
        dpb.batch_id,
        dpb.type_id,
        dt.type_desc AS meal_type,
        dt.type_slno,
        dpb.kitchen_status,
        dpb.processed_at,
        dpom.mapped_at,

        -- =========================================
        -- Item Count
        -- =========================================
        COUNT(
            DISTINCT coi.canteen_order_item_id
        ) AS item_count,

        -- =========================================
        -- Packing Summary
        -- Based on ORDER + TYPE
        -- =========================================
        MAX(cop.packing_id) AS packing_id,

        MAX(cop.packet_count) AS packet_count,

        MAX(cop.status) AS packing_status,

        MAX(cop.assignment_detail_id)
            AS packing_assignment_detail_id,

        MAX(cop.created_by)
            AS packing_created_by,

        MAX(cop.created_at)
            AS packing_created_at,

        MAX(cop.updated_at)
            AS packing_updated_at,

        -- =========================================
        -- Canteen Items + Item Master
        -- + Packet Details
        -- =========================================
        JSON_ARRAYAGG(
            JSON_OBJECT(

                -- =====================================
                -- Canteen Order Item Details
                -- =====================================
                'canteen_order_item_id',
                    coi.canteen_order_item_id,

                'canteen_order_id',
                    coi.canteen_order_id,

                'item_id',
                    coi.item_id,

                'quantity',
                    coi.quantity,

                'price',
                    coi.price,

                'gst',
                    coi.gst,

                'gst_amount',
                    coi.gst_amount,

                'is_active',
                    coi.is_active,

                'type_slno',
                    coi.type_slno,

                'patient_diet_id',
                    coi.patient_diet_id,

                -- =====================================
                -- Item Master Details
                -- =====================================
                'item_name',
                    im.item_name,

                'item_group_id',
                    im.item_group_id,

                'item_category_id',
                    im.item_category_id,

                'item_alias',
                    im.item_alias,

                'item_code',
                    im.item_code,

                'description',
                    im.description,

                'item_master_is_active',
                    im.is_active,

                'item_type_id',
                    im.item_type_id,

                -- =====================================
                -- Packing Master Details
                -- =====================================
                'packing_id',
                    cop.packing_id,

                'packet_count',
                    cop.packet_count,

                'packing_status',
                    cop.status,

                'packing_assignment_detail_id',
                    cop.assignment_detail_id,

                'packing_created_by',
                    cop.created_by,

                'packing_created_at',
                    cop.created_at,

                'packing_updated_at',
                    cop.updated_at,

                'packing_type_slno',
                    cop.type_slno,

                -- =====================================
                -- Packet Detail
                -- =====================================
                'packing_detail_id',
                    copd.packing_detail_id,

                'packet_uid',
                    copd.packet_uid,

                'packet_no',
                    copd.packet_no,

                'packet_quantity',
                    copd.quantity,

                'packet_status',
                    copd.status,

                'barcode_printed',
                    copd.barcode_printed

            )
        ) AS items

    FROM diet_production_order_map dpom

    -- =========================================
    -- Production Batch
    -- =========================================
    INNER JOIN diet_production_batch dpb
        ON dpb.batch_id = dpom.batch_id

    -- =========================================
    -- Diet Type
    -- =========================================
    INNER JOIN diet_type dt
        ON dt.type_slno = dpb.type_id

    -- =========================================
    -- Canteen Order
    -- =========================================
    INNER JOIN canteen_order co
        ON co.canteen_order_id = dpom.canteen_order_id

    -- =========================================
    -- Canteen Order Items
    -- Match Order + Type
    -- =========================================
    LEFT JOIN canteen_order_item coi
        ON coi.canteen_order_id = co.canteen_order_id
        AND coi.type_slno = dt.type_slno
        AND coi.is_active = 1

    -- =========================================
    -- Item Master
    -- =========================================
    LEFT JOIN item_master im
        ON im.item_id = coi.item_id

    -- =========================================
    -- Packing Master
    -- IMPORTANT:
    -- Match using ORDER + TYPE
    -- =========================================
    LEFT JOIN canteen_order_packing cop
        ON cop.order_id = co.canteen_order_id
        AND cop.type_slno = dt.type_slno
        AND cop.status <> 'CANCELLED'

    -- =========================================
    -- Packing Detail
    -- Match the actual order item
    -- =========================================
    LEFT JOIN canteen_order_packing_detail copd
        ON copd.packing_id = cop.packing_id
        AND copd.order_item_id =
            coi.canteen_order_item_id
        AND copd.status <> 'VOID'

    -- =========================================
    -- Patient Admission
    -- =========================================
    LEFT JOIN fb_ipadmiss ip
        ON ip.fb_ip_no = co.admission_id

    -- =========================================
    -- Party Type
    -- =========================================
    LEFT JOIN order_party_type opt
        ON opt.party_type_id = co.party_type_id

    -- =========================================
    -- Bed Details
    -- =========================================
    LEFT JOIN fb_bed bed
        ON bed.fb_bd_code = ip.fb_bd_code

    -- =========================================
    -- Nursing Station
    -- =========================================
    LEFT JOIN fb_nurse_station_master ns
        ON ns.fb_ns_code = bed.fb_ns_code

    -- =========================================
    -- Today's Processed Batches
    -- =========================================
    WHERE DATE(dpb.processed_at) = CURDATE()

    -- =========================================
    -- Group By
    -- =========================================
    GROUP BY

        co.canteen_order_id,
        co.order_time,
        co.order_status,
        co.created_at,

        opt.party_type_id,
        opt.party_name,

        ip.fb_ipad_slno,
        ip.fb_ip_no,
        ip.fb_pt_no,
        ip.fb_ptc_name,
        ip.fb_ptc_sex,
        ip.fb_ptn_yearage,
        ip.fb_doc_name,
        ip.fb_dep_desc,

        bed.fb_bed_slno,
        bed.fb_bd_code,
        bed.fb_bdc_no,

        ns.fb_nurse_stn_slno,
        ns.fb_ns_code,
        ns.fb_ns_name,

        dpb.batch_id,
        dpb.type_id,
        dt.type_desc,
        dt.type_slno,
        dpb.kitchen_status,
        dpb.processed_at,
        dpom.mapped_at

    ORDER BY
        co.canteen_order_id DESC,
        dpb.type_id ASC
`;
        executeQuery(query, callback);
    },

    updateKitchenBatchStatusService: (
        items,
        kitchen_status,
        emp_id,
        callback
    ) => {

        if (!items?.length) {
            return callback(null, {
                success: 0,
                message: "No items found"
            });
        }

        const values = items.map(item => [
            item.batch_id,
            item.item_id,
        ]);

        // UNIQUE BATCH IDS
        const batchIds = [
            ...new Set(
                items.map(item => item.batch_id)
            )
        ];

        const updateItemQuery = `
        UPDATE diet_production_items
        SET
            kitchen_item_status = ?,
            prepared_by = ?,
            prepared_at = NOW()
        WHERE (batch_id, item_id) IN (?)
    `;

        pool.query(
            updateItemQuery,
            [
                kitchen_status,
                emp_id,
                values
            ],
            (err, results) => {

                if (err) {
                    return callback(err);
                }

                // CHECK WHETHER ALL ITEMS IN BATCH ARE COMPLETED
                const checkBatchQuery = `
                    SELECT DISTINCT dpi.batch_id
                    FROM diet_production_items dpi
                    WHERE dpi.batch_id IN (?)
                    AND NOT EXISTS (
                        SELECT 1
                        FROM diet_production_items d
                        WHERE d.batch_id = dpi.batch_id
                        AND COALESCE(d.kitchen_item_status, '') != 'COMPLETED'
                    );
            `;

                pool.query(
                    checkBatchQuery,
                    [batchIds],
                    (checkErr, completedBatches) => {

                        if (checkErr) {
                            return callback(checkErr);
                        }

                        // NO FULLY COMPLETED BATCHES
                        if (!completedBatches?.length) {
                            return callback(null, {
                                success: 1,
                                affectedRows: results.affectedRows,
                                completed_batches: []
                            });
                        }

                        const completedBatchIds =
                            completedBatches.map(
                                item => item.batch_id
                            );

                        // UPDATE MAIN BATCH STATUS
                        const updateBatchQuery = `
                        UPDATE diet_production_batch
                        SET
                            kitchen_status = 'COMPLETED',
                            processed_by = ?,
                            processed_at = NOW()
                        WHERE batch_id IN (?)
                    `;

                        pool.query(
                            updateBatchQuery,
                            [
                                emp_id,
                                completedBatchIds
                            ],
                            (batchErr) => {

                                if (batchErr) {
                                    return callback(batchErr);
                                }

                                return callback(null, {
                                    success: 1,
                                    message: "Kitchen item status updated",
                                    affectedRows: results.affectedRows,
                                    completed_batches: completedBatchIds
                                });
                            }
                        );
                    }
                );
            }
        );
    },
    updateBatchStatus: (
        items,
        kitchen_status,

        callback
    ) => {

        if (!items?.length) {

            return callback(null, {
                success: 0,
                message: "No items found"
            });
        }

        // EXTRACT BATCH IDS
        const batchIds = items.map(
            item => item.batch_id
        );

        const updateBatchQuery = `
        UPDATE diet_production_batch
        SET
            kitchen_status = ?,
            processed_at = NOW()
        WHERE batch_id IN (?)
    `;

        pool.query(
            updateBatchQuery,
            [
                kitchen_status,
                batchIds
            ],
            (err, results) => {

                if (err) {
                    return callback(err);
                }

                return callback(null, results);
            }
        );
    },

    CompletedBatchStatus: (
        batch_id,
        kitchen_status,
        callback
    ) => {
        const updateBatchQuery = `
        UPDATE diet_production_batch
        SET
            kitchen_status = ?
        WHERE batch_id = ?
    `;

        pool.query(
            updateBatchQuery,
            [
                kitchen_status,
                batch_id
            ],
            (err, results) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, results);
            }
        );
    },

    CancelProductionBatch: (
        batch_id,
        kitchen_status,
        cancelled_by,
        callback
    ) => {

        const updateBatchQuery = `
        UPDATE diet_production_batch
        SET
            kitchen_status = ?,
            cancelled_by = ?,
            cancelled_at = NOW()
        WHERE batch_id = ?
    `;

        pool.query(
            updateBatchQuery,
            [
                kitchen_status,
                cancelled_by,
                batch_id
            ],
            (err, results) => {
                if (err) {
                    return callback(err);
                }

                return callback(null, results);
            }
        );
    },





};