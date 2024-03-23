const { pool } = require('../../config/database')
module.exports = {


    InsertPoDetailsLog: (data, callback) => {
        pool.query(
            `INSERT INTO crm_po_log_detail (
                po_slno,
                receive_date,
                receive_user,
                partialy               
               )
                VALUES(?,?,?,?)`,
            [
                data.po_slno,
                data.receive_date,
                data.receive_user,
                data.partialy
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updatePOTable: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_po_details 
            SET         
            store_recieve = 1
            WHERE po_detail_slno =?`,
            [
                data.po_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getPORecivedList: (id, callBack) => {
        pool.query(
            ` select po_log_slno, po_slno, receive_date, receive_user, partialy, fully, 
            substore_receive, substore_receive_user, substore_receive_date,  
            SM.em_name as emp_name, SS.em_name as sub_store_emname                      
                        from crm_po_log_detail
                      left join co_employee_master SM on SM.em_id=crm_po_log_detail.receive_user
                       left join co_employee_master SS on SS.em_id=crm_po_log_detail.substore_receive_user
                        where po_slno=?`,
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

    InsertPoDetailsLogFully: (data, callback) => {
        pool.query(
            `INSERT INTO crm_po_log_detail (
                po_slno,
                receive_date,
                receive_user,
                fully               
               )
                VALUES(?,?,?,?)`,
            [
                data.po_slno,
                data.receive_date,
                data.receive_user,
                data.fully
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updatePOTableFully: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_po_details 
            SET         
            store_recieve = 1,
            store_recieve_fully=1
            WHERE po_detail_slno =?`,
            [
                data.po_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    updatePOTableStoreReceive: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            store_receive = 1           
            WHERE req_slno =?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SubstoreReciverdataUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_po_log_detail 
            SET         
            substore_receive = 1,
            substore_receive_user = ?,
            substore_receive_date = ?                
            WHERE po_log_slno =?`,
            [
                data.substore_receive_user,
                data.substore_receive_date,
                data.po_log_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    subStoreupdatePODeltTable: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_po_details 
            SET         
            sub_store_recieve = 1
            WHERE po_detail_slno =?`,
            [
                data.po_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    substoreupdatePOTable: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            sub_store_recieve = 1           
            WHERE req_slno =?`,
            [
                data.req_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}