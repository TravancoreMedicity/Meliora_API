const { pool } = require('../../config/database')
module.exports = {
    requestRegistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_master (
                request_deptsec_slno,
                actual_requirement,
                needed,
                category,
                location,
                expected_date,
                emergency_flag,
                emer_slno,
                emergeny_remarks,
                user_deptsec,
                create_user               
               )
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.request_deptsec_slno,
                data.actual_requirement,
                data.needed,
                JSON.stringify(data.category),
                data.location,
                data.expected_date,
                data.emergency_flag,
                data.emer_slno,
                data.emergeny_remarks,
                data.user_deptsec,
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
    deleteCrfReq: (id, callBack) => {
        pool.query(
            `DELETE from crm_request_master WHERE req_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    requestApprovalInsert: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_approval (
                req_slno,
                incharge_req,
                incharge_approve,
                hod_req,
                dms_req,
                ms_approve_req,
                manag_operation_req,
                senior_manage_req,
                gm_approve_req,
                ed_approve_req,
                md_approve_req,
                managing_director_req
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.incharge_req,
                data.incharge_approve,
                data.hod_req,
                data.dms_req,
                data.ms_approve_req,
                data.manag_operation_req,
                data.senior_manage_req,
                data.gm_approve_req,
                data.ed_approve_req,
                data.md_approve_req,
                data.managing_director_req
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteCrfReqApproval: (id, callBack) => {
        pool.query(
            `DELETE from crm_request_approval WHERE req_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    requestRegistInsertDetl: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                item_brand,
                item_unit,
                item_qnty,
                item_specification,
                item_unit_price,
                aprox_cost,
                item_status,
                approve_item_desc,
                approve_item_brand,
                approve_item_unit,
                item_qnty_approved,
                approve_item_specification,
                approve_item_unit_price,
                approve_aprox_cost,
                item_status_approved,
                approve_item_status,
                create_user  )
               values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.item_slno,
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.item_unit_price,
                data.aprox_cost,
                data.item_status,
                data.approve_item_desc,
                data.approve_item_brand,
                data.approve_item_unit,
                data.item_qnty_approved,
                data.approve_item_specification,
                data.approve_item_unit_price,
                data.approve_aprox_cost,
                data.item_status_approved,
                data.approve_item_status,
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
    // requestRegistInsertDetl: (data, callback) => {
    //     pool.query(
    //         `INSERT INTO crm_request_mast_detail (
    //             req_slno,
    //             item_slno,
    //             item_desc,
    //             item_brand,
    //             item_unit,
    //             item_qnty,
    //             item_specification,
    //             item_unit_price,
    //             aprox_cost,
    //             item_status,
    //             approve_item_desc,
    //             approve_item_brand,
    //             approve_item_unit,
    //             item_qnty_approved,
    //             approve_item_specification,
    //             approve_item_unit_price,
    //             approve_aprox_cost,
    //             item_status_approved,
    //             approve_item_status,
    //             create_user  )
    //            values ?`,
    //         [
    //             data
    //         ],
    //         (error, results, fields) => {

    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );
    // },

    insertApprvitemsStatus: (data, callback) => {
        pool.query(
            `INSERT INTO
                  crm_reqitems_approval_details
                (
                  req_detl_slno,req_slno
                )
            values (?,?)`,
            [
                data.req_detl_slno,
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
    deleteCrfRegItemDetl: (id, callBack) => {
        pool.query(
            `DELETE from crm_request_mast_detail WHERE req_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },


    InHodExist: (id, callBack) => {
        pool.query(
            `select
                   level_one,level_two,co_department_mast.dept_type
             from
                  co_deptsec_mast
              LEFT JOIN co_department_mast on co_department_mast.dept_id=co_deptsec_mast.dept_id
             where
                  sec_id=? `,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getDetailItemList: (id, callBack) => {
        pool.query(
            ` SELECT
                   req_detl_slno,item_slno,item_desc,item_brand,item_unit,am_uom.uom_name,item_qnty,item_specification,
                   aprox_cost,item_status,item_unit_price,item_status_approved,hold_remarks,reject_remarks,po_item_status             
             FROM
                  crm_request_mast_detail
              LEFT JOIN am_uom on am_uom.uom_slno=crm_request_mast_detail.item_unit
             WHERE
                crm_request_mast_detail.req_slno=? and item_status=1 AND item_add_higher=0 `,
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
    UpdateReqMaster: (data, callback) => {
        pool.query(
            `UPDATE crm_request_master 
                SET 
                request_deptsec_slno = ?,
                actual_requirement = ?,
                needed = ?,
                category=?,
                location = ?,
                expected_date=?,
                emergency_flag=?,
                emer_slno=?,
                emergeny_remarks=?,
                user_deptsec=?,
                edit_user=?              
                WHERE req_slno = ?`,
            [
                data.request_deptsec_slno,
                data.actual_requirement,
                data.needed,
                JSON.stringify(data.category),
                data.location,
                data.expected_date,
                data.emergency_flag,
                data.emer_slno,
                data.emergeny_remarks,
                data.user_deptsec,
                data.edit_user,
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

    updateApproveStatus: (data, callback) => {
        pool.query(
            `UPDATE
                   crm_reqitems_approval_details
             SET
                   active_status=0 
             WHERE
                   req_slno = ? AND req_detl_slno=?`,
            [
                data.req_slno,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getApprovListOthers: (callback) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   rm_ndrf,GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                   total_approx_cost,user_deptsec,req_status,req_approv_slno,           
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
                   
                   TD.dept_name,TD.dept_type,TD.dept_id,
                   ack_status, ack_remarks, quatation_calling_status, quatation_calling_remarks, quatation_calling_user,
                   quatation_calling_date, quatation_negotiation, quatation_negotiation_remarks, quatation_negotiation_user,
                   quatation_negotiation_date, quatation_fixing, quatation_fixing_remarks, quatation_fixing_user,
                   quatation_fixing_date, po_prepartion, po_complete,po_complete_date,crm_purchase_po_details.po_to_supplier,
                   po_to_supplier_date,crm_request_master.sub_store_recieve,crm_purchase_po_details.store_recieve
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
              LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
              LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
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
              LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
        WHERE
             incharge_approve=1 AND user_acknldge is null
             GROUP BY crm_request_master.req_slno
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
    // inchargeHOd Data
    getAllReqBasedDept: (data, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                   total_approx_cost,user_deptsec,req_status,req_approv_slno,           
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
                   TD.dept_name,TD.dept_type,TD.dept_id,internally_arranged_status,

                   ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                   crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,
                   user_acknldge,sub_store_name,sub_store_slno,store_receive,
                   store_receive_date,CRS.em_name as crs_user,STR.em_name as store_user,substore_ack_date       
           FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
              LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
              LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
              LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
              LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec                 
              LEFT JOIN co_employee_master CR on CR.em_id=crm_request_master.create_user
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
              LEFT JOIN crm_req_item_collect_details on crm_req_item_collect_details.req_slno=crm_request_master.req_slno                
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
              LEFT JOIN co_employee_master CRS ON CRS.em_id=crm_purchase_mast.store_receive_user
              LEFT JOIN co_employee_master STR ON STR.em_id=crm_req_item_collect_details.substore_user
              LEFT JOIN co_department_mast TD on TD.dept_id=R.dept_id
              LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
        WHERE
             user_deptsec IN (?) AND user_acknldge is null
             GROUP BY crm_request_master.req_slno
             ORDER BY crm_request_master.req_slno DESC`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // crf Registartion page, View table data
    getAllReqBasedDeptreq: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   category,GROUP_CONCAT(item_type_name) as category_name,internally_arranged_status,
                   image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                   total_approx_cost,user_deptsec,req_status,req_approv_slno,internally_arranged_status,           
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
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                   crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,
                   user_acknldge,user_acknldge_remarks,ackUser.em_name as acknowUser,user_ack_date,sub_store_name,store_receive,
                   sub_store_slno, store_receive_date,CRS.em_name as crs_user,STR.em_name as store_user,substore_ack_date
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
              LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category,cast(am_item_type.item_type_slno as json),'$') 
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
              LEFT JOIN co_employee_master STR ON STR.em_id=crm_req_item_collect_details.substore_user
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
              LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
        WHERE
              user_deptsec=?
             GROUP BY crm_request_master.req_slno,crm_purchase_mast.crm_purchase_slno
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
    deleteItemDetails: (data, callback) => {
        pool.query(
            `UPDATE
                    crm_request_mast_detail 
             SET    
                    item_slno=?,item_status=0,approve_item_status=0,delete_user=?
             WHERE  
                    req_slno=? AND req_detl_slno=?`,
            [
                data.item_slno,
                data.delete_user,
                data.req_slno,
                data.req_detl_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EditItemListByReqno: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE 
                            crm_request_mast_detail 
                     SET         
                            item_slno = ?,
                            item_desc = ?,
                            item_brand = ?,
                            item_unit = ?,
                            item_qnty = ?,
                            item_specification = ?,
                            item_unit_price = ?,
                            aprox_cost = ?,
                            approve_item_desc = ?,
                            approve_item_brand = ?,
                            approve_item_unit = ?,
                            item_qnty_approved = ?,
                            approve_item_specification = ?,
                            approve_item_unit_price = ?,
                            approve_aprox_cost = ?,
                            edit_user = ?,
                            item_status = ?,
                            approve_item_status = ?
                     WHERE
                            req_detl_slno =? and req_slno=?`,
                    [
                        val.item_slno,
                        val.item_desc,
                        val.item_brand,
                        val.item_unit,
                        val.item_qnty,
                        val.item_specification,
                        val.item_unit_price,
                        val.aprox_cost,
                        val.approve_item_desc,
                        val.approve_item_brand,
                        val.approve_item_unit,
                        val.item_qnty_approved,
                        val.approve_item_specification,
                        val.approve_item_unit_price,
                        val.approve_aprox_cost,
                        val.edit_user,
                        val.item_status,
                        val.approve_item_status,
                        val.req_detl_slno,
                        val.req_slno
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

    getAllPendingApprovalsAboveHOD: (sql, params, callback) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },

    getAllHoldAndRejectItems: (sql, callback) => {
        pool.query(sql, (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    },
    getPoList: (data, callBack) => {
        const reqSlno = data?.map(d => d.req_slno);
        pool.query(
            ` SELECT  
                    req_slno,po_number,po_to_supplier,approval_level
              FROM
                    crm_purchase_po_details
              WHERE
                    req_slno IN (?) AND po_status=1`,
            [reqSlno],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    searchCrfDetails: (data, callBack) => {
        let query = `
                SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   GROUP_CONCAT(item_type_name) as category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                   total_approx_cost,user_deptsec,req_status,req_approv_slno,           
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
                   TD.dept_name,TD.dept_type,TD.dept_id,

                   ack_status, ack_remarks,PA.em_name as purchase_ackuser,crm_purchase_mast.create_date as ack_date,
                   quatation_calling_status,quatation_calling_remarks,quatation_calling_date,QC.em_name as quatation_user,
                   quatation_negotiation,quatation_negotiation_remarks,quatation_negotiation_date,QN.em_name as quatation_neguser,
                   quatation_fixing,quatation_fixing_remarks,quatation_fixing_date,QF.em_name as quatation_fixuser,
                   po_prepartion, po_complete,po_complete_date,PC.em_name as pocomplete_user,crm_purchase_po_details.po_to_supplier,po_to_supplier_date,
                   crm_request_master.sub_store_recieve,approval_level,crm_purchase_po_details.store_recieve,
                   user_acknldge,user_acknldge_remarks,ackUser.em_name as acknowUser,user_ack_date,sub_store_name,
                   sub_store_slno, store_receive_date,CRS.em_name as crs_user,STR.em_name as store_user,substore_ack_date,
                   po_number
             FROM
                  crm_request_master
                LEFT JOIN crm_request_mast_detail on crm_request_mast_detail.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, cast(am_item_type.item_type_slno as json), '$')
                LEFT JOIN crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_req_item_collect_details on crm_req_item_collect_details.req_slno=crm_request_master.req_slno
                LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id               
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
                LEFT JOIN co_employee_master STR ON STR.em_id=crm_req_item_collect_details.substore_user
                LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.crm_purchase_slno = crm_purchase_mast.crm_purchase_slno
                LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno
                      WHERE 1=1   `;

        const params = [];

        if (data.req_slno) {
            query += " AND crm_request_master.req_slno = ?";
            params.push(data.req_slno);
        }
        if (data.fromCreate && data.toCreate) {
            query += " AND crm_request_master.create_date BETWEEN ? AND ?";
            params.push(data.fromCreate, data.toCreate);
        }
        if (data.userfrom && data.userTo) {
            query += " AND user_ack_date BETWEEN ? AND ?";
            params.push(data.userfrom, data.userTo);
        }
        if (data.dept_id) {
            query += " AND TD.dept_id = ?";
            params.push(data.dept_id);
        }
        if (data.request_deptsec_slno) {
            query += " AND request_deptsec_slno = ?";
            params.push(data.request_deptsec_slno);
        }
        if (data.item_desc) {
            query += " AND crm_request_mast_detail.item_desc like ? AND crm_request_mast_detail.approve_item_status=1";
            params.push('%' + data.item_desc + '%');
        }
        if (data.actual_requirement) {
            query += " AND actual_requirement like ?";
            params.push('%' + data.actual_requirement + '%');
        }
        if (data.needed) {
            query += " AND needed like ?";
            params.push('%' + data.needed + '%');
        }

        query += `
            GROUP BY crm_request_master.req_slno, crm_purchase_po_details.po_number
            ORDER BY crm_request_master.req_slno DESC
        `;

        pool.query(query, params, (err, results, fields) => {
            if (err) {
                return callBack(err);
            }
            return callBack(null, results);
        });
    },

    getackPending: (id, callBack) => {
        pool.query(
            `SELECT 
                   crm_purchase_slno,crm_purchase_mast.req_slno,store_receive
            FROM 
                   crm_purchase_mast
                LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_mast.req_slno     
            WHERE 
                  user_acknldge IS NULL AND user_deptsec=? AND sub_store_recieve=1
		    GROUP BY crm_purchase_slno`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, results)
            }
        )
    },

    UpdateItemReceiveStatus: (data, callback) => {
        pool.query(
            `UPDATE
                    crm_purchase_item_details 
             SET    
                    user_received_status=?
             WHERE  
                    po_itm_slno=?`,
            [
                data.user_received_status,
                data.po_itm_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkStoreReturnItem: (id, callBack) => {
        pool.query(
            `SELECT 
                   po_itm_slno
             FROM 
                   crm_purchase_item_details
                LEFT JOIN  crm_purchase_po_details ON crm_purchase_po_details.po_detail_slno=crm_purchase_item_details.po_detail_slno
             WHERE
                  user_received_status=0 AND crm_purchase_po_details.req_slno=?`,
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

    insertReturnItemDetails: (data, callback) => {
        pool.query(
            `INSERT INTO crm_item_return_to_store_details 
            ( req_slno, po_detail_slno, po_itm_slno, return_remarks, item_return_user,return_date)
              VALUES(?,?,?,?,?,?)`,
            [
                data.req_slno,
                data.po_detail_slno,
                data.po_itm_slno,
                data.return_remarks,
                data.item_return_user,
                data.return_date
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    itemReturnDetailsForViewStore: (data, callback) => {
        pool.query(
            `SELECT
                    item_return_slno, req_slno, crm_item_return_to_store_details.po_detail_slno,
                    crm_item_return_to_store_details.po_itm_slno, return_remarks, CR.em_name as return_user,
                    return_date,item_name,store_return_received_remarks,RU.em_name as item_received_user,
                    received_user,received_date,received_status_return
			FROM 
                    crm_item_return_to_store_details
                LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_itm_slno=crm_item_return_to_store_details.po_itm_slno
                LEFT JOIN co_employee_master CR on CR.em_id=crm_item_return_to_store_details.item_return_user
				LEFT JOIN co_employee_master RU on RU.em_id=crm_item_return_to_store_details.received_user
            WHERE
                    req_slno in (?) AND return_status=1
            GROUP BY
				    po_detail_slno,po_itm_slno`,
            [data],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    returnReplyDetails: (body) => {
        return Promise.all(body.map((val) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `UPDATE
                         crm_item_return_to_store_details
                     SET
                         store_issue_remarks = ?, store_user = ?, issued_date = ?, return_status = ?,
                         store_return_received_remarks = ?, received_user = ?, received_date = ?,
                         received_status_return = 1
                     WHERE
                         item_return_slno = ? `,
                    [
                        val.store_issue_remarks,
                        val.store_user,
                        val.issued_date,
                        val.return_status,
                        val.store_return_received_remarks,
                        val.received_user,
                        val.received_date,
                        val.item_return_slno
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

    viewItemReturnDetails: (id, callback) => {
        pool.query(
            `SELECT
                    item_return_slno, req_slno,po_detail_slno,po_itm_slno, return_remarks,UR.em_name as return_user,
                    return_date, store_issue_remarks, SR.em_name as store_rply_user,issued_date, return_status,
                    received_status_return
			FROM 
                    crm_item_return_to_store_details
                LEFT JOIN co_employee_master UR on UR.em_id=crm_item_return_to_store_details.item_return_user
                LEFT JOIN co_employee_master SR on SR.em_id=crm_item_return_to_store_details.store_user
            WHERE
                    req_slno =?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getCrfDetailsForBiomedical: (data, callback) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,
                   crm_request_master.actual_requirement,
                   crm_request_master.needed,
                   R.sec_name as req_deptsec,
                   U.sec_name as user_deptsection,
                   CR.em_name as create_user,
                   crm_emergencytype_mast.emer_type_name,
                   crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,
                   crm_request_master.location,
                   emergeny_remarks,
                   expected_date,
                   image_status,
                   emergency_flag,
                   emer_slno,
                   req_date,
                   TD.dept_id,
                   TD.dept_name,
                   TD.dept_type,
                   user_deptsec,
                   req_status,
                   category,
                   GROUP_CONCAT(item_type_name) as category_name
               FROM
                   crm_request_master
                   LEFT JOIN crm_request_approval ON crm_request_approval.req_slno = crm_request_master.req_slno
                   LEFT JOIN am_item_type ON JSON_CONTAINS(crm_request_master.category, CAST(am_item_type.item_type_slno AS JSON), '$')
                   LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno = crm_request_master.emer_slno
                   LEFT JOIN co_deptsec_mast R ON R.sec_id = crm_request_master.request_deptsec_slno
                   LEFT JOIN co_deptsec_mast U ON U.sec_id = crm_request_master.user_deptsec                 
                   LEFT JOIN co_employee_master CR ON CR.em_id = crm_request_master.create_user
                   LEFT JOIN co_department_mast TD ON TD.dept_id = R.dept_id
               WHERE
                   (incharge_approve = 1 OR hod_approve = 1) 
                   AND JSON_CONTAINS(category, '7', '$') AND req_status='A' AND user_acknldge is null
                   AND req_date BETWEEN ? AND ?
               GROUP BY
                   crm_request_master.req_slno  
               ORDER BY
                   crm_request_master.req_slno DESC`,
            [
                data.from,
                data.to
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