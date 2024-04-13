const { pool } = require('../../config/database')
module.exports = {
    getPurchaseAckPending: (callBack) => {
        pool.query(
            `
            select crm_request_master.req_slno,crm_request_master.actual_requirement,
              crm_request_master.needed,
              R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
               crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
               crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
               crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
               rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
               total_approx_cost,user_deptsec,req_status,                           
               ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
               md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                ed_image,md_image
            from crm_request_approval        
                                
                left join crm_request_master on crm_request_master.req_slno=crm_request_approval.req_slno
                left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                left join co_employee_master CR on CR.em_id=crm_request_master.create_user           
                left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user           
                left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                left join co_employee_master MD on MD.em_id=crm_request_approval.md_user
            where ed_approve=1 and md_approve=1 and user_acknldge is null and
            crm_request_approval.req_slno not in (select req_slno from crm_purchase_mast )
            ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getAllApprovedForPurchase: (callBack) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,                           
                ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                       crm_purchase_slno,ack_status,ack_remarks,PA.em_name as purchase_ackuser,
                       crm_purchase_mast.create_date as ack_date,quatation_calling_status,quatation_calling_date,
                       QC.em_name as quatation_user,quatation_negotiation,quatation_negotiation_date,
                       QN.em_name as quatation_neguser,quatation_fixing,quatation_fixing_date,
                       QF.em_name as quatation_fixuser,po_prepartion,po_complete,po_approva_level_one,
                       po_approva_level_two,po_to_supplier,store_receive,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                          left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec

                          left join co_employee_master CR on CR.em_id=crm_request_master.create_user           
                          left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user           
                          left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                          left join co_employee_master MD on MD.em_id=crm_request_approval.md_user
                          left join co_employee_master PA on PA.em_id=crm_purchase_mast.create_user
                          left join co_employee_master QC on QC.em_id=crm_purchase_mast.quatation_calling_user
                        left join co_employee_master QN on QN.em_id=crm_purchase_mast.quatation_negotiation_user
                        left join co_employee_master QF on QF.em_id=crm_purchase_mast.quatation_fixing_user


                          where md_approve=1 and ed_approve=1 and po_to_supplier=0 and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    InsertPurchaseAck: (data, callback) => {
        pool.query(
            `INSERT INTO crm_purchase_mast (
                req_slno,
                ack_status,
                ack_remarks,
               create_user               
               )
                VALUES(?,?,?,?)`,
            [
                data.req_slno,
                data.ack_status,
                data.ack_remarks,
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


    QuatationCalling: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            quatation_calling_status = ?,
            quatation_calling_user = ?,
            quatation_calling_date = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.quatation_calling_status,
                data.quatation_calling_user,
                data.quatation_calling_date,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    QuatationNegotiation: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            quatation_negotiation = ?,
            quatation_negotiation_user = ?,
            quatation_negotiation_date = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.quatation_negotiation,
                data.quatation_negotiation_user,
                data.quatation_negotiation_date,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    QuatationFixing: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            quatation_fixing = ?,
            quatation_fixing_user = ?,
            quatation_fixing_date = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.quatation_fixing,
                data.quatation_fixing_user,
                data.quatation_fixing_date,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    InsertinglePO: (data, callBack) => {
        pool.query(
            `INSERT INTO crm_purchase_po_details (
                req_slno,
                po_number,
                po_date,
                po_status,
                supply_store,
                expected_delivery,
                create_user            
                            )
            VALUES (?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.po_number,
                data.po_date,
                data.po_status,
                data.supply_store,
                data.expected_delivery,
                data.create_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    InsertMultiplePO: (data, callback) => {
        pool.query(
            `INSERT INTO crm_purchase_po_details (
                req_slno,
                po_number,
                po_date,
                po_status,supply_store,
                expected_delivery,
                create_user
               )
               values ?`,
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

    getPOList: (id, callBack) => {
        pool.query(
            ` select po_detail_slno, req_slno, po_number,po_date,expected_delivery,supply_store,
            sub_store_name, main_store_slno, main_store, store_code,store_recieve,store_recieve_fully
          from crm_purchase_po_details
          left join crm_store_master on crm_store_master.crm_store_master_slno=crm_purchase_po_details.supply_store
                        where req_slno=? and po_status=1`,
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

    updatePOAdd: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET po_prepartion=1            
            WHERE req_slno=?`,
            [
                data.req_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    PoComplete: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            po_complete = ?,
            po_complete_user = ?,
            po_complete_date = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.po_complete,
                data.po_complete_user,
                data.po_complete_date,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    PoFinals: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            po_approva_level_one = ?,
            po_approva_level_two = ?,
            po_to_supplier = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.po_approva_level_one,
                data.po_approva_level_two,
                data.po_to_supplier,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAllApprovedForStore: (callBack) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,                           
                ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                       crm_purchase_slno,ack_status,ack_remarks,PA.em_name as purchase_ackuser,
                       crm_purchase_mast.create_date as ack_date,quatation_calling_status,quatation_calling_date,
                       QC.em_name as quatation_user,quatation_negotiation,quatation_negotiation_date,
                       QN.em_name as quatation_neguser,quatation_fixing,quatation_fixing_date,
                       QF.em_name as quatation_fixuser,po_prepartion,po_complete,po_approva_level_one,
                       po_approva_level_two,po_to_supplier,store_receive,SA.em_name as storeack_user,
                       store_receive_date

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                                                    left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec

                          left join co_employee_master CR on CR.em_id=crm_request_master.create_user           
                          left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user           
                          left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                          left join co_employee_master MD on MD.em_id=crm_request_approval.md_user
                          left join co_employee_master PA on PA.em_id=crm_purchase_mast.create_user
                          left join co_employee_master QC on QC.em_id=crm_purchase_mast.quatation_calling_user
                        left join co_employee_master QN on QN.em_id=crm_purchase_mast.quatation_negotiation_user
                        left join co_employee_master QF on QF.em_id=crm_purchase_mast.quatation_fixing_user
                        left join co_employee_master SA on SA.em_id=crm_purchase_mast.store_receive_user

                          where crm_purchase_mast.po_to_supplier=1 ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    storedataUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_mast 
            SET         
            store_receive = ?,
            store_receive_user = ?,
            store_receive_date = ?                
            WHERE crm_purchase_slno =?`,
            [
                data.store_receive,
                data.store_receive_user,
                data.store_receive_date,
                data.crm_purchase_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getSubstores: (callBack) => {
        pool.query(
            `select crm_store_master_slno,sub_store_name
            from crm_store_master 
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getMainStore: (id, callBack) => {
        pool.query(
            `  select main_store
            from crm_store_master 
                        where crm_store_master_slno=? `,
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

    storeReciverdataUpdate: (data, callback) => {
        pool.query(
            `UPDATE crm_purchase_po_details 
            SET         
            store_recieve = 1,
            store_receive_user = ?,
            store_receive_date = ?                
            WHERE po_detail_slno =?`,
            [
                data.store_receive_user,
                data.store_receive_date,
                data.po_detail_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getPOListSubStorewise: (id, callBack) => {
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
                        where supply_store=? and  store_recieve=1`,
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
            `UPDATE crm_purchase_po_details 
            SET         
            sub_store_recieve = 1,
            sub_store_recieve_user = ?,
            sub_store_date = ?                
            WHERE po_detail_slno =?`,
            [
                data.sub_store_recieve_user,
                data.sub_store_date,
                data.po_detail_slno
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