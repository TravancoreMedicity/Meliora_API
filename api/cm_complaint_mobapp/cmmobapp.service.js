const { pool } = require('../../config/database')
module.exports = {
    getTotalNotAssigncomplaints: (id, callBack) => {
        pool.query(
            `select
            cm_asset_status,
            cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno,
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name,  C.em_name as create_employee, 
            IFNULL(A.em_name,"Not Assign")as assigned_emp,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,IFNULL(priority_reason,"Not Given")as priority_reason,priority_check,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
            left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and compalint_status=0
            group by complaint_slno`,

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


    getComDetlcountEmp: (id, callBack) => {
        pool.query(
            // `call meliora.GET_COMPLAINT_COUNT(?)`,
            `call GET_COMPLAINT_ASSIGN_COUNT_EMP(?)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getAssignListEmp: (id, callBack) => {
        pool.query(
            `select
            cm_asset_status,
            cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            C.em_name as create_employee, 
            IFNULL(A.em_name,"Not Assign")as assigned_emp,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,IFNULL(priority_reason,"Not Given")as priority_reason,priority_check,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        verify_spervsr,verify_spervsr_remarks,verify_spervsr_user,V.em_name as supervise_employee, 
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
        left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
        left join co_employee_master V on V.em_id=cm_complaint_mast.verify_spervsr_user
        where assigned_emp=? and assign_status=1 and compalint_status=1 and (cm_rectify_status is null or verify_spervsr=2 )group by complaint_slno `,
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

    getAssistListEmp: (id, callBack) => {
        pool.query(
            `select
            cm_asset_status,
            cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            C.em_name as create_employee, 
             IFNULL(R.em_name,"Not Given")as assist_requested_emp,
             assigned_date as requsted_date,
            IFNULL(A.em_name,"Not Assign")as assigned_emp,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        left join co_employee_master A on A.em_id=cm_complaint_detail.assigned_emp
        left join co_employee_master C on C.em_id=cm_complaint_mast.create_user
        left join  co_employee_master R on R.em_id=cm_complaint_detail.assist_requested_emp
        where assigned_emp=? and assist_flag=1 and assist_receive=0 and compalint_status=1 GROUP BY complaint_slno`,

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
    getOnHoldListEmp: (id, callBack) => {
        pool.query(
            `select
            cm_asset_status,
             cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,rectify_pending_hold_remarks,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        where assigned_emp=? and cm_rectify_status='O' and assign_status=1`,

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
    getOnProgressListEmp: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        where assigned_emp=? and cm_rectify_status='P' and assign_status=1`,

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
    getforVerifyListEmp: (id, callBack) => {
        pool.query(
            `select
            cm_asset_status,
             cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        where assign_status=1 and assigned_emp=? and compalint_status=2`,

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
    getforSuperVerifyListEmp: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        where assign_status=1 and assigned_emp=? and compalint_status=2 and verify_spervsr=0`,

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
    getCompleteListEmp: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
        where assign_status=1 and assigned_emp=? and compalint_status=3`,

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

    getAssignListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and compalint_status=1
            group by complaint_slno`,

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

    getAssistListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and assist_receive=1 and assign_status=1
            group by complaint_slno`,

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

    getOnHoldListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and cm_rectify_status='O' 
            group by complaint_slno`,

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

    getOnHoldBeforeAssigntDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and cm_rectify_status='O' and cm_rectify_time is NULL
            group by complaint_slno`,

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


    getOnProgressListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and cm_rectify_status='P'
            group by complaint_slno`,

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

    getforVerifyListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and compalint_status=2
            group by complaint_slno`,

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
    getCompleteListDeptWiseToday: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
              IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
                          IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and date(cm_rectify_time)=current_date()
            group by complaint_slno`,

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


    getforSuperVerifyListDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and compalint_status=2 and verify_spervsr=0
            group by complaint_slno`,

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

    getAssignListAllDetailDeptWise: (id, callBack) => {
        pool.query(
            `select cm_asset_status, cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             compalint_priority,
             IFNULL(escalation_min,"Not Given")as escalation_min,
             IFNULL(escalation_max,"Not Given")as escalation_max,
             IFNULL( cm_priority_mast.cm_priority_desc,"Not Given")as priority,
             IFNULL( l.sec_name,"Nil" ) location, cm_complaint_type.complaint_type_name,
              (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
            s.sec_name as dept_sec
            from cm_complaint_mast            
            left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno =cm_complaint_mast.complaint_deptslno
            left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            left join co_deptsec_mast l on l.sec_id=cm_complaint_mast.cm_location
            left join co_deptsec_mast s on s.sec_id=cm_complaint_mast.complaint_dept_secslno  
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno= cm_complaint_mast.complaint_slno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            left join cm_priority_mast on cm_priority_mast.cm_priority_slno=cm_complaint_mast.compalint_priority
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
             and compalint_status=1
            `,

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


    getcomplaintType: (callBack) => {
        pool.query(
            `SELECT complaint_type_slno,complaint_type_name,cm_complaint_type.complaint_dept_slno,complaint_type_status
            FROM cm_complaint_type
            where complaint_type_status=1
       `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getapkDownloadDetails: (id, callBack) => {
        pool.query(
            `select apk_app_code,apk_app_name,apk_app_filename,apk_app_link,apk_app_version,apk_app_release
            from cm_apk_download_app
            where apk_app_code=?
            `,

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

    getComDetlcountDeptwise: (id, callBack) => {
        pool.query(
            `call GET_COMPLAINT_COUNT_DEPTWISE(?)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getCountCompEmpBasedDept: (id, callBack) => {
        pool.query(
            `SELECT emp,empname,SUM(AA) AA ,SUM(CC) CC
            FROM (
            SELECT 
                D.assigned_emp emp,
                E.em_name empname,
                COUNT(D.complaint_slno) AA,
                0 CC
            FROM cm_complaint_detail D 
            LEFT JOIN cm_complaint_mast M ON M.complaint_slno = D.complaint_slno 
            LEFT JOIN co_employee_master E ON E.em_id = D.assigned_emp 
            WHERE D.assign_status=1 AND M.compalint_status = 1
            GROUP BY D.assigned_emp,M.complaint_deptslno
            UNION ALL
            SELECT 
                D.assigned_emp emp,
                   E.em_name empname,
                0 AA,
                COUNT(D.complaint_slno) CC
            FROM cm_complaint_detail D 
            LEFT JOIN cm_complaint_mast M ON M.complaint_slno = D.complaint_slno
            LEFT JOIN co_employee_master E ON E.em_id = D.assigned_emp  
            WHERE D.assign_status=1  AND (M.compalint_status = 2 OR M.compalint_status = 3)  and date(M.cm_rectify_time)=current_date()
            GROUP BY D.assigned_emp,M.complaint_deptslno) BB 
            WHERE BB.emp in(select em_id from co_employee_master where em_department=? and em_status=1)
            GROUP BY emp order By empname asc`,

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