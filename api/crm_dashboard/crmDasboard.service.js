const { pool } = require('../../config/database')
module.exports = {

    getAllListDashboard: (callback) => {
        pool.query(
            `SELECT
                  crm_request_master.req_slno, incharge_req, incharge_approve, hod_req, hod_approve, dms_req, dms_approve,
                  ms_approve_req, ms_approve, manag_operation_req, manag_operation_approv,senior_manage_req,
                  senior_manage_approv,gm_approve_req, gm_approve,ed_approve_req, ed_approve,md_approve_req,md_approve,
                  managing_director_req, managing_director_approve,req_status
             FROM
                 crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
             WHERE
              (incharge_approve=1 || incharge_approve is null) AND user_acknldge is null AND crf_close is null 
            GROUP BY crm_request_master.req_slno
            ORDER BY crm_request_master.req_slno DESC `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getApprvPendingDashboard: (sql, callback) => {
        pool.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getAprvlDetailsView: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,crm_request_master.create_date,user_deptsec,         
                   incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                   ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                   md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                    managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image
            FROM
                  crm_request_master
                LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
                LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
                LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
                LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
                LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
                LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
                LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
                LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
                LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
                LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
                LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
                 LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
            WHERE
                  crm_request_master.req_slno=?
                 GROUP BY crm_request_master.req_slno
                 ORDER BY crm_request_master.req_slno DESC`,
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

    getCRFPurchaseDashboard: (callback) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno, ack_status,quatation_calling_status,quatation_negotiation,
                   quatation_fixing,po_prepartion, po_complete,crm_purchase_po_details.po_to_supplier,approval_level         
            FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
            WHERE
                 ed_approve = 1 AND md_approve = 1 AND user_acknldge is null AND crf_close is null
                GROUP BY crm_request_master.req_slno,crm_purchase_po_details.po_number
                ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    gePurchaseDetails: (sql, callback) => {
        pool.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getPurchaseApprvlView: (data, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,crm_request_master.create_date,user_deptsec,req_status,req_approv_slno,           
                   incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                   ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                   md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                     managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,

                    ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
              LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
              LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
              LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno            
              LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
              LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
              LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
              LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
              LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
              LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
              LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
              LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
              LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
              LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
              LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
              LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
              LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
              LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
              LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
              LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
              LEFT JOIN co_employee_master PC ON PC.em_id=crm_purchase_mast.po_complete_user
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
            WHERE
                 crm_request_master.req_slno=? AND (? IS NULL OR crm_purchase_po_details.po_number = ?)
             GROUP BY crm_request_master.req_slno
             ORDER BY crm_request_master.req_slno DESC`,
            [
                data.req_slno,
                data.po_number,
                data.po_number
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getCrfStoreDetailsDashborad: (callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_purchase_po_details.po_to_supplier,store_recieve,
                   crm_purchase_po_details.sub_store_recieve,po_number
             FROM
                   crm_request_master
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.req_slno=crm_request_master.req_slno
             WHERE
                  crm_purchase_po_details.po_to_supplier=1 AND user_acknldge is null AND req_status!='C' 
                GROUP BY crm_request_master.req_slno,po_number
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
    getCRFStoreDetails: (sql, callback) => {
        pool.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getStoreApprvlViewCRF: (data, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,crm_request_master.create_date,user_deptsec,req_status,req_approv_slno,           
                   incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                   I.em_name as incharge_user,
                   hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                   dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                   ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                   manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                   om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,senior_manage_req, senior_manage_approv,
                   smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,gm_approve_req, gm_approve,
                   gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,ed_approve_req, ed_approve,
                   ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,md_approve_req,md_approve,
                   md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                     managing_director_req, managing_director_approve, managing_director_remarks, managing_director_analysis,
                    managing_director_approve_date,MAD.em_name as managing_director_username, managing_director_image,
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,

                   ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,
                   crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                   crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,
                   store_receive_date,CRS.em_name as crs_user
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
              LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
              LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
              LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
              LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_req_item_collect_details on crm_req_item_collect_details.req_slno=crm_request_master.req_slno                
              LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
              LEFT JOIN co_employee_master I on I.em_id=crm_request_approval.incharge_user
              LEFT JOIN co_employee_master H on H.em_id=crm_request_approval.hod_user
              LEFT JOIN co_employee_master D on D.em_id=crm_request_approval.dms_user
              LEFT JOIN co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
              LEFT JOIN co_employee_master C on C.em_id=crm_request_approval.crf_close_user
              LEFT JOIN co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
              LEFT JOIN co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
              LEFT JOIN co_employee_master GM on GM.em_id=crm_request_approval.gm_user
              LEFT JOIN co_employee_master ED on ED.em_id=crm_request_approval.ed_user
              LEFT JOIN co_employee_master MD on MD.em_id=crm_request_approval.md_user
              LEFT JOIN co_employee_master MAD on MAD.em_id=crm_request_approval.managing_director_user
              LEFT JOIN co_employee_master PA ON PA.em_id=crm_purchase_mast.create_user
              LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
              LEFT JOIN co_employee_master QN On QN.em_id=crm_purchase_mast.quatation_negotiation_user
              LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
              LEFT JOIN co_employee_master ackUser on ackUser.em_id=crm_request_master.user_ack_user
              LEFT JOIN co_employee_master PC ON PC.em_id=crm_purchase_mast.po_complete_user
              LEFT JOIN co_employee_master CRS ON CRS.em_id=crm_purchase_mast.store_receive_user
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
              LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
            WHERE
                 crm_request_master.req_slno=?
                 AND crm_purchase_po_details.po_number = ?
                 AND crm_purchase_po_details.po_to_supplier = 1
                 AND user_acknldge is NULL
                 AND req_status!='C' 
             GROUP BY crm_request_master.req_slno
             ORDER BY crm_request_master.req_slno DESC`,
            [
                data.req_slno,
                data.po_number
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getDeliveryMarkingDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                    delivery_mark_slno,supplier_name,dc_mark_date,dc_receive_date,mt_direct,mt_courier,package_count,
                    delivery_bill_details,remarks,E.em_name as received_user
             FROM 
                   crm_delivery_marking
                LEFT JOIN co_employee_master E ON E.em_id=crm_delivery_marking.received_user                    
             WHERE    
                 dc_receive_date between ? AND ?
             ORDER BY dc_receive_date DESC`,
            [
                data.from,
                data.to
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getAllPoDetails: (id, callBack) => {
        pool.query(
            `SELECT
                    marking_po_slno,po_number,po_date,crs_store,S.main_store,expected_delivery
            FROM
                   crm_delivery_marking_po_details
                LEFT JOIN crm_store_master S ON S.main_store_slno=crm_delivery_marking_po_details.crs_store
            WHERE
                   delivery_mark_slno=?
            GROUP BY marking_po_slno       `,
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
    getAllItemDetails: (data, callBack) => {
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
                     Main.create_date BETWEEN ? AND ?
                GROUP BY
                    Main.item_code  `,
            [
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
    getStoreAckDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                   crm_req_item_collect_details.req_slno,R.sec_name as req_deptsec,sub_store_name,substore_remarks,
                   SUB.em_name as store_user,substore_ack_date,received_status
             FROM
                   crm_req_item_collect_details
                 LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_req_item_collect_details.req_slno
                 LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                 LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_req_item_collect_details.substore_slno
                 LEFT JOIN co_employee_master SUB on SUB.em_id=crm_req_item_collect_details.substore_user
             WHERE  
                  substore_ack_date between ? and ?`,
            [
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

    getUserAckDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                   crm_req_item_collect_details.req_slno,R.sec_name as req_deptsec,sub_store_name,
                   received_user_remarks,U.em_name as receive_user,received_date,received_status
             FROM
                   crm_req_item_collect_details
                 LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_req_item_collect_details.req_slno
                 LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                 LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_req_item_collect_details.substore_slno
                 LEFT JOIN co_employee_master U on U.em_id=crm_req_item_collect_details.received_user
             WHERE  
                  received_date between ? and ?`,
            [
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

    getCompletedCRF: (data, callback) => {
        pool.query(
            `SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    GROUP_CONCAT(item_type_name) as category,
                    crm_request_master.location,R.sec_name as req_deptsec,U.sec_name as user_deptsection,
                    CR.em_name as create_user,expected_date,crm_request_master.create_date
            FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
            WHERE
                 user_acknldge=1 AND user_ack_date between ? AND ?
                GROUP BY crm_request_master.req_slno
                ORDER BY crm_request_master.req_slno DESC`,
            [
                data.from,
                data.to
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}