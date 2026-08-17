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
                ddsd.assignment_detail_id,
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

                        // 2. UPDATE
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

            dmc.party_type_id AS party_type_id,

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

             dsl.party_type_id AS party_type_id,

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

    1 as party_type_id,

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

    CASE
        WHEN ddl.source_type = 'PATIENT_EXTRA_ORDER'
            THEN 'EXTRA_ORDER'

        WHEN ddl.source_type = 'CANTEEN_ORDER'
            THEN 'PATIENT_CANTEEN_ORDER'

        ELSE 'UNKNOWN'
    END AS billing_type,

    'PATIENT' AS party,
    dsl.party_type_id,

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

INNER JOIN diet_type dt
    ON dt.type_slno = ddl.type_slno

INNER JOIN item_master im
    ON im.item_id = dsl.item_id

WHERE dsl.party_type_id = 2

AND ddl.source_type IN (
    'PATIENT_EXTRA_ORDER',
    'CANTEEN_ORDER'
)

AND dsl.admission_id = ?
AND dsl.pt_no = ?
AND dsl.ledger_status = ?

ORDER BY dsl.created_at;
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

INNER JOIN patient_diet_schedule pds
    ON pds.patient_diet_id = dmc.patient_diet_id
    
INNER JOIN patient_diet_plan pdp
    ON pdp.plan_id = pds.plan_id

INNER JOIN patient_diet_master pdm
    ON pdm.diet_id = pdp.diet_id

INNER JOIN diet_type dt
    ON dt.type_slno = dmc.type_slno

WHERE dmc.pt_no = ?
  AND dmc.admission_id = ?
  AND dmc.charge_status = ?   

