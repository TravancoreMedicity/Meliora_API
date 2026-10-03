// dietdeliveryassign.service.js
const { pool } = require('../../config/database');
const { executeQuery } = require('../Canteen_Orders/Helper');
const { createServiceLedger, FinalizePatientDietAfterBilling } = require('./dietorderhelper');

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

    // CreateDietDeliveryAssignment: (data, callBack) => {
    //     const {
    //         assigned_to,
    //         assigned_by,
    //         remarks,
    //         orders,
    //         petty_cash
    //     } = data;

    //     pool.getConnection((err, connection) => {

    //         if (err) {
    //             return callBack({
    //                 stage: "CONNECTION",
    //                 message: err
    //             });
    //         }

    //         connection.beginTransaction((err) => {

    //             if (err) {
    //                 connection.release();

    //                 return callBack({
    //                     stage: "TRANSACTION",
    //                     message: err
    //                 });
    //             }

    //             // INSERT MASTER
    //             connection.query(
    //                 `INSERT INTO diet_delivery_assignment
    //             (
    //                 assigned_to,
    //                 assigned_by,
    //                 remarks
    //             )
    //             VALUES (?, ?, ?)`,
    //                 [
    //                     assigned_to,
    //                     assigned_by,
    //                     remarks || null
    //                 ],
    //                 (error, results) => {

    //                     if (error) {

    //                         return connection.rollback(() => {
    //                             connection.release();

    //                             return callBack({
    //                                 stage: "MASTER_INSERT",
    //                                 message: error
    //                             });
    //                         });
    //                     }

    //                     const assignment_id = results.insertId;

    //                     // DETAIL VALUES
    //                     const detailValues = orders.map((item) => ([
    //                         assignment_id,
    //                         item.canteen_order_id,
    //                         item.type_slno,
    //                         item.delivery_priority || "NORMAL",
    //                         item.delivery_status || "PENDING",
    //                         item.remarks || null
    //                     ]));

    //                     // INSERT DETAILS
    //                     connection.query(
    //                         `INSERT INTO diet_delivery_assignment_detail
    //                     (
    //                         assignment_id,
    //                         canteen_order_id,
    //                         type_slno,
    //                         delivery_priority,
    //                         delivery_status,
    //                         remarks
    //                     )
    //                     VALUES ?`,
    //                         [detailValues],
    //                         (detailError, detailResult) => {

    //                             if (detailError) {

    //                                 return connection.rollback(() => {
    //                                     connection.release();

    //                                     return callBack({
    //                                         stage: "DETAIL_INSERT",
    //                                         message: detailError
    //                                     });
    //                                 });
    //                             }

    //                             // PETTY CASH AMOUNT
    //                             const pettyCashAmount = Number(petty_cash || 0);

    //                             // COMMIT FUNCTION
    //                             const commitAssignment = () => {

    //                                 connection.commit((commitError) => {

    //                                     if (commitError) {

    //                                         return connection.rollback(() => {
    //                                             connection.release();

    //                                             return callBack({
    //                                                 stage: "COMMIT",
    //                                                 message: commitError
    //                                             });
    //                                         });
    //                                     }

    //                                     connection.release();

    //                                     return callBack(null, {
    //                                         assignment_id,
    //                                         detail_inserted: detailResult.affectedRows,
    //                                         petty_cash: pettyCashAmount
    //                                     });
    //                                 });
    //                             };

    //                             // INSERT PETTY CASH ONLY IF AMOUNT > 0
    //                             if (pettyCashAmount > 0) {

    //                                 connection.query(
    //                                     `INSERT INTO delivery_person_cash
    //                                 (
    //                                     assignment_id,
    //                                     employee_id,
    //                                     amount,
    //                                     given_by,
    //                                     remarks
    //                                 )
    //                                 VALUES (?, ?, ?, ?, ?)`,
    //                                     [
    //                                         assignment_id,
    //                                         assigned_to,
    //                                         pettyCashAmount,
    //                                         assigned_by,
    //                                         remarks || null
    //                                     ],
    //                                     (cashError, cashResult) => {

    //                                         if (cashError) {

    //                                             return connection.rollback(() => {
    //                                                 connection.release();

    //                                                 return callBack({
    //                                                     stage: "PETTY_CASH_INSERT",
    //                                                     message: cashError
    //                                                 });
    //                                             });
    //                                         }

    //                                         // PETTY CASH INSERTED → COMMIT
    //                                         commitAssignment();
    //                                     }
    //                                 );

    //                             } else {

    //                                 // NO PETTY CASH → COMMIT DIRECTLY
    //                                 commitAssignment();
    //                             }
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     });
    // },
    getCurrentAssignedFoodDetail: (callback) => {
        const query = `
            SELECT 
                ddsd.canteen_order_id,
                ddsd.assignment_detail_id,
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

    // UpdateAssignOrderDetail: (data, callback) => {

    //     const {
    //         assignment_id,
    //         canteen_order_id,
    //         delivery_status,
    //         remarks,
    //         updated_by,
    //         type_slno
    //     } = data;


    //     let query = `
    //     UPDATE diet_delivery_assignment_detail
    //     SET
    //         delivery_status = ?,
    //         remarks = ?
    // `;

    //     const params = [
    //         delivery_status,
    //         remarks || null
    //     ];

    //     //  only when DELIVERED
    //     if (delivery_status === "DELIVERED") {
    //         query += `,
    //         delivered_at = NOW(),
    //         delivered_by = ?
    //     `;

    //         params.push(updated_by);
    //     }

    //     query += `
    //     WHERE assignment_id = ?
    //     AND canteen_order_id = ?
    //     AND type_slno = ?
    // `;

    //     params.push(assignment_id);
    //     params.push(canteen_order_id);
    //     params.push(type_slno);

    //     executeQuery(query, params, callback);
    // },

    UpdateAssignOrderDetail: (data, callback) => {
        const {
            assignment_id,
            assignment_detail_id,
            canteen_order_id,
            delivery_status,
            remarks,
            updated_by,
            type_slno
        } = data;

        const allowedStatuses = [
            "PICKEDUP",
            "DELIVERED",
            "UNDELIVERED",
            "RETURNED",
            "PARTIAL",
            "CANCELLED"
        ];

        if (!assignment_id || !assignment_detail_id || !canteen_order_id || !type_slno) {
            return callback({
                message: "Required delivery details are missing"
            });
        }

        if (!allowedStatuses.includes(delivery_status)) {
            return callback({
                message: "Invalid delivery status"
            });
        }

        // Get your existing mysql connection/pool
        pool.getConnection((connectionError, connection) => {

            if (connectionError) {
                return callback(connectionError);
            }

            connection.beginTransaction((transactionError) => {

                if (transactionError) {
                    connection.release();
                    return callback(transactionError);
                }


                // 1. Update delivery assignment detail


                let updateDeliveryQuery = `
                UPDATE diet_delivery_assignment_detail
                SET
                    delivery_status = ?,
                    remarks = ?
            `;

                const deliveryParams = [
                    delivery_status,
                    remarks || null
                ];

                if (delivery_status === "DELIVERED") {
                    updateDeliveryQuery += `,
                    delivered_at = NOW(),
                    delivered_by = ?
                `;

                    deliveryParams.push(updated_by);
                }

                updateDeliveryQuery += `
                WHERE assignment_detail_id = ?
                AND assignment_id = ?
                AND canteen_order_id = ?
                AND type_slno = ?
            `;

                deliveryParams.push(
                    assignment_detail_id,
                    assignment_id,
                    canteen_order_id,
                    type_slno
                );

                connection.query(
                    updateDeliveryQuery,
                    deliveryParams,
                    (deliveryError, deliveryResult) => {

                        if (deliveryError) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(deliveryError);
                            });
                        }

                        if (deliveryResult.affectedRows === 0) {
                            return connection.rollback(() => {
                                connection.release();

                                callback({
                                    message: "Delivery assignment detail not found"
                                });
                            });
                        }


                        // 2. Only DELIVERED / CANCELLED affect diet schedule


                        if (
                            delivery_status !== "DELIVERED" &&
                            delivery_status !== "CANCELLED"
                        ) {
                            return connection.commit((commitError) => {

                                if (commitError) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(commitError);
                                    });
                                }

                                connection.release();

                                callback(null, {
                                    success: 1,
                                    message: `Order ${delivery_status} successfully`
                                });
                            });
                        }


                        // 3. Check whether this is a PATIENT order


                        const getPatientDietQuery = `
                        SELECT DISTINCT
                            coi.patient_diet_id
                        FROM canteen_order co
                        INNER JOIN canteen_order_item coi
                            ON coi.canteen_order_id = co.canteen_order_id
                        WHERE co.canteen_order_id = ?
                            AND co.party_type_id = 2
                            AND coi.type_slno = ?
                            AND coi.patient_diet_id IS NOT NULL
                    `;

                        connection.query(
                            getPatientDietQuery,
                            [
                                canteen_order_id,
                                type_slno
                            ],
                            (dietError, dietRows) => {

                                if (dietError) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(dietError);
                                    });
                                }

                                // -------------------------------------------------
                                // 4. Bystander / no schedule
                                // -------------------------------------------------

                                if (!dietRows || dietRows.length === 0) {

                                    return connection.commit((commitError) => {

                                        if (commitError) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback(commitError);
                                            });
                                        }

                                        connection.release();

                                        callback(null, {
                                            success: 1,
                                            message: `Order ${delivery_status} successfully`
                                        });
                                    });
                                }

                                const patientDietIds = [
                                    ...new Set(
                                        dietRows
                                            .map(row => Number(row.patient_diet_id))
                                            .filter(id => id > 0)
                                    )
                                ];

                                if (patientDietIds.length === 0) {

                                    return connection.commit((commitError) => {

                                        if (commitError) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback(commitError);
                                            });
                                        }

                                        connection.release();

                                        callback(null, {
                                            success: 1,
                                            message: `Order ${delivery_status} successfully`
                                        });
                                    });
                                }

                                // -------------------------------------------------
                                // 5. DELIVERED -> SERVED
                                // -------------------------------------------------

                                if (delivery_status === "DELIVERED") {

                                    const updateScheduleQuery = `
                                    UPDATE patient_diet_schedule
                                    SET
                                        status = 'SERVED',
                                        updated_by = ?,
                                        updated_at = NOW()
                                    WHERE patient_diet_id IN (?)
                                    AND status = 'PENDING'
                                `;

                                    return connection.query(
                                        updateScheduleQuery,
                                        [
                                            updated_by,
                                            patientDietIds
                                        ],
                                        (scheduleError, scheduleResult) => {

                                            if (scheduleError) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback(scheduleError);
                                                });
                                            }

                                            connection.commit((commitError) => {

                                                if (commitError) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        callback(commitError);
                                                    });
                                                }

                                                connection.release();

                                                callback(null, {
                                                    success: 1,
                                                    message: "Order delivered and diet schedule marked as served",
                                                    schedule_updated: scheduleResult.affectedRows
                                                });
                                            });
                                        }
                                    );
                                }

                                // -------------------------------------------------
                                // 6. CANCELLED -> CANCELLED
                                // -------------------------------------------------

                                if (delivery_status === "CANCELLED") {

                                    const cancelReason =
                                        remarks || "Order cancelled";

                                    const updateScheduleQuery = `
                                    UPDATE patient_diet_schedule
                                    SET
                                        status = 'CANCELLED',
                                        cancel_reason = ?,
                                        cancelled_by = ?,
                                        cancelled_at = NOW(),
                                        updated_by = ?,
                                        updated_at = NOW()
                                    WHERE patient_diet_id IN (?)
                                    AND status = 'PENDING'
                                `;

                                    return connection.query(
                                        updateScheduleQuery,
                                        [
                                            cancelReason,
                                            updated_by,
                                            updated_by,
                                            patientDietIds
                                        ],
                                        (scheduleError, scheduleResult) => {

                                            if (scheduleError) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback(scheduleError);
                                                });
                                            }

                                            connection.commit((commitError) => {

                                                if (commitError) {
                                                    return connection.rollback(() => {
                                                        connection.release();
                                                        callback(commitError);
                                                    });
                                                }

                                                connection.release();

                                                callback(null, {
                                                    success: 1,
                                                    message: "Order cancelled and diet schedule cancelled",
                                                    schedule_updated: scheduleResult.affectedRows
                                                });
                                            });
                                        }
                                    );
                                }

                                // Should never reach here
                                connection.commit((commitError) => {

                                    if (commitError) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            callback(commitError);
                                        });
                                    }

                                    connection.release();

                                    callback(null, {
                                        success: 1,
                                        message: `Order ${delivery_status} successfully`
                                    });
                                });
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

    //     getBillingSummary: (ptNo, ipNo, callback) => {
    //         const query = `
    //            SELECT
    //                     x.pt_no,
    //                     x.admission_id,

    //                     COUNT(*) AS total_bill_items,

    //                     SUM(x.gross_amount) AS gross_amount,
    //                     SUM(x.discount) AS total_discount,
    //                     SUM(x.gst_amount) AS total_gst,
    //                     SUM(x.net_amount) AS net_amount,

    //                     SUM(CASE WHEN x.status='PENDING' THEN x.net_amount ELSE 0 END) AS pending_amount,
    //                     SUM(CASE WHEN x.status='BILLED' THEN x.net_amount ELSE 0 END) AS billed_amount,
    //                     SUM(CASE WHEN x.status='CANCELLED' THEN x.net_amount ELSE 0 END) AS cancelled_amount

    //                 FROM
    //                 (
    //                     SELECT
    //                         pt_no,
    //                         admission_id,
    //                         meal_rate AS gross_amount,
    //                         discount,
    //                         0 AS gst_amount,
    //                         net_amount,
    //                         charge_status AS status
    //                     FROM diet_meal_charge
    //                     WHERE pt_no=?
    //                     AND admission_id=?

    //                     UNION ALL

    //                     SELECT
    //                         pt_no,
    //                         admission_id,
    //                         gross_amount,
    //                         discount,
    //                         gst_amount,
    //                         net_amount,
    //                         ledger_status AS status
    //                     FROM diet_service_ledger
    //                     WHERE pt_no=?
    //                     AND admission_id=?
    //                 ) x
    //                   GROUP BY
    //                 x.pt_no,
    //                 x.admission_id;
    // `;
    //         executeQuery(query, [
    //             ptNo,
    //             ipNo,
    //             ptNo,
    //             ipNo
    //         ],
    //             callback);
    //     },

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

            SUM(
                CASE 
                    WHEN x.status = 'PENDING'
                    THEN x.net_amount
                    ELSE 0
                END
            ) AS pending_amount,

            SUM(
                CASE 
                    WHEN x.status = 'BILLED'
                    THEN x.net_amount
                    ELSE 0
                END
            ) AS billed_amount,

            SUM(
                CASE 
                    WHEN x.status = 'CANCELLED'
                    THEN x.net_amount
                    ELSE 0
                END
            ) AS cancelled_amount

        FROM (

            /* =========================
               NORMAL PATIENT DIET
               ========================= */
            SELECT 
                pt_no,
                admission_id,
                meal_rate AS gross_amount,
                discount,
                0 AS gst_amount,
                net_amount,
                charge_status AS status

            FROM diet_meal_charge

            WHERE pt_no = ?
              AND admission_id = ?


            UNION ALL


            /* =========================
               PATIENT EXTRA + BYSTANDER
               ========================= */
            SELECT 
                dsl.pt_no,
                dsl.admission_id,
                dsl.gross_amount,
                dsl.discount,
                dsl.gst_amount,
                dsl.net_amount,
                dsl.ledger_status AS status

            FROM diet_service_ledger dsl

            WHERE dsl.pt_no = ?
              AND dsl.admission_id = ?

              AND (

                    /* PATIENT EXTRA ORDER */
                    dsl.party_type_id = 2

                    OR

                    /* BYSTANDER ORDER */
                    (
                        dsl.party_type_id = 1

                        AND EXISTS (
                            SELECT 1
                            FROM patient_billing_detail pbd

                            INNER JOIN patient_billing pb
                                ON pb.billing_id = pbd.billing_id

                            WHERE pbd.reference_table = 'CANTEEN'
                              AND pbd.reference_id = dsl.canteen_order_id
                              AND pbd.item_id = dsl.item_id
                              AND pbd.party_type_id = 1
                              AND pbd.bill_item_status = 'OPEN'

                              AND pb.billing_party_type = 1
                              AND pb.billing_status IN ('OPEN', 'PARTIAL')
                              AND pb.balance_amount > 0
                        )
                    )

              )

        ) x

        GROUP BY
            x.pt_no,
            x.admission_id;
    `;

        executeQuery(
            query,
            [
                ptNo,
                ipNo,
                ptNo,
                ipNo
            ],
            callback
        );
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

    // getBillingTransactions: (ptNo, ipNo, status, callback) => {
    //     const query = `
    //     SELECT
    //         dmc.meal_charge_id AS bill_id,
    //         'DIET_ORDER' AS billing_type,

    //         dmc.party_type_id AS party_type_id,

    //         CASE
    //             WHEN dmc.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,

    //         dmc.admission_id,
    //         dmc.pt_no,


    //         dt.type_desc AS meal_name,

    //         NULL AS item_name,
    //         NULL AS item_id,

    //         1 AS quantity,

    //         dmc.meal_rate AS unit_rate,
    //         dmc.discount,

    //         0 AS gst_rate,
    //         0 AS gst_amount,

    //         dmc.net_amount,

    //         dmc.charge_status AS status,
    //         dmc.created_at

    //     FROM diet_meal_charge dmc

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = dmc.type_slno

    //     WHERE dmc.pt_no = ?
    //     AND dmc.admission_id = ?
    //     AND dmc.charge_status = ?

    //     UNION ALL


    //     SELECT
    //         dsl.ledger_id AS bill_id,

    //         CASE
    //             WHEN ddl.source_type='PATIENT_EXTRA_ORDER'
    //                 THEN 'EXTRA_ORDER'

    //             WHEN ddl.source_type='CANTEEN_ORDER'
    //                 AND dsl.party_type_id = 1
    //                 THEN 'PATIENT_CANTEEN_ORDER'

    //             WHEN ddl.source_type='CANTEEN_ORDER'
    //                 AND dsl.party_type_id <> 1
    //                 THEN 'BYSTANDER_CANTEEN_ORDER'

    //             ELSE 'UNKNOWN'
    //         END AS billing_type,

    //          dsl.party_type_id AS party_type_id,

    //         CASE
    //             WHEN dsl.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,


    //         dsl.admission_id,
    //         dsl.pt_no,

    //         dt.type_desc AS meal_name,

    //         im.item_name,
    //         im.item_id,

    //         dsl.quantity,

    //         dsl.unit_rate,
    //         dsl.discount,

    //         dsl.gst_rate,
    //         dsl.gst_amount,

    //         dsl.net_amount,

    //         dsl.ledger_status AS status,

    //         dsl.created_at


    //     FROM diet_service_ledger dsl

    //     INNER JOIN diet_delivery_log ddl
    //         ON ddl.delivery_id = dsl.delivery_id

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = ddl.type_slno

    //     LEFT JOIN item_master im
    //         ON im.item_id = dsl.item_id


    //     WHERE dsl.pt_no = ?
    //     AND dsl.admission_id = ?
    //     AND dsl.ledger_status = ?

    //     ORDER BY created_at
    // `;

    //     executeQuery(query, [ptNo, ipNo, status, ptNo, ipNo, status], callback);
    // },


    // getBillingTransactions: (ptNo, ipNo, status, callback) => {
    //     const query = `
    //     SELECT
    //         dmc.meal_charge_id AS bill_id,

    //         'DIET_ORDER' AS billing_type,

    //         dmc.party_type_id AS party_type_id,

    //         CASE
    //             WHEN dmc.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,

    //         dmc.admission_id,
    //         dmc.pt_no,

    //         dt.type_desc AS meal_name,

    //         NULL AS item_name,
    //         NULL AS item_id,

    //         1 AS quantity,

    //         dmc.meal_rate AS unit_rate,
    //         dmc.discount,

    //         0 AS gst_rate,
    //         0 AS gst_amount,

    //         dmc.net_amount,

    //         dmc.charge_status AS status,
    //         dmc.created_at

    //     FROM diet_meal_charge dmc

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = dmc.type_slno

    //     WHERE dmc.pt_no = ?
    //       AND dmc.admission_id = ?
    //       AND dmc.charge_status = ?

    //     UNION ALL

    //     SELECT
    //         dsl.ledger_id AS bill_id,

    //         CASE
    //             WHEN ddl.source_type = 'PATIENT_EXTRA_ORDER'
    //                 THEN 'EXTRA_ORDER'

    //             WHEN ddl.source_type = 'CANTEEN_ORDER'
    //                 AND dsl.party_type_id = 1
    //                 THEN 'PATIENT_CANTEEN_ORDER'

    //             WHEN ddl.source_type = 'CANTEEN_ORDER'
    //                 AND dsl.party_type_id <> 1
    //                 THEN 'BYSTANDER_CANTEEN_ORDER'

    //             ELSE 'UNKNOWN'
    //         END AS billing_type,

    //         dsl.party_type_id AS party_type_id,

    //         CASE
    //             WHEN dsl.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,

    //         dsl.admission_id,
    //         dsl.pt_no,

    //         dt.type_desc AS meal_name,

    //         im.item_name,
    //         im.item_id,

    //         dsl.quantity,

    //         dsl.unit_rate,
    //         dsl.discount,

    //         dsl.gst_rate,
    //         dsl.gst_amount,

    //         dsl.net_amount,

    //         dsl.ledger_status AS status,

    //         dsl.created_at

    //     FROM diet_service_ledger dsl

    //     INNER JOIN diet_delivery_log ddl
    //         ON ddl.delivery_id = dsl.delivery_id

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = ddl.type_slno

    //     LEFT JOIN item_master im
    //         ON im.item_id = dsl.item_id

    //     WHERE dsl.pt_no = ?
    //       AND dsl.admission_id = ?

    //       AND (
    //             -- Normal patient / extra orders
    //             (
    //                 dsl.party_type_id <> 1
    //                 AND dsl.ledger_status = ?
    //             )

    //             OR

    //             -- Bystander billed but not fully paid
    //             (
    //                 dsl.party_type_id = 1
    //                 AND dsl.ledger_status = 'BILLED'

    //                 AND EXISTS (
    //                     SELECT 1
    //                     FROM patient_billing pb
    //                     WHERE pb.patient_id = dsl.pt_no
    //                       AND pb.admission_id = dsl.admission_id
    //                       AND pb.billing_party_type = 1
    //                       AND pb.billing_status IN ('OPEN', 'PARTIAL')
    //                       AND pb.balance_amount > 0
    //                 )
    //             )
    //           )

    //     ORDER BY created_at
    // `;

    //     executeQuery(
    //         query,
    //         [
    //             ptNo,
    //             ipNo,
    //             status,

    //             ptNo,
    //             ipNo,
    //             status
    //         ],
    //         callback
    //     );
    // },
    // getBillingTransactions: (ptNo, ipNo, status, callback) => {
    //     const query = `
    //     SELECT 
    //         dmc.meal_charge_id AS bill_id,

    //         'DIET_ORDER' AS billing_type,

    //         dmc.party_type_id AS party_type_id,

    //         CASE 
    //             WHEN dmc.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,

    //         dmc.admission_id,
    //         dmc.pt_no,

    //         dt.type_desc AS meal_name,

    //         NULL AS item_name,
    //         NULL AS item_id,

    //         1 AS quantity,

    //         dmc.meal_rate AS unit_rate,
    //         dmc.discount,

    //         0 AS gst_rate,
    //         0 AS gst_amount,

    //         dmc.net_amount,

    //         dmc.charge_status AS status,
    //         dmc.created_at

    //     FROM diet_meal_charge dmc

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = dmc.type_slno

    //     WHERE dmc.pt_no = ?
    //       AND dmc.admission_id = ?
    //       AND dmc.charge_status = ?


    //     UNION ALL


    //     SELECT 
    //         dsl.ledger_id AS bill_id,

    //         CASE 
    //             WHEN ddl.source_type = 'PATIENT_EXTRA_ORDER'
    //                 THEN 'EXTRA_ORDER'

    //             WHEN ddl.source_type = 'CANTEEN_ORDER'
    //                 AND dsl.party_type_id = 1
    //                 THEN 'BYSTANDER_CANTEEN_ORDER'

    //             WHEN ddl.source_type = 'CANTEEN_ORDER'
    //                 AND dsl.party_type_id <> 1
    //                 THEN 'PATIENT_CANTEEN_ORDER'

    //             ELSE 'UNKNOWN'
    //         END AS billing_type,

    //         dsl.party_type_id AS party_type_id,

    //         CASE 
    //             WHEN dsl.party_type_id = 2 THEN 'PATIENT'
    //             ELSE 'BYSTANDER'
    //         END AS party,

    //         dsl.admission_id,
    //         dsl.pt_no,

    //         dt.type_desc AS meal_name,

    //         im.item_name,
    //         im.item_id,

    //         dsl.quantity,

    //         dsl.unit_rate,
    //         dsl.discount,

    //         dsl.gst_rate,
    //         dsl.gst_amount,

    //         dsl.net_amount,

    //         dsl.ledger_status AS status,

    //         dsl.created_at

    //     FROM diet_service_ledger dsl

    //     INNER JOIN diet_delivery_log ddl
    //         ON ddl.delivery_id = dsl.delivery_id

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = ddl.type_slno

    //     LEFT JOIN item_master im
    //         ON im.item_id = dsl.item_id

    //     WHERE dsl.pt_no = ?
    //       AND dsl.admission_id = ?

    //       AND (

    //             /* PATIENT EXTRA / PATIENT ORDERS */
    //             (
    //                 dsl.party_type_id <> 1
    //                 AND dsl.ledger_status = ?
    //             )

    //             OR

    //             /* BYSTANDER */
    //             (
    //                 dsl.party_type_id = 1
    //                 AND dsl.ledger_status = 'BILLED'

    //                 AND EXISTS (
    //                     SELECT 1

    //                     FROM patient_billing_detail pbd

    //                     INNER JOIN patient_billing pb
    //                         ON pb.billing_id = pbd.billing_id

    //                     WHERE pbd.reference_table = 'CANTEEN'
    //                       AND pbd.reference_id = dsl.canteen_order_id
    //                       AND pbd.item_id = dsl.item_id
    //                       AND pbd.party_type_id = 1

    //                       AND pbd.bill_item_status = 'OPEN'

    //                       AND pb.billing_party_type = 1
    //                       AND pb.billing_status IN ('OPEN', 'PARTIAL')
    //                       AND pb.balance_amount > 0
    //                 )
    //             )

    //           )

    //     ORDER BY created_at
    // `;

    //     executeQuery(
    //         query,
    //         [
    //             ptNo,
    //             ipNo,
    //             status,

    //             ptNo,
    //             ipNo,
    //             status
    //         ],
    //         callback
    //     );
    // },
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
                WHEN ddl.source_type = 'PATIENT_EXTRA_ORDER'
                    THEN 'EXTRA_ORDER'

                WHEN ddl.source_type = 'CANTEEN_ORDER'
                    AND dsl.party_type_id = 1
                    THEN 'BYSTANDER_CANTEEN_ORDER'

                WHEN ddl.source_type = 'CANTEEN_ORDER'
                    AND dsl.party_type_id <> 1
                    THEN 'PATIENT_CANTEEN_ORDER'

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

          AND (

                /* PATIENT EXTRA / PATIENT ORDERS */
                (
                    dsl.party_type_id <> 1
                    AND dsl.ledger_status = ?
                )

                OR

                /* BYSTANDER CREDIT */
                (
                    dsl.party_type_id = 1
                    AND dsl.ledger_status = 'BILLED'

                    AND EXISTS (
                        SELECT 1

                        FROM patient_billing_detail pbd

                        INNER JOIN patient_billing pb
                            ON pb.billing_id = pbd.billing_id

                        WHERE pbd.reference_table = 'diet_service_ledger'
                          AND pbd.reference_id = dsl.ledger_id

                          AND pbd.item_id = dsl.item_id
                          AND pbd.party_type_id = 1

                          AND pbd.bill_item_status = 'OPEN'

                          AND pb.billing_party_type = 1
                          AND pb.bill_pay_type = 'BYSTANDER_CREDIT'

                          AND pb.billing_status IN ('OPEN', 'PARTIAL')
                          AND pb.balance_amount > 0
                    )
                )

              )

        ORDER BY created_at
    `;

        executeQuery(
            query,
            [
                ptNo,
                ipNo,
                status,

                ptNo,
                ipNo,
                status
            ],
            callback
        );
    },

    //     getBystanderBill: (ipNo, ptNo, status, callback) => {
    //         const query = `
    //          SELECT

    //     dsl.ledger_id AS bill_id,

    //     'BYSTANDER_ORDER' AS billing_type,

    //     'BYSTANDER' AS party,

    //     1 as party_type_id,

    //     dsl.admission_id,

    //     dsl.pt_no,

    //       dt.type_desc AS meal_name,

    //     im.item_name,

    //     dsl.quantity,

    //     dsl.unit_rate,

    //     dsl.discount,

    //     dsl.gst_rate,

    //     dsl.gst_amount,

    //     dsl.net_amount,

    //     dsl.ledger_status AS status,

    //     dsl.created_at

    // FROM diet_service_ledger dsl

    // INNER JOIN item_master im
    //     ON im.item_id = dsl.item_id

    // LEFT JOIN canteen_order_item coi
    //     ON coi.canteen_order_item_id = dsl.canteen_order_id

    // LEFT JOIN diet_type dt
    //     ON dt.type_slno = coi.type_slno

    // WHERE dsl.party_type_id = 1
    // AND dsl.admission_id = ?
    // AND dsl.pt_no = ?
    // AND dsl.ledger_status = ?

    // ORDER BY dsl.created_at
    //     `;

    //         executeQuery(query, [ipNo, ptNo, status], callback);
    //     },
    // getBystanderBill: (ipNo, ptNo, status, callback) => {
    //     const query = `
    //     SELECT
    //         dsl.ledger_id AS bill_id,

    //         'BYSTANDER_ORDER' AS billing_type,

    //         'BYSTANDER' AS party,

    //         1 AS party_type_id,

    //         dsl.admission_id,
    //         dsl.pt_no,

    //         dt.type_desc AS meal_name,

    //         im.item_name,

    //         dsl.quantity,
    //         dsl.unit_rate,
    //         dsl.discount,
    //         dsl.gst_rate,
    //         dsl.gst_amount,
    //         dsl.net_amount,

    //         dsl.ledger_status AS status,

    //         pb.billing_id,
    //         pb.bill_no,
    //         pb.total_amount,
    //         pb.paid_amount,
    //         pb.balance_amount,
    //         pb.billing_status,

    //         dsl.created_at

    //     FROM diet_service_ledger dsl

    //     INNER JOIN item_master im
    //         ON im.item_id = dsl.item_id

    //     LEFT JOIN canteen_order_item coi
    //         ON coi.canteen_order_item_id = dsl.canteen_order_id

    //     LEFT JOIN diet_type dt
    //         ON dt.type_slno = coi.type_slno

    //     LEFT JOIN patient_billing pb
    //         ON pb.assignment_detail_id = dsl.delivery_id
    //         AND pb.billing_party_type = 1

    //     WHERE dsl.party_type_id = 1
    //       AND dsl.admission_id = ?
    //       AND dsl.pt_no = ?
    //       AND dsl.ledger_status = 'BILLED'

    //       AND (
    //             pb.billing_id IS NULL
    //             OR pb.billing_status IN ('OPEN', 'PARTIAL')
    //             OR pb.balance_amount > 0
    //           )

    //     ORDER BY dsl.created_at ASC
    // `;

    //     executeQuery(query, [ipNo, ptNo], callback);
    // },
    getBystanderBill: (ipNo, ptNo, status, callback) => {
        const query = `
            SELECT 
            dsl.ledger_id AS bill_id,

            'BYSTANDER_ORDER' AS billing_type,

            'BYSTANDER' AS party,

            dsl.party_type_id,

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

            pb.billing_id,
            pb.bill_no,
            pb.total_amount,
            pb.paid_amount,
            pb.balance_amount,
            pb.billing_status,
            pb.bill_pay_type,

            pbd.billing_detail_id,
            pbd.bill_item_status,

            dsl.created_at

        FROM diet_service_ledger dsl

        INNER JOIN item_master im
            ON im.item_id = dsl.item_id

        LEFT JOIN canteen_order_item coi
            ON coi.canteen_order_item_id = dsl.canteen_order_id

        LEFT JOIN diet_type dt
            ON dt.type_slno = coi.type_slno

        INNER JOIN patient_billing_detail pbd
            ON pbd.reference_table = 'diet_service_ledger'
            AND pbd.reference_id = dsl.ledger_id
            AND pbd.item_id = dsl.item_id
            AND pbd.party_type_id = 1
            AND pbd.bill_item_status = 'OPEN'

        INNER JOIN patient_billing pb
            ON pb.billing_id = pbd.billing_id
            AND pb.billing_party_type = 1
            AND pb.bill_pay_type = 'BYSTANDER_CREDIT'
            AND pb.billing_status IN ('OPEN', 'PARTIAL')
            AND pb.balance_amount > 0

        WHERE dsl.party_type_id = 1
        AND dsl.admission_id = ?
        AND dsl.pt_no = ?
        AND dsl.ledger_status = 'BILLED'

        ORDER BY dsl.created_at ASC;
    `;

        executeQuery(query, [ipNo, ptNo], callback);
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
        console.log({
            data
        });
        
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
                    billing_party_type,
                    billing_date,
                    bill_type,
                    bill_generated_by,
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
                    ?,
                    CURDATE(),
                    'PRE_GENERATED',
                    ?,
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
                    2,
                    created_by,
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
 FINALIZE PATIENT DIET AFTER BILLING
 **********************************************
 */

                await new Promise((resolve, reject) => {
                    FinalizePatientDietAfterBilling(
                        admission_id,
                        patient_id,
                        billingId,
                        created_by,
                        connection,
                        (err, result) => {
                            if (err) {
                                return reject(err);
                            }

                            resolve(result);
                        }
                    );
                });


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

        const updateAssignmentSql = `
        UPDATE diet_delivery_assignment_detail
        SET
            delivery_status = 'PICKEDUP'
        WHERE
            assignment_id = ?
            AND canteen_order_id = ?
            AND type_slno = ?
    `;


        // =======
        // GET ALL ITEMS BELONGING TO THE SELECTED
        // CANTEEN ORDER + MEAL TYPE
        // =======

        const getOrderItemsSql = `
        SELECT
            co.party_type_id,
            co.admission_id,

            coi.canteen_order_item_id,
            coi.canteen_order_id,
            coi.item_id,
            coi.quantity,
            coi.price,
            coi.gst,
            coi.gst_amount,
            coi.type_slno,
            coi.patient_diet_id,

            im.item_name

        FROM canteen_order co

        INNER JOIN canteen_order_item coi
            ON coi.canteen_order_id = co.canteen_order_id

        LEFT JOIN item_master im
            ON im.item_id = coi.item_id

        WHERE
            coi.canteen_order_id = ?
            AND coi.type_slno = ?
            AND coi.is_active = 1
    `;


        // =======
        // INSERT DELIVERY LOG
        // =======

        const insertDeliveryLogSql = `
        INSERT INTO diet_delivery_log (
            patient_diet_id,
            item_id,
            delivered_qty,
            delivery_status,
            develivered_by,
            delivered_time,
            delivery_remarks,
            updated_by,
            canteen_order_id,
            type_slno,
            source_type,
            source_id
        )
        VALUES (
            ?, ?, ?, 'PICKEDUP', ?, NOW(), ?, ?, ?, ?, 'CANTEEN_ORDER', ?
        )
    `;


        // =======
        // CREATE PROFORMA HEADER
        // =======

        const insertProformaSql = `
        INSERT INTO proforma_invoice (
            proforma_no,
            patient_id,
            admission_id,
            party_type_id,
            assignment_detail_id,
            total_amount,
            status,
            created_by
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, 'OPEN', ?
        )
    `;


        // =======
        // CREATE PROFORMA DETAIL
        //
        // ledger_id IS NULL BECAUSE SERVICE LEDGER
        // WILL ONLY BE CREATED AFTER ACTUAL DELIVERY.
        // =======

        const insertProformaDetailSql = `
        INSERT INTO proforma_invoice_detail (
            proforma_id,
            delivery_id,
            item_id,
            description,
            quantity,
            rate,
            gst,
            gst_amount,
            discount,
            amount,
            delivery_status,
            service_date
        )
        VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', NOW()
        )
    `;


        pool.getConnection((err, connection) => {

            if (err) {
                return callback(err);
            }


            connection.beginTransaction(async (err) => {

                if (err) {
                    connection.release();
                    return callback(err);
                }


                try {

                    // ===
                    // PROCESS EVERY SELECTED ASSIGNMENT
                    // ===

                    for (const item of Items) {


                        // =================================================
                        // 1. UPDATE ASSIGNMENT DETAIL
                        // =================================================

                        await new Promise((resolve, reject) => {

                            connection.query(
                                updateAssignmentSql,
                                [
                                    item.assignment_id,
                                    item.canteen_order_id,
                                    item.type_slno
                                ],
                                (err, result) => {

                                    if (err) {
                                        return reject(err);
                                    }

                                    resolve(result);
                                }
                            );

                        });


                        // =================================================
                        // 2. ONLY BYSTANDER
                        //
                        // party_type_id = 1
                        // =================================================

                        if (Number(item.party_type_id) !== 1) {
                            continue;
                        }


                        // =================================================
                        // 3. GET ALL ITEMS FOR THIS ORDER + TYPE
                        // =================================================

                        const orderItems = await new Promise((resolve, reject) => {

                            connection.query(
                                getOrderItemsSql,
                                [
                                    item.canteen_order_id,
                                    item.type_slno
                                ],
                                (err, result) => {

                                    if (err) {
                                        return reject(err);
                                    }

                                    resolve(result);
                                }
                            );

                        });


                        if (!orderItems || orderItems.length === 0) {
                            continue;
                        }


                        // =================================================
                        // 4. INSERT DELIVERY LOG FOR EACH ITEM
                        // =================================================

                        const deliveryLogs = [];


                        for (const orderItem of orderItems) {

                            const deliveryResult = await new Promise((resolve, reject) => {

                                connection.query(
                                    insertDeliveryLogSql,
                                    [
                                        // patient_diet_id
                                        orderItem.patient_diet_id || null,

                                        // item_id
                                        orderItem.item_id,

                                        // delivered_qty
                                        orderItem.quantity,

                                        // delivered_by
                                        item.em_id,

                                        // remarks
                                        "Order picked up from kitchen",

                                        // updated_by
                                        item.em_id,

                                        // canteen_order_id
                                        orderItem.canteen_order_id,

                                        // type_slno
                                        orderItem.type_slno,

                                        // source_id
                                        orderItem.canteen_order_item_id
                                    ],
                                    (err, result) => {

                                        if (err) {
                                            return reject(err);
                                        }

                                        resolve(result);
                                    }
                                );

                            });


                            deliveryLogs.push({
                                delivery_id: deliveryResult.insertId,
                                orderItem
                            });

                        }


                        // =================================================
                        // 5. CALCULATE TOTAL PROFORMA AMOUNT
                        // =================================================

                        const totalAmount = orderItems?.reduce(
                            (total, orderItem) => {
                                const quantity =
                                    Number(orderItem.quantity || 0);
                                const rate =
                                    Number(orderItem.price || 0);
                                const gstAmount =
                                    Number(orderItem.gst_amount || 0);
                                const discount = 0;
                                const amount = (quantity * rate) + gstAmount - discount;
                                return total + amount;
                            },
                            0
                        );


                        // =================================================
                        // 6. GENERATE PROFORMA NUMBER
                        // =================================================

                        const proformaNo =
                            `PF-${Date.now()}-${item.canteen_order_id}`;


                        // =================================================
                        // 7. INSERT PROFORMA HEADER
                        // =================================================

                        const proformaResult = await new Promise((resolve, reject) => {

                            connection.query(
                                insertProformaSql,
                                [
                                    // proforma_no
                                    proformaNo,

                                    // patient_id
                                    item.fb_pt_no,

                                    // admission_id
                                    item.fb_ip_no,

                                    // party_type_id
                                    item.party_type_id,

                                    // assignment_detail_id
                                    item.assignment_detail_id,

                                    // total_amount
                                    totalAmount,

                                    // created_by
                                    item.em_id
                                ],
                                (err, result) => {

                                    if (err) {
                                        return reject(err);
                                    }

                                    resolve(result);
                                }
                            );

                        });


                        const proformaId =
                            proformaResult.insertId;


                        // =================================================
                        // 8. INSERT PROFORMA DETAIL
                        // =================================================

                        for (const delivery of deliveryLogs) {

                            const orderItem =
                                delivery.orderItem;


                            const quantity =
                                Number(orderItem.quantity || 0);

                            const rate =
                                Number(orderItem.price || 0);

                            const gst =
                                Number(orderItem.gst || 0);

                            const gstAmount =
                                Number(orderItem.gst_amount || 0);

                            const discount = 0;

                            const amount =
                                (quantity * rate)
                                + gstAmount
                                - discount;


                            await new Promise((resolve, reject) => {

                                connection.query(
                                    insertProformaDetailSql,
                                    [
                                        // proforma_id
                                        proformaId,

                                        // delivery_id
                                        delivery.delivery_id,

                                        // item_id
                                        orderItem.item_id,

                                        // description
                                        orderItem.item_name ||
                                        `Canteen Order Item ${orderItem.canteen_order_item_id}`,

                                        // quantity
                                        quantity,

                                        // rate
                                        rate,

                                        // gst
                                        gst,

                                        // gst_amount
                                        gstAmount,

                                        // discount
                                        discount,

                                        // amount
                                        amount
                                    ],
                                    (err, result) => {

                                        if (err) {
                                            return reject(err);
                                        }

                                        resolve(result);
                                    }
                                );

                            });

                        }

                    }


                    // ===
                    // 9. COMMIT TRANSACTION
                    // ===

                    connection.commit(err => {

                        if (err) {

                            return connection.rollback(() => {

                                connection.release();

                                callback(err);

                            });

                        }


                        connection.release();


                        callback(null, {

                            updatedCount: Items.length

                        });

                    });


                } catch (error) {

                    // ===
                    // ROLLBACK EVERYTHING IF ANYTHING FAILS
                    // ===

                    connection.rollback(() => {

                        connection.release();

                        callback(error);

                    });

                }

            });

        });

    },

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
        ==========
        FETCH SERVICE LEDGER
        ==========
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
                "diet_service_ledger" AS reference_table,
                dsl.ledger_id AS reference_id,

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
        ==========
        FETCH DIET MEAL CHARGES
        ==========
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
        ==========
        EXECUTE
        ==========
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
            updated_by = null,
            bill_pay_type
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
                    bill_pay_type,
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
                        bill_pay_type,
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
        
        VALIDATION
        
        */

        if (!assignment_detail_id) {
            return callback(null, {
                success: 0,
                message: "Assignment detail ID is required"
            });
        }
        /*
        
        GET CONNECTION
        
        */

        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            /*
            
            QUERY HELPER
            
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
            
            MAIN LOGIC
            
            */

            const execute = async () => {

                try {

                    /*
                    
                    1. GET ALL BILL HEADERS
                    
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
                    
                    2. NO BILL FOUND
                    
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
                    
                    3. GET BILL IDS
                    
                    */

                    const billIds = bills.map(
                        bill => bill.billing_id
                    );


                    const placeholders = billIds
                        .map(() => "?")
                        .join(",");


                    /*
                    
                    4. GET ALL BILL ITEMS
                    
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
                    
                    5. RELEASE CONNECTION
                    
                    */
                    connection.release();
                    /*
                    
                    6. SUCCESS RESPONSE
                    
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
                    
                    ERROR
                    
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
            payments,
            change_amount,
            change_status,
            received_amount,
            remarks,

        } = data;

        if (!Array.isArray(payments) || payments?.length === 0) {
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

                    const calculatedTotal = payments?.reduce(
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
                                            received_amount,
                                            change_amount,
                                            transaction_id,
                                            remarks,
                                            change_status,
                                            payment_status
                                        )
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SUCCESS')
                                        `,
                                            [
                                                billingId,
                                                paymentAmount,
                                                payment_mode,
                                                collected_by,
                                                collected_location,
                                                received_amount,
                                                change_amount,
                                                transaction_id || null,
                                                remarks,
                                                change_status
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
                                                            is_settled = 'Y',
                                                            settled_id = ?,
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
                                                                paymentId,
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


    //     getBillablePatientDetail: (status, callback) => {
    //         const query = `
    // SELECT
    //     pending.admission_id,
    //     pending.pt_no,

    //     p.fb_ptc_name AS patient_name,
    //     p.fb_ptc_sex AS sex,
    //     p.fb_ptd_dob AS date_of_birth,
    //     p.fb_ptc_mobile AS mobile,
    //     p.fb_dep_desc AS department,
    //     p.fb_bd_code AS bed_code,
    //     b.fb_bdc_no AS bed_name,
    //     p.fb_ipd_date AS admission_date,
    //     p.fb_ipc_curstatus,

    //     ns.fb_ns_code AS nursing_station_code,
    //     ns.fb_ns_name AS nursing_station_name,

    //     pending.pending_items,
    //     pending.pending_amount

    // FROM (
    //     SELECT
    //         admission_id,
    //         pt_no,

    //         COUNT(*) AS pending_items,
    //         SUM(net_amount) AS pending_amount

    //     FROM (
    //         SELECT
    //             admission_id,
    //             pt_no,
    //             party_type_id,
    //             net_amount
    //         FROM diet_meal_charge
    //         WHERE charge_status = ?

    //         UNION ALL

    //         SELECT
    //             admission_id,
    //             pt_no,
    //             party_type_id,
    //             net_amount
    //         FROM diet_service_ledger
    //         WHERE ledger_status = ?
    //     ) charges

    //     GROUP BY
    //         admission_id,
    //         pt_no
    // ) pending

    // INNER JOIN fb_ipadmiss p
    //     ON p.fb_ip_no = pending.admission_id

    // LEFT JOIN fb_bed b
    //     ON b.fb_bd_code = p.fb_bd_code

    // LEFT JOIN fb_nurse_station_master ns
    //     ON ns.fb_ns_code = b.fb_ns_code

    // ORDER BY pending.admission_id DESC
    //     `;

    //         executeQuery(query, [status, status], callback);
    //     },


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
            p.fb_ipc_curstatus,

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
                    dmc.admission_id,
                    dmc.pt_no,
                    dmc.net_amount

                FROM diet_meal_charge dmc

                WHERE dmc.charge_status = ?


                UNION ALL

                SELECT
                    dsl.admission_id,
                    dsl.pt_no,
                    dsl.net_amount

                FROM diet_service_ledger dsl

                WHERE dsl.ledger_status = ?
                  AND dsl.party_type_id <> 1


                UNION ALL

                SELECT
                    dsl.admission_id,
                    dsl.pt_no,
                    dsl.net_amount

                FROM diet_service_ledger dsl

                WHERE dsl.party_type_id = 1
                  AND dsl.ledger_status = 'BILLED'

                  AND EXISTS (
                        SELECT 1

                        FROM patient_billing_detail pbd

                        INNER JOIN patient_billing pb
                            ON pb.billing_id = pbd.billing_id

                        WHERE pbd.reference_table = 'CANTEEN'
                          AND pbd.reference_id = dsl.canteen_order_id
                          AND pbd.item_id = dsl.item_id
                          AND pbd.party_type_id = 1

                          AND pbd.bill_item_status = 'OPEN'

                          AND pb.billing_party_type = 1
                          AND pb.billing_status IN ('OPEN', 'PARTIAL')
                          AND pb.balance_amount > 0
                  )

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
        executeQuery(
            query,
            [status, status],
            callback
        );
    },

    getProformaDetailsService: (
        assignment_detail_id,
        callback
    ) => {

        const sql = `
        SELECT
            pi.proforma_id,
            pi.proforma_no,
            pi.patient_id,
            pi.admission_id,
            pi.party_type_id,
            pi.assignment_detail_id,
            pi.proforma_date,
            pi.total_amount,
            pi.status,

            pid.proforma_detail_id,

            pid.delivery_id,
            pid.item_id,
            pid.description,
            pid.quantity,
            pid.rate,
            pid.gst,
            pid.gst_amount,
            pid.discount,
            pid.amount,
            pid.delivery_status,
            pid.final_billing_detail_id,
            pid.service_date,

            ddl.delivery_status AS actual_delivery_status,
            ddl.delivered_qty,
            ddl.delivered_time,
            ddl.develivered_by,

            im.item_name

        FROM proforma_invoice pi

        INNER JOIN proforma_invoice_detail pid
            ON pid.proforma_id = pi.proforma_id

        LEFT JOIN diet_delivery_log ddl
            ON ddl.delivery_id = pid.delivery_id

        LEFT JOIN item_master im
            ON im.item_id = pid.item_id

        WHERE pi.assignment_detail_id = ?

        ORDER BY pid.proforma_detail_id ASC
    `;

        pool.query(
            sql,
            [assignment_detail_id],
            (err, result) => {

                if (err) {
                    return callback(err);
                }

                return callback(null, result);
            }
        );
    },

    // convertProformaToBill: (
    //     payload,
    //     callback
    // ) => {

    //     const {
    //         proforma_id,
    //         bill,
    //         details
    //     } = payload;

    //     // --------------------------------------------------
    //     // GET CONNECTION
    //     // --------------------------------------------------

    //     pool.getConnection((connectionError, connection) => {

    //         if (connectionError) {
    //             console.error(
    //                 "convertProformaToBill Connection Error:",
    //                 connectionError
    //             );
    //             return callback(
    //                 connectionError,
    //                 null
    //             );
    //         }

    //         // --------------------------------------------------
    //         // COMMON ERROR HANDLER
    //         // --------------------------------------------------

    //         const handleError = (error) => {
    //             connection.rollback((rollbackError) => {
    //                 if (rollbackError) {
    //                     console.error(
    //                         "convertProformaToBill Rollback Error:",
    //                         rollbackError
    //                     );
    //                 }
    //                 connection.release();
    //                 return callback(
    //                     error,
    //                     null
    //                 );
    //             });
    //         };

    //         // --------------------------------------------------
    //         // START TRANSACTION
    //         // --------------------------------------------------

    //         connection.beginTransaction((transactionError) => {
    //             if (transactionError) {
    //                 console.error(
    //                     "convertProformaToBill Transaction Error:",
    //                     transactionError
    //                 );
    //                 connection.release();
    //                 return callback(
    //                     transactionError,
    //                     null
    //                 );
    //             }

    //             // --------------------------------------------------
    //             // 1. INSERT BILL MASTER
    //             // --------------------------------------------------

    //             const billInsertQuery = `
    //             INSERT INTO patient_billing (
    //                 patient_id,
    //                 admission_id,
    //                 assignment_detail_id,
    //                 billing_party_type,
    //                 billing_date,
    //                 bill_type,
    //                 bill_generated_by,
    //                 bill_generated_location,
    //                 total_amount,
    //                 paid_amount,
    //                 balance_amount,
    //                 billing_status,
    //                 created_by,
    //                 bill_pay_type
    //             )
    //             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    //         `;

    //             connection.query(
    //                 billInsertQuery,
    //                 [
    //                     bill.patient_id,
    //                     bill.admission_id,
    //                     bill.assignment_detail_id || null,
    //                     bill.billing_party_type,
    //                     bill.billing_date,
    //                     bill.bill_type,
    //                     bill.employeeId,
    //                     bill.bill_generated_location,
    //                     bill.total_amount,
    //                     bill.paid_amount,
    //                     bill.balance_amount,
    //                     bill.billing_status,
    //                     bill.employeeId,
    //                     bill.bill_pay_type
    //                 ],
    //                 (billError, billResult) => {

    //                     if (billError) {

    //                         console.error(
    //                             "Bill Master Insert Error:",
    //                             billError
    //                         );

    //                         return handleError(
    //                             billError
    //                         );
    //                     }

    //                     const billingId =
    //                         billResult.insertId;

    //                     // --------------------------------------------------
    //                     // 2. GENERATE BILL NUMBER
    //                     // --------------------------------------------------

    //                     const today = new Date()
    //                         .toISOString()
    //                         .slice(0, 10)
    //                         .replace(/-/g, "");

    //                     const billNo =
    //                         `CAN-${today}-${String(
    //                             billingId
    //                         ).padStart(6, "0")}`;

    //                     const updateBillNoQuery = `
    //                     UPDATE patient_billing
    //                     SET bill_no = ?
    //                     WHERE billing_id = ?
    //                 `;

    //                     connection.query(
    //                         updateBillNoQuery,
    //                         [
    //                             billNo,
    //                             billingId
    //                         ],
    //                         (billNoError) => {

    //                             if (billNoError) {

    //                                 console.error(
    //                                     "Bill Number Update Error:",
    //                                     billNoError
    //                                 );

    //                                 return handleError(
    //                                     billNoError
    //                                 );
    //                             }

    //                             // --------------------------------------------------
    //                             // 3. INSERT BILL DETAILS
    //                             // --------------------------------------------------

    //                             const detailInsertQuery = `
    //                             INSERT INTO patient_billing_detail (
    //                                 billing_id,
    //                                 category_id,
    //                                 party_type_id,
    //                                 description,
    //                                 item_id,
    //                                 quantity,
    //                                 rate,
    //                                 gst,
    //                                 gst_amount,
    //                                 discount,
    //                                 amount,
    //                                 reference_table,
    //                                 reference_id,
    //                                 service_date
    //                             )
    //                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    //                         `;

    //                             // --------------------------------------------------
    //                             // INSERT DETAILS ONE BY ONE
    //                             // --------------------------------------------------

    //                             const insertDetail = (
    //                                 index
    //                             ) => {

    //                                 // --------------------------------------------------
    //                                 // ALL DETAILS INSERTED
    //                                 // --------------------------------------------------

    //                                 if (
    //                                     index >=
    //                                     details.length
    //                                 ) {

    //                                     // --------------------------------------------------
    //                                     // 4. COMMIT TRANSACTION
    //                                     // --------------------------------------------------

    //                                     return connection.commit(
    //                                         (commitError) => {

    //                                             if (commitError) {

    //                                                 console.error(
    //                                                     "Commit Error:",
    //                                                     commitError
    //                                                 );

    //                                                 return handleError(
    //                                                     commitError
    //                                                 );
    //                                             }

    //                                             // --------------------------------------------------
    //                                             // SUCCESS
    //                                             // --------------------------------------------------

    //                                             connection.release();

    //                                             return callback(
    //                                                 null,
    //                                                 {
    //                                                     billing_id:
    //                                                         billingId,

    //                                                     bill_no:
    //                                                         billNo,

    //                                                     proforma_id:
    //                                                         proforma_id,

    //                                                     total_amount:
    //                                                         bill.total_amount,

    //                                                     paid_amount:
    //                                                         bill.paid_amount,

    //                                                     balance_amount:
    //                                                         bill.balance_amount,

    //                                                     billing_status:
    //                                                         bill.billing_status,

    //                                                     bill_pay_type:
    //                                                         bill.bill_pay_type
    //                                                 }
    //                                             );
    //                                         }
    //                                     );
    //                                 }

    //                                 const item =
    //                                     details[index];

    //                                 connection.query(
    //                                     detailInsertQuery,
    //                                     [
    //                                         billingId,

    //                                         item.category_id,

    //                                         item.party_type_id ||
    //                                         bill.billing_party_type,

    //                                         item.description,

    //                                         item.item_id ||
    //                                         null,

    //                                         item.quantity ||
    //                                         0,

    //                                         item.rate ||
    //                                         0,

    //                                         item.gst ||
    //                                         0,

    //                                         item.gst_amount ||
    //                                         0,

    //                                         item.discount ||
    //                                         0,

    //                                         item.amount ||
    //                                         0,

    //                                         item.reference_table ||
    //                                         "proforma_detail",

    //                                         item.reference_id ||
    //                                         null,

    //                                         item.service_date ||
    //                                         null
    //                                     ],
    //                                     (detailError) => {

    //                                         if (detailError) {

    //                                             console.error(
    //                                                 `Bill Detail Insert Error at index ${index}:`,
    //                                                 detailError
    //                                             );

    //                                             return handleError(
    //                                                 detailError
    //                                             );
    //                                         }

    //                                         // Move to next detail
    //                                         insertDetail(
    //                                             index + 1
    //                                         );
    //                                     }
    //                                 );
    //                             };

    //                             // Start inserting details
    //                             insertDetail(0);
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     });
    // },

    convertProformaToBill: (
        payload,
        callback
    ) => {

        const {
            proforma_id,
            bill,
            details
        } = payload;

        // --------------------------------------------------
        // GET CONNECTION
        // --------------------------------------------------

        pool.getConnection((connectionError, connection) => {

            if (connectionError) {

                console.error(
                    "convertProformaToBill Connection Error:",
                    connectionError
                );

                return callback(
                    connectionError,
                    null
                );
            }

            // --------------------------------------------------
            // COMMON ERROR HANDLER
            // --------------------------------------------------

            const handleError = (error) => {

                connection.rollback((rollbackError) => {

                    if (rollbackError) {

                        console.error(
                            "convertProformaToBill Rollback Error:",
                            rollbackError
                        );
                    }

                    connection.release();

                    return callback(
                        error,
                        null
                    );
                });
            };

            // --------------------------------------------------
            // START TRANSACTION
            // --------------------------------------------------

            connection.beginTransaction((transactionError) => {

                if (transactionError) {

                    console.error(
                        "convertProformaToBill Transaction Error:",
                        transactionError
                    );

                    connection.release();

                    return callback(
                        transactionError,
                        null
                    );
                }

                // --------------------------------------------------
                // 1. INSERT BILL MASTER
                // --------------------------------------------------

                const billInsertQuery = `
                INSERT INTO patient_billing (
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
                    bill_pay_type
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

                connection.query(
                    billInsertQuery,
                    [
                        bill.patient_id,
                        bill.admission_id,
                        bill.assignment_detail_id || null,
                        bill.billing_party_type,
                        bill.billing_date,
                        bill.bill_type,

                        // Employee who generated the bill
                        bill.employeeId,

                        bill.bill_generated_location,
                        bill.total_amount,
                        bill.paid_amount,
                        bill.balance_amount,
                        bill.billing_status,

                        // Created by
                        bill.employeeId,

                        bill.bill_pay_type
                    ],
                    (billError, billResult) => {

                        if (billError) {

                            console.error(
                                "Bill Master Insert Error:",
                                billError
                            );

                            return handleError(
                                billError
                            );
                        }

                        const billingId =
                            billResult.insertId;

                        // --------------------------------------------------
                        // 2. GENERATE BILL NUMBER
                        // --------------------------------------------------

                        const today = new Date()
                            .toISOString()
                            .slice(0, 10)
                            .replace(/-/g, "");

                        const billNo =
                            `CAN-${today}-${String(
                                billingId
                            ).padStart(6, "0")}`;

                        const updateBillNoQuery = `
                        UPDATE patient_billing
                        SET bill_no = ?
                        WHERE billing_id = ?
                    `;

                        connection.query(
                            updateBillNoQuery,
                            [
                                billNo,
                                billingId
                            ],
                            (billNoError) => {

                                if (billNoError) {

                                    console.error(
                                        "Bill Number Update Error:",
                                        billNoError
                                    );

                                    return handleError(
                                        billNoError
                                    );
                                }

                                // --------------------------------------------------
                                // 3. INSERT BILL DETAILS
                                // --------------------------------------------------

                                const detailInsertQuery = `
                                INSERT INTO patient_billing_detail (
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
                                    service_date
                                )
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `;

                                // --------------------------------------------------
                                // INSERT DETAILS ONE BY ONE
                                // --------------------------------------------------

                                const insertDetail = (
                                    index
                                ) => {

                                    // --------------------------------------------------
                                    // ALL DETAILS INSERTED
                                    // --------------------------------------------------

                                    if (
                                        index >=
                                        details.length
                                    ) {

                                        // --------------------------------------------------
                                        // 4. UPDATE PROFORMA
                                        // --------------------------------------------------

                                        const updateProformaQuery = `
                                        UPDATE proforma_invoice
                                        SET
                                            status = 'CONVERTED',
                                            converted_billing_id = ?,
                                            updated_by = ?
                                        WHERE proforma_id = ?
                                          AND status = 'OPEN'
                                    `;

                                        connection.query(
                                            updateProformaQuery,
                                            [
                                                billingId,
                                                bill.employeeId,
                                                proforma_id
                                            ],
                                            (proformaError, proformaResult) => {

                                                if (proformaError) {

                                                    console.error(
                                                        "Proforma Update Error:",
                                                        proformaError
                                                    );

                                                    return handleError(
                                                        proformaError
                                                    );
                                                }

                                                // --------------------------------------------------
                                                // OPTIONAL SAFETY CHECK
                                                // --------------------------------------------------

                                                if (
                                                    proformaResult.affectedRows === 0
                                                ) {

                                                    return handleError(
                                                        new Error(
                                                            "Proforma not found or already converted"
                                                        )
                                                    );
                                                }

                                                // --------------------------------------------------
                                                // 5. COMMIT TRANSACTION
                                                // --------------------------------------------------

                                                return connection.commit(
                                                    (commitError) => {

                                                        if (commitError) {

                                                            console.error(
                                                                "Commit Error:",
                                                                commitError
                                                            );

                                                            return handleError(
                                                                commitError
                                                            );
                                                        }

                                                        // --------------------------------------------------
                                                        // SUCCESS
                                                        // --------------------------------------------------

                                                        connection.release();

                                                        return callback(
                                                            null,
                                                            {
                                                                billing_id:
                                                                    billingId,

                                                                bill_no:
                                                                    billNo,

                                                                proforma_id:
                                                                    proforma_id,

                                                                total_amount:
                                                                    bill.total_amount,

                                                                paid_amount:
                                                                    bill.paid_amount,

                                                                balance_amount:
                                                                    bill.balance_amount,

                                                                billing_status:
                                                                    bill.billing_status,

                                                                bill_pay_type:
                                                                    bill.bill_pay_type,

                                                                proforma_status:
                                                                    "CONVERTED"
                                                            }
                                                        );
                                                    }
                                                );
                                            }
                                        );

                                        return;
                                    }

                                    const item =
                                        details[index];

                                    connection.query(
                                        detailInsertQuery,
                                        [
                                            billingId,

                                            item.category_id,

                                            item.party_type_id ||
                                            bill.billing_party_type,

                                            item.description,

                                            item.item_id ||
                                            null,

                                            item.quantity ||
                                            0,

                                            item.rate ||
                                            0,

                                            item.gst ||
                                            0,

                                            item.gst_amount ||
                                            0,

                                            item.discount ||
                                            0,

                                            item.amount ||
                                            0,

                                            item.reference_table ||
                                            "proforma_detail",

                                            item.reference_id ||
                                            null,

                                            item.service_date ||
                                            null
                                        ],
                                        (detailError) => {

                                            if (detailError) {

                                                console.error(
                                                    `Bill Detail Insert Error at index ${index}:`,
                                                    detailError
                                                );

                                                return handleError(
                                                    detailError
                                                );
                                            }

                                            // Next detail
                                            insertDetail(
                                                index + 1
                                            );
                                        }
                                    );
                                };

                                // --------------------------------------------------
                                // START INSERTING DETAILS
                                // --------------------------------------------------

                                insertDetail(0);
                            }
                        );
                    }
                );
            });
        });
    },


    insertOrderPacking: (
        payload,
        callback
    ) => {

        const {
            order_id,
            created_by,
            packets,
            packet_count,
            assignment_detail_id,
            type_slno
        } = payload;


        // --------------------------------------------------
        // GET CONNECTION
        // --------------------------------------------------

        pool.getConnection(
            (connectionError, connection) => {

                if (connectionError) {
                    console.error(
                        "insertOrderPacking Connection Error:",
                        connectionError
                    );

                    return callback(
                        connectionError,
                        null
                    );

                }


                // --------------------------------------------------
                // COMMON ERROR HANDLER
                // --------------------------------------------------

                const handleError = (error) => {
                    connection.rollback(
                        (rollbackError) => {
                            if (rollbackError) {
                                console.error(
                                    "insertOrderPacking Rollback Error:",
                                    rollbackError
                                );
                            }
                            connection.release()
                            return callback(
                                error,
                                null
                            );
                        }
                    );
                };


                // --------------------------------------------------
                // START TRANSACTION
                // --------------------------------------------------
                connection.beginTransaction(
                    (transactionError) => {
                        if (transactionError) {
                            console.error(
                                "insertOrderPacking Transaction Error:",
                                transactionError
                            );
                            connection.release();
                            return callback(
                                transactionError,
                                null
                            );
                        }


                        // 
                        // 1. INSERT PACKING MASTER
                        // 

                        const packingInsertQuery = `
                        INSERT INTO canteen_order_packing
                        (
                            order_id,
                            status,
                            packet_count,
                            assignment_detail_id,
                            type_slno,
                            created_by,
                            created_at
                        )
                        VALUES
                        (
                            ?,
                            'COMPLETED',
                            ?,
                            ?,
                            ?,
                            ?,
                            NOW()
                        )

                    `;


                        connection.query(
                            packingInsertQuery,
                            [
                                order_id,
                                packet_count,
                                assignment_detail_id,
                                type_slno,
                                created_by
                            ],

                            (
                                packingError,
                                packingResult
                            ) => {

                                if (packingError) {
                                    console.error(
                                        "Packing Master Insert Error:",
                                        packingError
                                    );

                                    return handleError(
                                        packingError
                                    );

                                }


                                const packingId =
                                    packingResult.insertId;


                                // 
                                // 2. INSERT PACKET DETAILS
                                // 

                                const detailInsertQuery = `

                                INSERT INTO
                                canteen_order_packing_detail
                                (
                                    packing_id,
                                    packet_uid,
                                    packet_no,
                                    order_item_id,
                                    quantity,
                                    status,
                                    barcode_printed,
                                    created_by,
                                    created_at,
                                    packed_by,
                                    packed_at
                                )
                                VALUES
                                (
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    ?,
                                    'PACKED',
                                    0,
                                    ?,
                                    NOW(),
                                    ?,
                                    NOW()
                                )

                            `;


                                /*
                                 * Create one packet at a time.
                                 */

                                const insertPacket =
                                    (packetIndex) => {


                                        // ------------------------------------------
                                        // ALL PACKETS INSERTED
                                        // ------------------------------------------

                                        if (
                                            packetIndex >=
                                            packets.length
                                        ) {

                                            return connection.commit(
                                                (commitError) => {

                                                    if (commitError) {

                                                        console.error(
                                                            "Packing Commit Error:",
                                                            commitError
                                                        );

                                                        return handleError(
                                                            commitError
                                                        );

                                                    }


                                                    // ------------------------------------------
                                                    // SUCCESS
                                                    // ------------------------------------------

                                                    connection.release();


                                                    return callback(
                                                        null,
                                                        {

                                                            packing_id:
                                                                packingId,

                                                            order_id:
                                                                order_id,

                                                            packet_count:
                                                                packets.length,

                                                            status:
                                                                "COMPLETED"

                                                        }
                                                    );

                                                }
                                            );

                                        }


                                        const packet =
                                            packets[
                                            packetIndex
                                            ];


                                        /*
                                         * Generate packet UID.
                                         *
                                         * Example:
                                         * PKT-125-1
                                         * PKT-125-2
                                         */

                                        const packetUid =
                                            `PKT-${packingId}-${String(packet.packet_no).padStart(3, "0")}`;


                                        // ------------------------------------------
                                        // INSERT ITEMS INSIDE THIS PACKET
                                        // ------------------------------------------

                                        const insertItem =
                                            (itemIndex) => {


                                                // --------------------------------------
                                                // ALL ITEMS OF CURRENT PACKET INSERTED
                                                // --------------------------------------

                                                if (
                                                    itemIndex >=
                                                    packet.items.length
                                                ) {

                                                    return insertPacket(
                                                        packetIndex + 1
                                                    );

                                                }


                                                const item =
                                                    packet.items[
                                                    itemIndex
                                                    ];


                                                connection.query(

                                                    detailInsertQuery,

                                                    [

                                                        packingId,

                                                        packetUid,

                                                        packet.packet_no,

                                                        item.order_item_id,

                                                        Number(
                                                            item.quantity ?? 0
                                                        ),

                                                        created_by,

                                                        created_by

                                                    ],

                                                    (detailError) => {

                                                        if (detailError) {
                                                            console.error(
                                                                `Packing Detail Insert Error at packet ${packet.packet_no}, item ${item.order_item_id}:`,
                                                                detailError
                                                            );
                                                            return handleError(
                                                                detailError
                                                            );

                                                        }


                                                        // --------------------------------------
                                                        // NEXT ITEM
                                                        // --------------------------------------

                                                        insertItem(
                                                            itemIndex + 1
                                                        );

                                                    }

                                                );

                                            };

                                        // ------------------------------------------
                                        // START CURRENT PACKET ITEMS
                                        // ------------------------------------------
                                        insertItem(0);

                                    };
                                // ------------------------------------------
                                // START PACKET INSERTION
                                // ------------------------------------------
                                insertPacket(0);

                            }

                        );

                    }

                );

            }

        );

    },

    getOrderPackingByAssignment: (assignment_detail_id, callback) => {

        const query = `
        SELECT
            p.packing_id,
            p.order_id,
            p.packet_count,
            p.status AS packing_status,
            p.assignment_detail_id,
            p.created_by,
            p.created_at,

            d.packing_detail_id,
            d.packet_uid,
            d.packet_no,
            d.order_item_id,
            d.quantity,
            d.status AS packet_status,
            d.barcode_printed,
            d.created_at AS detail_created_at,
            im.item_name,
            im.item_alias,
            im.item_code,
            im.description

        FROM canteen_order_packing p

        INNER JOIN canteen_order_packing_detail d
            ON d.packing_id = p.packing_id

        LEFT JOIN canteen_order_item coi 
            ON coi.canteen_order_item_id = d.order_item_id
        LEFT JOIN item_master im
            ON im.item_id = coi.item_id

        WHERE p.assignment_detail_id = ?

        ORDER BY
            d.packet_no ASC,
            d.packing_detail_id ASC
    `;

        pool.query(
            query,
            [assignment_detail_id],
            (error, result) => {

                if (error) {

                    console.error(
                        "getOrderPackingByAssignment Error:",
                        error
                    );

                    return callback(error, null);
                }

                return callback(null, result);
            }
        );
    },

    createPrintQueueService: (values, callback) => {

        if (!values || values.length === 0) {
            return callback(null, {
                insertedCount: 0,
                duplicatePacketUids: []
            });
        }

        // Get packet UIDs from incoming values
        const packetUids = values?.map(item => item[1]);

        const checkSql = `SELECT packet_uid FROM print_queue WHERE packet_uid IN (?)`;

        pool.query(
            checkSql,
            [packetUids],
            (checkError, existingRows) => {
                if (checkError) {
                    return callback(checkError, null);
                }

                const existingUids = existingRows?.map(
                    row => row?.packet_uid
                );

                // Find duplicate UIDs
                const duplicatePacketUids = packetUids?.filter(
                    (uid, index) =>
                        existingUids?.includes(uid) &&
                        packetUids?.indexOf(uid) === index
                );

                // If duplicate exists, don't insert anything
                if (duplicatePacketUids?.length > 0) {

                    return callback(null, {
                        insertedCount: 0,
                        duplicatePacketUids
                    });
                }

                const insertSql = `
                INSERT INTO print_queue (
                    packing_id,
                    packet_uid,
                    meal_type,
                    order_id,
                    admission_id,
                    patient_no,
                    patient_name,
                    bed_code,
                    nursing_station,
                    party_name
                )
                VALUES ?
            `;

                pool.query(
                    insertSql,
                    [values],
                    (insertError, result) => {

                        if (insertError) {
                            return callback(
                                insertError,
                                null
                            );
                        }

                        return callback(null, {
                            insertedCount:
                                result.affectedRows,
                            duplicatePacketUids: []
                        });
                    }
                );
            }
        );
    },
    getCashSummaryDetails: (EmId, callBack) => {
        pool.query(
            `
  SELECT
    collected_by,
    SUM(amount) AS total_collected,
    SUM(
        CASE
            WHEN payment_mode = 'CASH' THEN amount
            ELSE 0
        END
    ) AS cash_collected,
    COUNT(*) AS total_transactions
FROM patient_bill_payment
WHERE collected_by = ?
  AND payment_status = 'SUCCESS'
 -- AND DATE(payment_date) = CURDATE()
GROUP BY collected_by;
            `,
            [EmId],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getPaymentModeDetails: (EmId, callBack) => {
        pool.query(
            `
                    SELECT
            collected_by,

            SUM(CASE
                WHEN payment_mode = 'CASH'
                THEN amount ELSE 0
            END) AS cash_amount,

            SUM(CASE
                WHEN payment_mode = 'CARD'
                THEN amount ELSE 0
            END) AS card_amount,

            SUM(CASE
                WHEN payment_mode = 'UPI'
                THEN amount ELSE 0
            END) AS upi_amount,

            SUM(CASE
                WHEN payment_mode = 'BANK_TRANSFER'
                THEN amount ELSE 0
            END) AS bank_transfer_amount,

            SUM(CASE
                WHEN payment_mode = 'CREDIT'
                THEN amount ELSE 0
            END) AS credit_amount,

            SUM(amount) AS total_amount

        FROM patient_bill_payment
        WHERE collected_by = ?
        AND payment_status = 'SUCCESS'
        GROUP BY collected_by
            `,
            [EmId],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getPaymentHistoryDetail: (EmId, callBack) => {
        pool.query(
            `SELECT
                p.payment_id,
                p.billing_id,
                p.payment_date,
                p.amount,
                p.payment_mode,
                p.collected_by,
                p.collected_location,
                p.remarks,

                b.bill_no,
                b.patient_id,
                b.admission_id,
                b.billing_date,
                b.bill_type,
                b.billing_party_type,

                opt.party_name,

                i.fb_ip_no,
                i.fb_ptc_name AS patient_name,
                i.fb_ptc_mobile AS patient_mobile,
                i.fb_ipd_date AS admission_date

            FROM patient_bill_payment p

            INNER JOIN patient_billing b
                ON b.billing_id = p.billing_id

            LEFT JOIN order_party_type opt
                ON opt.party_type_id = b.billing_party_type

            LEFT JOIN fb_ipadmiss i
                ON i.fb_pt_no = b.patient_id

            WHERE p.collected_by = ?
            AND p.payment_mode = 'CASH'
            AND p.payment_status = 'SUCCESS'
            AND DATE(p.payment_date) = CURDATE()

            ORDER BY p.payment_date DESC
            `,
            [EmId],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getPaymentHistoryBillDetail: (billingId, callBack) => {

        pool.query(
            `
        SELECT
            b.billing_id,
            b.bill_no,
            b.patient_id,
            b.admission_id,
            b.billing_party_type,
            b.billing_date,
            b.bill_type,
            b.bill_generated_location,
            b.total_amount,
            b.paid_amount,
            b.balance_amount,
            b.billing_status,
            b.bill_pay_type,
            b.is_settled,

            opt.party_name,

            i.fb_ip_no,
            i.fb_ptc_name AS patient_name,
            i.fb_ptc_mobile AS patient_mobile,
            i.fb_ipd_date AS admission_date

        FROM patient_billing b

        LEFT JOIN order_party_type opt
            ON opt.party_type_id = b.billing_party_type

        LEFT JOIN fb_ipadmiss i
            ON i.fb_pt_no = b.patient_id

        WHERE b.billing_id = ?
        `,
            [billingId],
            (error, billResults) => {

                if (error) {
                    return callBack(error);
                }

                pool.query(
                    `
                SELECT
                    pbd.billing_detail_id,
                    pbd.billing_id,
                    pbd.category_id,
                    pbd.party_type_id,
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
                    pbd.bill_item_status

                FROM patient_billing_detail pbd

                WHERE pbd.billing_id = ?
                  AND pbd.bill_item_status != 'CANCELLED'

                ORDER BY pbd.billing_detail_id
                `,
                    [billingId],
                    (error, itemResults) => {

                        if (error) {
                            return callBack(error);
                        }

                        pool.query(
                            `
                        SELECT
                            p.payment_id,
                            p.billing_id,
                            p.payment_date,
                            p.amount,
                            p.payment_mode,
                            p.collected_by,
                            p.collected_location,
                            p.remarks,
                            p.payment_status,
                            p.received_amount,
                            p.change_amount,
                            p.transaction_id
        
                        FROM patient_bill_payment p

                        WHERE p.billing_id = ?
                          AND p.payment_status = 'SUCCESS'

                        ORDER BY p.payment_date ASC
                        `,
                            [billingId],
                            (error, paymentResults) => {

                                if (error) {
                                    return callBack(error);
                                }

                                return callBack(null, {
                                    bill: billResults[0] || null,
                                    items: itemResults,
                                    payments: paymentResults,
                                });
                            }
                        );
                    }
                );
            }
        );
    },

    getCashReturnDetails: (callBack) => {
        pool.query(
            `
       SELECT 
    /* Payment */
    p.payment_id,
    p.billing_id,
    p.payment_date,
    p.amount AS bill_paid_amount,
    p.received_amount,
    p.change_amount,

    /* Actual Returned Amount */
    COALESCE(SUM(cr.returned_amount), 0) AS returned_amount,

    /* Remaining Amount */
    p.change_amount - COALESCE(SUM(cr.returned_amount), 0) AS remaining_amount,

    p.payment_mode,
    p.collected_by,
    p.collected_location,
    p.remarks,
    p.payment_status,

    /* Billing */
    b.bill_no,
    b.patient_id,
    b.admission_id,
    b.billing_date,
    b.bill_type,
    b.billing_party_type,
    b.total_amount,
    b.paid_amount,
    b.balance_amount,
    b.billing_status,

    /* Party */
    opt.party_name,

    /* Patient */
    i.fb_ip_no,
    i.fb_ptc_name AS patient_name,
    i.fb_ptc_mobile AS patient_mobile,
    i.fb_ipd_date AS admission_date

FROM patient_bill_payment p

INNER JOIN patient_billing b 
    ON b.billing_id = p.billing_id

LEFT JOIN patient_bill_change_return cr
    ON cr.payment_id = p.payment_id

LEFT JOIN order_party_type opt 
    ON opt.party_type_id = b.billing_party_type

LEFT JOIN fb_ipadmiss i 
    ON i.fb_pt_no = b.patient_id

WHERE p.payment_mode = 'CASH'
  AND p.payment_status = 'SUCCESS'
  AND p.change_status = 'PENDING'

GROUP BY p.payment_id

ORDER BY p.payment_date DESC;
        `,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    returnAmountSettlement: (data, callBack) => {

        pool.getConnection((error, connection) => {
            if (error) {
                return callBack(error);
            }

            connection.beginTransaction((error) => {
                if (error) {
                    connection.release();
                    return callBack(error);
                }

                // 1. Insert this return transaction
                connection.query(
                    `
                INSERT INTO patient_bill_change_return
                (
                    payment_id,
                    returned_amount,
                    returned_by,
                    remarks
                )
                VALUES (?, ?, ?, ?)
                `,
                    [
                        data?.payment_id,
                        data?.returned_amount,
                        data?.returned_by,
                        data?.remarks
                    ],
                    (error, results) => {

                        if (error) {
                            return connection.rollback(() => {
                                connection.release();
                                callBack(error);
                            });
                        }

                        // 2. Update only the current status
                        connection.query(
                            `
                        UPDATE patient_bill_payment
                        SET change_status = ?
                        WHERE payment_id = ?
                        `,
                            [
                                data?.change_status,
                                data?.payment_id
                            ],
                            (error, results) => {

                                if (error) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callBack(error);
                                    });
                                }

                                connection.commit((error) => {

                                    if (error) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            callBack(error);
                                        });
                                    }

                                    connection.release();
                                    return callBack(null, results);
                                });
                            }
                        );
                    }
                );
            });
        });
    },
    getReturnDetails: (paymentId, callBack) => {
        pool.query(
            `
        SELECT
            return_id,
            payment_id,
            returned_amount,
            returned_by,
            returned_at,
            remarks ,
            cem.em_name
            FROM patient_bill_change_return pbcr
        LEFT JOIN co_employee_master cem on cem.em_id = pbcr.returned_by
        WHERE  payment_id = ?
        `,
            [paymentId],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    getEmployeePettyCashDetails: (empid, status, callBack) => {
        pool.query(
            `
        SELECT
            dpc.cash_id,
            dpc.amount AS petty_cash_amount,
            dpc.given_at,
            dpc.remarks,

            COALESCE(
                SUM(dpcs.settled_amount),
                0
            ) AS settled_petty_cash,

            (
                dpc.amount
                - COALESCE(SUM(dpcs.settled_amount), 0)
            ) AS pending_petty_cash

        FROM delivery_person_cash dpc

        LEFT JOIN delivery_person_cash_settlement dpcs
            ON dpcs.cash_id = dpc.cash_id

        WHERE dpc.employee_id = ?
        AND dpc.status = ?

        GROUP BY
            dpc.cash_id,
            dpc.amount,
            dpc.given_at,
            dpc.remarks

        
        ORDER BY dpc.given_at ASC, dpc.cash_id ASC
        `,
            [empid, status],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                const totalPending = results.reduce(
                    (total, item) =>
                        total + Number(item.pending_petty_cash || 0),
                    0
                );

                return callBack(null, {
                    pending_petty_cash: totalPending,
                    petty_cash_details: results
                });
            }
        );
    },
    getBillCollectionSummary: (callBack) => {
        pool.query(
            `
        SELECT
            pb.created_by AS employee_id,
            e.em_name AS employee_name,

            /* ALL BILLS */
            COUNT(DISTINCT pb.billing_id) AS bill_count,

            COALESCE(
                SUM(pb.total_amount),
                0
            ) AS total_bill_amount,

            JSON_ARRAYAGG(
                pb.billing_id
            ) AS billing_ids,

            /* BILLS NOT YET CLOSED */
            COUNT(
                DISTINCT CASE
                    WHEN pb.closing_id IS NULL
                    THEN pb.billing_id
                END
            ) AS open_bill_count,

            COALESCE(
                SUM(
                    CASE
                        WHEN pb.closing_id IS NULL
                        THEN pb.total_amount
                        ELSE 0
                    END
                ),
                0
            ) AS open_bill_amount,

            COALESCE(
                SUM(
                    CASE
                        WHEN pb.closing_id IS NULL
                        THEN pb.paid_amount
                        ELSE 0
                    END
                ),
                0
            ) AS paid_amount,

            COALESCE(
                SUM(
                    CASE
                        WHEN pb.closing_id IS NULL
                        THEN pb.balance_amount
                        ELSE 0
                    END
                ),
                0
            ) AS pending_amount,

            JSON_ARRAYAGG(
                CASE
                    WHEN pb.closing_id IS NULL
                    THEN pb.billing_id
                END
            ) AS open_billing_ids

        FROM patient_billing pb

        LEFT JOIN co_employee_master e
            ON e.em_id = pb.created_by

        WHERE pb.billing_date = CURDATE()
          AND pb.billing_status <> 'CANCELLED'

        GROUP BY
            pb.created_by,
            e.em_name

        ORDER BY
            e.em_name
        `,
            [],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getCollectionDetails: (Empid, callBack) => {
        pool.query(
            `
            SELECT
    dda.assigned_to AS employee_id,
    e.em_name AS employee_name,

    pb.billing_id,
    pb.bill_no,
    pb.patient_id,
    pb.admission_id,
    pb.billing_date,

    pb.total_amount,
    pb.paid_amount,
    pb.balance_amount,

    pb.billing_status,
    pb.bill_pay_type,

    ddad.assignment_detail_id,
    dda.assignment_id,
    ddad.delivery_status,

    dda.assigned_at,
    ddad.delivered_at

FROM patient_billing pb

INNER JOIN diet_delivery_assignment_detail ddad
    ON ddad.assignment_detail_id = pb.assignment_detail_id

INNER JOIN diet_delivery_assignment dda
    ON dda.assignment_id = ddad.assignment_id

LEFT JOIN co_employee_master e
    ON e.em_id = dda.assigned_to

WHERE dda.assigned_to = ?
  AND pb.billing_date = CURDATE()
  AND pb.billing_status <> 'CANCELLED'

ORDER BY
    dda.assigned_to,
    pb.billing_id;
        `,
            [Empid],
            (error, results) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },

    getEmployeePettyCashDetailsByClosingIds: (empid, closingIds, callBack) => {

        if (!closingIds || closingIds.length === 0) {
            return callBack(null, {
                pending_petty_cash: 0,
                total_petty_cash: 0,
                settled_petty_cash: 0,
                petty_cash_details: []
            });
        }

        const placeholders = closingIds.map(() => '?').join(',');

        const query = `
        SELECT
            dpc.cash_id,
            dpc.employee_id,
            dpc.amount AS petty_cash_amount,
            dpc.given_at,
            dpc.remarks,

            COALESCE(
                SUM(dpcs.settled_amount),
                0
            ) AS settled_petty_cash,

            (
                dpc.amount
                - COALESCE(SUM(dpcs.settled_amount), 0)
            ) AS pending_petty_cash

        FROM delivery_person_cash dpc

        INNER JOIN delivery_person_cash_settlement dpcs
            ON dpcs.cash_id = dpc.cash_id

        WHERE dpc.employee_id = ?
        AND dpcs.closing_id IN (${placeholders})

        GROUP BY
            dpc.cash_id,
            dpc.employee_id,
            dpc.amount,
            dpc.given_at,
            dpc.remarks

        ORDER BY
            dpc.given_at ASC,
            dpc.cash_id ASC
    `;

        pool.query(
            query,
            [empid, ...closingIds],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                const totalPettyCash = results.reduce(
                    (total, item) =>
                        total + Number(item?.petty_cash_amount || 0),
                    0
                );

                const settledPettyCash = results.reduce(
                    (total, item) =>
                        total + Number(item?.settled_petty_cash || 0),
                    0
                );

                const pendingPettyCash = results.reduce(
                    (total, item) =>
                        total + Number(item?.pending_petty_cash || 0),
                    0
                );

                return callBack(null, {
                    total_petty_cash: totalPettyCash,
                    settled_petty_cash: settledPettyCash,
                    pending_petty_cash: pendingPettyCash,
                    petty_cash_details: results
                });
            }
        );
    },


    getPendingBilledDetails: (admissionId, callback) => {
        const query = `
        SELECT
            pb.billing_id,
            pb.bill_no,
            pb.patient_id,
            pb.admission_id,
            pb.billing_party_type,
            pb.bill_pay_type,
            pb.billing_date,
            pb.total_amount,
            pb.paid_amount,
            pb.balance_amount,
            pb.billing_status,
            pb.is_settled,
            pb.created_at

        FROM patient_billing pb

        WHERE pb.admission_id = ?
          AND pb.billing_status = 'OPEN'
          AND pb.balance_amount > 0

        ORDER BY pb.billing_id ASC
    `;

        executeQuery(
            query,
            [admissionId],
            callback
        );
    },


    settleBilling: (admissionId, billingIds, settle_id, employeeId, callback) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return callback(err);
                }

                /*
                 * 1. Verify all bills belong to the admission
                 *    and are still OPEN with outstanding balance.
                 */
                const validateQuery = `
                SELECT
                    billing_id,
                    total_amount,
                    paid_amount,
                    balance_amount,
                    billing_status,
                    admission_id
                FROM patient_billing
                WHERE admission_id = ?
                  AND billing_id IN (?)
                  AND billing_status = 'OPEN'
                  AND balance_amount > 0
                FOR UPDATE
            `;

                connection.query(
                    validateQuery,
                    [admissionId, billingIds],
                    (err, bills) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        /*
                         * Make sure every requested billing ID
                         * was actually found and is eligible.
                         */
                        if (bills.length !== billingIds.length) {
                            return connection.rollback(() => {
                                connection.release();

                                callback(
                                    new Error(
                                        "One or more bills are invalid, already paid, or do not belong to this admission"
                                    )
                                );
                            });
                        }

                        /*
                         * 2. Mark bills as PAID
                         */
                        const billingQuery = `
                        UPDATE patient_billing
                        SET
                            paid_amount = total_amount,
                            balance_amount = 0,
                            billing_status = 'PAID',
                            is_settled = 'Y',
                            user_closing_id = ?,
                            settled_id = ?,
                            updated_by = ?,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE admission_id = ?
                          AND billing_id IN (?)
                          AND billing_status = 'OPEN'
                          AND balance_amount > 0
                    `;

                        connection.query(
                            billingQuery,
                            [
                                employeeId,
                                settle_id,
                                employeeId,
                                admissionId,
                                billingIds
                            ],
                            (err, billingResult) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(err);
                                    });
                                }

                                /*
                                 * 3. Mark all OPEN bill details as PAID
                                 */
                                const detailQuery = `
                                UPDATE patient_billing_detail
                                SET
                                    bill_item_status = 'PAID'
                                WHERE billing_id IN (?)
                                  AND bill_item_status = 'OPEN'
                            `;

                                connection.query(
                                    detailQuery,
                                    [billingIds],
                                    (err, detailResult) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                connection.release();
                                                callback(err);
                                            });
                                        }

                                        /*
                                         * 4. Commit everything
                                         */
                                        connection.commit(err => {
                                            if (err) {
                                                return connection.rollback(() => {
                                                    connection.release();
                                                    callback(err);
                                                });
                                            }

                                            connection.release();

                                            callback(null, {
                                                billing_updated:
                                                    billingResult.affectedRows,

                                                details_updated:
                                                    detailResult.affectedRows,

                                                bills: bills.map(bill => ({
                                                    billing_id: bill.billing_id,
                                                    total_amount:
                                                        Number(bill.total_amount),
                                                    paid_amount:
                                                        Number(bill.total_amount),
                                                    balance_amount: 0
                                                }))
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

};


