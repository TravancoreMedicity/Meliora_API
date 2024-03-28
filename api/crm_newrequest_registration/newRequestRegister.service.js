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
            `select level_one,level_two,co_department_mast.dept_type from co_deptsec_mast
            left join co_department_mast on co_department_mast.dept_id=co_deptsec_mast.dept_id
            where sec_id=? `,
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
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                         left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            left join co_employee_master CR on CR.em_id=crm_request_master.create_user
            left join co_employee_master I on I.em_id=crm_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crm_request_approval.hod_user
            left join co_employee_master D on D.em_id=crm_request_approval.dms_user
            left join co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            left join co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            left join co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            left join co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            left join co_employee_master MD on MD.em_id=crm_request_approval.md_user

            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          where user_deptsec IN (?)  ORDER BY crm_request_master.req_slno DESC`,
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
            `  select req_detl_slno,req_slno,item_slno,item_desc,item_brand,item_unit,am_uom.uom_name,
            item_qnty,item_specification,aprox_cost,item_status,item_unit_price
                         from crm_request_mast_detail
                         left join am_uom on am_uom.uom_slno=crm_request_mast_detail.item_unit
                        where req_slno=? and item_status=1 and item_add_higher!=1`,
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

    deleteItemListByReqno: (data, callback) => {
        pool.query(
            `UPDATE crm_request_mast_detail 
                SET item_status = 0 ,
                approve_item_status=0,
                delete_user=?  
                WHERE req_detl_slno =?`,
            [
                data.delete_user,
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


    EditItemListByReqno: (data, callback) => {

        pool.query(
            `UPDATE crm_request_mast_detail 
            SET         
            item_desc = ?,
            item_brand = ?,
            item_unit = ?,
            item_qnty = ?,
            item_specification = ?,
            item_unit_price=?,
            aprox_cost=?,
            item_status=1,
            edit_user=?         
            WHERE req_detl_slno =?`,
            [
                data.item_desc,
                data.item_brand,
                data.item_unit,
                data.item_qnty,
                data.item_specification,
                data.item_unit_price,
                data.aprox_cost,
                data.edit_user,
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
                        total_approx_cost,user_deptsec,req_status,
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                      left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            left join co_employee_master CR on CR.em_id=crm_request_master.create_user
            left join co_employee_master I on I.em_id=crm_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crm_request_approval.hod_user
            left join co_employee_master D on D.em_id=crm_request_approval.dms_user
            left join co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            left join co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            left join co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            left join co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            left join co_employee_master MD on MD.em_id=crm_request_approval.md_user

            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          where incharge_approve=1 and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllListDashboard: (callback) => {
        pool.query(
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                      
                     store_receive

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                    left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            left join co_employee_master CR on CR.em_id=crm_request_master.create_user
            left join co_employee_master I on I.em_id=crm_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crm_request_approval.hod_user
            left join co_employee_master D on D.em_id=crm_request_approval.dms_user
            left join co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            left join co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            left join co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            left join co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            left join co_employee_master MD on MD.em_id=crm_request_approval.md_user

            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                          where incharge_approve=1 and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
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
            `select crm_request_master.req_slno,crm_request_master.actual_requirement,
            crm_request_master.needed,crm_request_master.request_dept_slno,co_department_mast.dept_name,
            R.sec_name as req_deptsec,U.sec_name as user_deptsection,CR.em_name as create_user,
            crf_close,crf_close_remark,crf_closed_one,close_date,C.em_name as closed_user,
            crm_emergencytype_mast.emer_type_name,crm_emergencytype_mast.emer_type_escalation,
                        crm_request_master.request_deptsec_slno,crm_request_master.location,emergeny_remarks,expected_date,
                        rm_ndrf,category,image_status,emergency_flag,emer_slno,crm_request_master.create_date,
                        total_approx_cost,user_deptsec,req_status,
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       sub_store_recieve,user_acknldge,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive

                         from crm_request_master
                         left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
                         left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
                          left join co_department_mast on co_department_mast.dept_id=crm_request_master.request_dept_slno
                          left join co_deptsec_mast R on R.sec_id=crm_request_master.request_deptsec_slno
                          left join co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec
                          
            left join co_employee_master CR on CR.em_id=crm_request_master.create_user
            left join co_employee_master I on I.em_id=crm_request_approval.incharge_user
            left join co_employee_master H on H.em_id=crm_request_approval.hod_user
            left join co_employee_master D on D.em_id=crm_request_approval.dms_user
            left join co_employee_master M on M.em_id=crm_request_approval.ms_approve_user
            left join co_employee_master C on C.em_id=crm_request_approval.crf_close_user
            left join co_employee_master OM on OM.em_id=crm_request_approval.manag_operation_user
            left join co_employee_master SM on SM.em_id=crm_request_approval.senior_manage_user
            left join co_employee_master GM on GM.em_id=crm_request_approval.gm_user
            left join co_employee_master ED on ED.em_id=crm_request_approval.ed_user
            left join co_employee_master MD on MD.em_id=crm_request_approval.md_user

            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
                                     where user_deptsec=?   ORDER BY crm_request_master.req_slno DESC`,
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
}