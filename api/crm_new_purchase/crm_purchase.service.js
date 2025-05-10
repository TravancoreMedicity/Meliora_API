const { pool } = require('../../config/database')
module.exports = {
    // getPurchaseAckPending: (callBack) => {
    //     pool.query(
    //         ` SELECT
    //                 crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
    //                 R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
    //                 crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
    //                 crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
    //                 rm_ndrf,GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
    //                 total_approx_cost,user_deptsec,req_status,req_approv_slno,TD.dept_id, TD.dept_name,TD.dept_type,
    //                 ed_approve_req, ed_approve,ed_approve_remarks, ed_detial_analysis, ed_approve_date,ED.em_name as ed_user,
    //                 md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
    //                 ed_image,md_image,ack_status, ack_remarks
    //             FROM
    //                 crm_request_master
    //                 LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
    //                 LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
    //                 LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
    //                 LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
    //                 LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec                 
    //                 LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
    //                 LEFT JOIN co_employee_master ED ON ED.em_id=crm_request_approval.ed_user
    //                 LEFT JOIN co_employee_master MD On MD.em_id=crm_request_approval.md_user
    //                 LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id
    //                 LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
    //           WHERE
    //                 ed_approve=1 AND md_approve=1 AND user_acknldge is null AND( ack_status is NULL || ack_status=0 )                   
    //           GROUP BY crm_request_master.req_slno,crm_purchase_mast.crm_purchase_slno   
    //           ORDER BY crm_request_master.req_slno DESC`,
    //         [],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     )
    // },

    getPurchaseAckPending: (callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno, crm_request_master.actual_requirement, crm_request_master.needed,
                   R.sec_name AS req_deptsec, U.sec_name AS user_deptsection, CR.em_name AS create_user,
                   crm_emergencytype_mast.emer_type_name, crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno, crm_request_master.location, emergeny_remarks, expected_date,
                   GROUP_CONCAT(item_type_name) AS category, image_status, emergency_flag, emer_slno, crm_request_master.create_date,
                   total_approx_cost, user_deptsec, req_status, req_approv_slno, TD.dept_id, TD.dept_name, TD.dept_type,
                   ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name AS ed_user,
                   md_approve_req, md_approve, md_approve_remarks, md_detial_analysis, md_approve_date, MD.em_name AS md_user,
                   managing_director_req, crm_request_approval.managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                   ed_image, md_image, ack_status, ack_remarks,company_name,crm_request_master.company_slno,
                     incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                    hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image
            FROM
                   crm_request_master
                 LEFT JOIN crm_request_approval ON crm_request_approval.req_slno = crm_request_master.req_slno
                 LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$')
                 LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno = crm_request_master.emer_slno
                 LEFT JOIN co_deptsec_mast R ON R.sec_id = crm_request_master.request_deptsec_slno
                 LEFT JOIN co_deptsec_mast U ON U.sec_id = crm_request_master.user_deptsec                 
                 LEFT JOIN co_employee_master CR ON CR.em_id = crm_request_master.create_user
                 LEFT JOIN co_employee_master ED ON ED.em_id = crm_request_approval.ed_user
                 LEFT JOIN co_employee_master MD ON MD.em_id = crm_request_approval.md_user
                 LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
                 LEFT JOIN co_department_mast TD ON TD.dept_id = R.dept_id
                 LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno = crm_request_master.req_slno
                 LEFT JOIN serial_nos ON serial_nos.serial_slno = 6  
                 LEFT JOIN crm_approval_mapping_master ON crm_approval_mapping_master.company_slno = serial_nos.serial_current
                LEFT JOIN crm_company_master ON crm_request_master.company_slno=crm_company_master.company_slno
                  LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            WHERE
                 serial_nos.serial_current IS NOT NULL 
                 AND ((crm_approval_mapping_master.medical_director_approve = 1 
                 AND crm_approval_mapping_master.executive_director_approve = 1 
                 AND ed_approve = 1 
                 AND md_approve = 1)
                OR (crm_approval_mapping_master.medical_director_approve = 1 
                 AND crm_approval_mapping_master.managing_director_approve = 1 
                 AND md_approve = 1 
                 AND crm_request_approval.managing_director_approve = 1))
                 AND (ack_status IS NULL OR ack_status = 0)
                 AND internally_arranged_status=0 AND user_acknldge is null            
            GROUP BY crm_request_master.req_slno, crm_purchase_mast.crm_purchase_slno   
            ORDER BY crm_request_master.req_slno DESC `,
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
            `SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                    crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                    crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                    rm_ndrf,GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                    total_approx_cost,user_deptsec,req_status,req_approv_slno,TD.dept_id, TD.dept_name,TD.dept_type,
                    ed_approve_req, ed_approve,ed_approve_remarks, ed_detial_analysis, ed_approve_date,ED.em_name as ed_user,
                    md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                    ed_image,md_image,
                      managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                    crm_purchase_mast.crm_purchase_slno,ack_status,ack_remarks,PA.em_name as purchase_ackuser,
                    crm_purchase_mast.create_date as ack_date,
                    quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                    quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                    quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                    po_prepartion, po_complete,po_complete_date,company_name,crm_request_master.company_slno,crm_request_master.work_order_status,
                     incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                    hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image
             FROM
                 crm_request_master
                   LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                   LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                   LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                   LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                   LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec                 
                   LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
                   LEFT JOIN co_employee_master ED ON ED.em_id=crm_request_approval.ed_user
                   LEFT JOIN co_employee_master MD ON MD.em_id=crm_request_approval.md_user
                   LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
                   LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id
                   LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
                   LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
                   LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
                   LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
                   LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
                   LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno=crm_purchase_mast.crm_purchase_slno
                    LEFT JOIN crm_company_master ON crm_request_master.company_slno=crm_company_master.company_slno 
                        LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
			WHERE
                   ack_status=1 AND user_acknldge is null  AND ( crm_purchase_po_details.po_to_supplier is null
                   OR crm_purchase_po_details.po_to_supplier=0)  AND crf_close IS NULL 
               GROUP BY crm_request_master.req_slno ,crm_purchase_mast.crm_purchase_slno                 
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
    CheckCRfPurchaseExist: (id, callBack) => {
        pool.query(
            `SELECT
                  crm_purchase_slno,ack_status
             FROM
                  crm_purchase_mast    
              WHERE
                    req_slno=? AND po_complete=0`,
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
    updatePurchaseAck: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_purchase_mast
             SET
                   ack_status = ?,ack_remarks = ?,create_user = ?
             WHERE
                   req_slno =? AND crm_purchase_slno=?`,
            [
                data.ack_status,
                data.ack_remarks,
                data.create_user,
                data.req_slno,
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


    QuatationCalling: (data, callback) => {
        pool.query(
            `UPDATE
                    crm_purchase_mast
             SET         
                    quatation_calling_status = ?,quatation_calling_user = ?,quatation_calling_date = ?,quatation_calling_remarks=?             
             WHERE
                   crm_purchase_slno =?`,
            [
                data.quatation_calling_status,
                data.quatation_calling_user,
                data.quatation_calling_date,
                data.quatation_calling_remarks,
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
            quatation_negotiation_date = ?,
            quatation_negotiation_remarks=?                
            WHERE crm_purchase_slno =?`,
            [
                data.quatation_negotiation,
                data.quatation_negotiation_user,
                data.quatation_negotiation_date,
                data.quatation_negotiation_remarks,
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
            quatation_fixing_date = ?,
            quatation_fixing_remarks=?                
            WHERE crm_purchase_slno =?`,
            [
                data.quatation_fixing,
                data.quatation_fixing_user,
                data.quatation_fixing_date,
                data.quatation_fixing_remarks,
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

    InsertMultiplePO: (data, callback) => {
        pool.query(
            `INSERT INTO crm_purchase_po_details (
                req_slno,  po_number,po_date,po_status,supply_store, expected_delivery, create_user, supplier_code,supplier_name,
                po_delivery, po_amount,po_to_supplier,approval_level,po_type,po_expiry,sub_store_slno,crm_purchase_slno)
               values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.po_number,
                data.po_date,
                data.po_status,
                data.supply_store,
                data.expected_delivery,
                data.create_user,
                data.supplier_code,
                data.supplier_name,
                data.po_delivery,
                data.po_amount,
                data.po_to_supplier,
                data.approval_level,
                data.po_type,
                data.po_expiry,
                data.sub_store_slno,
                data.crm_purchase_slno
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    updatePOAdd: (id, callBack) => {
        pool.query(
            `UPDATE crm_purchase_mast SET po_prepartion=1 WHERE crm_purchase_slno=?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    PoComplete: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_purchase_mast
             SET         
                   po_complete = ?,
                   po_complete_user = ?,
                   po_complete_date = ?                
             WHERE
                   crm_purchase_slno =?`,
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

    updateApprvdPOItems: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            crm_request_mast_detail 
                     SET         
                            po_item_status = 1                 
                     WHERE
                            req_detl_slno = ? AND req_slno = ?`,
                    [
                        val.req_detl_slno,
                        val.req_slno
                    ],
                    (error, result, fields) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
            });
        }));
    },
    //  to know completed po, if duplicate crf occure
    updateCRFPOComplte: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            crm_purchase_po_details 
                     SET         
                            crf_po_complete_status = 1                 
                     WHERE
                            po_detail_slno = ? AND req_slno = ?`,
                    [
                        val.po_detail_slno,
                        val.req_slno
                    ],
                    (error, result, fields) => {
                        if (error) {
                            return reject(error);
                        }
                        return resolve(result);
                    }
                );
            });
        }));
    },
    PoFinals: (data, callback) => {
        pool.query(
            `UPDATE
                    crm_purchase_po_details
               SET         
                   po_to_supplier = 1,
                   po_to_supplier_date=?,
                   edit_user = ?
             WHERE
                 po_detail_slno=?`,
            [
                data.po_to_supplier_date,
                data.edit_user,
                data.po_detail_slno
                // data.req_slno,
                // data.po_number
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getSubstores: (id, callBack) => {
        pool.query(
            `select
                   crm_store_master_slno,sub_store_name,store_code
             from
                  crm_store_master
             where main_store_slno=?`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    PurchsDataCollectionPending: (callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,          
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   rm_ndrf,GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date as req_date,
                   total_approx_cost,user_deptsec,req_status,crf_data_collect_slno, crf_requst_slno,crf_req_collect_dept,
                   crf_dept_status, crf_dept_remarks, reqest_one,RU.em_name as requser,SU.em_name  as saveuser, crf_req_remark,
                   crm_data_collection.create_date as dc_req_date,crm_data_collection.update_date,data_coll_image_status,
                   RE.sec_name as data_entered,
                   crm_purchase_mast.crm_purchase_slno,ack_status,ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion,company_name,crm_request_master.company_slno                    
  			 FROM
                   crm_request_master
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN crm_data_collection On crm_data_collection.crf_requst_slno=crm_request_master.req_slno
                LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
                LEFT JOIN co_employee_master RU ON RU.em_id=crm_data_collection.req_user           
                LEFT JOIN co_employee_master SU ON SU.em_id=crm_data_collection.save_user
                LEFT JOIN co_deptsec_mast RE ON RE.sec_id=crm_data_collection.crf_req_collect_dept
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno = crm_data_collection.crf_requst_slno
                LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
                LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
                LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
                LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
                LEFT JOIN crm_company_master ON crm_request_master.company_slno=crm_company_master.company_slno 
             WHERE
                  crf_dept_status is null AND crm_purchase_mast.req_slno = crm_data_collection.crf_requst_slno 
              GROUP BY crm_request_master.req_slno
              ORDER BY crm_request_master.req_slno DESC `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getCRSStores: (callBack) => {
        pool.query(
            `select 
                   main_store_slno,crs_store_code,main_store
             from 
                  crm_store_master
             where
                   main_store_slno is not null
             group by crs_store_code`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    CheckPOExist: (data, callBack) => {
        pool.query(
            ` SELECT 
                    crm_purchase_po_details.po_detail_slno, req_slno, po_number, po_date, po_status, supply_store,
                    expected_delivery,supplier_name, po_delivery, po_amount,sub_store_name, po_to_supplier,
                    approval_level, po_type, po_expiry,po_itm_slno,item_code, item_name, item_qty,
                    item_rate,item_mrp, tax, tax_amount,net_amount,crm_purchase_po_details.create_date,
                    crm_purchase_po_details.crm_purchase_slno
             FROM
                    crm_purchase_po_details
             LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
             LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno      
             WHERE
                    po_number=? and supply_store=? AND po_status=1`,
            [
                data.po_number,
                data.supply_store
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    InsertPOItems: (data, callback) => {
        pool.query(
            `INSERT INTO
                  crm_purchase_item_details
                (
                  po_detail_slno,item_code,item_name,item_qty,item_rate,item_mrp,tax,tax_amount,create_user,net_amount,
                  grn_qnty,crm_purchase_slno
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

    getPOItemDetails: (id, callBack) => {
        pool.query(
            ` SELECT
                   po_itm_slno, po_detail_slno, item_code, item_name, item_qty, item_rate,
                   item_mrp, tax, tax_amount,net_amount
              FROM
                    crm_purchase_item_details
              WHERE
                    po_detail_slno=?`,
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

    getPendingPo: (callBack) => {
        pool.query(
            ` SELECT  
                    crm_purchase_po_details.po_number,crs_store_code
              FROM
                    crm_purchase_po_details
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
                LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno  
             WHERE 
                 crm_purchase_mast.po_complete=1 and crm_purchase_po_details.po_to_supplier=0 AND po_status=1`,
            [],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    getPendingPOItemDetails: (callBack) => {
        pool.query(
            `SELECT 
                   crm_purchase_po_details.po_detail_slno, crm_purchase_po_details.req_slno, po_number,po_date, supply_store,
                   expected_delivery,main_store, sub_store_name,sub_store_slno,supplier_name,po_delivery, po_amount,
                   approval_level, po_type,po_expiry,item_code,item_name,item_qty,item_rate,item_mrp,tax,tax_amount,net_amount,company_name,crm_request_master.company_slno
            FROM 
                   crm_purchase_po_details
                LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
                LEFT JOIN crm_purchase_mast On crm_purchase_mast.crm_purchase_slno=crm_purchase_po_details.crm_purchase_slno
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
                 LEFT JOIN crm_company_master ON crm_request_master.company_slno=crm_company_master.company_slno 
            WHERE  
                   po_status=1 AND crm_purchase_po_details.po_to_supplier=0 AND crm_purchase_mast.po_complete=1 AND
                   crm_purchase_po_details.crf_po_complete_status=1 AND crm_request_master.user_acknldge is null 
            GROUP BY crm_purchase_po_details.po_detail_slno,crm_purchase_item_details.po_itm_slno
			ORDER BY crm_purchase_po_details.req_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // updatePoApprovals: (body) => {
    //     return Promise.all(body?.map((val) => {
    //         return new Promise((resolve, reject) => {
    //             pool.query(
    //                 `UPDATE
    //                      crm_purchase_po_details
    //                  SET
    //                      approval_level = ?, po_expiry = ?,expected_delivery = ?
    //                 where
    //                      po_number = ? and supply_store = ? AND po_status=1`,
    //                 [
    //                     val.approval_level,
    //                     val.po_expiry,
    //                     val.expected_delivery,
    //                     val.po_number,
    //                     val.supply_store
    //                 ],
    //                 (error, results, fields) => {
    //                     if (error) {
    //                         return reject(error)
    //                     }
    //                     return resolve(results)
    //                 }
    //             )
    //         })
    //     })
    //     )
    // },

    updatePoApprovals: (body) => {

        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                         crm_purchase_po_details
                     SET
                         approval_level = ?, po_expiry = ?,expected_delivery = ?
                    where
                         po_number = ? and supply_store = ? AND po_status=1`,
                    [
                        val.approval_level,
                        val.po_expiry,
                        val.expected_delivery,
                        val.po_number,
                        val.supply_store
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
    getPoDetails: (id, callBack) => {
        pool.query(
            ` SELECT
                    crm_purchase_po_details.po_detail_slno, req_slno, po_number, po_date,expected_delivery, supply_store,
                    main_store,main_store_slno,sub_store_name,store_code,store_recieve,supplier_name,po_type, po_delivery,
                    po_amount, po_to_supplier,approval_level,po_expiry,crf_po_complete_status,po_itm_slno,item_code, item_name,
                     item_qty,item_rate,item_mrp, tax, tax_amount,net_amount,crm_purchase_po_details.crm_purchase_slno
              FROM
                    crm_purchase_po_details
                LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno            
              WHERE
                    req_slno=? AND po_status=1`,
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

    getPOList: (id, callBack) => {
        pool.query(
            `SELECT
                    po_detail_slno, req_slno, po_number,po_date,expected_delivery,supply_store,
                    S.main_store_slno, S.main_store,store_recieve,supplier_name,
                    po_delivery, po_amount,po_to_supplier,approval_level,sub_store_slno,S.sub_store_name
              FROM
                    crm_purchase_po_details
              LEFT JOIN  crm_store_master S ON S.crm_store_master_slno=crm_purchase_po_details.sub_store_slno
              WHERE
                    req_slno=? and po_status=1 `,
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


    InsertWorkOrder: (data, callback) => {

        pool.query(
            `UPDATE
                   crm_purchase_mast
             SET         
                   work_Order_no = ?,
                   work_Order_date = ?,
                   work_Order_status = ?,
                   work_order_remark=?                
             WHERE
                   req_slno =?`,
            [
                data.work_orderNo,
                data.order_date,
                data.ack_status,
                data.ack_remarks,
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
    InsertWorkOrderDetails: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_request_master
             SET         
                 
                   work_order_status=?                
             WHERE
                   req_slno =?`,
            [
                data.ack_status,
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