const { pool } = require('../../config/database')
module.exports = {
    getTotalNotAssigncomplaints: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, C.em_name as create_employee, 
            IFNULL(A.em_name,"Not Assign")as assigned_emp,
             IFNULL(assigned_date,"Not Assign") as assigned_date,priority_check,
              IFNULL(priority_reason,"Not Given")as priority_reason,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
             WHERE 
            complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept where department_slno=?)
            and compalint_status=0 group by complaint_slno`,

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
            `call meliora.GET_COMPLAINT_ASSIGN_COUNT_EMP(?)`,
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
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        where assigned_emp=? and assign_status=1 `,

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
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
        where assigned_emp=? and assist_receive=1 and assign_status=1`,

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
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
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
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
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
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
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
    getCompleteListEmp: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,compalint_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, cm_rectify_time,cm_verfy_time,
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
                 (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
        compalint_status
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
        left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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
            `select cm_complaint_mast.complaint_slno, complaint_desc, complaint_request_slno, complaint_deptslno, 
            complaint_typeslno,compalint_priority, complaint_hicslno, complaint_dept_secslno, compalint_status, 
            compalint_date,complaint_remark,cm_rectify_time, cm_verfy_time, cm_rectify_status, 
            rectify_pending_hold_remarks, verify_remarks, cm_not_verify_time, cm_location,compalint_date,
            req_type_name,complaint_dept_name, assigned_emp, 
            IFNULL(co_employee_master.em_name,"Not Assign")as em_name,
             IFNULL(assigned_date,"Not Assign") as assigned_date,
             (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
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

}