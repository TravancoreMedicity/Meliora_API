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
                                            null, // patient_diet_id
                                            val.item_id,
                                            val.quantity,
                                            "PENDING",
                                            updated_by,
                                            remarks || "Order Picked Up",
                                            canteen_order_id,
                                            type_slno
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

    // UpdateDeliveryLogDetail: (data, callback) => {

    //     const {
    //         assignment_id,
    //         canteen_order_id,
    //         patient_diet_id,
    //         item_id,
    //         delivered_qty,
    //         delivery_status,
    //         remarks,
    //         updated_by,
    //         develivered_by,
    //         delivered_time,
    //         delivery_remarks,
    //         type_slno
    //     } = data;

    //     pool.getConnection((err, connection) => {

    //         if (err) {
    //             return callback({
    //                 stage: "CONNECTION",
    //                 message: err
    //             });
    //         }

    //         connection.beginTransaction((err) => {

    //             if (err) {

    //                 connection.release();

    //                 return callback({
    //                     stage: "TRANSACTION",
    //                     message: err
    //                 });
    //             }



    //             const checkExistingLogQuery = `
    //             SELECT delivery_id
    //             FROM diet_delivery_log
    //             WHERE canteen_order_id = ?
    //             AND type_slno = ?
    //             AND item_id = ?
    //             LIMIT 1
    //         `;

    //             connection.query(
    //                 checkExistingLogQuery,
    //                 [
    //                     canteen_order_id,
    //                     type_slno,
    //                     item_id
    //                 ],
    //                 (checkError, checkResult) => {

    //                     if (checkError) {

    //                         return connection.rollback(() => {

    //                             connection.release();

    //                             return callback({
    //                                 stage: "CHECK_DELIVERY_LOG",
    //                                 message: checkError
    //                             });
    //                         });
    //                     }

    //                     const hasExistingLog =
    //                         checkResult.length > 0;

    //                     // =====================================================
    //                     // 2. INSERT / UPDATE DELIVERY LOG
    //                     // =====================================================

    //                     const saveDeliveryLog = (cb) => {

    //                         // UPDATE

    //                         if (hasExistingLog) {

    //                             let updateLogQuery = `
    //                             UPDATE diet_delivery_log
    //                             SET
    //                                 patient_diet_id = ?,
    //                                 delivered_qty = ?,
    //                                 delivery_status = ?,
    //                                 updated_by = ?,
    //                                 updated_remarks = ?
    //                         `;

    //                             const updateLogParams = [
    //                                 patient_diet_id,
    //                                 delivered_qty,
    //                                 delivery_status,
    //                                 updated_by,
    //                                 remarks || null
    //                             ];

    //                             // ONLY WHEN DELIVERED

    //                             if (delivery_status === "DELIVERED") {

    //                                 updateLogQuery += `,
    //                                 develivered_by = ?,
    //                                 delivered_time = ?,
    //                                 delivery_remarks = ?
    //                             `;

    //                                 updateLogParams.push(
    //                                     develivered_by || updated_by,
    //                                     delivered_time || new Date(),
    //                                     delivery_remarks || remarks || null
    //                                 );
    //                             }

    //                             updateLogQuery += `
    //                             WHERE canteen_order_id = ?
    //                             AND type_slno = ?
    //                             AND item_id = ?
    //                         `;

    //                             updateLogParams.push(
    //                                 canteen_order_id,
    //                                 type_slno,
    //                                 item_id
    //                             );

    //                             connection.query(
    //                                 updateLogQuery,
    //                                 updateLogParams,
    //                                 cb
    //                             );
    //                         }

    //                         // INSERT

    //                         else {

    //                             const insertColumns = [
    //                                 'patient_diet_id',
    //                                 'item_id',
    //                                 'canteen_order_id',
    //                                 'type_slno',
    //                                 'delivered_qty',
    //                                 'delivery_status',
    //                                 'updated_by',
    //                                 'updated_remarks'
    //                             ];

    //                             const insertValues = [
    //                                 patient_diet_id,
    //                                 item_id,
    //                                 canteen_order_id,
    //                                 type_slno,
    //                                 delivered_qty,
    //                                 delivery_status,
    //                                 updated_by,
    //                                 remarks || null
    //                             ];

    //                             // ONLY WHEN DELIVERED

    //                             if (delivery_status === "DELIVERED") {

    //                                 insertColumns.push(
    //                                     'develivered_by',
    //                                     'delivered_time',
    //                                     'delivery_remarks'
    //                                 );

    //                                 insertValues.push(
    //                                     develivered_by || updated_by,
    //                                     delivered_time || new Date(),
    //                                     delivery_remarks || remarks || null
    //                                 );
    //                             }

    //                             const placeholders =
    //                                 insertColumns
    //                                     .map(() => '?')
    //                                     .join(',');

    //                             const insertLogQuery = `
    //                             INSERT INTO diet_delivery_log
    //                             (
    //                                 ${insertColumns.join(',')}
    //                             )
    //                             VALUES
    //                             (
    //                                 ${placeholders}
    //                             )
    //                         `;

    //                             connection.query(
    //                                 insertLogQuery,
    //                                 insertValues,
    //                                 cb
    //                             );
    //                         }
    //                     };

    //                     saveDeliveryLog((logError) => {

    //                         if (logError) {

    //                             return connection.rollback(() => {

    //                                 connection.release();

    //                                 return callback({
    //                                     stage: hasExistingLog
    //                                         ? "UPDATE_DELIVERY_LOG"
    //                                         : "INSERT_DELIVERY_LOG",
    //                                     message: logError
    //                                 });
    //                             });
    //                         }

    //                         // =====================================================
    //                         // 3. CALCULATE MEAL STATUS
    //                         // =====================================================

    //                         const mealStatusQuery = `
    //                         SELECT
    //                             delivery_status
    //                         FROM diet_delivery_log
    //                         WHERE canteen_order_id = ?
    //                         AND type_slno = ?
    //                     `;

    //                         connection.query(
    //                             mealStatusQuery,
    //                             [
    //                                 canteen_order_id,
    //                                 type_slno
    //                             ],
    //                             (mealError, mealResult) => {

    //                                 if (mealError) {

    //                                     return connection.rollback(() => {

    //                                         connection.release();

    //                                         return callback({
    //                                             stage: "MEAL_STATUS_CHECK",
    //                                             message: mealError
    //                                         });
    //                                     });
    //                                 }

    //                                 const mealStatuses =
    //                                     mealResult.map(
    //                                         i => i.delivery_status
    //                                     );

    //                                 const mealStatus =
    //                                     getMealStatus(mealStatuses);

    //                                 // =====================================================
    //                                 // 4. UPDATE MEAL LEVEL STATUS
    //                                 // =====================================================

    //                                 let updateMealQuery = `
    //                                 UPDATE diet_delivery_assignment_detail
    //                                 SET
    //                                     delivery_status = ?,
    //                                     remarks = ?
    //                             `;

    //                                 const mealParams = [
    //                                     mealStatus,
    //                                     remarks || null
    //                                 ];

    //                                 if (mealStatus === "DELIVERED") {

    //                                     updateMealQuery += `,
    //                                     delivered_at = NOW(),
    //                                     delivered_by = ?
    //                                 `;

    //                                     mealParams.push(
    //                                         updated_by
    //                                     );
    //                                 }

    //                                 updateMealQuery += `
    //                                 WHERE assignment_id = ?
    //                                 AND canteen_order_id = ?
    //                                 AND type_slno = ?
    //                             `;

    //                                 mealParams.push(
    //                                     assignment_id,
    //                                     canteen_order_id,
    //                                     type_slno
    //                                 );

    //                                 connection.query(
    //                                     updateMealQuery,
    //                                     mealParams,
    //                                     (mealUpdateError) => {

    //                                         if (mealUpdateError) {

    //                                             return connection.rollback(() => {

    //                                                 connection.release();

    //                                                 return callback({
    //                                                     stage: "UPDATE_MEAL_STATUS",
    //                                                     message: mealUpdateError
    //                                                 });
    //                                             });
    //                                         }

    //                                         // =====================================================
    //                                         // 5. CHECK ALL MEAL STATUS
    //                                         // =====================================================

    //                                         const checkStatusQuery = `
    //                                         SELECT
    //                                             delivery_status
    //                                         FROM diet_delivery_assignment_detail
    //                                         WHERE assignment_id = ?
    //                                     `;

    //                                         connection.query(
    //                                             checkStatusQuery,
    //                                             [assignment_id],
    //                                             (statusError, statusResult) => {

    //                                                 if (statusError) {

    //                                                     return connection.rollback(() => {

    //                                                         connection.release();

    //                                                         return callback({
    //                                                             stage: "CHECK_STATUS",
    //                                                             message: statusError
    //                                                         });
    //                                                     });
    //                                                 }


    //                                                 const statuses =
    //                                                     statusResult?.map(
    //                                                         item => item.delivery_status
    //                                                     );

    //                                                 const mainAssignmentStatus =
    //                                                     getAssignmentStatus(statuses);

    //                                                 // =====================================================
    //                                                 // 6. UPDATE MAIN ASSIGNMENT
    //                                                 // =====================================================

    //                                                 let updateMainQuery = `
    //                                                 UPDATE diet_delivery_assignment
    //                                                 SET
    //                                                     delivery_status = ?
    //                                             `;

    //                                                 const mainParams = [
    //                                                     mainAssignmentStatus
    //                                                 ];

    //                                                 if (
    //                                                     mainAssignmentStatus ===
    //                                                     "COMPLETED"
    //                                                 ) {

    //                                                     updateMainQuery += `,
    //                                                     completed_time = NOW()
    //                                                 `;
    //                                                 }

    //                                                 if (
    //                                                     mainAssignmentStatus ===
    //                                                     "INPROGRESS"
    //                                                 ) {

    //                                                     updateMainQuery += `,
    //                                                     pickup_time = NOW()
    //                                                 `;
    //                                                 }

    //                                                 updateMainQuery += `
    //                                                 WHERE assignment_id = ?
    //                                             `;

    //                                                 mainParams.push(
    //                                                     assignment_id
    //                                                 );

    //                                                 connection.query(
    //                                                     updateMainQuery,
    //                                                     mainParams,
    //                                                     (mainError) => {

    //                                                         if (mainError) {

    //                                                             return connection.rollback(() => {

    //                                                                 connection.release();

    //                                                                 return callback({
    //                                                                     stage: "UPDATE_MAIN_ASSIGNMENT",
    //                                                                     message: mainError
    //                                                                 });
    //                                                             });
    //                                                         }

    //                                                         // =====================================================
    //                                                         // COMMIT
    //                                                         // =====================================================

    //                                                         connection.commit((commitError) => {

    //                                                             if (commitError) {

    //                                                                 return connection.rollback(() => {

    //                                                                     connection.release();

    //                                                                     return callback({
    //                                                                         stage: "COMMIT",
    //                                                                         message: commitError
    //                                                                     });
    //                                                                 });
    //                                                             }

    //                                                             connection.release();

    //                                                             return callback(null, {
    //                                                                 success: 1,
    //                                                                 assignment_status:
    //                                                                     mainAssignmentStatus,
    //                                                                 meal_status:
    //                                                                     mealStatus
    //                                                             });
    //                                                         });
    //                                                     }
    //                                                 );
    //                                             }
    //                                         );
    //                                     }
    //                                 );
    //                             }
    //                         );
    //                     });
    //                 }
    //             );
    //         });
    //     });
    // },

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
            type_slno
        } = data;

        pool.getConnection((err, connection) => {

            if (err) {
                return callback({
                    stage: "CONNECTION",
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
                        connection.release();
                        return callback({
                            stage: "CHECK_LOG",
                            message: checkError
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
                            connection.release();

                            if (err2) {
                                return callback({
                                    stage: "UPDATE_LOG",
                                    message: err2
                                });
                            }

                            return callback(null, {
                                success: 1,
                                message: "Updated successfully"
                            });
                        });
                    }

                    // =====================================================
                    // 3. INSERT
                    // =====================================================
                    else {

                        const columns = [
                            "patient_diet_id",
                            "item_id",
                            "canteen_order_id",
                            "type_slno",
                            "delivered_qty",
                            "delivery_status",
                            "updated_by",
                            "updated_remarks"
                        ];

                        const values = [
                            patient_diet_id,
                            item_id,
                            canteen_order_id,
                            type_slno,
                            delivered_qty,
                            delivery_status,
                            updated_by,
                            remarks || null
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

                        connection.query(insertQuery, values, (err3) => {
                            connection.release();

                            if (err3) {
                                return callback({
                                    stage: "INSERT_LOG",
                                    message: err3
                                });
                            }

                            return callback(null, {
                                success: 1,
                                message: "Inserted successfully"
                            });
                        });
                    }
                }
            );
        });
    }
};