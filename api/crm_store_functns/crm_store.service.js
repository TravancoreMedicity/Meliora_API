const { pool } = require('../../config/database')
module.exports = {


    getCRSStorePending: (callBack) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,           
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,
                        category,crm_request_master.create_date,
                        user_deptsec,req_status,store_receive,
                       store_receive_date
                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                        left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          left join co_employee_master CR on CR.em_id=crm_request_master.create_user           
                       where crm_purchase_mast.po_to_supplier=1 and store_receive is null
                          and user_acknldge is null  ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCrsReceiceAllList: (callBack) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,           
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,
                        category,crm_request_master.create_date,
                        user_deptsec,req_status,store_receive,
                       store_receive_date
                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                        left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          left join co_employee_master CR on CR.em_id=crm_request_master.create_user           
                       where crm_purchase_mast.po_to_supplier=1 and store_receive =1
                          and user_acknldge is null  ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
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

    getPOCompleteCheck: (id, callBack) => {
        pool.query(
            ` select req_slno,po_number from crm_purchase_po_details
            where req_slno=? and store_recieve_fully is null`,
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
    updatePOTableStoreReceive: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            store_receive = 1,
            store_receive_user=?,
            store_receive_date=?    
            WHERE req_slno =?`,
            [
                data.receive_user,
                data.receive_date,
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

    getPOListSubStorewisePend: (id, callBack) => {
        pool.query(
            `select po_detail_slno,crm_request_master.req_slno, po_number,po_date,expected_delivery,
            supply_store,sub_store_name, main_store_slno, main_store,store_code,store_recieve,
            store_recieve_fully,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,
            sub_store_recieve,actual_requirement,
            needed,expected_date,crm_request_master.create_date as req_date
          from crm_purchase_po_details
                    left join crm_store_master on crm_store_master.crm_store_master_slno=crm_purchase_po_details.supply_store
          left join crm_request_master on crm_request_master.req_slno=crm_purchase_po_details.req_slno
          left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                        where supply_store=? and  store_recieve=1 and sub_store_recieve is null`,
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
    getPOListSubStorewiseAllList: (id, callBack) => {
        pool.query(
            `select po_detail_slno,crm_request_master.req_slno, po_number,po_date,expected_delivery,
            supply_store,sub_store_name, main_store_slno, main_store,store_code,store_recieve,
            store_recieve_fully,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,
            sub_store_recieve,actual_requirement,
            needed,expected_date,crm_request_master.create_date as req_date
          from crm_purchase_po_details
                    left join crm_store_master on crm_store_master.crm_store_master_slno=crm_purchase_po_details.supply_store
          left join crm_request_master on crm_request_master.req_slno=crm_purchase_po_details.req_slno
          left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                        where supply_store=? and  store_recieve=1 and sub_store_recieve=1`,
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