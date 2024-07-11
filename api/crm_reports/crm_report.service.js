const { pool } = require('../../config/database')
module.exports = {

    getCRFNoBased: (id, callBack) => {
        pool.query(
            `select crm_request_master.req_slno, co_department_mast.dept_name,RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, CU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date,
            incharge_req, incharge_approve, incharge_remarks, inch_detial_analysis,incharge_apprv_date,
            I.em_name as incharge_user, hod_req, hod_approve, hod_remarks, hod_detial_analysis,
            hod_approve_date,H.em_name as hod_user, hod_image, dms_req, dms_approve, dms_remarks,
            dms_detail_analysis, dms_approve_date, D.em_name as dms_user, dms_image,ms_approve_req,
            ms_approve, ms_approve_remark, ms_detail_analysis, ms_approve_date, M.em_name as ms_approve_user,
            ms_image, manag_operation_req, manag_operation_approv, manag_operation_remarks, om_detial_analysis,
            om_approv_date, OM.em_name as manag_operation_user, mo_image, senior_manage_req, senior_manage_approv, senior_manage_remarks,
            smo_detial_analysis, som_aprrov_date, SM.em_name as  senior_manage_user, smo_image, gm_approve_req,
            gm_approve, gm_approve_remarks,gm_detial_analysis, gm_approv_date, GM.em_name as  gm_user,
            gm_image, ed_approve_req, ed_approve, ed_approve_remarks, ed_detial_analysis,
            ed_approve_date,  ED.em_name as  ed_user, ed_image, md_approve_req, md_approve, md_approve_remarks,
            md_detial_analysis, md_approve_date, MD.em_name as md_user, md_image, crf_close,
            crf_close_remark, crf_close_user, crf_closed_one, close_date             
            
            from crm_request_master
 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master CU on CU.em_id=crm_request_master.create_user
			left join crm_request_approval on crm_request_approval.req_slno=crm_request_master.req_slno
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
            
            where crm_request_master.req_slno=?
            group by crm_request_master.req_slno`,
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
    getdataUserAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge=1
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataUserNotAcknldged: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
           needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
            and user_acknldge is NULL
               group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getdataAllCRF: (data, callBack) => {
        pool.query(
            `select ROW_NUMBER() over (order by req_slno) as slno,req_slno, co_department_mast.dept_name,
            RDS.sec_name,  actual_requirement,
            needed, category, location, date(expected_date) as expected_date, emergency_flag, emer_slno,
            crm_emergencytype_mast.emer_type_name, emergeny_remarks, total_approx_cost,
            UDS.sec_name as user_deptsec,  req_status, image_status, RU.em_name as req_user,
            crm_request_master.create_date as req_date,  user_acknldge, user_acknldge_remarks,
            user_ack_user, user_ack_date ,  AU.em_name as ack_user         
              
            from crm_request_master 
            left join co_deptsec_mast RDS on RDS.sec_id=crm_request_master.request_deptsec_slno
            left join co_department_mast on co_department_mast.dept_id=RDS.dept_id
            left join crm_emergencytype_mast on crm_emergencytype_mast.emergency_slno=crm_request_master.emer_slno
            left join co_deptsec_mast UDS on RDS.sec_id=crm_request_master.user_deptsec
            left join co_employee_master RU on RU.em_id=crm_request_master.create_user
             left join co_employee_master AU on AU.em_id=crm_request_master.user_ack_user
            where date(crm_request_master.create_date) between ? and ?
                 group by req_slno
             `,

            [
                data.start_date,
                data.end_date
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getPurchaseDetails: (id, callBack) => {
        pool.query(
            `SELECT  req_slno, ack_status, ack_remarks,AC.em_name as ack_user,crm_purchase_mast.create_date as ack_date,
            quatation_calling_status, quatation_calling_remarks, QC.em_name as quat_call_user, quatation_calling_date, 
            quatation_negotiation, quatation_negotiation_remarks, QN.em_name as quat_nego_user, quatation_negotiation_date,
            quatation_fixing, quatation_fixing_remarks, QF.em_name as quat_final_user, quatation_fixing_date,
            po_prepartion, po_complete, PC.em_name as po_completeuser, po_complete_date, po_approva_level_one, po_approva_level_two, 
            po_to_supplier, store_receive, store_receive_user, store_receive_date, sub_store_recieve
 
                FROM meliora.crm_purchase_mast
 
            left join co_employee_master AC on AC.em_id=crm_purchase_mast.create_user
             left join co_employee_master QC on QC.em_id=crm_purchase_mast.quatation_calling_user
              left join co_employee_master QN on QN.em_id=crm_purchase_mast.quatation_negotiation_user
               left join co_employee_master QF on QF.em_id=crm_purchase_mast.quatation_fixing_user
              left join co_employee_master PC on PC.em_id=crm_purchase_mast.po_complete_user

            WHERE req_slno=?`,
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
    getPOdetailStores: (id, callBack) => {
        pool.query(
            `SELECT po_log_slno, po_slno, receive_date,CR.em_name as crs_receive_user, partialy, fully, 
            substore_receive, SR.em_name as sotre_receive_user, substore_receive_date

            FROM meliora.crm_po_log_detail 
            left join co_employee_master CR on CR.em_id=crm_po_log_detail.receive_user
            left join co_employee_master SR on SR.em_id=crm_po_log_detail.substore_receive_user
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
}
