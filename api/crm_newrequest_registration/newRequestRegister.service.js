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
                data.category,
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
    requestRegistInsertDetl: (data, callback) => {
        pool.query(
            `INSERT INTO crm_request_mast_detail (
                req_slno,
                item_slno,
                item_desc,
                approve_item_desc,
                item_brand,
                approve_item_brand,
                item_unit,
                approve_item_unit,
                item_qnty,
                item_qnty_approved,
                item_specification,
                approve_item_specification,
                item_unit_price,
                approve_item_unit_price,
                aprox_cost,
                approve_aprox_cost,
                item_status,
                item_status_approved,
                approve_item_status,
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
                md_approve_req
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.md_approve_req
            ],
            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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


    getAllReqBasedDept: (data, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
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
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                   
                   TD.dept_name,TD.dept_type,
                   ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                   po_prepartion,po_complete,crm_purchase_po_details.po_to_supplier,crm_request_master.sub_store_recieve,
                   crm_purchase_po_details.store_recieve
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
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
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.req_slno=crm_request_master.req_slno
        WHERE
             user_deptsec IN (?) and user_acknldge is null
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

    getDetailItemList: (id, callBack) => {
        pool.query(
            `SELECT
                   req_detl_slno,req_slno,item_slno,item_desc,item_brand,item_unit,am_uom.uom_name,
                   item_qnty,item_specification,aprox_cost,item_status,item_unit_price,item_status_approved
             FROM
                  crm_request_mast_detail
            LEFT JOIN am_uom on am_uom.uom_slno=crm_request_mast_detail.item_unit
             WHERE
                req_slno=? and item_status=1 and item_add_higher!=1`,
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
                data.category,
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


    getApprovListOthers: (callback) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,crm_request_master.create_date as req_date,
                        req_approv_slno,           
                       incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis, incharge_apprv_date,
                        I.em_name as incharge_user,
                       hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                       dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                       ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                       manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                       om_approv_date, OM.em_name as manag_operation_user,
                       senior_manage_remarks,  senior_manage_req, senior_manage_approv,
                       smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,
                       gm_approve_req, gm_approve, gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,
                       ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
                       md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,crm_purchase_po_details.po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

                         from crm_request_master
                       LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
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
          LEFT JOIN co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
          LEFT JOIN co_department_mast TD on TD.dept_id=T.dept_id
          LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
          LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.req_slno=crm_request_master.req_slno
            where incharge_approve=1 
            and user_acknldge is null
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


    getAllReqBasedDeptreq: (id, callBack) => {
        pool.query(
            `SELECT
                   crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                   R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                   crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                   crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                   crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                   rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
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
                   hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                   
                   ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                   po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,user_acknldge,
                   crm_purchase_po_details.po_to_supplier,crm_request_master.sub_store_recieve,
                   crm_purchase_po_details.store_recieve,user_acknldge_remarks,ackUser.em_name as acknowUser,user_ack_date,
            FROM
                  crm_request_master
              LEFT JOIN crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
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
              LEFT JOIN co_employee_master ackUser on ackUser.em_id=crm_request_master.user_ack_user
              LEFT JOIN crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
              LEFT JOIN crm_purchase_po_details on crm_purchase_po_details.req_slno=crm_request_master.req_slno
        WHERE
              user_deptsec=?
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
                            delete_user = ?,
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
                        val.delete_user,
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

    getAllListDashboard: (callback) => {
        pool.query(
            `SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,
                    R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
                    crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
                    crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                    crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                    rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                    total_approx_cost,user_deptsec,req_status,req_approv_slno,incharge_req, incharge_approve,
                    incharge_remarks, inch_detial_analysis, incharge_apprv_date,I.em_name as incharge_user,
                    hod_req, hod_approve, hod_remarks, hod_detial_analysis, hod_approve_date, H.em_name as hod_user,
                    dms_req, dms_approve, dms_remarks, dms_detail_analysis, dms_approve_date, D.em_name as dms_user,
                    ms_approve_req, ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
                    manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
                    om_approv_date, OM.em_name as manag_operation_user,senior_manage_remarks,  senior_manage_req,
                    senior_manage_approv,smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user,
                    gm_approve_req, gm_approve, gm_approve_remarks, gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,
                    ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis, ed_approve_date, ED.em_name as  ed_user,
                    md_approve_req,md_approve,md_approve_remarks,md_detial_analysis,md_approve_date,MD.em_name as md_user,
                    ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                    po_prepartion,po_complete,crm_purchase_po_details.po_to_supplier,crm_request_master.sub_store_recieve,
                    crm_purchase_po_details.store_recieve,TD.dept_type,TD.dept_id,hod_image,dms_image,ms_image,mo_image,
                    smo_image,gm_image,ed_image,md_image
            FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
                LEFT JOIN co_employee_master I ON I.em_id=crm_request_approval.incharge_user
                LEFT JOIN co_employee_master H ON H.em_id=crm_request_approval.hod_user
                LEFT JOIN co_employee_master D ON D.em_id=crm_request_approval.dms_user
                LEFT JOIN co_employee_master M ON M.em_id=crm_request_approval.ms_approve_user
                LEFT JOIN co_employee_master C ON C.em_id=crm_request_approval.crf_close_user
                LEFT JOIN co_employee_master OM ON OM.em_id=crm_request_approval.manag_operation_user
                LEFT JOIN co_employee_master SM ON SM.em_id=crm_request_approval.senior_manage_user
                LEFT JOIN co_employee_master GM ON GM.em_id=crm_request_approval.gm_user
                LEFT JOIN co_employee_master ED ON ED.em_id=crm_request_approval.ed_user
                LEFT JOIN co_employee_master MD ON MD.em_id=crm_request_approval.md_user
                LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.req_slno=crm_request_master.req_slno
            WHERE
                 ( incharge_approve=1 || incharge_approve is null) AND user_acknldge is null
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

    getCRFPurchaseDashboard: (callback) => {
        pool.query(
            `SELECT
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,category,
                    crm_request_master.location,crm_request_master.request_deptsec_slno,R.sec_name as req_deptsec,user_deptsec,
                    U.sec_name as user_deptsection,CR.em_name as create_user,emergency_flag,crm_emergencytype_mast.emer_type_name,
                    emergeny_remarks,expected_date,crm_request_master.create_date,req_status,
                    TD.dept_type,TD.dept_id,

                    ack_status,ack_remarks,QA.em_name as ack_user,crm_purchase_mast.create_date as ackdate,
                    quatation_calling_status,quatation_calling_remarks,QC.em_name as qcall_user,
                    quatation_calling_date,quatation_negotiation,quatation_negotiation_remarks,QN.em_name as nego_user,
                    quatation_negotiation_date,quatation_fixing,quatation_fixing_remarks,QF.em_name as fix_user,
                    quatation_fixing_date,po_prepartion
                    
            FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
                LEFT JOIN crm_emergencytype_mast ON crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                LEFT JOIN co_deptsec_mast R ON R.sec_id=crm_request_master.request_deptsec_slno
                LEFT JOIN co_deptsec_mast U ON U.sec_id=crm_request_master.user_deptsec
                LEFT JOIN co_employee_master CR ON CR.em_id=crm_request_master.create_user
                LEFT JOIN co_department_mast TD ON TD.dept_id=R.dept_id
                LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_request_master.req_slno
                LEFT JOIN co_employee_master QA ON QA.em_id=crm_purchase_mast.create_user
                LEFT JOIN co_employee_master QC ON QC.em_id=crm_purchase_mast.quatation_calling_user
                LEFT JOIN co_employee_master QN ON QN.em_id=crm_purchase_mast.quatation_negotiation_user
                LEFT JOIN co_employee_master QF ON QF.em_id=crm_purchase_mast.quatation_fixing_user
                LEFT JOIN crm_purchase_po_details ON crm_purchase_po_details.req_slno=crm_request_master.req_slno
            WHERE
                 ( ed_approve = 1 && md_approve = 1) AND user_acknldge is null
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
    getpoApproovalDetails: (callBack) => {
        pool.query(
            `SELECT 
                    crm_purchase_po_details.po_detail_slno, crm_purchase_po_details.req_slno,crm_purchase_po_details.po_number,crm_store_master.crs_store_code,
                   po_date,supply_store,po_to_supplier_date,expected_delivery,main_store, sub_store_name,sub_store_slno,supplier_name,po_delivery, po_amount, approval_level,
                   po_type, po_expiry,item_code, item_name, item_qty,item_rate,item_mrp,tax,tax_amount,net_amount,
                   item_receive_status,grn_qnty,received_qnty,crm_store_grn_details.grn_no,po_prepartion, crm_purchase_slno,user_acknldge,
                   po_complete,PC.em_name as po_complt_user, po_complete_date,crm_purchase_po_details.po_to_supplier,
                   SR.em_name as store_user,store_receive_date,store_recieve,crm_purchase_po_details.sub_store_recieve
            FROM 
		          crm_purchase_po_details  
               LEFT JOIN crm_request_master ON crm_request_master.req_slno=crm_purchase_po_details.req_slno
               LEFT JOIN crm_store_master ON crm_store_master.crm_store_master_slno=crm_purchase_po_details.sub_store_slno 
               LEFT JOIN crm_purchase_item_details ON crm_purchase_item_details.po_detail_slno=crm_purchase_po_details.po_detail_slno
               LEFT JOIN crm_purchase_mast ON crm_purchase_mast.req_slno=crm_purchase_po_details.req_slno
               LEFT JOIN crm_store_grn_details ON ( crm_store_grn_details.po_number=crm_purchase_po_details.po_number and crm_store_grn_details.store_code=crm_store_master.crs_store_code)
			   LEFT JOIN co_employee_master PC ON PC.em_id=crm_purchase_mast.po_complete_user
               LEFT JOIN co_employee_master SR ON SR.em_id=crm_purchase_mast.store_receive_user
            WHERE
                     crm_purchase_mast.po_prepartion=1 AND crm_request_master.user_acknldge is null 
              GROUP BY crm_purchase_po_details.po_detail_slno, crm_purchase_item_details.po_itm_slno
			  ORDER BY crm_purchase_po_details.req_slno DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getDeliveryMarkingDetails: (data, callBack) => {
        pool.query(
            `SELECT 
                   delivery_mark_slno,supplier_name,dc_mark_date,dc_receive_date,mt_direct,mt_courier,package_count,delivered_bill_no,
                   delivered_bill_date,remarks,E.em_name as received_user
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
                    delivery_mark_slno,crm_delivery_marking_po_details.marking_po_slno,po_number,po_date,crs_store,S.main_store,expected_delivery,
                    checking_item_slno,item_code,item_name,item_qty,item_rate,item_mrp,received_qty
             FROM
                   crm_delivery_marking_po_details
                LEFT JOIN crm_store_master S ON S.main_store_slno=crm_delivery_marking_po_details.crs_store
                LEFT JOIN crm_checking_delivered_item_details I ON I.marking_po_slno=crm_delivery_marking_po_details.marking_po_slno
             WHERE    
                 checked_date between ? AND ?
             GROUP BY  checking_item_slno`,
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
                    crm_request_master.req_slno,crm_request_master.actual_requirement,crm_request_master.needed,category,
                    crm_request_master.location,R.sec_name as req_deptsec,U.sec_name as user_deptsection,
                    CR.em_name as create_user,expected_date,crm_request_master.create_date
            FROM
                    crm_request_master
                LEFT JOIN crm_request_approval ON crm_request_approval.req_slno=crm_request_master.req_slno
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