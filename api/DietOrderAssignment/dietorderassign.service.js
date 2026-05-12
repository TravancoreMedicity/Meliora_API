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
};