// dietdeliveryassign.service.js
const { pool } = require('../../config/database');
const { executeQuery } = require('../Canteen_Orders/Helper');

module.exports = {

    // CREATE DELIVERY ASSIGNMENT
    CreateDietDeliveryAssignment: (data, callBack) => {
        const {
            assigned_to,
            assigned_by,
            remarks,
            orders
        } = data;

        pool.getConnection((err, connection) => {

            if (err) {
                return callBack({
                    stage: "CONNECTION",
                    message: err
                });
            }

            connection.beginTransaction((err) => {

                if (err) {
                    connection.release();

                    return callBack({
                        stage: "TRANSACTION",
                        message: err
                    });
                }

                // INSERT MASTER
                connection.query(
                    `INSERT INTO diet_delivery_assignment
                    (
                        assigned_to,
                        assigned_by,
                        remarks
                    )
                    VALUES (?, ?, ?)`,
                    [
                        assigned_to,
                        assigned_by,
                        remarks || null
                    ],
                    (error, results) => {

                        if (error) {

                            return connection.rollback(() => {
                                connection.release();

                                return callBack({
                                    stage: "MASTER_INSERT",
                                    message: error
                                });
                            });
                        }

                        const assignment_id = results.insertId;

                        // DETAIL VALUES
                        const detailValues = orders.map((item) => ([
                            assignment_id,
                            item.canteen_order_id,
                            item.type_slno,
                            item.delivery_priority || 'NORMAL',
                            item.delivery_status || 'PENDING',
                            item.remarks || null
                        ]));

                        // INSERT DETAILS
                        connection.query(
                            `INSERT INTO diet_delivery_assignment_detail
                            (
                                assignment_id,
                                canteen_order_id,
                                type_slno,
                                delivery_priority,
                                delivery_status,
                                remarks
                            )
                            VALUES ?`,
                            [detailValues],
                            (detailError, detailResult) => {

                                if (detailError) {

                                    return connection.rollback(() => {
                                        connection.release();

                                        return callBack({
                                            stage: "DETAIL_INSERT",
                                            message: detailError
                                        });
                                    });
                                }

                                connection.commit((commitError) => {

                                    if (commitError) {

                                        return connection.rollback(() => {
                                            connection.release();

                                            return callBack({
                                                stage: "COMMIT",
                                                message: commitError
                                            });
                                        });
                                    }

                                    connection.release();

                                    return callBack(null, {
                                        assignment_id,
                                        detail_inserted: detailResult.affectedRows
                                    });
                                });
                            }
                        );
                    }
                );
            });
        });
    },
    getCurrentAssignedFoodDetail: (callback) => {
        const query = `
            SELECT 
                ddsd.canteen_order_id,
                ddsd.type_slno,
                ddsd.delivery_priority as ItemPriority,
                ddsd.delivery_status as ItemStatus,

                -- Assignment Details
                dds.assignment_id,
                dds.assigned_at,
                dds.delivery_status as AssignyStatus,

                -- Employee Details
                emp.em_id,
                emp.em_name,
                emp.em_no

            FROM diet_delivery_assignment_detail ddsd

            LEFT JOIN diet_delivery_assignment dds 
                ON dds.assignment_id = ddsd.assignment_id

            LEFT JOIN co_employee_master emp
                ON emp.em_id = dds.assigned_to

            WHERE DATE(dds.assigned_at) = CURDATE()`;
        executeQuery(query, callback);
    },
    FetchDeliveryByAssigny: (assign_to, callback) => {
        const query = `
           SELECT 
                ddsd.canteen_order_id,
                ddsd.delivery_priority AS ItemPriority,
                ddsd.delivery_status AS ItemStatus,
                dds.assignment_id,
                dds.assigned_at,
                dds.delivery_status AS AssignyStatus,
                emp.em_id,
                emp.em_name,
                emp.em_no,
                co.nursing_station_id,
                co.room_id,
                co.party_type_id,
                fnsm.fb_ns_code,
                fnsm.fb_ns_name,
                fb.fb_bdc_no,
                fbp.fb_ptc_name,
                fbp.fb_ip_no,
                fbp.fb_pt_no,
                fbp.fb_ptc_mobile,
                opt.party_name,
                dt.type_desc,
                dt.type_slno,
                fbp.fb_ipad_slno
            FROM
                diet_delivery_assignment_detail ddsd
                    LEFT JOIN
                diet_delivery_assignment dds ON dds.assignment_id = ddsd.assignment_id
                    LEFT JOIN
                co_employee_master emp ON emp.em_id = dds.assigned_to
                    LEFT JOIN
                canteen_order co ON co.canteen_order_id = ddsd.canteen_order_id
                    LEFT JOIN 
                fb_nurse_station_master fnsm ON fnsm.fb_nurse_stn_slno = co.nursing_station_id
                    LEFT JOIN 
                fb_bed fb ON fb.fb_bed_slno = co.room_id
                    LEFT JOIN
                order_party_type opt ON opt.party_type_id = co.party_type_id
                        LEFT JOIN 
                fb_ipadmiss fbp ON fbp.fb_ip_no = co.admission_id
                LEFT JOIN 
                diet_type dt ON dt.type_slno = ddsd.type_slno
            WHERE assigned_to = ?`;
        executeQuery(query, [assign_to], callback);
    },
    FetchAssignedItemStatus: (assign_to, assignment_id, callback) => {
        const query = `
           SELECT 
                ddsd.canteen_order_id,
                ddsd.delivery_priority AS ItemPriority,
                ddsd.delivery_status AS ItemStatus,
                dds.assignment_id,
                dds.assigned_at,
                dds.delivery_status AS AssignyStatus,
                emp.em_id,
                emp.em_name,
                emp.em_no,
                co.nursing_station_id,
                co.room_id,
                co.party_type_id,
                fnsm.fb_ns_code,
                fnsm.fb_ns_name,
                fb.fb_bdc_no,
                fbp.fb_ptc_name,
                fbp.fb_ip_no,
                fbp.fb_pt_no,
                fbp.fb_ptc_mobile,
                opt.party_name,
                dt.type_desc,
                dt.type_slno,
                fbp.fb_ipad_slno
            FROM
                diet_delivery_assignment_detail ddsd
                    LEFT JOIN
                diet_delivery_assignment dds ON dds.assignment_id = ddsd.assignment_id
                    LEFT JOIN
                co_employee_master emp ON emp.em_id = dds.assigned_to
                    LEFT JOIN
                canteen_order co ON co.canteen_order_id = ddsd.canteen_order_id
                    LEFT JOIN 
                fb_nurse_station_master fnsm ON fnsm.fb_nurse_stn_slno = co.nursing_station_id
                    LEFT JOIN 
                fb_bed fb ON fb.fb_bed_slno = co.room_id
                    LEFT JOIN
                order_party_type opt ON opt.party_type_id = co.party_type_id
                        LEFT JOIN 
                fb_ipadmiss fbp ON fbp.fb_ip_no = co.admission_id
                LEFT JOIN 
                diet_type dt ON dt.type_slno = ddsd.type_slno
            WHERE assigned_to = ? and dds.assignment_id = ?`;
        executeQuery(query, [assign_to, assignment_id], callback);
    },
    fetchDeliveryLogDetail: (canteen_order_id, type_slno, callback) => {
        const query = `
           SELECT 
                delivery_id,
                patient_diet_id,
                item_id, 
                delivered_qty,
                delivery_status,
                develivered_by,
                delivered_time,
                delivery_remarks,
                updated_by,
                updated_at, 
                updated_remarks, 
                canteen_order_id,
                type_slno,
                cem.em_name  as UpdatedByEmployee
                FROM diet_delivery_log  ddl
                LEFT JOIN co_employee_master cem ON cem.em_id = ddl.updated_by
                WHERE canteen_order_id = ? AND  type_slno = ?`;
        executeQuery(query, [canteen_order_id, type_slno], callback);
    },




    // UPDATE DELIVERY STATUS   
    updateDeliveryStatus: (data, callback) => {

        const {
            assignment_id,
            canteen_order_id,
            delivery_status,
            remarks,
            updated_by,
            item = []
        } = data;

        pool.getConnection((err, connection) => {

            if (err) {
                return callback({
                    stage: "CONNECTION",
                    message: err
                });
            }

            connection.beginTransaction((err) => {

                if (err) {

                    connection.release();

                    return callback({
                        stage: "TRANSACTION",
                        message: err
                    });
                }

                // 1. UPDATE MAIN ASSIGNMENT TABLE
                let assignmentQuery = `
                UPDATE diet_delivery_assignment
                SET
                    delivery_status = ?
            `;

                const assignmentParams = [
                    delivery_status
                ];

                // PICKUP TIME
                if (delivery_status === "PICKEDUP") {

                    assignmentQuery += `,
                    pickup_time = NOW()
                `;
                }

                // COMPLETED TIME
                if (delivery_status === "COMPLETED") {

                    assignmentQuery += `,
                    completed_time = NOW()
                `;
                }

                assignmentQuery += `
                WHERE assignment_id = ?
            `;

                assignmentParams.push(assignment_id);

                connection.query(
                    assignmentQuery,
                    assignmentParams,
                    (assignmentError) => {

                        if (assignmentError) {

                            return connection.rollback(() => {

                                connection.release();

                                return callback({
                                    stage: "ASSIGNMENT_UPDATE",
                                    message: assignmentError
                                });
                            });
                        }
                        // 2. UPDATE DETAIL TABLE
                        let detailQuery = `
                        UPDATE diet_delivery_assignment_detail
                        SET
                            delivery_status = ?,
                            remarks = ?
                    `;

                        const detailParams = [
                            delivery_status,
                            remarks || null
                        ];

                        // ONLY WHEN DELIVERED
                        if (delivery_status === "DELIVERED") {

                            detailQuery += `,
                            delivered_at = NOW(),
                            delivered_by = ?
                        `;

                            detailParams.push(updated_by);
                        }
                        detailQuery += `
                        WHERE assignment_id = ?
                        AND canteen_order_id = ?
                    `;
                        detailParams.push(
                            assignment_id,
                            canteen_order_id
                        );
                        connection.query(
                            detailQuery,
                            detailParams,
                            (detailError) => {

                                if (detailError) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        return callback({
                                            stage: "DETAIL_UPDATE",
                                            message: detailError
                                        });
                                    });
                                }
                                // 3. INSERT DELIVERY LOG ITEMS
                                // ONLY INSERT WHEN PICKEDUP
                                if (
                                    delivery_status !== "PICKEDUP"
                                ) {

                                    return connection.commit((commitError) => {
                                        if (commitError) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback({
                                                    stage: "COMMIT",
                                                    message: commitError
                                                });
                                            });
                                        }

                                        connection.release();

                                        return callback(null, {
                                            success: 1
                                        });
                                    });
                                }

                                // PREPARE BULK INSERT
                                const logValues = item.map((val) => ([
                                    null, // patient_diet_id
                                    val.item_id,
                                    val.quantity,
                                    "PENDING",
                                    updated_by,
                                    remarks || "Order Picked Up",
                                    canteen_order_id,
                                    val.type_slno
                                ]));

                                const insertLogQuery = `
                                INSERT INTO diet_delivery_log
                                (
                                    patient_diet_id,
                                    item_id,
                                    delivered_qty,
                                    delivery_status,
                                    updated_by,
                                    updated_remarks,
                                    canteen_order_id,
                                    type_slno
                                )
                                VALUES ?
                            `;
                                connection.query(
                                    insertLogQuery,
                                    [logValues],
                                    (logError) => {

                                        if (logError) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback({
                                                    stage: "INSERT_DELIVERY_LOG",
                                                    message: logError
                                                });
                                            });
                                        }
                                        connection.commit((commitError) => {
                                            if (commitError) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    return callback({
                                                        stage: "COMMIT",
                                                        message: commitError
                                                    });
                                                });
                                            }
                                            connection.release();
                                            return callback(null, {
                                                success: 1
                                            });
                                        });
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    },


   UpdateDeliveryLogDetail: (data, callback) => {

    const {
        assignment_id,
        canteen_order_id,
        patient_diet_id,
        item_id,
        delivered_qty,
        delivery_status,
        remarks,
        updated_by,
        develivered_by,
        delivered_time,
        delivery_remarks,
        type_slno
    } = data;

    pool.getConnection((err, connection) => {

        if (err) {
            return callback({
                stage: "CONNECTION",
                message: err
            });
        }

        connection.beginTransaction((err) => {

            if (err) {

                connection.release();

                return callback({
                    stage: "TRANSACTION",
                    message: err
                });
            }

           
            // 1. UPDATE ASSIGNMENT DETAIL
        
            let updateAssignmentQuery = `
                UPDATE diet_delivery_assignment_detail
                SET
                    delivery_status = ?,
                    remarks = ?
            `;

            const assignmentParams = [
                delivery_status,
                remarks || null
            ];

            // ONLY WHEN DELIVERED
            if (delivery_status === "DELIVERED") {

                updateAssignmentQuery += `,
                    delivered_at = NOW(),
                    delivered_by = ?
                `;

                assignmentParams.push(updated_by);
            }

            updateAssignmentQuery += `
                WHERE assignment_id = ?
                AND canteen_order_id = ?
            `;

            assignmentParams.push(
                assignment_id,
                canteen_order_id
            );
            connection.query(
                updateAssignmentQuery,
                assignmentParams,
                (assignmentError) => {
                    if (assignmentError) {
                        return connection.rollback(() => {
                            connection.release();
                            return callback({
                                stage: "UPDATE_ASSIGNMENT_DETAIL",
                                message: assignmentError
                            });
                        });
                    }
                
                    // 2.CHECK DELIVERY LOG EXIST
                   
                    const checkExistingLogQuery = `
                        SELECT delivery_id
                        FROM diet_delivery_log
                        WHERE canteen_order_id = ?
                        AND type_slno = ?
                        AND item_id = ?
                        LIMIT 1
                    `;

                    connection.query(
                        checkExistingLogQuery,
                        [
                            canteen_order_id,
                            type_slno,
                            item_id
                        ],
                        (checkError, checkResult) => {

                            if (checkError) {

                                return connection.rollback(() => {

                                    connection.release();

                                    return callback({
                                        stage: "CHECK_DELIVERY_LOG",
                                        message: checkError
                                    });
                                });
                            }
                        
                            // 3. UPDATE EXISTING LOG
                        
                            const hasExistingLog =
                                checkResult.length > 0;

                            const saveDeliveryLog = (cb) => { 
                                // UPDATE
                                if (hasExistingLog) {
                                    let updateLogQuery = `
                                        UPDATE diet_delivery_log
                                        SET
                                            patient_diet_id = ?,
                                            delivered_qty = ?,
                                            delivery_status = ?,
                                            updated_by = ?,
                                            updated_remarks = ?
                                    `;

                                    const updateLogParams = [
                                        patient_diet_id,
                                        delivered_qty,
                                        delivery_status,
                                        updated_by,
                                        remarks || null
                                    ];

                                    // ONLY WHEN DELIVERED
                                    if (delivery_status === "DELIVERED") {

                                        updateLogQuery += `,
                                            develivered_by = ?,
                                            delivered_time = ?,
                                            delivery_remarks = ?
                                        `;

                                        updateLogParams.push(
                                            develivered_by || updated_by,
                                            delivered_time || new Date(),
                                            delivery_remarks || remarks || null
                                        );
                                    }

                                    updateLogQuery += `
                                        WHERE canteen_order_id = ?
                                        AND type_slno = ?
                                        AND item_id = ?
                                    `;
                                    updateLogParams.push(
                                        canteen_order_id,
                                        type_slno,
                                        item_id
                                    );
                                    connection.query(
                                        updateLogQuery,
                                        updateLogParams,
                                        cb
                                    );
                                }
                                // INSERT
                                else {

                                    const insertColumns = [
                                        'patient_diet_id',
                                        'item_id',
                                        'canteen_order_id',
                                        'type_slno',
                                        'delivered_qty',
                                        'delivery_status',
                                        'updated_by',
                                        'updated_remarks'
                                    ];

                                    const insertValues = [
                                        patient_diet_id,
                                        item_id,
                                        canteen_order_id,
                                        type_slno,
                                        delivered_qty,
                                        delivery_status,
                                        updated_by,
                                        remarks || null
                                    ];

                                    // ONLY FOR DELIVERED
                                    if (delivery_status === "DELIVERED") {

                                        insertColumns.push(
                                            'develivered_by',
                                            'delivered_time',
                                            'delivery_remarks'
                                        );

                                        insertValues.push(
                                            develivered_by || updated_by,
                                            delivered_time || new Date(),
                                            delivery_remarks || remarks || null
                                        );
                                    }

                                    const placeholders = insertColumns
                                        .map(() => '?')
                                        .join(',');

                                    const insertLogQuery = `
                                        INSERT INTO diet_delivery_log
                                        (
                                            ${insertColumns.join(',')}
                                        )
                                        VALUES
                                        (
                                            ${placeholders}
                                        )
                                    `;

                                    connection.query(
                                        insertLogQuery,
                                        insertValues,
                                        cb
                                    );
                                }
                            };

                            saveDeliveryLog((logError) => {
                                if (logError) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback({
                                            stage: hasExistingLog
                                                ? "UPDATE_DELIVERY_LOG"
                                                : "INSERT_DELIVERY_LOG",
                                            message: logError
                                        });
                                    });
                                }

                            
                                // 4. GET ALL ITEM STATUS
                                const checkStatusQuery = `
                                    SELECT
                                        delivery_status
                                    FROM diet_delivery_log
                                    WHERE canteen_order_id = ?
                                    AND type_slno = ?
                                `;

                                connection.query(
                                    checkStatusQuery,
                                    [
                                        canteen_order_id,
                                        type_slno
                                    ],
                                    (statusError, statusResult) => {
                                        if (statusError) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback({
                                                    stage: "CHECK_STATUS",
                                                    message: statusError
                                                });
                                            });
                                        }

                                        const statuses =
                                            statusResult.map(
                                                item => item.delivery_status
                                            );

                                        let mainAssignmentStatus = "ASSIGNED";

                                        // ALL DELIVERED
                                        const allDelivered =
                                            statuses.length > 0 &&
                                            statuses.every(
                                                status =>
                                                    status === "DELIVERED"
                                            );

                                        // ALL CANCELLED
                                        const allCancelled =
                                            statuses.length > 0 &&
                                            statuses.every(
                                                status =>
                                                    status === "CANCELLED"
                                            );

                                        // ANY PARTIAL STATUS
                                        const hasPartial =
                                            statuses.some(
                                                status =>
                                                    status === "RETURNED" ||
                                                    status === "UNDELIVERED"
                                            );

                                        // ANY PICKEDUP / PREPARED
                                        const hasInProgress =
                                            statuses.some(
                                                status =>
                                                    status === "PICKEDUP" ||
                                                    status === "PREPARED"
                                            );

                                        // FINAL STATUS LOGIC
                                        if (allDelivered) {
                                            mainAssignmentStatus = "COMPLETED";
                                        }
                                        else if (allCancelled) {
                                            mainAssignmentStatus = "CANCELLED";
                                        }
                                        else if (hasPartial) {
                                            mainAssignmentStatus = "PARTIAL";
                                        }
                                        else if (hasInProgress) {
                                            mainAssignmentStatus = "INPROGRESS";
                                        }
                                        else {
                                            mainAssignmentStatus = "ASSIGNED";
                                        }

                                        // 5. UPDATE MAIN ASSIGNMENT
                                        let updateMainQuery = `
                                            UPDATE diet_delivery_assignment
                                            SET
                                                delivery_status = ?
                                        `;
                                        const mainParams = [
                                            mainAssignmentStatus
                                        ];
                                        // ONLY WHEN COMPLETED
                                        if (
                                            mainAssignmentStatus === "COMPLETED"
                                        ) {
                                            updateMainQuery += `,
                                                completed_time = NOW()
                                            `;
                                        }
                                        updateMainQuery += `
                                            WHERE assignment_id = ?
                                        `;
                                        mainParams.push(assignment_id);
                                        connection.query(
                                            updateMainQuery,
                                            mainParams,
                                            (mainError) => {
                                                if (mainError) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        return callback({
                                                            stage: "UPDATE_MAIN_ASSIGNMENT",
                                                            message: mainError
                                                        });
                                                    });
                                                }
                                                // COMMIT
                                                connection.commit((commitError) => {
                                                    if (commitError) {
                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            return callback({
                                                                stage: "COMMIT",
                                                                message: commitError
                                                            });
                                                        });
                                                    }
                                                    connection.release();
                                                    return callback(null, {
                                                        success: 1,
                                                        assignment_status:
                                                            mainAssignmentStatus
                                                    });
                                                });
                                            }
                                        );
                                    }
                                );
                            });
                        }
                    );
                }
            );
        });
    });
},

};