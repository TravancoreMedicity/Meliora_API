const { pool } = require('../../config/database')
module.exports = {
    getClosedReqList: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where crf_close=1  ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAllReqListNotAck: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getRejectedReqList: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where 
            req_status = "R"
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getOnHoldReqList: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where req_status = "P" 
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getMOAppvalPending: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 and manag_operation_approv is null
            and senior_manage_approv is null and gm_approve is null
            and ed_approve is null and md_approve is null and crf_close is null
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getSMOAppvalPending: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 and senior_manage_approv is null
            and gm_approve is null
            and ed_approve is null and md_approve is null and crf_close is null
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getGMAppvalPending: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 and gm_approve is null
             and crf_close is null
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getMDAppvalPending: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 and md_approve is null and gm_approve=1
             and crf_close is null
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getEDAppvalPending: (callback) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where incharge_approve=1 and ed_approve is null and gm_approve=1
             and crf_close is null
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getRejectedReqListdateRange: (data, callBack) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where 
            req_status = "R" and date(crm_request_master.create_date) between ? and ?
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC`,
            [
                data.startdate,
                data.endDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    OnHoldListApiDateRange: (data, callBack) => {
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
                       crf_close,crf_close_remark,crf_close_user,crf_closed_one,close_date,
                       ack_status,quatation_calling_status,quatation_negotiation,quatation_fixing,
                       po_prepartion,po_complete,po_approva_level_one,po_approva_level_two,po_to_supplier,
                       hod_image,dms_image,ms_image,mo_image,smo_image,gm_image,ed_image,md_image,
                     store_receive,
                     ack_remarks,quatation_calling_date,quatation_negotiation_date,quatation_fixing_date,
                     po_complete_date, TD.dept_name,TD.dept_type

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
            left join co_deptsec_mast T on T.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast TD on TD.dept_id=T.dept_id
            left join crm_purchase_mast on crm_purchase_mast.req_slno=crm_request_master.req_slno
            where req_status = "P"  and date(crm_request_master.create_date) between ? and ?
            and user_acknldge is null ORDER BY crm_request_master.req_slno DESC
            `,
            [
                data.startdate,
                data.endDate
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