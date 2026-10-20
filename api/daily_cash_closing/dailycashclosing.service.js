const { pool } = require('../../config/database');

module.exports = {

    createCashClosing: (data, callback) => {
        pool.getConnection((connectionError, connection) => {

            if (connectionError) {
                return callback(connectionError);
            }

            connection.beginTransaction((transactionError) => {

                if (transactionError) {
                    connection.release();
                    return callback(transactionError);
                }

                const {
                    employee_id,
                    collection_amount,
                    remarks,
                    denominations,
                    billing_ids
                } = data;

                const cashAmount =
                    Number(data.cash_amount) || 0;

                const coinAmount =
                    Number(data.coin_amount) || 0;

                const countedAmount =
                    Number(data.counted_amount) || 0;

                const difference =
                    Number(data.difference) || 0;

                const cashPieces =
                    Number(data.cash_pieces) || 0;

                const coinPieces =
                    Number(data.coin_pieces) || 0;

                const totalPieces =
                    Number(data.total_pieces) || 0;

                const collectionAmount =
                    Number(collection_amount) || 0;


                // =====================================================
                // 1. INSERT DAILY COLLECTION CLOSING
                // =====================================================

                const headerQuery = `
                INSERT INTO daily_collection_closing
                (
                    employee_id,
                    closing_date,
                    expected_amount,
                    cash_amount,
                    coin_amount,
                    counted_amount,
                    difference_amount,
                    cash_pieces,
                    coin_pieces,
                    total_pieces,
                    remarks,
                    closing_status,
                    created_by
                )
                VALUES (
                    ?,
                    CURDATE(),
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    'CLOSED',
                    ?
                )
            `;

                const headerValues = [
                    employee_id,
                    collectionAmount,
                    cashAmount,
                    coinAmount,
                    countedAmount,
                    difference,
                    cashPieces,
                    coinPieces,
                    totalPieces,
                    remarks || null,
                    data.created_by
                ];


                connection.query(
                    headerQuery,
                    headerValues,
                    (headerError, headerResult) => {

                        if (headerError) {

                            return connection.rollback(() => {
                                connection.release();
                                callback(headerError);
                            });

                        }

                        const closingId = headerResult.insertId;


                        // =====================================================
                        // 2. INSERT DENOMINATIONS
                        // =====================================================

                        const denominationRows = [];


                        Object.entries(
                            denominations?.cash || {}
                        ).forEach(([value, quantity]) => {

                            const qty = Number(quantity) || 0;

                            if (qty > 0) {

                                denominationRows.push([
                                    closingId,
                                    Number(value),
                                    'CASH',
                                    qty,
                                    Number(value) * qty
                                ]);

                            }

                        });


                        Object.entries(
                            denominations?.coins || {}
                        ).forEach(([value, quantity]) => {

                            const qty = Number(quantity) || 0;

                            if (qty > 0) {

                                denominationRows.push([
                                    closingId,
                                    Number(value),
                                    'COIN',
                                    qty,
                                    Number(value) * qty
                                ]);

                            }

                        });


                        if (denominationRows.length === 0) {

                            return connection.rollback(() => {
                                connection.release();

                                callback(
                                    new Error(
                                        'At least one denomination is required'
                                    )
                                );
                            });

                        }


                        const denominationQuery = `
                        INSERT INTO daily_collection_closing_denominations
                        (
                            closing_id,
                            denomination_value,
                            denomination_type,
                            quantity,
                            amount
                        )
                        VALUES ?
                    `;


                        connection.query(
                            denominationQuery,
                            [denominationRows],
                            (denominationError) => {

                                if (denominationError) {

                                    return connection.rollback(() => {
                                        connection.release();
                                        callback(denominationError);
                                    });

                                }


                                // =====================================================
                                // 3. UPDATE PATIENT BILLING
                                // =====================================================

                                const billingIds = Array.isArray(billing_ids)
                                    ? billing_ids
                                        .map(id => Number(id))
                                        .filter(id => Number.isInteger(id) && id > 0)
                                    : [];


                                const updateBilling = (next) => {

                                    if (billingIds.length === 0) {
                                        return next(null, 0);
                                    }


                                    const placeholders = billingIds
                                        .map(() => '?')
                                        .join(',');


                                    const billingQuery = `
                                    UPDATE patient_billing
                                    SET
                                        closing_id = ?,
                                        updated_by = ?,
                                        updated_at = NOW()
                                    WHERE billing_id IN (${placeholders})
                                `;


                                    const billingValues = [
                                        closingId,
                                        data.created_by,
                                        ...billingIds
                                    ];


                                    connection.query(
                                        billingQuery,
                                        billingValues,
                                        (billingError, billingResult) => {

                                            if (billingError) {
                                                return next(billingError);
                                            }

                                            next(
                                                null,
                                                billingResult.affectedRows
                                            );

                                        }
                                    );

                                };


                                updateBilling(
                                    (billingError, billingUpdated) => {

                                        if (billingError) {

                                            return connection.rollback(() => {
                                                connection.release();

                                                callback({
                                                    stage: 'BILLING_UPDATE',
                                                    message: billingError
                                                });
                                            });

                                        }


                                        // =====================================================
                                        // 4. CALCULATE PETTY CASH AVAILABLE FOR SETTLEMENT
                                        // =====================================================

                                        /*
                                            Example:
    
                                            Collection = 500
                                            Counted    = 700
    
                                            Extra cash available for petty cash:
                                            700 - 500 = 200
                                        */

                                        const pettyCashToSettle = Math.max(
                                            countedAmount - collectionAmount,
                                            0
                                        );


                                        // Nothing extra to settle
                                        if (pettyCashToSettle <= 0) {

                                            return connection.commit(
                                                (commitError) => {

                                                    if (commitError) {

                                                        return connection.rollback(() => {
                                                            connection.release();
                                                            callback(commitError);
                                                        });

                                                    }

                                                    connection.release();

                                                    callback(null, {
                                                        closing_id: closingId,
                                                        billing_updated: billingUpdated,
                                                        petty_cash_settled: 0,
                                                        petty_cash_remaining: 0
                                                    });

                                                }
                                            );

                                        }


                                        // =====================================================
                                        // 5. GET EMPLOYEE'S PENDING PETTY CASH
                                        // =====================================================

                                        /*
                                            FIFO:
    
                                            Oldest petty cash will be settled first.
                                        */

                                        const pettyCashQuery = `
                                        SELECT
                                            dpc.cash_id,
                                            dpc.amount,

                                            COALESCE(
                                                (
                                                    SELECT SUM(dpcs.settled_amount)
                                                    FROM delivery_person_cash_settlement dpcs
                                                    WHERE dpcs.cash_id = dpc.cash_id
                                                ),
                                                0
                                            ) AS settled_amount,

                                            (
                                                dpc.amount -

                                                COALESCE(
                                                    (
                                                        SELECT SUM(dpcs2.settled_amount)
                                                        FROM delivery_person_cash_settlement dpcs2
                                                        WHERE dpcs2.cash_id = dpc.cash_id
                                                    ),
                                                    0
                                                )

                                            ) AS pending_amount

                                        FROM delivery_person_cash dpc

                                        WHERE dpc.employee_id = ?

                                        AND dpc.amount >
                                            COALESCE(
                                                (
                                                    SELECT SUM(dpcs3.settled_amount)
                                                    FROM delivery_person_cash_settlement dpcs3
                                                    WHERE dpcs3.cash_id = dpc.cash_id
                                                ),
                                                0
                                            )

                                        ORDER BY dpc.given_at ASC, dpc.cash_id ASC

                                        FOR UPDATE
                                    `;


                                        connection.query(
                                            pettyCashQuery,
                                            [employee_id],
                                            (pettyCashError, pettyCashRows) => {

                                                if (pettyCashError) {

                                                    return connection.rollback(() => {
                                                        connection.release();

                                                        callback({
                                                            stage: 'PETTY_CASH_FETCH',
                                                            message: pettyCashError
                                                        });

                                                    });

                                                }


                                                // =====================================================
                                                // 6. SETTLE PETTY CASH FIFO
                                                // =====================================================

                                                let remainingToSettle = pettyCashToSettle;

                                                let totalPettyCashSettled = 0;

                                                const settlementRows = [];

                                                const fullySettledCashIds = [];

                                                for (const pettyCash of pettyCashRows) {

                                                    if (remainingToSettle <= 0) {
                                                        break;
                                                    }

                                                    const pendingAmount =
                                                        Number(pettyCash.pending_amount) || 0;

                                                    if (pendingAmount <= 0) {
                                                        continue;
                                                    }

                                                    const settleAmount = Math.min(
                                                        pendingAmount,
                                                        remainingToSettle
                                                    );

                                                    if (settleAmount <= 0) {
                                                        continue;
                                                    }

                                                    settlementRows.push([
                                                        pettyCash.cash_id,
                                                        closingId,
                                                        settleAmount,
                                                        data.created_by
                                                    ]);

                                                    totalPettyCashSettled += settleAmount;

                                                    remainingToSettle -= settleAmount;

                                                    // If this settlement completely clears this petty cash
                                                    if (settleAmount >= pendingAmount) {
                                                        fullySettledCashIds.push(pettyCash.cash_id);
                                                    }
                                                }


                                                // =====================================================
                                                // 7. INSERT PETTY CASH SETTLEMENTS
                                                // =====================================================

                                                if (settlementRows.length === 0) {

                                                    return connection.commit(
                                                        (commitError) => {

                                                            if (commitError) {

                                                                return connection.rollback(() => {
                                                                    connection.release();
                                                                    callback(commitError);
                                                                });

                                                            }

                                                            connection.release();

                                                            callback(null, {
                                                                closing_id: closingId,
                                                                billing_updated:
                                                                    billingUpdated,
                                                                petty_cash_settled: 0,
                                                                petty_cash_remaining:
                                                                    pettyCashToSettle
                                                            });

                                                        }
                                                    );

                                                }


                                                const settlementQuery = `
                                                INSERT INTO delivery_person_cash_settlement
                                                (
                                                    cash_id,
                                                    closing_id,
                                                    settled_amount,
                                                    created_by
                                                )
                                                VALUES ?
                                            `;

                                                connection.query(
                                                    settlementQuery,
                                                    [settlementRows],
                                                    (settlementError, settlementResult) => {

                                                        if (settlementError) {

                                                            return connection.rollback(() => {
                                                                connection.release();

                                                                callback({
                                                                    stage: 'PETTY_CASH_SETTLEMENT',
                                                                    message: settlementError
                                                                });
                                                            });

                                                        }

                                                        // =============================================
                                                        // MARK FULLY SETTLED PETTY CASH
                                                        // =============================================

                                                        const markSettled = (next) => {

                                                            if (fullySettledCashIds.length === 0) {
                                                                return next(null);
                                                            }

                                                            const placeholders = fullySettledCashIds
                                                                .map(() => '?')
                                                                .join(',');

                                                            const updateStatusQuery = `
                                                            UPDATE delivery_person_cash
                                                            SET status = 'SETTLED'
                                                            WHERE cash_id IN (${placeholders})
                                                            AND status = 'ISSUED'
                                                        `;

                                                            connection.query(
                                                                updateStatusQuery,
                                                                fullySettledCashIds,
                                                                (statusError) => {

                                                                    if (statusError) {
                                                                        return next(statusError);
                                                                    }

                                                                    next(null);
                                                                }
                                                            );
                                                        };

                                                        markSettled((statusError) => {

                                                            if (statusError) {

                                                                return connection.rollback(() => {
                                                                    connection.release();

                                                                    callback({
                                                                        stage: 'PETTY_CASH_STATUS_UPDATE',
                                                                        message: statusError
                                                                    });
                                                                });

                                                            }

                                                            // =============================================
                                                            // COMMIT EVERYTHING
                                                            // =============================================

                                                            connection.commit((commitError) => {

                                                                if (commitError) {

                                                                    return connection.rollback(() => {
                                                                        connection.release();
                                                                        callback(commitError);
                                                                    });

                                                                }

                                                                connection.release();

                                                                callback(null, {

                                                                    closing_id: closingId,

                                                                    billing_updated:
                                                                        billingUpdated,

                                                                    petty_cash_settled:
                                                                        totalPettyCashSettled,

                                                                    petty_cash_remaining:
                                                                        remainingToSettle,

                                                                    petty_cash_transactions:
                                                                        settlementResult.affectedRows
                                                                });

                                                            });

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

        })
    },

    getTodayClosedEmployees: (callback) => {

        const query = `
        SELECT
            dcc.employee_id,
            dcc.closing_id,
            dcc.closing_date,
            dcc.expected_amount,
            dcc.cash_amount,
            dcc.coin_amount,
            dcc.counted_amount,
            dcc.difference_amount,
            dcc.closing_status,
            dcc.created_by,
            dcc.created_at,

            COALESCE(
                JSON_ARRAYAGG(pb.billing_id),
                JSON_ARRAY()
            ) AS billing_ids

        FROM daily_collection_closing dcc

        LEFT JOIN patient_billing pb
            ON pb.closing_id = dcc.closing_id
    
        WHERE dcc.closing_date = CURDATE()
          AND dcc.closing_status = 'CLOSED'

        GROUP BY
            dcc.closing_id,
            dcc.employee_id,
            dcc.closing_date,
            dcc.expected_amount,
            dcc.cash_amount,
            dcc.coin_amount,
            dcc.counted_amount,
            dcc.difference_amount,
            dcc.closing_status,
            dcc.created_by,
            dcc.created_at

        ORDER BY dcc.employee_id
    `;

        pool.query(query, (error, results) => {

            if (error) {
                return callback(error);
            }

            return callback(null, results);

        });
    },

    getToadyEmployeePettyCash: (callback) => {
        const query = `
        SELECT
    dpc.cash_id,
    dpc.employee_id,
    e.em_name AS employee_name,
    dpc.amount AS petty_cash_amount,
    dpc.given_by,
    dpc.given_at,
    dpc.remarks,
    em.em_name AS given_by_employee,

    COALESCE(SUM(dpcs.settled_amount), 0) AS settled_amount,

    dpc.amount - COALESCE(SUM(dpcs.settled_amount), 0) AS pending_amount,

    CASE
        WHEN COALESCE(SUM(dpcs.settled_amount), 0) >= dpc.amount
            THEN 'SETTLED'
        ELSE 'ISSUED'
    END AS petty_cash_status

FROM delivery_person_cash dpc

LEFT JOIN delivery_person_cash_settlement dpcs
    ON dpcs.cash_id = dpc.cash_id

LEFT JOIN co_employee_master e
    ON e.em_id = dpc.employee_id

LEFT JOIN co_employee_master em
    ON em.em_id = dpc.given_by

GROUP BY
    dpc.cash_id,
    dpc.employee_id,
    e.em_name,
    dpc.amount,
    dpc.given_by,
    dpc.given_at,
    dpc.remarks

ORDER BY dpc.given_at DESC;
    `;

        pool.query(
            query,
            (error, results) => {
                if (error) {
                    return callback(error);
                }

                return callback(null, results);
            }
        );
    },

    getBillDetails: (callback) => {
        const query = `
        SELECT
            -- Bill details
            pb.billing_id,
            pb.bill_no,
            pb.patient_id,
            pb.admission_id,

            -- Patient details
            ip.fb_ptc_name AS patient_name,
            ip.fb_ptc_sex AS patient_sex,
            ip.fb_ptd_dob AS patient_dob,
            ip.fb_ptc_mobile AS patient_mobile,
            ip.fb_ptc_loadd1 AS address_line1,
            ip.fb_ptc_loadd2 AS address_line2,
            ip.fb_ptc_loadd3 AS address_line3,
            ip.fb_ptc_loadd4 AS address_line4,

            -- Admission details
            ip.fb_ip_no AS ip_number,
            ip.fb_ipd_date AS admission_date,
            ip.fb_ipd_disc AS discharge_date,
            ip.fb_ipc_status AS admission_status,

            -- Bed and nursing station
            bed.fb_bdc_no AS bed_number,
            ns.fb_ns_name AS nursing_station,

            -- Billing details
            pb.billing_date,
            pb.bill_type,
            pb.bill_generated_location,
            pb.billing_party_type,
            opt.party_name AS party_type,
            pb.bill_pay_type,
            pb.total_amount,
            pb.paid_amount,
            pb.balance_amount,
            pb.billing_status,
            pb.updated_at,

            -- Assignment master details
            ca.assignment_id,
            ca.assignment_status AS batch_assignment_status,
            ca.assigned_at,
            ca.completed_at AS batch_completed_at,
            ca.remarks,

            -- Individual bill assignment details
            cad.assignment_detail_id,
            cad.assignment_status,
            cad.is_current,
            cad.completed_at AS bill_completed_at,

            -- Assigned employee
            ca.assigned_to AS assigned_employee_id,
            assigned_emp.em_no AS assigned_employee_no,
            assigned_emp.em_name AS assigned_employee_name,

            -- Employee who assigned the bills
            ca.assigned_by AS assigned_by_employee_id,
            assigner_emp.em_no AS assigned_by_employee_no,
            assigner_emp.em_name AS assigned_by_employee_name

        FROM patient_billing pb

        -- Individual bill assignment
        LEFT JOIN collection_bill_assignment_detail cad
            ON cad.billing_id = pb.billing_id
            AND cad.is_current = 1
            AND cad.assignment_status <> 'CANCELLED'

        -- Assignment batch/master
        LEFT JOIN collection_bill_assignment ca
            ON ca.assignment_id = cad.assignment_id
            AND ca.is_current = 1
            AND ca.assignment_status <> 'CANCELLED'

        -- Assigned employee
        LEFT JOIN co_employee_master assigned_emp
            ON assigned_emp.em_id = ca.assigned_to

        -- Employee who assigned the bills
        LEFT JOIN co_employee_master assigner_emp
            ON assigner_emp.em_id = ca.assigned_by

        -- Patient admission
        LEFT JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = pb.admission_id

        -- Bed and nursing station
        LEFT JOIN fb_bed bed
            ON bed.fb_bd_code = ip.fb_bd_code

        LEFT JOIN fb_nurse_station_master ns
            ON ns.fb_ns_code = bed.fb_ns_code

        -- Billing party type
        LEFT JOIN order_party_type opt
            ON opt.party_type_id = pb.billing_party_type

        WHERE
            pb.billing_party_type = 1
            AND (
                pb.billing_status IN ('OPEN', 'PARTIAL')

                OR (
                    pb.billing_status = 'PAID'
                    AND pb.updated_at >= CURDATE()
                    AND pb.updated_at < CURDATE() + INTERVAL 1 DAY
                )

                OR pb.billing_status = 'CANCELLED'
            )

        ORDER BY
            CASE pb.billing_status
                WHEN 'OPEN' THEN 1
                WHEN 'PARTIAL' THEN 2
                WHEN 'PAID' THEN 3
                WHEN 'CANCELLED' THEN 4
                ELSE 5
            END,
            pb.billing_id DESC;
    `;

        pool.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }

            return callback(null, results);
        });
    },

    AssignEmployeePettyCashDetails: (data, callback) => {

        const insertQuery = `
        INSERT INTO delivery_person_cash (
            employee_id,
            amount,
            given_by,
            remarks
        )
        VALUES (?, ?, ?, ?)
    `;

        const values = [
            data.employee_id,
            data.amount,
            data.given_by,
            data.remarks || null
        ];

        pool.query(insertQuery, values, (error, result) => {

            if (error) {
                return callback(error);
            }

            return callback(null, {
                action: "INSERT",
                cash_id: result.insertId,
                result
            });
        });
    },
    getClosingDenominationDetails: (closing_id, callback) => {
        pool.query(` SELECT * FROM daily_collection_closing_denominations where closing_id in (?) `,
            [closing_id],
            (error, results) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },



    assignCollectionBills: (data, callback) => {
        pool.getConnection((connectionError, connection) => {
            if (connectionError) {
                return callback(connectionError);
            }

            const finish = (error, result) => {
                connection.release();
                callback(error, result);
            };

            const rollback = (error) => {
                connection.rollback(() => finish(error));
            };

            connection.beginTransaction((transactionError) => {
                if (transactionError) {
                    return finish(transactionError);
                }

                const {
                    assigned_to,
                    assigned_by,
                    remarks,
                    billing_ids,
                } = data;

                const placeholders = billing_ids.map(() => "?").join(",");

                // 1. Lock and validate the bills.
                const billQuery = `
                SELECT
                    billing_id,
                    billing_status
                FROM patient_billing
                WHERE billing_id IN (${placeholders})
                FOR UPDATE
            `;

                connection.query(
                    billQuery,
                    billing_ids,
                    (billError, billRows) => {
                        if (billError) {
                            return rollback(billError);
                        }

                        if (billRows.length !== billing_ids.length) {
                            const error = new Error(
                                "One or more bills were not found"
                            );
                            error.statusCode = 404;
                            return rollback(error);
                        }

                        const invalidBills = billRows.filter(
                            (bill) =>
                                !["OPEN", "PARTIAL"].includes(
                                    String(bill.billing_status).toUpperCase()
                                )
                        );

                        if (invalidBills.length > 0) {
                            const error = new Error(
                                "Only OPEN or PARTIAL bills can be assigned"
                            );
                            error.statusCode = 400;
                            error.billing_ids = invalidBills.map(
                                (bill) => bill.billing_id
                            );
                            return rollback(error);
                        }

                        // 2. Check for existing active assignments.
                        const activeAssignmentQuery = `
                        SELECT
                            cad.billing_id
                        FROM collection_bill_assignment_detail cad
                        INNER JOIN collection_bill_assignment ca
                            ON ca.assignment_id = cad.assignment_id
                        WHERE cad.billing_id IN (${placeholders})
                          AND cad.is_current = 1
                          AND cad.assignment_status IN (
                              'ASSIGNED',
                              'IN_PROGRESS'
                          )
                          AND ca.is_current = 1
                          AND ca.assignment_status IN (
                              'ASSIGNED',
                              'IN_PROGRESS'
                          )
                    `;

                        connection.query(
                            activeAssignmentQuery,
                            billing_ids,
                            (activeError, activeRows) => {
                                if (activeError) {
                                    return rollback(activeError);
                                }

                                if (activeRows.length > 0) {
                                    const error = new Error(
                                        "Some bills are already assigned"
                                    );
                                    error.statusCode = 409;
                                    error.billing_ids = activeRows.map(
                                        (row) => row.billing_id
                                    );
                                    return rollback(error);
                                }

                                // 3. Insert one master record for this batch.
                                const masterQuery = `
                                INSERT INTO collection_bill_assignment
                                (
                                    assigned_to,
                                    assigned_by,
                                    assignment_status,
                                    is_current,
                                    assigned_at,
                                    remarks
                                )
                                VALUES (?, ?, 'ASSIGNED', 1, NOW(), ?)
                            `;

                                connection.query(
                                    masterQuery,
                                    [assigned_to, assigned_by, remarks],
                                    (masterError, masterResult) => {
                                        if (masterError) {
                                            return rollback(masterError);
                                        }

                                        const assignmentId =
                                            masterResult.insertId;

                                        // 4. Insert all bills into the detail table.
                                        const detailRows = billing_ids.map(
                                            (billingId) => [
                                                assignmentId,
                                                billingId,
                                                "ASSIGNED",
                                                1,
                                            ]
                                        );

                                        const detailQuery = `
                                        INSERT INTO collection_bill_assignment_detail
                                        (
                                            assignment_id,
                                            billing_id,
                                            assignment_status,
                                            is_current
                                        )
                                        VALUES ?
                                    `;

                                        connection.query(
                                            detailQuery,
                                            [detailRows],
                                            (detailError, detailResult) => {
                                                if (detailError) {
                                                    return rollback(detailError);
                                                }

                                                // 5. Commit the entire batch.
                                                connection.commit((commitError) => {
                                                    if (commitError) {
                                                        return rollback(commitError);
                                                    }

                                                    return finish(null, {
                                                        assignment_id: assignmentId,
                                                        assigned_to,
                                                        assigned_by,
                                                        total_bills: detailResult.affectedRows,
                                                        billing_ids,
                                                    });
                                                });
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



    getAssignedCollectionBills: (employeeId, callBack) => {
        const query = `
        SELECT
            ca.assignment_id,
            ca.assigned_to AS employee_id,
            ca.assigned_by,
            ca.assignment_status AS collection_status,
            ca.assigned_at,

            cad.assignment_detail_id,
            cad.assignment_status AS bill_assignment_status,
            cad.completed_at,

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
            pb.billing_party_type,
            pb.bill_generated_location,
            pb.bill_type,

            -- Patient details
            ip.fb_pt_no AS patient_number,
            ip.fb_ptc_name AS patient_name,
            ip.fb_ptc_sex AS patient_sex,
            ip.fb_ptd_dob AS patient_dob,
            ip.fb_ptc_mobile AS patient_mobile,
            ip.fb_ip_no AS ip_number,
            ip.fb_ipd_date AS admission_date,
            ip.fb_ipd_disc AS discharge_date,
            ip.fb_ipc_status AS patient_status,
            ip.fb_ipc_curstatus AS current_patient_status,

            -- Bed details
            bed.fb_bdc_no AS bed_number,
            bed.fb_ns_code AS nurse_station_code,
            ns.fb_ns_name AS nurse_station_name,

            -- Assignment details
            im.em_name AS assigned_by_name,

            CASE
                WHEN cad.assignment_status = 'COMPLETED'
                    THEN 'COMPLETED'
                ELSE 'PENDING'
            END AS collection_display_status

        FROM collection_bill_assignment ca

        INNER JOIN collection_bill_assignment_detail cad
            ON cad.assignment_id = ca.assignment_id

        INNER JOIN patient_billing pb
            ON pb.billing_id = cad.billing_id

        LEFT JOIN fb_ipadmiss ip
            ON ip.fb_ip_no = pb.admission_id
            OR ip.fb_pt_no = pb.patient_id

        LEFT JOIN fb_bed bed
            ON bed.fb_bd_code = ip.fb_bd_code

        LEFT JOIN fb_nurse_station_master ns
            ON ns.fb_ns_code = bed.fb_ns_code

        LEFT JOIN co_employee_master im
            ON im.em_id = ca.assigned_by

        WHERE ca.assigned_to = ?
          AND ca.is_current = 1
          AND ca.assignment_status <> 'CANCELLED'
          AND cad.is_current = 1
          AND cad.assignment_status <> 'CANCELLED'
          AND pb.billing_status <> 'CANCELLED'
          AND (
                cad.assignment_status IN ('ASSIGNED', 'IN_PROGRESS')
                OR (
                    cad.assignment_status = 'COMPLETED'
                    AND cad.completed_at >= CURDATE()
                    AND cad.completed_at < CURDATE() + INTERVAL 1 DAY
                )
          )

        ORDER BY
            CASE
                WHEN cad.assignment_status = 'COMPLETED' THEN 1
                ELSE 0
            END,
            ca.assigned_at DESC,
            pb.billing_id DESC
    `;

        pool.query(query, [employeeId], (error, results) => {
            if (error) {
                return callBack(error);
            }

            return callBack(null, results);
        });
    },

};