ORDER BY dmc.created_at
    `;

        executeQuery(query, [ipNo, ptNo, status], callback);
    },


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

                /*
                **********************************************
                BEGIN TRANSACTION
                **********************************************
                */

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
                VALIDATE ITEMS
                **********************************************
                */

                if (!Array.isArray(items) || items.length === 0) {
                    throw new Error("No billing items found.");
                }


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
                    bill_type,
                    bill_generated_location,
                    total_amount,
                    paid_amount,
                    balance_amount,
                    billing_status,
                    created_by
                )
                VALUES
                (
                    ?,
                    ?,
                    CURDATE(),
                    'PRE_GENERATED',
                    'CANTEEN',
                    ?,
                    0,
                    ?,
                    'OPEN',
                    ?
                )
            `;

                const headerResult = await query(headerQuery, [
                    patient_id,
                    admission_id,
                    total_amount,
                    total_amount,
                    created_by
                ]);

                const billingId = headerResult.insertId;


                /*
                **********************************************
                GENERATE BILL NUMBER
                **********************************************
                */

                const today = new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "");

                const billNo =
                    `BIL-${today}-${String(billingId).padStart(6, "0")}`;


                /*
                **********************************************
                UPDATE BILL NUMBER
                **********************************************
                */

                await query(
                    `
                    UPDATE patient_billing
                    SET bill_no = ?
                    WHERE billing_id = ?
                `,
                    [
                        billNo,
                        billingId
                    ]
                );


                /*
                **********************************************
                INSERT BILL DETAILS
                + UPDATE SOURCE STATUS
                **********************************************
                */

                for (const item of items) {

                    let categoryId;
                    let referenceTable;


                    /*
                    ******************************************
                    DETERMINE BILLING CATEGORY
                    ******************************************
                    */

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
                                `Unknown billing type: ${item.billing_type}`
                            );
                    }


                    /*
                    ******************************************
                    SOURCE REFERENCE ID
                    ******************************************
                    */

                    const referenceId =
                        item.reference_id ?? item.bill_id;


                    if (!referenceId) {
                        throw new Error(
                            `Reference ID missing for billing type: ${item.billing_type}`
                        );
                    }


                    /*
                    ******************************************
                    INSERT BILL DETAIL
                    ******************************************
                    */

                    const detailQuery = `
                    INSERT INTO patient_billing_detail
                    (
                        billing_id,
                        category_id,
                        party_type_id,
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
                        service_date,
                        bill_item_status
                    )
                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        'OPEN'
                    )
                `;


                    await query(detailQuery, [

                        billingId,

                        categoryId,
                        item.party_type_id,

                        item.description ||
                        item.item_name ||
                        item.meal_name ||
                        item.billing_type,

                        item.item_id ?? null,

                        item.quantity ?? 1,

                        item.unit_rate ?? 0,

                        item.gst_rate ?? 0,

                        item.gst_amount ?? 0,

                        item.discount ?? 0,

                        item.net_amount ?? 0,

                        referenceTable,

                        referenceId,

                        item.service_date ??
                        item.created_at ??
                        null

                    ]);


                    /*
                    ******************************************
                    UPDATE SOURCE STATUS
                    ******************************************
                    */

                    if (item.billing_type === "DIET_ORDER") {

                        const updateResult = await query(
                            `
                            UPDATE diet_meal_charge

                            SET charge_status = 'BILLED'

                            WHERE meal_charge_id = ?
                            AND charge_status = 'PENDING'
                        `,
                            [
                                referenceId
                            ]
                        );


                        if (updateResult.affectedRows === 0) {

                            throw new Error(
                                `Diet charge ${referenceId} is already billed or unavailable.`
                            );

                        }

                    } else {

                        const updateResult = await query(
                            `
                            UPDATE diet_service_ledger

                            SET ledger_status = 'BILLED'

                            WHERE ledger_id = ?
                            AND ledger_status = 'PENDING'
                        `,
                            [
                                referenceId
                            ]
                        );


                        if (updateResult.affectedRows === 0) {

                            throw new Error(
                                `Service ledger ${referenceId} is already billed or unavailable.`
                            );

                        }

                    }

                }


                /*
                **********************************************
                COMMIT TRANSACTION
                **********************************************
                */

                await new Promise((resolve, reject) => {

                    connection.commit(err => {

                        if (err) {
                            return reject(err);
                        }

                        resolve();

                    });

                });


                /*
                **********************************************
                RELEASE CONNECTION
                **********************************************
                */

                connection.release();


                /*
                **********************************************
                SUCCESS RESPONSE
                **********************************************
                */

                callback(null, {

                    billing_id: billingId,

                    bill_no: billNo,

                    total_amount,

                    total_items: items.length

                });


            } catch (error) {

                /*
                **********************************************
                ROLLBACK
                **********************************************
                */

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

    // getDeliveryBillDetailsService: (data, callback) => {

    //     const dietItems = data.filter(item => item.source_type === "DIET_ORDER");

    //     const serviceDeliveryIds = data
    //         .filter(item => item.source_type !== "DIET_ORDER")
    //         .map(item => item.delivery_id);

    //     let mealCharges = [];
    //     let serviceLedger = [];

    //     const fetchServiceLedger = (next) => {

    //         if (serviceDeliveryIds.length === 0) {
    //             return next();
    //         }

    //         const sql = `
    //         SELECT
    //             dsl.ledger_id,
    //             dsl.delivery_id,
    //             'SERVICE' AS bill_source,
    //             im.item_id,
    //             im.item_name,
    //             dsl.quantity,
    //             dsl.unit_rate,
    //             dsl.gross_amount,
    //             dsl.discount,
    //             dsl.gst_rate,
    //             dsl.gst_amount,
    //             dsl.net_amount,
    //             dsl.ledger_status

    //         FROM diet_service_ledger dsl

    //         INNER JOIN item_master im
    //             ON im.item_id = dsl.item_id

    //         WHERE dsl.delivery_id IN (?)

    //         ORDER BY dsl.created_at;
    //     `;

    //         pool.query(sql, [serviceDeliveryIds], (err, results) => {
    //             if (err) return callback(err);

    //             serviceLedger = results;
    //             next();
    //         });
    //     };

    //     const fetchMealCharges = (next) => {

    //         if (dietItems.length === 0) {
    //             return next();
    //         }



    //         const conditions = [];
    //         const values = [];

    //         dietItems.forEach(item => {
    //             conditions.push("(dmc.patient_diet_id = ? AND dmc.type_slno = ?)");
    //             values.push(item.patient_diet_id, item.type_slno);
    //         });

    //         const sql = `
    //         SELECT
    //             dmc.meal_charge_id,
    //             'DIET' AS bill_source,

    //             dmc.patient_diet_id,
    //             dmc.diet_id,
    //             dm.diet_name,

    //             dmc.type_slno,
    //             dt.type_desc,

    //             1 AS quantity,
    //             dmc.meal_rate AS unit_rate,
    //             dmc.meal_rate AS gross_amount,
    //             dmc.discount,
    //             0 AS gst_rate,
    //             0 AS gst_amount,
    //             dmc.net_amount,
    //             dmc.charge_status

    //         FROM diet_meal_charge dmc


    //         INNER JOIN patient_diet_master dm
    //             ON dm.diet_id = dmc.diet_id

    //         INNER JOIN diet_type dt
    //             ON dt.type_slno = dmc.type_slno

    //         WHERE dmc.patient_diet_id = ? AND dmc.type_slno = ?

    //         ORDER BY dmc.created_at;
    //     `;

    //         pool.query(sql, values, (err, results) => {
    //             if (err) return callback(err);

    //             mealCharges = results;
    //             next();
    //         });
    //     };

    //     fetchMealCharges(() => {
    //         fetchServiceLedger(() => {

    //             callback(null, [
    //                 ...mealCharges,
    //                 ...serviceLedger
    //             ]);

    //         });
    //     });

    // },


    getDeliveryBillDetailsService: (data, callback) => {

        const dietItems = data.filter(
            item => item.source_type === "DIET_ORDER"
        );

        const serviceDeliveryIds = data
            .filter(item => item.source_type !== "DIET_ORDER")
            .map(item => item.delivery_id);

        let mealCharges = [];
        let serviceLedger = [];

        /*
        ============================================================
        FETCH SERVICE LEDGER
        ============================================================
        */

        const fetchServiceLedger = (next) => {

            if (serviceDeliveryIds.length === 0) {
                return next();
            }

            const sql = `
            SELECT

                dsl.ledger_id,
                dsl.delivery_id,

                'SERVICE' AS bill_source,

                im.item_id,
                im.item_name,

                dsl.quantity,
                dsl.unit_rate,
                dsl.gross_amount,
                dsl.discount,
                dsl.gst_rate,
                dsl.gst_amount,
                dsl.net_amount,

                dsl.ledger_status,

                /*
                BILLING INFORMATION
                */

                CASE
                    WHEN pbd.billing_detail_id IS NOT NULL
                        THEN 'BILLED'
                    ELSE 'NOT_BILLED'
                END AS billing_status,

                pbd.billing_detail_id,

                pb.billing_id,
                pb.bill_no,
                pb.billing_status AS bill_status

            FROM diet_service_ledger dsl

            INNER JOIN item_master im
                ON im.item_id = dsl.item_id

            /*
            FIND WHETHER THIS LEDGER ITEM
            IS ALREADY PRESENT IN A BILL
            */

            LEFT JOIN patient_billing_detail pbd
                ON pbd.reference_table = 'diet_service_ledger'
                AND pbd.reference_id = dsl.ledger_id
                AND pbd.bill_item_status <> 'CANCELLED'

            LEFT JOIN patient_billing pb
                ON pb.billing_id = pbd.billing_id

            WHERE dsl.delivery_id IN (?)

            ORDER BY dsl.created_at
        `;

            pool.query(
                sql,
                [serviceDeliveryIds],
                (err, results) => {

                    if (err) {
                        return callback(err);
                    }

                    serviceLedger = results;

                    next();
                }
            );
        };


        /*
        ============================================================
        FETCH DIET MEAL CHARGES
        ============================================================
        */

        const fetchMealCharges = (next) => {

            if (dietItems.length === 0) {
                return next();
            }

            const conditions = [];
            const values = [];

            dietItems.forEach(item => {

                conditions.push(
                    `(dmc.patient_diet_id = ? AND dmc.type_slno = ?)`
                );

                values.push(
                    item.patient_diet_id,
                    item.type_slno
                );

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

                dmc.charge_status,

                /*
                BILLING INFORMATION
                */

                CASE
                    WHEN pbd.billing_detail_id IS NOT NULL
                        THEN 'BILLED'
                    ELSE 'NOT_BILLED'
                END AS billing_status,

                pbd.billing_detail_id,

                pb.billing_id,
                pb.bill_no,
                pb.billing_status AS bill_status

            FROM diet_meal_charge dmc

            INNER JOIN patient_diet_master dm
                ON dm.diet_id = dmc.diet_id

            INNER JOIN diet_type dt
                ON dt.type_slno = dmc.type_slno

            /*
            FIND WHETHER THIS MEAL CHARGE
            IS ALREADY PRESENT IN A BILL
            */

            LEFT JOIN patient_billing_detail pbd
                ON pbd.reference_table = 'diet_meal_charge'
                AND pbd.reference_id = dmc.meal_charge_id
                AND pbd.bill_item_status <> 'CANCELLED'

            LEFT JOIN patient_billing pb
                ON pb.billing_id = pbd.billing_id

            WHERE ${conditions.join(" OR ")}

            ORDER BY dmc.created_at
        `;

            pool.query(
                sql,
                values,
                (err, results) => {

                    if (err) {
                        return callback(err);
                    }

                    mealCharges = results;

                    next();
                }
            );
        };


        /*
        ============================================================
        EXECUTE
        ============================================================
        */

        fetchMealCharges(() => {

            fetchServiceLedger(() => {

                callback(null, [
                    ...mealCharges,
                    ...serviceLedger
                ]);

            });

        });

    },

    CreateBystanderBilling: async (data, callback) => {
        const {
            billing = {},
            items = []
        } = data;

        const {
            patient_id,
            admission_id,
            billing_party_type,
            billing_date,
            assignment_detail_id,
            bill_type,
            bill_generated_by,
            bill_generated_location,
            total_amount,
            paid_amount = 0,
            balance_amount,
            billing_status = "OPEN",
            created_by,
            updated_by = null
        } = billing;


        /*
        **********************************************
        VALIDATION
        **********************************************
        */

        if (!patient_id) {
            return callback(null, {
                success: 0,
                message: "Patient ID is required"
            });
        }

        if (!admission_id) {
            return callback(null, {
                success: 0,
                message: "Admission ID is required"
            });
        }

        if (Number(billing_party_type) !== 1) {
            return callback(null, {
                success: 0,
                message: "This billing service is only for BYSTANDER"
            });
        }

        if (!created_by) {
            return callback(null, {
                success: 0,
                message: "Created by employee is required"
            });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return callback(null, {
                success: 0,
                message: "Billing items are missing"
            });
        }


        /*
        **********************************************
        GET CONNECTION
        **********************************************
        */

        pool.getConnection(async (err, connection) => {

            if (err) {
                return callback(err);
            }
            /*
            **********************************************
            QUERY HELPER
            **********************************************
            */

            const query = (sql, params = []) => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        sql,
                        params,
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                });
            };

            try {
                /*
                **********************************************
                BEGIN TRANSACTION
                **********************************************
                */
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
                VALIDATE BILLING ITEMS
                **********************************************
                */
                for (const item of items) {
                    if (Number(item.category_id) !== 3) {
                        throw new Error(
                            "Invalid billing category for bystander"
                        );
                    }
                    if (item.reference_table !== "diet_service_ledger") {
                        throw new Error("Invalid billing reference table");
                    }

                    if (!item.reference_id) {
                        throw new Error("Billing reference ID is missing");
                    }
                }
                /*
                **********************************************
                GET REFERENCE IDS
                **********************************************
                */
                const referenceIds = items.map(
                    item => Number(item.reference_id)
                );
                const placeholders = referenceIds
                    .map(() => "?")
                    .join(",");
                /*
                **********************************************
                LOCK LEDGER ROWS
                **********************************************
                */
                const ledgerCheckQuery = `
                SELECT
                    ledger_id,
                    ledger_status
                FROM diet_service_ledger
                WHERE ledger_id IN (${placeholders})
                FOR UPDATE
            `;
                const ledgerRows = await query(
                    ledgerCheckQuery,
                    referenceIds
                );
                /*
                **********************************************
                CHECK ALL REFERENCES EXIST
                **********************************************
                */
                if (!ledgerRows || ledgerRows.length !== referenceIds.length) {
                    throw new Error("One or more billing items were not found");
                }
                /*
                **********************************************
                CHECK ALREADY BILLED
                **********************************************
                */
                const alreadyBilled =
                    ledgerRows?.filter(
                        item =>
                            item.ledger_status === "BILLED"
                    );

                if (alreadyBilled.length > 0) {
                    throw new Error("One or more selected items are already billed");
                }
                /*
                **********************************************
                CALCULATE TOTAL
                **********************************************
                */
                const calculatedTotal = items?.reduce((sum, item) => sum + Number(item.amount || 0), 0);
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
                    assignment_detail_id,
                    billing_party_type,
                    billing_date,
                    bill_type,
                    bill_generated_by,
                    bill_generated_location,
                    total_amount,
                    paid_amount,
                    balance_amount,
                    billing_status,
                    created_by,
                    updated_by
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `;

                const headerResult = await query(
                    headerQuery,
                    [
                        patient_id,
                        admission_id,
                        assignment_detail_id,
                        billing_party_type,
                        billing_date,
                        bill_type ||
                        "DELIVERY_GENERATED",
                        bill_generated_by ||
                        created_by,
                        bill_generated_location ||
                        "DELIVERY",
                        calculatedTotal,
                        Number(paid_amount || 0),
                        balance_amount ??
                        calculatedTotal,
                        billing_status,
                        created_by,
                        updated_by
                    ]
                );

                const billingId = headerResult.insertId;
                /*
                **********************************************
                GENERATE BILL NUMBER
                **********************************************
                */
                const today = new Date()
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "");

                const billNo =
                    `BYS-${today}-${String(billingId).padStart(6, "0")}`;
                /*
                **********************************************
                UPDATE BILL NUMBER
                **********************************************
                */
                await query(
                    `
                    UPDATE patient_billing
                    SET bill_no = ?
                    WHERE billing_id = ?
                `,
                    [
                        billNo,
                        billingId
                    ]
                );
                /*
                **********************************************
                INSERT BILL DETAILS
                **********************************************
                */

                const detailQuery = `
                INSERT INTO patient_billing_detail
                (
                    billing_id,
                    party_type_id,
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
                    service_date,
                    bill_item_status
                )
                VALUES
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `;

                for (const item of items) {
                    await query(
                        detailQuery,
                        [
                            billingId,
                            1,
                            3,
                            item.description,
                            item.item_id || null,
                            Number(item.quantity || 0),
                            Number(item.rate || 0),
                            Number(item.gst || 0),
                            Number(item.gst_amount || 0),
                            Number(item.discount || 0),
                            Number(item.amount || 0),
                            "diet_service_ledger",
                            Number(item.reference_id),
                            item.service_date || null,
                            item.bill_item_status ||
                            "OPEN"
                        ]
                    );
                    /*
                    **********************************************
                    UPDATE LEDGER
                    **********************************************
                    */
                    const updateLedgerResult =
                        await query(
                            `
                            UPDATE diet_service_ledger
                            SET ledger_status = 'BILLED'
                            WHERE ledger_id = ?
                              AND ledger_status = 'PENDING'
                        `,
                            [
                                Number(item.reference_id)
                            ]
                        );

                    if (updateLedgerResult.affectedRows === 0) {
                        throw new Error(`Ledger ${item.reference_id} was already billed`);
                    }
                }
                /*
                **********************************************
                COMMIT
                **********************************************
                */

                await new Promise((resolve, reject) => {
                    connection.commit(err => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
                /*
                **********************************************
                RELEASE
                **********************************************
                */
                connection.release();
                /*
                **********************************************
                RESPONSE
                **********************************************
                */
                return callback(null, {
                    success: 1,
                    message: "Bystander bill generated successfully",
                    data: {
                        billing_id: billingId,
                        bill_no: billNo,
                        patient_id,
                        admission_id,
                        billing_party_type,
                        total_amount: calculatedTotal,
                        paid_amount: Number(paid_amount || 0),
                        balance_amount:
                            balance_amount ??
                            calculatedTotal,
                        billing_status,
                        total_items: items?.length
                    }
                });
            } catch (error) {
                /*
                **********************************************
                ROLLBACK
                **********************************************
                */
                connection.rollback(() => {
                    connection.release();
                    callback(null, {
                        success: 0,
                        message: error?.message || "Failed to generate bystander bill"
                    });
                });
            }
        });
    },

    getBystanderBillingDetails: (data, callback) => {

        const {
            assignment_detail_id
        } = data;

        /*
        ==================================================
        VALIDATION
        ==================================================
        */

        if (!assignment_detail_id) {
            return callback(null, {
                success: 0,
                message: "Assignment detail ID is required"
            });
        }
        /*
        ==================================================
        GET CONNECTION
        ==================================================
        */

        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            /*
            ==================================================
            QUERY HELPER
            ==================================================
            */

            const query = (sql, params = []) => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        sql,
                        params,
                        (err, result) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                });
            };
            /*
            ==================================================
            MAIN LOGIC
            ==================================================
            */

            const execute = async () => {

                try {

                    /*
                    ==================================================
                    1. GET ALL BILL HEADERS
                    ==================================================
                    */

                    const billQuery = `
                    SELECT

                        pb.billing_id,
                        pb.bill_no,

                        pb.patient_id,
                        pb.admission_id,

                        pb.assignment_detail_id,
                        pb.billing_party_type,

                        pb.billing_date,
                        pb.bill_type,

                        pb.bill_generated_by,
                        pb.bill_generated_location,

                        pb.total_amount,
                        pb.paid_amount,
                        pb.balance_amount,

                        pb.billing_status,

                        pb.created_at,
                        pb.created_by,

                        pb.updated_at,
                        pb.updated_by,

                        dad.assignment_detail_id,

                        dad.assignment_id,
                        dad.canteen_order_id,
                        dad.type_slno,

                        dad.delivery_priority,
                        dad.delivery_status,

                        dad.delivered_at,
                        dad.delivered_by,

                        dad.remarks

                    FROM patient_billing pb

                    LEFT JOIN diet_delivery_assignment_detail dad
                        ON dad.assignment_detail_id =
                           pb.assignment_detail_id

                    WHERE pb.assignment_detail_id = ?
                      AND pb.billing_party_type = 1

                    ORDER BY
                        pb.billing_id DESC
                `;


                    const bills = await query(
                        billQuery,
                        [assignment_detail_id]
                    );


                    /*
                    ==================================================
                    2. NO BILL FOUND
                    ==================================================
                    */

                    if (!bills || bills.length === 0) {

                        connection.release();

                        return callback(null, {
                            success: 2,
                            message: "No bystander bills found",
                            data: {
                                bills: [],
                                bill_items: []
                            }
                        });

                    }


                    /*
                    ==================================================
                    3. GET BILL IDS
                    ==================================================
                    */

                    const billIds = bills.map(
                        bill => bill.billing_id
                    );


                    const placeholders = billIds
                        .map(() => "?")
                        .join(",");


                    /*
                    ==================================================
                    4. GET ALL BILL ITEMS
                    ==================================================
                    */

                    const billItemQuery = `

                    SELECT
                        pbd.billing_detail_id,
                        pbd.billing_id,

                        pbd.category_id,

                        pbd.description,

                        pbd.item_id,

                        pbd.quantity,
                        pbd.rate,

                        pbd.gst,
                        pbd.gst_amount,

                        pbd.discount,

                        pbd.amount,

                        pbd.reference_table,
                        pbd.reference_id,

                        pbd.service_date,

                        pbd.bill_item_status,


                        dsl.ledger_id,

                        dsl.delivery_id,

                        dsl.ledger_status

                    FROM patient_billing_detail pbd

                    LEFT JOIN diet_service_ledger dsl
                        ON dsl.ledger_id = pbd.reference_id
                       AND pbd.reference_table =
                           'diet_service_ledger'

                    LEFT JOIN diet_delivery_log ddl
                        ON ddl.delivery_id = dsl.delivery_id

                    WHERE pbd.billing_id IN (${placeholders})

                    ORDER BY
                        pbd.billing_id DESC,
                        pbd.billing_detail_id ASC

                `;
                    const bill_items = await query(
                        billItemQuery,
                        billIds
                    );
                    /*
                    ==================================================
                    5. RELEASE CONNECTION
                    ==================================================
                    */
                    connection.release();
                    /*
                    ==================================================
                    6. SUCCESS RESPONSE
                    ==================================================
                    */

                    return callback(null, {
                        success: 1,
                        message: "Bystander billing details fetched successfully",
                        data: {
                            bills,
                            bill_items
                        }
                    });
                } catch (error) {
                    /*
                    ==================================================
                    ERROR
                    ==================================================
                    */
                    connection.release();
                    console.error(
                        "Get Bystander Billing Error:",
                        error
                    );
                    return callback(null, {
                        success: 0,
                        message:
                            error?.message ||
                            "Failed to fetch bystander billing details"
                    });
                }
            };
            execute();
        });
    },

    createBillingPaymentService: (data, callback) => {

        const {
            amount,
            payment_mode,
            collected_by,
            collected_location,
            transaction_id,
            payments
        } = data;

        if (!Array.isArray(payments) || payments.length === 0) {
            return callback(new Error("Payment details are missing"));
        }

        pool.getConnection((err, connection) => {

            if (err) {
                return callback(err);
            }

            connection.beginTransaction(err => {

                if (err) {
                    connection.release();
                    return callback(err);
                }

                const rollback = error => {
                    connection.rollback(() => {
                        connection.release();
                        callback(error);
                    });
                };

                const commit = result => {
                    connection.commit(err => {

                        if (err) {
                            return rollback(err);
                        }

                        connection.release();
                        callback(null, result);
                    });
                };

                try {

                    /*
                    1. VALIDATE TOP LEVEL AMOUNT
                    */

                    const calculatedTotal = payments.reduce(
                        (sum, payment) =>
                            sum + Number(payment?.amount || 0),
                        0
                    );

                    if (
                        Number(calculatedTotal.toFixed(2)) !==
                        Number(Number(amount || 0).toFixed(2))
                    ) {

                        return rollback(
                            new Error(
                                `Payment amount mismatch. Expected ${amount}, received ${calculatedTotal}`
                            )
                        );
                    }


                    /*
                    2. PROCESS EACH BILLING
                    */

                    const paymentResults = [];

                    const processBilling = index => {

                        if (index >= payments.length) {

                            /*
                            11. COMMIT
                            */

                            return commit({
                                amount: Number(amount),
                                payment_mode,
                                payment_status: "SUCCESS",
                                payments: paymentResults
                            });
                        }


                        const payment = payments[index];

                        const billingId =
                            Number(payment?.billing_id);

                        const paymentAmount =
                            Number(payment?.amount || 0);

                        const items =
                            Array.isArray(payment?.items)
                                ? payment.items
                                : [];


                        /*
                        VALIDATE BILLING
                        */

                        if (!billingId) {
                            return rollback(
                                new Error("Invalid billing_id")
                            );
                        }

                        if (paymentAmount <= 0) {
                            return rollback(
                                new Error(
                                    `Invalid payment amount for billing ${billingId}`
                                )
                            );
                        }

                        if (!items.length) {
                            return rollback(
                                new Error(
                                    `Payment items missing for billing ${billingId}`
                                )
                            );
                        }


                        /*
                        3. LOCK BILLING ROW
                        */

                        connection.query(
                            `
                        SELECT
                            billing_id,
                            total_amount,
                            paid_amount,
                            balance_amount,
                            billing_status
                        FROM patient_billing
                        WHERE billing_id = ?
                        FOR UPDATE
                        `,
                            [billingId],
                            (err, billingRows) => {

                                if (err) {
                                    return rollback(err);
                                }

                                if (!billingRows.length) {
                                    return rollback(
                                        new Error(
                                            `Billing ${billingId} not found`
                                        )
                                    );
                                }

                                const billing =
                                    billingRows[0];


                                if (
                                    billing.billing_status ===
                                    "CANCELLED"
                                ) {

                                    return rollback(
                                        new Error(
                                            `Billing ${billingId} is cancelled`
                                        )
                                    );
                                }


                                /*
                                4. VALIDATE BILL PAYMENT AMOUNT
                                */

                                const currentBalance =
                                    Number(
                                        billing.balance_amount || 0
                                    );

                                if (
                                    paymentAmount >
                                    currentBalance
                                ) {

                                    return rollback(
                                        new Error(
                                            `Payment amount exceeds balance for billing ${billingId}`
                                        )
                                    );
                                }


                                /*
                                5. VALIDATE PAYMENT ITEMS
                                */

                                const detailIds =
                                    items.map(item =>
                                        Number(
                                            item?.billing_detail_id
                                        )
                                    );

                                if (
                                    detailIds.some(id => !id)
                                ) {

                                    return rollback(
                                        new Error(
                                            `Invalid billing detail for billing ${billingId}`
                                        )
                                    );
                                }


                                const placeholders =
                                    detailIds
                                        .map(() => "?")
                                        .join(",");


                                connection.query(
                                    `
                                SELECT
                                    billing_detail_id,
                                    billing_id,
                                    amount,
                                    bill_item_status
                                FROM patient_billing_detail
                                WHERE billing_detail_id IN (${placeholders})
                                AND billing_id = ?
                                FOR UPDATE
                                `,
                                    [
                                        ...detailIds,
                                        billingId
                                    ],
                                    (err, details) => {

                                        if (err) {
                                            return rollback(err);
                                        }


                                        /*
                                        MAKE SURE EVERY DETAIL EXISTS
                                        */

                                        if (
                                            details.length !==
                                            detailIds.length
                                        ) {

                                            return rollback(
                                                new Error(
                                                    `Invalid billing details for billing ${billingId}`
                                                )
                                            );
                                        }


                                        /*
                                        6. CALCULATE ITEM PAYMENT
                                        */

                                        let itemPaymentTotal = 0;


                                        for (const item of items) {

                                            const detail =
                                                details.find(row =>
                                                    Number(
                                                        row.billing_detail_id
                                                    ) ===
                                                    Number(
                                                        item.billing_detail_id
                                                    )
                                                );


                                            if (!detail) {
                                                return rollback(
                                                    new Error(
                                                        `Billing detail ${item.billing_detail_id} not found`
                                                    )
                                                );
                                            }


                                            if (
                                                detail.bill_item_status ===
                                                "PAID"
                                            ) {

                                                return rollback(
                                                    new Error(
                                                        `Billing detail ${item.billing_detail_id} is already paid`
                                                    )
                                                );
                                            }


                                            const paidAmount =
                                                Number(
                                                    item?.paid_amount || 0
                                                );

                                            const detailAmount =
                                                Number(
                                                    detail?.amount || 0
                                                );


                                            if (
                                                paidAmount <= 0
                                            ) {

                                                return rollback(
                                                    new Error(
                                                        `Invalid paid amount for billing detail ${item.billing_detail_id}`
                                                    )
                                                );
                                            }


                                            if (
                                                paidAmount >
                                                detailAmount
                                            ) {

                                                return rollback(
                                                    new Error(
                                                        `Paid amount exceeds billing detail amount for ${item.billing_detail_id}`
                                                    )
                                                );
                                            }


                                            itemPaymentTotal +=
                                                paidAmount;
                                        }


                                        /*
                                        
                                        7. ITEM TOTAL MUST MATCH PAYMENT
                                        
                                        */

                                        if (
                                            Number(
                                                itemPaymentTotal.toFixed(2)
                                            ) !==
                                            Number(
                                                paymentAmount.toFixed(2)
                                            )
                                        ) {

                                            return rollback(
                                                new Error(
                                                    `Item payment total does not match billing ${billingId} payment amount`
                                                )
                                            );
                                        }


                                        /*
                                        
                                        8. INSERT PAYMENT MASTER
                                        */

                                        connection.query(
                                            `
                                        INSERT INTO patient_bill_payment
                                        (
                                            billing_id,
                                            amount,
                                            payment_mode,
                                            collected_by,
                                            collected_location,
                                            remarks,
                                            payment_status
                                        )
                                        VALUES (?, ?, ?, ?, ?, ?, 'SUCCESS')
                                        `,
                                            [
                                                billingId,
                                                paymentAmount,
                                                payment_mode,
                                                collected_by,
                                                collected_location,
                                                transaction_id || null
                                            ],
                                            (err, paymentResult) => {

                                                if (err) {
                                                    return rollback(err);
                                                }


                                                const paymentId =
                                                    paymentResult.insertId;


                                                /*
                                                
                                                9. INSERT PAYMENT DETAILS
                                                
                                                */

                                                const processItem = itemIndex => {

                                                    if (
                                                        itemIndex >=
                                                        items.length
                                                    ) {

                                                        /*
                                                        =========================
                                                        10. UPDATE BILLING MASTER
                                                        =========================
                                                        */

                                                        const newPaidAmount =
                                                            Number(
                                                                billing.paid_amount || 0
                                                            ) +
                                                            paymentAmount;


                                                        const newBalance =
                                                            Number(
                                                                billing.total_amount || 0
                                                            ) -
                                                            newPaidAmount;


                                                        let billingStatus =
                                                            "PARTIAL";


                                                        if (
                                                            newBalance <= 0
                                                        ) {
                                                            billingStatus =
                                                                "PAID";
                                                        }


                                                        connection.query(
                                                            `
                                                        UPDATE patient_billing
                                                        SET
                                                            paid_amount = ?,
                                                            balance_amount = ?,
                                                            billing_status = ?,
                                                            updated_by = ?,
                                                            updated_at = CURRENT_TIMESTAMP
                                                        WHERE billing_id = ?
                                                        `,
                                                            [
                                                                newPaidAmount,
                                                                Math.max(
                                                                    0,
                                                                    newBalance
                                                                ),
                                                                billingStatus,
                                                                collected_by,
                                                                billingId
                                                            ],
                                                            err => {

                                                                if (err) {
                                                                    return rollback(err);
                                                                }


                                                                paymentResults.push({
                                                                    billing_id:
                                                                        billingId,

                                                                    payment_id:
                                                                        paymentId,

                                                                    amount:
                                                                        paymentAmount,

                                                                    paid_amount:
                                                                        newPaidAmount,

                                                                    balance_amount:
                                                                        Math.max(
                                                                            0,
                                                                            newBalance
                                                                        ),

                                                                    billing_status:
                                                                        billingStatus
                                                                });


                                                                /*
                                                                =================
                                                                NEXT BILLING
                                                                =================
                                                                */

                                                                processBilling(
                                                                    index + 1
                                                                );

                                                            }
                                                        );

                                                        return;
                                                    }


                                                    const item =
                                                        items[itemIndex];

                                                    const paidAmount =
                                                        Number(
                                                            item.paid_amount
                                                        );


                                                    /*
                                                    INSERT PAYMENT DETAIL
                                                    */

                                                    connection.query(
                                                        `
                                                    INSERT INTO patient_bill_payment_detail
                                                    (
                                                        payment_id,
                                                        billing_detail_id,
                                                        paid_amount
                                                    )
                                                    VALUES (?, ?, ?)
                                                    `,
                                                        [
                                                            paymentId,
                                                            item.billing_detail_id,
                                                            paidAmount
                                                        ],
                                                        err => {

                                                            if (err) {
                                                                return rollback(err);
                                                            }


                                                            /*
                                                            GET DETAIL AMOUNT
                                                            */

                                                            const detail =
                                                                details.find(row =>
                                                                    Number(
                                                                        row.billing_detail_id
                                                                    ) ===
                                                                    Number(
                                                                        item.billing_detail_id
                                                                    )
                                                                );


                                                            const detailAmount =
                                                                Number(
                                                                    detail?.amount || 0
                                                                );


                                                            /*
                                                            MARK DETAIL PAID
                                                            */

                                                            if (
                                                                Number(
                                                                    paidAmount.toFixed(2)
                                                                ) ===
                                                                Number(
                                                                    detailAmount.toFixed(2)
                                                                )
                                                            ) {

                                                                connection.query(
                                                                    `
                                                                UPDATE patient_billing_detail
                                                                SET bill_item_status = 'PAID'
                                                                WHERE billing_detail_id = ?
                                                                `,
                                                                    [
                                                                        item.billing_detail_id
                                                                    ],
                                                                    err => {

                                                                        if (err) {
                                                                            return rollback(err);
                                                                        }

                                                                        processItem(
                                                                            itemIndex + 1
                                                                        );

                                                                    }
                                                                );

                                                            } else {
                                                                /*
                                                                Partial item
                                                                remains OPEN
                                                                */
                                                                processItem(
                                                                    itemIndex + 1
                                                                );
                                                            }

                                                        }
                                                    );

                                                };


                                                processItem(0);

                                            }
                                        );

                                    }
                                );

                            }
                        );

                    };


                    /*
                    START BILLING PROCESS
                    */

                    processBilling(0);

                } catch (error) {

                    return rollback(error);

                }

            });

        });
    },


    getBillablePatientDetail: (status, callback) => {
        const query = `
SELECT
    pending.admission_id,
    pending.pt_no,

    p.fb_ptc_name AS patient_name,
    p.fb_ptc_sex AS sex,
    p.fb_ptd_dob AS date_of_birth,
    p.fb_ptc_mobile AS mobile,
    p.fb_dep_desc AS department,
    p.fb_bd_code AS bed_code,
    b.fb_bdc_no AS bed_name,
    p.fb_ipd_date AS admission_date,

    ns.fb_ns_code AS nursing_station_code,
    ns.fb_ns_name AS nursing_station_name,

    pending.pending_items,
    pending.pending_amount

FROM (
    SELECT
        admission_id,
        pt_no,

        COUNT(*) AS pending_items,
        SUM(net_amount) AS pending_amount

    FROM (
        SELECT
            admission_id,
            pt_no,
            party_type_id,
            net_amount
        FROM diet_meal_charge
        WHERE charge_status = ?

        UNION ALL

        SELECT
            admission_id,
            pt_no,
            party_type_id,
            net_amount
        FROM diet_service_ledger
        WHERE ledger_status = ?
    ) charges

    GROUP BY
        admission_id,
        pt_no
) pending

INNER JOIN fb_ipadmiss p
    ON p.fb_ip_no = pending.admission_id

LEFT JOIN fb_bed b
    ON b.fb_bd_code = p.fb_bd_code

LEFT JOIN fb_nurse_station_master ns
    ON ns.fb_ns_code = b.fb_ns_code

ORDER BY pending.admission_id DESC
    `;

        executeQuery(query, [status, status], callback);
    },

};