const { pool } = require('../../config/database');

module.exports = {

    // createCashClosing: (data, callback) => {

    //     pool.getConnection((connectionError, connection) => {

    //         if (connectionError) {
    //             return callback(connectionError);
    //         }

    //         connection.beginTransaction((transactionError) => {

    //             if (transactionError) {
    //                 connection.release();
    //                 return callback(transactionError);
    //             }

    //             const {
    //                 employee_id,
    //                 collection_amount,
    //                 remarks,
    //                 denominations
    //             } = data;


    //             // =========================
    //             // INSERT HEADER
    //             // =========================

    //             const headerQuery = `
    //             INSERT INTO daily_collection_closing
    //             (
    //                 employee_id,
    //                 closing_date,
    //                 expected_amount,
    //                 cash_amount,
    //                 coin_amount,
    //                 counted_amount,
    //                 difference_amount,
    //                 cash_pieces,
    //                 coin_pieces,
    //                 total_pieces,
    //                 remarks,
    //                 closing_status,
    //                 created_by
    //             )
    //             VALUES (?, CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, 'CLOSED', ?)
    //         `;


    //             const cashAmount =
    //                 Number(data.cash_amount) || 0;

    //             const coinAmount =
    //                 Number(data.coin_amount) || 0;

    //             const countedAmount =
    //                 Number(data.counted_amount) || 0;

    //             const difference =
    //                 Number(data.difference) || 0;

    //             const cashPieces =
    //                 Number(data.cash_pieces) || 0;

    //             const coinPieces =
    //                 Number(data.coin_pieces) || 0;

    //             const totalPieces =
    //                 Number(data.total_pieces) || 0;


    //             const headerValues = [
    //                 employee_id,
    //                 Number(collection_amount) || 0,
    //                 cashAmount,
    //                 coinAmount,
    //                 countedAmount,
    //                 difference,
    //                 cashPieces,
    //                 coinPieces,
    //                 totalPieces,
    //                 remarks || null,
    //                 data.created_by
    //             ];


    //             connection.query(
    //                 headerQuery,
    //                 headerValues,
    //                 (headerError, headerResult) => {

    //                     if (headerError) {

    //                         return connection.rollback(() => {
    //                             connection.release();
    //                             callback(headerError);
    //                         });

    //                     }


    //                     const closingId =
    //                         headerResult.insertId;


    //                     // =========================
    //                     // DENOMINATIONS
    //                     // =========================

    //                     const denominationRows = [];


    //                     Object.entries(
    //                         denominations?.cash || {}
    //                     ).forEach(([value, quantity]) => {

    //                         const qty = Number(quantity) || 0;

    //                         if (qty > 0) {

    //                             denominationRows.push([
    //                                 closingId,
    //                                 Number(value),
    //                                 'CASH',
    //                                 qty,
    //                                 Number(value) * qty
    //                             ]);

    //                         }

    //                     });


    //                     Object.entries(
    //                         denominations?.coins || {}
    //                     ).forEach(([value, quantity]) => {

    //                         const qty = Number(quantity) || 0;

    //                         if (qty > 0) {

    //                             denominationRows.push([
    //                                 closingId,
    //                                 Number(value),
    //                                 'COIN',
    //                                 qty,
    //                                 Number(value) * qty
    //                             ]);

    //                         }

    //                     });


    //                     if (denominationRows.length === 0) {

    //                         return connection.rollback(() => {
    //                             connection.release();

    //                             callback(
    //                                 new Error(
    //                                     'At least one denomination is required'
    //                                 )
    //                             );
    //                         });

    //                     }


    //                     // =========================
    //                     // INSERT DENOMINATIONS
    //                     // =========================

    //                     const denominationQuery = `
    //                     INSERT INTO daily_collection_closing_denominations
    //                     (
    //                         closing_id,
    //                         denomination_value,
    //                         denomination_type,
    //                         quantity,
    //                         amount
    //                     )
    //                     VALUES ?
    //                 `;


    //                     connection.query(
    //                         denominationQuery,
    //                         [denominationRows],
    //                         (denominationError) => {

    //                             if (denominationError) {

    //                                 return connection.rollback(() => {
    //                                     connection.release();
    //                                     callback(denominationError);
    //                                 });

    //                             }


    //                             // =========================
    //                             // COMMIT
    //                             // =========================

    //                             connection.commit(
    //                                 (commitError) => {

    //                                     if (commitError) {

    //                                         return connection.rollback(() => {
    //                                             connection.release();
    //                                             callback(commitError);
    //                                         });

    //                                     }


    //                                     connection.release();


    //                                     callback(null, {
    //                                         closing_id: closingId
    //                                     });

    //                                 }
    //                             );

    //                         }
    //                     );

    //                 }
    //             );

    //         });

    //     });

    // },
    // createCashClosing: (data, callback) => {

    //     pool.getConnection((connectionError, connection) => {

    //         if (connectionError) {
    //             return callback(connectionError);
    //         }

    //         connection.beginTransaction((transactionError) => {

    //             if (transactionError) {
    //                 connection.release();
    //                 return callback(transactionError);
    //             }

    //             const {
    //                 employee_id,
    //                 collection_amount,
    //                 remarks,
    //                 denominations,
    //                 billing_ids
    //             } = data;

    //             // =========================
    //             // INSERT HEADER
    //             // =========================

    //             const headerQuery = `
    //             INSERT INTO daily_collection_closing
    //             (
    //                 employee_id,
    //                 closing_date,
    //                 expected_amount,
    //                 cash_amount,
    //                 coin_amount,
    //                 counted_amount,
    //                 difference_amount,
    //                 cash_pieces,
    //                 coin_pieces,
    //                 total_pieces,
    //                 remarks,
    //                 closing_status,
    //                 created_by
    //             )
    //             VALUES (?, CURDATE(), ?, ?, ?, ?, ?, ?, ?, ?, ?, 'CLOSED', ?)
    //         `;

    //             const cashAmount =
    //                 Number(data.cash_amount) || 0;

    //             const coinAmount =
    //                 Number(data.coin_amount) || 0;

    //             const countedAmount =
    //                 Number(data.counted_amount) || 0;

    //             const difference =
    //                 Number(data.difference) || 0;

    //             const cashPieces =
    //                 Number(data.cash_pieces) || 0;

    //             const coinPieces =
    //                 Number(data.coin_pieces) || 0;

    //             const totalPieces =
    //                 Number(data.total_pieces) || 0;

    //             const headerValues = [
    //                 employee_id,
    //                 Number(collection_amount) || 0,
    //                 cashAmount,
    //                 coinAmount,
    //                 countedAmount,
    //                 difference,
    //                 cashPieces,
    //                 coinPieces,
    //                 totalPieces,
    //                 remarks || null,
    //                 data.created_by
    //             ];

    //             connection.query(
    //                 headerQuery,
    //                 headerValues,
    //                 (headerError, headerResult) => {

    //                     if (headerError) {

    //                         return connection.rollback(() => {
    //                             connection.release();
    //                             callback(headerError);
    //                         });

    //                     }

    //                     const closingId = headerResult.insertId;

    //                     // =========================
    //                     // DENOMINATIONS
    //                     // =========================

    //                     const denominationRows = [];

    //                     Object.entries(
    //                         denominations?.cash || {}
    //                     ).forEach(([value, quantity]) => {

    //                         const qty = Number(quantity) || 0;

    //                         if (qty > 0) {

    //                             denominationRows.push([
    //                                 closingId,
    //                                 Number(value),
    //                                 'CASH',
    //                                 qty,
    //                                 Number(value) * qty
    //                             ]);

    //                         }

    //                     });

    //                     Object.entries(
    //                         denominations?.coins || {}
    //                     ).forEach(([value, quantity]) => {

    //                         const qty = Number(quantity) || 0;

    //                         if (qty > 0) {

    //                             denominationRows.push([
    //                                 closingId,
    //                                 Number(value),
    //                                 'COIN',
    //                                 qty,
    //                                 Number(value) * qty
    //                             ]);

    //                         }

    //                     });

    //                     if (denominationRows.length === 0) {

    //                         return connection.rollback(() => {
    //                             connection.release();

    //                             callback(
    //                                 new Error(
    //                                     'At least one denomination is required'
    //                                 )
    //                             );
    //                         });

    //                     }

    //                     // =========================
    //                     // INSERT DENOMINATIONS
    //                     // =========================

    //                     const denominationQuery = `
    //                     INSERT INTO daily_collection_closing_denominations
    //                     (
    //                         closing_id,
    //                         denomination_value,
    //                         denomination_type,
    //                         quantity,
    //                         amount
    //                     )
    //                     VALUES ?
    //                 `;

    //                     connection.query(
    //                         denominationQuery,
    //                         [denominationRows],
    //                         (denominationError) => {

    //                             if (denominationError) {

    //                                 return connection.rollback(() => {
    //                                     connection.release();
    //                                     callback(denominationError);
    //                                 });

    //                             }

    //                             // =========================
    //                             // UPDATE PATIENT BILLING
    //                             // =========================

    //                             const billingIds = Array.isArray(billing_ids)
    //                                 ? billing_ids
    //                                 : [];

    //                             if (billingIds.length === 0) {

    //                                 return connection.commit(
    //                                     (commitError) => {

    //                                         if (commitError) {

    //                                             return connection.rollback(() => {
    //                                                 connection.release();
    //                                                 callback(commitError);
    //                                             });

    //                                         }

    //                                         connection.release();

    //                                         callback(null, {
    //                                             closing_id: closingId,
    //                                             billing_updated: 0
    //                                         });

    //                                     }
    //                                 );

    //                             }

    //                             const placeholders = billingIds
    //                                 .map(() => '?')
    //                                 .join(',');

    //                             const billingQuery = `
    //                             UPDATE patient_billing
    //                             SET
    //                                 is_settled = 'Y',
    //                                 settled_id = ?,
    //                                 updated_by = ?,
    //                                 updated_at = NOW()
    //                             WHERE billing_id IN (${placeholders})
    //                         `;

    //                             const billingValues = [
    //                                 closingId,
    //                                 data.created_by,
    //                                 ...billingIds
    //                             ];

    //                             connection.query(
    //                                 billingQuery,
    //                                 billingValues,
    //                                 (billingError, billingResult) => {

    //                                     if (billingError) {

    //                                         return connection.rollback(() => {
    //                                             connection.release();

    //                                             callback({
    //                                                 stage: 'BILLING_UPDATE',
    //                                                 message: billingError
    //                                             });
    //                                         });

    //                                     }

    //                                     // =========================
    //                                     // COMMIT
    //                                     // =========================

    //                                     connection.commit(
    //                                         (commitError) => {

    //                                             if (commitError) {

    //                                                 return connection.rollback(() => {
    //                                                     connection.release();
    //                                                     callback(commitError);
    //                                                 });

    //                                             }

    //                                             connection.release();

    //                                             callback(null, {
    //                                                 closing_id: closingId,
    //                                                 billing_updated:
    //                                                     billingResult.affectedRows
    //                                             });

    //                                         }
    //                                     );

    //                                 }
    //                             );

    //                         }
    //                     );

    //                 }
    //             );

    //         });

    //     });

    // },

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
                                        is_settled = 'Y',
                                        settled_id = ?,
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
            ON pb.settled_id = dcc.closing_id
            AND pb.is_settled = 'Y'

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

    // AssignEmployeePettyCashDetails: (data, callback) => {

    //     const checkQuery = `
    //     SELECT cash_id
    //     FROM delivery_person_cash
    //     WHERE assignment_id = ?
    //     LIMIT 1
    // `;

    //     pool.query(
    //         checkQuery,
    //         [data.assignment_id],
    //         (error, results) => {

    //             if (error) {
    //                 return callback(error);
    //             }

    //             // Record already exists → UPDATE
    //             if (results.length > 0) {

    //                 const updateQuery = `
    //                 UPDATE delivery_person_cash
    //                 SET
    //                     employee_id = ?,
    //                     amount = ?,
    //                     given_by = ?,
    //                     given_at = CURRENT_TIMESTAMP,
    //                     remarks = ?
    //                 WHERE assignment_id = ?
    //             `;

    //                 const values = [
    //                     data.employee_id,
    //                     data.amount,
    //                     data.given_by,
    //                     data.remarks || null,
    //                     data.assignment_id
    //                 ];

    //                 return pool.query(
    //                     updateQuery,
    //                     values,
    //                     (error, updateResult) => {

    //                         if (error) {
    //                             return callback(error);
    //                         }

    //                         return callback(null, {
    //                             action: "UPDATE",
    //                             cash_id: results[0].cash_id,
    //                             result: updateResult
    //                         });
    //                     }
    //                 );
    //             }

    //             // No record → INSERT
    //             const insertQuery = `
    //             INSERT INTO delivery_person_cash (
    //                 assignment_id,
    //                 employee_id,
    //                 amount,
    //                 given_by,
    //                 remarks
    //             )
    //             VALUES (?, ?, ?, ?, ?)
    //         `;

    //             const values = [
    //                 data.assignment_id,
    //                 data.employee_id,
    //                 data.amount,
    //                 data.given_by,
    //                 data.remarks || null
    //             ];

    //             pool.query(
    //                 insertQuery,
    //                 values,
    //                 (error, insertResult) => {

    //                     if (error) {
    //                         return callback(error);
    //                     }

    //                     return callback(null, {
    //                         action: "INSERT",
    //                         cash_id: insertResult.insertId,
    //                         result: insertResult
    //                     });
    //                 }
    //             );
    //         }
    //     );
    // },
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




};