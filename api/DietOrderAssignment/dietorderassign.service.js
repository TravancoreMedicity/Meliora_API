// dietdeliveryassign.service.js
const { pool } = require('../../config/database');
const { executeQuery } = require('../Canteen_Orders/Helper');
const { createServiceLedger } = require('./dietorderhelper');

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
                fbp.fb_ptc_mobile,
                fbp.fb_ip_no,
                fbp.fb_pt_no,
                fbp.fb_ptc_mobile,
                opt.party_name,
                opt.party_type_id,
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
            WHERE assigned_to = ?  and date(dds.assigned_at) = curdate()`;
        executeQuery(query, [assign_to], callback);
    },
    FetchAssignedItemStatus: (assign_to, assignment_id, callback) => {
        // const query = `
        //    SELECT 
        //         ddsd.canteen_order_id,
        //         ddsd.delivery_priority AS ItemPriority,
        //         ddsd.delivery_status AS ItemStatus,
        //         dds.assignment_id,
        //         dds.assigned_at,
        //         dds.delivery_status AS AssignyStatus,
        //         emp.em_id,
        //         emp.em_name,
        //         emp.em_no,
        //         co.nursing_station_id,
        //         co.room_id,
        //         co.party_type_id,
        //         fnsm.fb_ns_code,
        //         fnsm.fb_ns_name,
        //         fb.fb_bdc_no,
        //         fbp.fb_ptc_name,
        //         fbp.fb_ip_no,
        //         fbp.fb_pt_no,
        //         fbp.fb_ptc_mobile,
        //         opt.party_name,
        //         dt.type_desc,
        //         dt.type_slno,
        //         fbp.fb_ipad_slno
        //     FROM
        //         diet_delivery_assignment_detail ddsd
        //             LEFT JOIN
        //         diet_delivery_assignment dds ON dds.assignment_id = ddsd.assignment_id
        //             LEFT JOIN
        //         co_employee_master emp ON emp.em_id = dds.assigned_to
        //             LEFT JOIN
        //         canteen_order co ON co.canteen_order_id = ddsd.canteen_order_id
        //             LEFT JOIN 
        //         fb_nurse_station_master fnsm ON fnsm.fb_nurse_stn_slno = co.nursing_station_id
        //             LEFT JOIN 
        //         fb_bed fb ON fb.fb_bed_slno = co.room_id
        //             LEFT JOIN
        //         order_party_type opt ON opt.party_type_id = co.party_type_id
        //                 LEFT JOIN 
        //         fb_ipadmiss fbp ON fbp.fb_ip_no = co.admission_id
        //         LEFT JOIN 
        //         diet_type dt ON dt.type_slno = ddsd.type_slno
        //     WHERE assigned_to = ? and dds.assignment_id = ?`;

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
                co.admission_id,

                fnsm.fb_ns_code,
                fnsm.fb_ns_name,

                fb.fb_bdc_no,

                fbp.fb_ptc_name,
                fbp.fb_ip_no,
                fbp.fb_pt_no,
                fbp.fb_ptc_mobile,
                fbp.fb_ipad_slno,

                opt.party_name,

                dt.type_desc,
                dt.type_slno,

                pdp.plan_id,
                pdp.diet_id

            FROM diet_delivery_assignment_detail ddsd

            LEFT JOIN diet_delivery_assignment dds
                ON dds.assignment_id = ddsd.assignment_id

            LEFT JOIN co_employee_master emp
                ON emp.em_id = dds.assigned_to

            LEFT JOIN canteen_order co
                ON co.canteen_order_id = ddsd.canteen_order_id

            LEFT JOIN fb_nurse_station_master fnsm
                ON fnsm.fb_nurse_stn_slno = co.nursing_station_id

            LEFT JOIN fb_bed fb
                ON fb.fb_bed_slno = co.room_id

            LEFT JOIN order_party_type opt
                ON opt.party_type_id = co.party_type_id

            LEFT JOIN fb_ipadmiss fbp
                ON fbp.fb_ip_no = co.admission_id

            LEFT JOIN diet_type dt
                ON dt.type_slno = ddsd.type_slno

            LEFT JOIN patient_diet_plan pdp
                ON pdp.admission_id = co.admission_id
            AND co.party_type_id = 2
            AND pdp.is_active = 1
            AND pdp.diet_status = 'ACTIVE'

            WHERE dds.assigned_to = ?
            AND dds.assignment_id = ? ;
        `
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
            patient_diet_id,
            delivery_status,
            remarks,
            updated_by,
            item = [],
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

                // 1. UPDATE ONLY SELECTED MEAL TYPE

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
                AND type_slno = ?
            `;

                detailParams.push(
                    assignment_id,
                    canteen_order_id,
                    type_slno
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

                        // 2. GET ALL DETAIL STATUSES

                        const statusQuery = `
                        SELECT delivery_status
                        FROM diet_delivery_assignment_detail
                        WHERE assignment_id = ?
                    `;

                        connection.query(
                            statusQuery,
                            [assignment_id],
                            (statusError, statusRows) => {

                                if (statusError) {

                                    return connection.rollback(() => {

                                        connection.release();

                                        return callback({
                                            stage: "FETCH_STATUSES",
                                            message: statusError
                                        });
                                    });
                                }

                                // 3. DERIVE PARENT STATUS

                                const statuses = statusRows.map(
                                    (row) => row.delivery_status
                                );

                                const allDelivered = statuses.every(
                                    (s) => s === "DELIVERED"
                                );

                                const allPicked = statuses.every(
                                    (s) =>
                                        s === "PICKEDUP" ||
                                        s === "DELIVERED"
                                );

                                const somePicked = statuses.some(
                                    (s) =>
                                        s === "PICKEDUP" ||
                                        s === "DELIVERED"
                                );

                                let parentStatus = "ASSIGNED";

                                if (allDelivered) {

                                    parentStatus = "COMPLETED";

                                } else if (allPicked) {

                                    parentStatus = "PICKEDUP";

                                } else if (somePicked) {

                                    parentStatus = "PARTIAL";
                                }

                                // 4. UPDATE PARENT ASSIGNMENT TABLE

                                let assignmentQuery = `
                                UPDATE diet_delivery_assignment
                                SET
                                    delivery_status = ?
                            `;

                                const assignmentParams = [
                                    parentStatus
                                ];

                                // SET PICKUP TIME
                                if (parentStatus === "PICKEDUP") {

                                    assignmentQuery += `,
                                    pickup_time = NOW()
                                `;
                                }

                                // SET COMPLETED TIME
                                if (parentStatus === "COMPLETED") {

                                    assignmentQuery += `,
                                    completed_time = NOW()
                                `;
                                }

                                assignmentQuery += `
                                WHERE assignment_id = ?
                            `;

                                assignmentParams.push(
                                    assignment_id
                                );

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

                                        // 5. INSERT DELIVERY LOG
                                        // ONLY WHEN PICKEDUP

                                        if (
                                            delivery_status !== "PICKEDUP"
                                        ) {
                                            return connection.commit(
                                                (commitError) => {

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
                                                        parentStatus
                                                    });
                                                }
                                            );
                                        }
                                        // NO ITEMS
                                        if (!item?.length) {

                                            return connection.commit(
                                                (commitError) => {

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
                                                        parentStatus
                                                    });
                                                }
                                            );
                                        }
                                        // 6. PREPARE LOG VALUES

                                        const logValues = item.map((val) => ([
                                            val.patient_diet_id, // patient_diet_id
                                            val.item_id,
                                            val.quantity,
                                            "PENDING",
                                            updated_by,
                                            remarks || "Order Picked Up",
                                            canteen_order_id,
                                            type_slno,
                                            val.source_type,
                                            val.source_id
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
                                            type_slno,
                                            source_type,
                                            source_id 
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

                                                // 7. COMMIT

                                                connection.commit(
                                                    (commitError) => {

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
                                                            parentStatus
                                                        });
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            });
        });
    },

    UpdateAssignOrderDetail: (data, callback) => {

        const {
            assignment_id,
            canteen_order_id,
            delivery_status,
            remarks,
            updated_by,
            type_slno
        } = data;
        console.log({
            data
        });

        let query = `
        UPDATE diet_delivery_assignment_detail
        SET
            delivery_status = ?,
            remarks = ?
    `;

        const params = [
            delivery_status,
            remarks || null
        ];

        //  only when DELIVERED
        if (delivery_status === "DELIVERED") {
            query += `,
            delivered_at = NOW(),
            delivered_by = ?
        `;

            params.push(updated_by);
        }

        query += `
        WHERE assignment_id = ?
        AND canteen_order_id = ?
        AND type_slno = ?
    `;

        params.push(assignment_id);
        params.push(canteen_order_id);
        params.push(type_slno);

        executeQuery(query, params, callback);
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
            type_slno,
            source_id,
            source_type
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
                        stage: "BEGIN_TRANSACTION",
                        message: err
                    });
                }

                // 1. CHECK EXISTING
                const checkQuery = `
                        SELECT delivery_id
                        FROM diet_delivery_log
                        WHERE canteen_order_id = ?
                        AND type_slno = ?
                        AND item_id = ?
                        LIMIT 1
        `;

                connection.query(
                    checkQuery,
                    [canteen_order_id, type_slno, item_id],
                    (checkError, checkResult) => {

                        if (checkError) {
                            return connection.rollback(() => {
                                connection.release();
                                return callback({
                                    stage: "CHECK_LOG",
                                    message: checkError
                                });
                            });
                        }
                        const exists = checkResult.length > 0;

                        // =====================================================
                        // 2. UPDATE
                        // =====================================================
                        if (exists) {

                            let updateQuery = `
                        UPDATE diet_delivery_log
                        SET
                            patient_diet_id = ?,
                            delivered_qty = ?,
                            delivery_status = ?,
                            updated_by = ?,
                            updated_remarks = ?
                    `;

                            const params = [
                                patient_diet_id,
                                delivered_qty,
                                delivery_status,
                                updated_by,
                                remarks || null
                            ];

                            // only when delivered
                            if (delivery_status === "DELIVERED") {

                                updateQuery += `,
                            develivered_by = ?,
                            delivered_time = ?,
                            delivery_remarks = ?
                        `;

                                params.push(
                                    develivered_by || updated_by,
                                    delivered_time || new Date(),
                                    delivery_remarks || remarks || null
                                );
                            }

                            updateQuery += `
                        WHERE canteen_order_id = ?
                        AND type_slno = ?
                        AND item_id = ?
                    `;

                            params.push(canteen_order_id, type_slno, item_id);

                            connection.query(updateQuery, params, (err2) => {

                                if (err2) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback({
                                            stage: "UPDATE_LOG",
                                            message: err2
                                        });
                                    });
                                }

                                if (delivery_status !== "DELIVERED") {
                                    return connection.commit(err => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback(err);
                                            });
                                        }
                                        connection.release();
                                        return callback(null, {
                                            success: 1,
                                            message: "Updated successfully"
                                        });
                                    });
                                }

                                createServiceLedger(
                                    checkResult[0].delivery_id,
                                    updated_by,
                                    connection,
                                    (ledgerErr) => {

                                        if (ledgerErr) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback(ledgerErr);
                                            });
                                        }

                                        connection.commit(err => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback(err);
                                                });
                                            }
                                            connection.release();
                                            callback(null, {
                                                success: 1,
                                                message: "Updated successfully"
                                            });

                                        });

                                    }
                                );

                            });
                        }


                        else {

                            const columns = [
                                "patient_diet_id",
                                "item_id",
                                "canteen_order_id",
                                "type_slno",
                                "delivered_qty",
                                "delivery_status",
                                "updated_by",
                                "updated_remarks",
                                "source_type",
                                "source_id"
                            ];

                            const values = [
                                patient_diet_id,
                                item_id,
                                canteen_order_id,
                                type_slno,
                                delivered_qty,
                                delivery_status,
                                updated_by,
                                remarks || null,
                                source_type,
                                source_id
                            ];

                            if (delivery_status === "DELIVERED") {

                                columns.push(
                                    "develivered_by",
                                    "delivered_time",
                                    "delivery_remarks"
                                );

                                values.push(
                                    develivered_by || updated_by,
                                    delivered_time || new Date(),
                                    delivery_remarks || remarks || null
                                );
                            }

                            const placeholders = columns.map(() => "?").join(",");

                            const insertQuery = `
                        INSERT INTO diet_delivery_log (${columns.join(",")})
                        VALUES (${placeholders})
                    `;


                            connection.query(insertQuery, values, (err3, result) => {

                                if (err3) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return callback({
                                            stage: "INSERT_LOG",
                                            message: err3
                                        });
                                    });
                                }

                                if (delivery_status !== "DELIVERED") {
                                    return connection.commit(err => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                return callback(err);
                                            });
                                        }
                                        connection.release();
                                        return callback(null, {
                                            success: 1,
                                            message: "Updated successfully"
                                        });
                                    });
                                }

                                createServiceLedger(
                                    result.insertId,
                                    updated_by,
                                    connection,
                                    (ledgerErr) => {

                                        if (ledgerErr) {

                                            return connection.rollback(() => {

                                                connection.release();

                                                return callback(ledgerErr);

                                            });

                                        }

                                        connection.commit((commitErr) => {

                                            if (commitErr) {

                                                return connection.rollback(() => {

                                                    connection.release();

                                                    return callback(commitErr);

                                                });

                                            }

                                            connection.release();

                                            return callback(null, {
                                                success: 1,
                                                message: "Inserted successfully"
                                            });

                                        });

                                    }
                                );

                            });
                        }
                    }
                );
            });



        });
    },

    getBillingSummary: (ptNo, ipNo, callback) => {
        const query = `
           SELECT
                    x.pt_no,
                    x.admission_id,

                    COUNT(*) AS total_bill_items,

                    SUM(x.gross_amount) AS gross_amount,
                    SUM(x.discount) AS total_discount,
                    SUM(x.gst_amount) AS total_gst,
                    SUM(x.net_amount) AS net_amount,

                    SUM(CASE WHEN x.status='PENDING' THEN x.net_amount ELSE 0 END) AS pending_amount,
                    SUM(CASE WHEN x.status='BILLED' THEN x.net_amount ELSE 0 END) AS billed_amount,
                    SUM(CASE WHEN x.status='CANCELLED' THEN x.net_amount ELSE 0 END) AS cancelled_amount

                FROM
                (
                    SELECT
                        pt_no,
                        admission_id,
                        meal_rate AS gross_amount,
                        discount,
                        0 AS gst_amount,
                        net_amount,
                        charge_status AS status
                    FROM diet_meal_charge
                    WHERE pt_no=?
                    AND admission_id=?

                    UNION ALL

                    SELECT
                        pt_no,
                        admission_id,
                        gross_amount,
                        discount,
                        gst_amount,
                        net_amount,
                        ledger_status AS status
                    FROM diet_service_ledger
                    WHERE pt_no=?
                    AND admission_id=?
                ) x
`;
        executeQuery(query, [
            ptNo,
            ipNo,
            ptNo,
            ipNo
        ],
            callback);
    },

    getBillingDeliveryDetail: (ptNo, ipNo, callback) => {
        const query = `
                SELECT
                    ddl.delivery_id,

                 
                    ddl.source_type,
                    ddl.source_id,
                    ddl.canteen_order_id,

                   
                    ddl.patient_diet_id,

                 
                    pdp.patient_id,
                    pdp.admission_id,

                    pdp.plan_id,
                    pdp.diet_status,
                    pdp.start_date AS diet_start_date,
                    pdp.end_date AS diet_end_date,


                 
                    pdp.diet_id,
                    pdm.diet_name,
                    pdm.description,
                    pdm.calories_per_day,
                    pdm.protein_per_day,


                    
                    ddl.type_slno,
                    dt.type_desc AS meal_name,


                    im.item_id,
                    im.item_name,

                    ddl.delivered_qty,
                    ddl.delivery_status,
                    ddl.delivered_time,
                    ddl.delivery_remarks,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN 'DIET_PACKAGE'

                        WHEN ddl.source_type = 'PATIENT_EXTRA_ORDER'
                            THEN 'EXTRA_ITEM'

                        WHEN ddl.source_type = 'CANTEEN_ORDER'
                            THEN 'CANTEEN_ITEM'

                        ELSE 'UNKNOWN'
                    END AS billing_type,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN dmc.meal_rate

                        WHEN ddl.source_type IN ('PATIENT_EXTRA_ORDER','CANTEEN_ORDER')
                            THEN dsl.unit_rate

                        ELSE 0
                    END AS unit_rate,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN dmc.meal_rate

                        WHEN ddl.source_type IN ('PATIENT_EXTRA_ORDER','CANTEEN_ORDER')
                            THEN dsl.gross_amount

                        ELSE 0
                    END AS gross_amount,


                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN dmc.discount

                        WHEN ddl.source_type IN ('PATIENT_EXTRA_ORDER','CANTEEN_ORDER')
                            THEN dsl.discount

                        ELSE 0
                    END AS discount,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN 0

                        WHEN ddl.source_type IN ('PATIENT_EXTRA_ORDER','CANTEEN_ORDER')
                            THEN dsl.gst_amount

                        ELSE 0
                    END AS gst_amount,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN dmc.net_amount

                        WHEN ddl.source_type IN ('PATIENT_EXTRA_ORDER','CANTEEN_ORDER')
                            THEN dsl.net_amount

                        ELSE 0
                    END AS net_amount,

                    CASE
                        WHEN ddl.source_type = 'DIET_ORDER'
                            THEN dmc.charge_status

                        ELSE dsl.ledger_status
                    END AS billing_status


                FROM diet_delivery_log ddl


                -- Diet schedule
                LEFT JOIN patient_diet_schedule pds
                    ON pds.patient_diet_id = ddl.patient_diet_id


                -- Diet plan
                LEFT JOIN patient_diet_plan pdp
                    ON pdp.plan_id = pds.plan_id


                -- Diet master
                LEFT JOIN patient_diet_master pdm
                    ON pdm.diet_id = pdp.diet_id


                -- Meal
                LEFT JOIN diet_type dt
                    ON dt.type_slno = ddl.type_slno


                -- Item
                LEFT JOIN item_master im
                    ON im.item_id = ddl.item_id


                -- Diet package charge
                LEFT JOIN diet_meal_charge dmc
                    ON dmc.patient_diet_id = ddl.patient_diet_id
                    AND dmc.type_slno = ddl.type_slno


                -- Extra/Canteen item charge
                LEFT JOIN diet_service_ledger dsl
                    ON dsl.delivery_id = ddl.delivery_id
                    AND dsl.item_id = ddl.item_id


                WHERE
                    pdp.patient_id = ?
                AND pdp.admission_id = ?

                AND ddl.delivery_status = 'DELIVERED'


                ORDER BY
                    ddl.delivered_time
`;
        executeQuery(query, [ptNo, ipNo], callback);
    },

    getBillingTransactions: (ptNo, ipNo, status, callback) => {
        const query = `
        SELECT
            dmc.meal_charge_id AS bill_id,
            'DIET_ORDER' AS billing_type,

            CASE
                WHEN dmc.party_type_id = 2 THEN 'PATIENT'
                ELSE 'BYSTANDER'
            END AS party,

            dmc.admission_id,
            dmc.pt_no,

            dt.type_desc AS meal_name,

            NULL AS item_name,
            NULL AS item_id,

            1 AS quantity,

            dmc.meal_rate AS unit_rate,
            dmc.discount,

            0 AS gst_rate,
            0 AS gst_amount,

            dmc.net_amount,

            dmc.charge_status AS status,
            dmc.created_at

        FROM diet_meal_charge dmc

        LEFT JOIN diet_type dt
            ON dt.type_slno = dmc.type_slno

        WHERE dmc.pt_no = ?
        AND dmc.admission_id = ?
        AND dmc.charge_status = ?

        UNION ALL


        SELECT
            dsl.ledger_id AS bill_id,

            CASE
                WHEN ddl.source_type='PATIENT_EXTRA_ORDER'
                    THEN 'EXTRA_ORDER'

                WHEN ddl.source_type='CANTEEN_ORDER'
                    AND dsl.party_type_id = 1
                    THEN 'PATIENT_CANTEEN_ORDER'

                WHEN ddl.source_type='CANTEEN_ORDER'
                    AND dsl.party_type_id <> 1
                    THEN 'BYSTANDER_CANTEEN_ORDER'

                ELSE 'UNKNOWN'
            END AS billing_type,


            CASE
                WHEN dsl.party_type_id = 2 THEN 'PATIENT'
                ELSE 'BYSTANDER'
            END AS party,


            dsl.admission_id,
            dsl.pt_no,

            dt.type_desc AS meal_name,

            im.item_name,
            im.item_id,

            dsl.quantity,

            dsl.unit_rate,
            dsl.discount,

            dsl.gst_rate,
            dsl.gst_amount,

            dsl.net_amount,

            dsl.ledger_status AS status,

            dsl.created_at


        FROM diet_service_ledger dsl

        INNER JOIN diet_delivery_log ddl
            ON ddl.delivery_id = dsl.delivery_id

        LEFT JOIN diet_type dt
            ON dt.type_slno = ddl.type_slno

        LEFT JOIN item_master im
            ON im.item_id = dsl.item_id


        WHERE dsl.pt_no = ?
        AND dsl.admission_id = ?
        AND dsl.ledger_status = ?

        ORDER BY created_at
    `;

        executeQuery(query, [ptNo, ipNo, status, ptNo, ipNo, status], callback);
    },

    getBystanderBill: (ipNo, ptNo, status, callback) => {
        const query = `
         SELECT

    dsl.ledger_id AS bill_id,

    'BYSTANDER_ORDER' AS billing_type,

    'BYSTANDER' AS party,

    dsl.admission_id,

    dsl.pt_no,

      dt.type_desc AS meal_name,
      
    im.item_name,

    dsl.quantity,

    dsl.unit_rate,

    dsl.discount,

    dsl.gst_rate,

    dsl.gst_amount,

    dsl.net_amount,

    dsl.ledger_status AS status,

    dsl.created_at

FROM diet_service_ledger dsl

INNER JOIN item_master im
    ON im.item_id = dsl.item_id

LEFT JOIN canteen_order_item coi
    ON coi.canteen_order_item_id = dsl.canteen_order_id

LEFT JOIN diet_type dt
    ON dt.type_slno = coi.type_slno

WHERE dsl.party_type_id = 1
AND dsl.admission_id = ?
AND dsl.pt_no = ?
AND dsl.ledger_status = ?

ORDER BY dsl.created_at
    `;

        executeQuery(query, [ipNo, ptNo, status], callback);
    },

    getPatientExtraOrder: (ipNo, ptNo, status, callback) => {
        const query = `
         SELECT

    dsl.ledger_id AS bill_id,

    'EXTRA_ORDER' AS billing_type,

    'PATIENT' AS party,

    dsl.admission_id,
    dsl.pt_no,

    dt.type_desc AS meal_name,

    im.item_name,

    dsl.quantity,

    dsl.unit_rate,

    dsl.discount,

    dsl.gst_rate,

    dsl.gst_amount,

    dsl.net_amount,

    dsl.ledger_status AS status,

    dsl.created_at

FROM diet_service_ledger dsl

INNER JOIN diet_delivery_log ddl
    ON ddl.delivery_id = dsl.delivery_id

INNER JOIN patient_diet_schedule pds
    ON pds.patient_diet_id = ddl.patient_diet_id

INNER JOIN diet_type dt
    ON dt.type_slno = ddl.type_slno

INNER JOIN item_master im
    ON im.item_id = dsl.item_id

WHERE dsl.party_type_id = 2
AND ddl.source_type = 'PATIENT_EXTRA_ORDER'
AND dsl.admission_id = ?
AND dsl.pt_no = ?
AND dsl.ledger_status = ?

ORDER BY dsl.created_at
    `;

        executeQuery(query, [ipNo, ptNo, status], callback);
    },

    getPatientDietBill: (ipNo, ptNo, status, callback) => {
        const query = `
       SELECT
    dmc.meal_charge_id AS bill_id,

    'DIET_PACKAGE' AS billing_type,
    'PATIENT' AS party,

    dmc.admission_id,
    dmc.pt_no,

    pdp.plan_id,

    pdp.diet_status,
    pdp.start_date,
    pdp.end_date,

    pdm.diet_id,
    pdm.diet_name,
    pdm.description,
    pdm.calories_per_day,
    pdm.protein_per_day,

    dt.type_desc AS meal_name,

    1 AS quantity,

    dmc.meal_rate AS unit_rate,
    dmc.discount,

    0 AS gst_rate,
    0 AS gst_amount,

    dmc.net_amount,

    dmc.charge_status AS status,

    dmc.created_at

FROM diet_meal_charge dmc

INNER JOIN patient_diet_plan pdp
    ON pdp.plan_id = dmc.patient_diet_id

INNER JOIN patient_diet_master pdm
    ON pdm.diet_id = pdp.diet_id

INNER JOIN diet_type dt
    ON dt.type_slno = dmc.type_slno

WHERE dmc.pt_no = ?
  AND dmc.admission_id = ?
  AND dmc.party_type_id = 2  
  AND dmc.charge_status = ?   

ORDER BY dmc.created_at
    `;

        executeQuery(query, [ipNo, ptNo, status], callback);
    },

    ///billing portion comes here bro 

    createPatientBillingService: async (data, callback) => {

        const {
            patient_id,
            admission_id,
            total_amount,
            created_by,
            items = []
        } = data;


        pool.getConnection(async (err, connection) => {
            if (err) {
                return callback(err);
            }
            const query = (sql, params = []) => {
                return new Promise((resolve, reject) => {
                    connection.query(sql, params, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }

                    });

                });
            };


            try {
                await new Promise((resolve, reject) => {
                    connection.beginTransaction(err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });

                });

                /*
                **********************************************
                CREATE BILL HEADER
                **********************************************
                */
                const headerQuery = `
                INSERT INTO patient_billing
                (
                    patient_id,
                    admission_id,
                    billing_date,
                    total_amount,
                    billing_status,
                    created_by
                )
                VALUES
                (
                    ?,
                    ?,
                    CURDATE(),
                    ?,
                    'OPEN',
                    ?
                )
            `;
                const headerResult = await query(headerQuery, [
                    patient_id,
                    admission_id,
                    total_amount,
                    created_by
                ]);
                const billingId = headerResult.insertId;
                /*
                **********************************************
                INSERT BILL DETAILS + UPDATE SOURCE
                **********************************************
                */
                for (const item of items) {
                    let categoryId;
                    let referenceTable;
                    switch (item.billing_type) {
                        case "DIET_ORDER":
                            categoryId = 1;
                            referenceTable = "diet_meal_charge";
                            break;

                        case "EXTRA_ORDER":
                        case "PATIENT_CANTEEN_ORDER":
                        case "BYSTANDER_CANTEEN_ORDER":

                            categoryId = 2;
                            referenceTable = "diet_service_ledger";
                            break;
                        default:
                            throw new Error(
                                `Unknown billing type : ${item.billing_type}`
                            );
                    }



                    const detailQuery = `
                    INSERT INTO patient_billing_detail
                    (
                        billing_id,
                        category_id,
                        description,
                        item_id,
                        quantity,
                        rate,
                        gst,
                        gst_amount,
                        discount,
                        amount,
                        reference_table,
                        reference_id,
                        service_date
                    )
                    VALUES
                    (
                        ?,?,?,?,?,?,?,?,?,?,?,?,?
                    )
                `;
                    await query(detailQuery, [
                        billingId,
                        categoryId,
                        item.description,
                        item.item_id,
                        item.quantity,
                        item.unit_rate,
                        item.gst_rate,
                        item.gst_amount,
                        item.discount,
                        item.net_amount,
                        referenceTable,
                        item.bill_id,
                        item.created_at
                    ]);

                    /*
                    **********************************************
                    UPDATE SOURCE STATUS
                    **********************************************
                    */
                    if (item.billing_type === "DIET_ORDER") {
                        await query(
                            `
                        UPDATE diet_meal_charge
                        SET charge_status = 'BILLED'
                        WHERE meal_charge_id = ?
                        `,
                            [
                                item.bill_id
                            ]
                        );


                    } else {
                        await query(
                            `
                        UPDATE diet_service_ledger
                        SET ledger_status = 'BILLED'
                        WHERE ledger_id = ?
                        `,
                            [
                                item.bill_id
                            ]
                        );
                    }
                }
                /*
                **********************************************
                COMMIT
                **********************************************
                */
                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            callback(err);
                        })
                    }
                    connection.release();
                    callback(null, {
                        billing_id: billingId,
                        total_amount,
                        total_items: items.length
                    });
                });

            } catch (error) {
                connection.rollback(() => {
                    connection.release();
                    callback(error);
                });
            }
        });


    },

    updateBulkPickingUpService: (Items, callback) => {
        const sql = `
        UPDATE diet_delivery_assignment_detail
        SET
            delivery_status = 'PICKEDUP'
        WHERE
            assignment_id = ?
            AND type_slno = ?
    `;
        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }
            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callback(err);
                }
                let completed = 0;
                Items?.forEach(item => {
                    connection.query(
                        sql,
                        [
                            item.assignment_id,
                            item.type_slno
                        ],
                        (err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err);
                                });
                            }
                            completed++;
                            if (completed === Items.length) {
                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            callback(err);
                                        });
                                    }
                                    connection.release();
                                    callback(null, {
                                        updatedCount: completed
                                    });
                                });
                            }
                        }
                    );
                });
            });
        });
    },

    getDeliveryBillDetailsService: (data, callback) => {

        const dietItems = data.filter(item => item.source_type === "DIET_ORDER");

        const serviceDeliveryIds = data
            .filter(item => item.source_type !== "DIET_ORDER")
            .map(item => item.delivery_id);

        let mealCharges = [];
        let serviceLedger = [];

        const fetchServiceLedger = (next) => {

            if (serviceDeliveryIds.length === 0) {
                return next();
            }

            const sql = `
            SELECT
                dsl.ledger_id,
                dsl.delivery_id,
                'SERVICE' AS bill_source,

                im.item_name,
                dsl.quantity,
                dsl.unit_rate,
                dsl.gross_amount,
                dsl.discount,
                dsl.gst_rate,
                dsl.gst_amount,
                dsl.net_amount,
                dsl.ledger_status

            FROM diet_service_ledger dsl

            INNER JOIN item_master im
                ON im.item_id = dsl.item_id

            WHERE dsl.delivery_id IN (?)

            ORDER BY dsl.created_at;
        `;

            pool.query(sql, [serviceDeliveryIds], (err, results) => {
                if (err) return callback(err);

                serviceLedger = results;
                next();
            });
        };

        const fetchMealCharges = (next) => {

            if (dietItems.length === 0) {
                return next();
            }

            console.log({
                dietItems
            });


            const conditions = [];
            const values = [];

            dietItems.forEach(item => {
                conditions.push("(dmc.patient_diet_id = ? AND dmc.type_slno = ?)");
                values.push(item.patient_diet_id, item.type_slno);
            });

            const sql = `
            SELECT
                dmc.meal_charge_id,
                'DIET' AS bill_source,

                dmc.patient_diet_id,
                dmc.diet_id,
                dm.diet_name,

                dmc.type_slno,
                dt.type_desc,

                1 AS quantity,
                dmc.meal_rate AS unit_rate,
                dmc.meal_rate AS gross_amount,
                dmc.discount,
                0 AS gst_rate,
                0 AS gst_amount,
                dmc.net_amount,
                dmc.charge_status

            FROM diet_meal_charge dmc


            INNER JOIN patient_diet_master dm
                ON dm.diet_id = dmc.diet_id

            INNER JOIN diet_type dt
                ON dt.type_slno = dmc.type_slno

            WHERE dmc.patient_diet_id = ? AND dmc.type_slno = ?

            ORDER BY dmc.created_at;
        `;

            pool.query(sql, values, (err, results) => {
                if (err) return callback(err);

                mealCharges = results;
                next();
            });
        };

        fetchMealCharges(() => {
            fetchServiceLedger(() => {

                callback(null, [
                    ...mealCharges,
                    ...serviceLedger
                ]);

            });
        });

    },
};