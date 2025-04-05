const { pool } = require('../../config/database')
module.exports = {

    insertDeliveryMarking: (data, callback) => {
        pool.query(
            `INSERT INTO crm_delivery_marking (supplier_code, supplier_name, dc_mark_date,dc_receive_date, mt_direct,
              mt_courier, package_count,delivery_bill_details, remarks,received_user,create_user,po_exist_status)
               values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.supplier_code,
                data.supplier_name,
                data.dc_mark_date,
                data.dc_receive_date,
                data.mt_direct,
                data.mt_courier,
                data.package_count,
                JSON.stringify(data.delivery_bill_details),
                data.remarks,
                data.received_user,
                data.create_user,
                data.po_exist_status
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    InsertDeliveredPO: (data, callback) => {
        pool.query(
            `INSERT INTO crm_delivery_marking_po_details ( delivery_mark_slno,supplier_code, po_number, po_date,
             crs_store_code, crs_store, expected_delivery, po_delivery, po_expiry, po_status, create_user)
               values (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.delivery_mark_slno,
                data.supplier_code,
                data.po_number,
                data.po_date,
                data.crs_store_code,
                data.crs_store,
                data.expected_delivery,
                data.po_delivery,
                data.po_expiry,
                data.po_status,
                data.create_user
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    InsertDeliveredItems: (data, callback) => {
        pool.query(
            `INSERT INTO
                  crm_delivered_item_details
                (
                  marking_po_slno, item_code, item_name, item_qty, item_rate, item_mrp,received_qty,item_status,create_user
                )
            VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    // checkDeliveryExist: (id, callBack) => {
    //     pool.query(
    //         `SELECT
    //               delivered_bill_no
    //          FROM
    //               crm_delivery_marking       
    //          WHERE
    //                supplier_code=?
    //                `,
    //         [
    //             id
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

    checkPOExist: (id, callBack) => {
        pool.query(
            `SELECT
                  po_number,crs_store_code,crs_store
             FROM
                  crm_delivery_marking_po_details       
             WHERE
                   supplier_code=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // item_slno, crm_delivered_item_details.marking_po_slno, item_code, item_name,
    // sum(item_qty) as item_qty, sum(received_qty) as received_qty , item_status,po_number
    getItemDetails: (id, callBack) => {
        pool.query(
            `SELECT
                  item_slno, crm_delivered_item_details.marking_po_slno, item_code, item_name,
                  sum(item_qty) as item_qty, sum(received_qty) as received_qty ,item_status,po_number
             FROM
                  crm_delivered_item_details
                 LEFT JOIN crm_delivery_marking_po_details ON crm_delivery_marking_po_details.marking_po_slno = crm_delivered_item_details.marking_po_slno       
             WHERE
                   supplier_code=? AND (item_status != 1 OR item_status IS NULL)
             GROUP BY item_code
             ORDER BY item_name`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateDeliveredItemQty: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_delivered_item_details
                     SET         
                           received_qty = ?,
                           item_status =?,
                           edit_user = ?
                     WHERE
                           item_slno = ?`,
                    [
                        val.received_qty,
                        val.item_status,
                        val.edit_user,
                        val.item_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },
    updatePOStatus: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                           crm_delivery_marking_po_details
                     SET         
                           po_status = ?,
                           edit_user = ?
                    WHERE
                           marking_po_slno = ?`,
                    [
                        val.po_status,
                        val.edit_user,
                        val.marking_po_slno
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    getSupplier: (callBack) => {
        pool.query(
            `SELECT
                   crm_delivery_marking.supplier_code,supplier_name
            FROM
                   crm_delivery_marking    
         GROUP BY crm_delivery_marking.supplier_code
            ORDER BY supplier_name`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllDeliveredDetails: (data, callBack) => {
        pool.query(
            `SELECT
                    delivery_mark_slno, supplier_code, supplier_name, dc_mark_date, dc_receive_date, mt_direct,
                    mt_courier, package_count,delivery_bill_details, remarks,E.em_name as received_user
	         FROM 
                   crm_delivery_marking
                LEFT JOIN co_employee_master E ON E.em_id=crm_delivery_marking.received_user     
      	     WHERE 
                   crm_delivery_marking.supplier_code like ?
                   AND (dc_receive_date between ? AND ?) `,
            [
                '%' + data.supCode + '%',
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSupplierDetailsForItemChecking: (callBack) => {
        pool.query(
            `SELECT
                   crm_delivery_marking.supplier_code,supplier_name,po_status
            FROM
                   crm_delivery_marking    
                LEFT JOIN crm_delivery_marking_po_details ON crm_delivery_marking_po_details.delivery_mark_slno=crm_delivery_marking.delivery_mark_slno
            WHERE 
                  po_status=1
            GROUP BY crm_delivery_marking.supplier_code
            ORDER BY supplier_name`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //     SELECT
    //     checking_item_slno, checking_slno, supplier_code, item_code, item_name, pending_qty, create_date,
    //     SUM(delivered_qty) AS delivered_qty, SUM(excess_qty) AS excess_qty,pending_status,
    //     sum(damage_qty) AS damage_qty,remarks,balance_qty,checking_user,sum(crm_checking_item_details.requested_qty) as requested_qty
    // FROM
    //      crm_checking_item_details
    //    LEFT JOIN crm_delivered_item_details ON crm_delivered_item_details.item_slno=crm_checking_item_details.item_slno 
    // WHERE 
    //      supplier_code like ?
    //      AND (create_date between ? AND ?)
    // GROUP BY item_code    

    // viewItemChecking: (data, callBack) => {
    //     pool.query(
    //         `WITH RankedData AS (
    //         SELECT
    //               checking_item_slno,checking_slno,supplier_code,item_code,item_name, pending_qty,create_date,
    //               delivered_qty,excess_qty,damage_qty,remarks,balance_qty,checking_user,requested_qty,
    //               ROW_NUMBER() OVER (PARTITION BY item_code ORDER BY create_date DESC) AS RowRank
    //          FROM
    //               crm_checking_item_details
    //          WHERE
    //               supplier_code like ?
    //               AND (create_date between ? AND ?)
    //               )
    //             SELECT
    //                 item_code,
    //                 item_name,
    //                 SUM(delivered_qty) AS delivered_qty,
    //                 SUM(excess_qty) AS excess_qty,
    //                 SUM(damage_qty) AS damage_qty,
    //                 MAX(pending_qty) AS pending_qty,
    //                 MAX(balance_qty) AS balance_qty,
    //                 MAX(remarks) AS remarks,
    //                 MAX(checking_user) AS checking_user,
    //                 MAX(pending_status) AS pending_status,
    //                 (SELECT requested_qty FROM RankedData WHERE RowRank = 1 AND RankedData.item_code = Main.item_code) AS last_requested_qty
    //             FROM
    //                 crm_checking_item_details Main
    //             GROUP BY
    //                 item_code, item_name `,
    //         [
    //             '%' + data.supCode + '%',
    //             data.from,
    //             data.to
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },

    viewItemChecking: (data, callBack) => {
        pool.query(
            `SELECT
                    Main.checking_item_slno,
                    Main.checking_slno,
                    Main.item_code,
                    Main.item_name,
                    Main.create_date,
                    Main.supplier_code,
                    SUM(Main.delivered_qty) AS delivered_qty,
                    SUM(Main.excess_qty) AS excess_qty,
                    SUM(Main.damage_qty) AS damage_qty,
                    MAX(Main.pending_qty) AS pending_qty,
                    MAX(Main.remarks) AS remarks,
                    MAX(Main.checking_user) AS checking_user,
                    MAX(Main.pending_status) AS pending_status,
                     (
                        SELECT
                              balance_qty
                        FROM
                              crm_checking_item_details AS Sub
                        WHERE
                              Sub.item_code = Main.item_code
                        ORDER BY Sub.create_date DESC
                        LIMIT 1
                    ) AS last_balance_qty,
                    (
                        SELECT
                              requested_qty
                        FROM
                              crm_checking_item_details AS Sub
                        WHERE
                              Sub.item_code = Main.item_code
                        ORDER BY Sub.create_date DESC
                        LIMIT 1
                    ) AS last_requested_qty
                FROM
                    crm_checking_item_details Main
                WHERE
                    Main.supplier_code = ? AND
                    Main.create_date BETWEEN ? AND ?
                GROUP BY
                    Main.item_code`,
            [
                data.supCode,
                data.from,
                data.to
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    InsertCheckedItems: (data, callback) => {
        pool.query(
            `INSERT INTO
                  crm_checking_item_details
                (
                checking_slno,supplier_code,item_code,item_name,pending_qty,create_user,delivered_qty,
                excess_qty,pending_status,damage_qty,remarks,balance_qty,checking_user,requested_qty,item_slno
                )
            VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getMaxCheckNo: (callback) => {
        pool.query(
            `SELECT
                    max(checking_slno) as checking_slno
             FROM
                   crm_checking_item_details`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getPendingPoSup: (id, callBack) => {
        pool.query(
            ` SELECT  
                   po_number,crs_store_code,crm_delivery_marking_po_details.marking_po_slno,item_code,item_slno
              FROM
                    crm_delivery_marking_po_details
             LEFT JOIN  crm_delivered_item_details ON crm_delivered_item_details.marking_po_slno=crm_delivery_marking_po_details.marking_po_slno 
              WHERE 
                supplier_code=? and po_status=1`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

}