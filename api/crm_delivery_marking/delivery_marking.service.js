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
                  marking_po_slno, item_code, item_name, item_qty, item_rate, item_mrp,received_qty, create_user
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

    getItemDetails: (id, callBack) => {
        pool.query(
            `SELECT
                  item_slno, crm_delivered_item_details.marking_po_slno, item_code, item_name,
                   sum(item_qty) as item_qty, sum(received_qty) as received_qty , item_status,po_number
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

        console.log(body, "itembody");

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
        console.log(body, "pobody");
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
                  supplier_code,supplier_name
             FROM
                  crm_delivery_marking       
             GROUP BY supplier_code
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
                   dc_mark_date,dc_receive_date,crm_delivery_marking.delivery_mark_slno,mt_direct,mt_courier,
                   package_count,delivery_bill_details,remarks,E.em_name as received_user,PO.marking_po_slno
             FROM 
                   crm_delivery_marking
                LEFT JOIN co_employee_master E ON E.em_id=crm_delivery_marking.received_user     
                LEFT JOIN crm_delivery_marking_po_details PO ON PO.delivery_mark_slno=crm_delivery_marking.delivery_mark_slno
			WHERE 
                   po_status=0 AND crm_delivery_marking.supplier_code=? AND dc_receive_date between ? AND ?
             GROUP BY PO.marking_po_slno `,
            [
                data.supCode,
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

    getAllPoDetails: (id, callBack) => {
        pool.query(
            `SELECT
                    delivery_mark_slno,crm_delivery_marking_po_details.marking_po_slno,po_number,po_date,crs_store,S.main_store,expected_delivery,
                    item_slno,item_code,item_name,item_qty,item_rate,item_mrp,received_qty
             FROM
                   crm_delivery_marking_po_details
                LEFT JOIN crm_store_master S ON S.main_store_slno=crm_delivery_marking_po_details.crs_store
                LEFT JOIN crm_delivered_item_details I ON I.marking_po_slno=crm_delivery_marking_po_details.marking_po_slno
             WHERE
                   delivery_mark_slno=? AND po_status=0
             GROUP BY  item_slno`,
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
    InsertCheckedItems: (data, callback) => {
        pool.query(
            `INSERT INTO
                  crm_checking_item_details
                (
                checking_slno,supplier_code,item_code,item_name,pending_qty,create_user,delivered_qty,
                excess_qty,pending_status,damage_qty,remarks,balance_qty
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