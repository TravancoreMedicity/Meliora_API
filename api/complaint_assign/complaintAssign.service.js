const { pool } = require('../../config/database')
module.exports = {
    getcomplaintAssign: (id, callBack) => {
        pool.query(
            `  
            select complaint_slno,complaint_desc,complaint_dept_name,req_type_name,
                        complaint_type_name,compalint_date,cm_rectify_status,cm_not_verify_time,verify_remarks,
                        S.sec_name as sec_name, 
                        IFNULL( L.sec_name,"Nil" ) location,co_employee_master.em_name as comp_reg_emp,cm_complaint_mast.create_user,co_employee_master.em_department,
                        co_department_mast.dept_name as empdept,compalint_priority,
                        date(compalint_date) as date,TIME_FORMAT(compalint_date,"%r") AS Time,
                        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name,
                        (case when verify_remarks is null then "Not Updated" else verify_remarks end ) as verify_remarks1,
                        (case when cm_rectify_status='Z' then "Not Verified" when cm_rectify_status="R" then "Verified" end) as cm_rectify_status1,
                        (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority from cm_complaint_mast
                                  left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                                  left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                                  left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                                  left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
                                  left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                                  left join co_employee_master on co_employee_master.em_id=cm_complaint_mast.create_user
                                  left join co_department_mast on co_department_mast.dept_id=co_employee_master.em_department
                     left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                       where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                       where department_slno=?) AND compalint_status=0 ORDER BY complaint_slno DESC`,
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

    checkInsertVal: (data, callBack) => {
        pool.query(
            `select detl_slno from cm_complaint_detail
            where complaint_slno=? and assigned_emp=? `,
            [
                data.complaint_slno,
                data.assigned_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    quickAssign: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assigned_date,
                assign_rect_status,
                assigned_user
            ) 
            VALUES(?,?,?,?,?)`,
            [
                data.complaint_slno,
                data.assigned_emp,
                data.assigned_date,
                data.assign_rect_status,
                data.assigned_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    quickAssigncompstatus: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET compalint_status=1
            WHERE complaint_slno=?`,
            [
                data.complaint_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getEmployee: (id, callBack) => {
        pool.query(
            ` SELECT em_id, em_name ,em_no FROM meliora.co_employee_master where em_department=?
            and em_status=1 and em_no!=1 and em_id!=1606 order by em_name ASC `,
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
    detailedAssign: (data, callBack) => {
        pool.query(
            `  INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assigned_date,
                assign_rect_status,
                assigned_user
            ) 
            VALUES ?`,
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
    getcomplaintAssignbyEmployee: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nil" ) location,cm_rectify_status,assigned_date,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                 date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
                 if(complaint_remark is null,"No Remark",complaint_remark) as complaint_remark,
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
        where assigned_emp=? AND assist_flag =0 ORDER BY complaint_slno DESC`,
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
    detailedAssigncompstatus: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET compalint_status=1
            WHERE complaint_slno=?`,
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
    getassistantEmployee: (data, callBack) => {
        pool.query(
            ` SELECT em_id, em_name FROM meliora.co_employee_master where em_department=? and em_id !=?
            and em_status=1 and em_no!=1 and em_id!=1606`,
            [
                data.em_department,
                data.em_id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    insertAssistemp: (data, callBack) => {
        pool.query(
            `INSERT INTO cm_complaint_detail
            (
                complaint_slno,
                assigned_emp,
                assist_assign_date,
                assist_flag,
                assist_requested_emp,
                assign_rect_status,
                assigned_user
            ) 
            VALUES(?,?,?,?,?,?,?)`,
            [
                data.complaint_slno,
                data.assigned_emp,
                data.assist_assign_date,
                data.assist_flag,
                data.assist_requested_emp,
                data.assign_rect_status,
                data.assigned_user
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    AssignRemark: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_mast
            SET complaint_remark=?
            WHERE complaint_slno=?`,
            [
                data.complaint_remark,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getALLcomplaintbyEmployee: (id, callBack) => {
        pool.query(
            `select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,
            compalint_date,req_type_name,complaint_type_name,S.sec_name as sec_name, 
             IFNULL( L.sec_name,"Nil" ) location,
            assigned_emp,
            if(em_name is null ,'Not Assigned',em_name) as em_name,
             if(assigned_date is null,'Not Assigned',assigned_date) as assigned_date,
                       (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                           when compalint_status = '3' then "Verified" end ) as compalint_status1,
                                (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold"  when cm_rectify_status='Z' then" Not Verified" when cm_rectify_status='V' then"Verified" else "Not Updated" end ) as cm_rectify_status1,
                            date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,cm_rectify_status,
                      if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name
           from cm_complaint_mast   
           left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
           left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
           left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
           left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
           left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
           left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
           left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                      where department_slno=?) ORDER BY complaint_slno DESC`,
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
    getIndividualassitemployee: (id, callBack) => {
        pool.query(
            ` 	  select cm_complaint_mast.complaint_slno,complaint_desc,assigned_date,complaint_dept_name,
            req_type_name,complaint_type_name,
            S.sec_name as sec_name, 
             IFNULL( L.sec_name,"Nil" ) location,
            assist_receive,detl_slno,assist_assign_date,em_name,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High"  else "Medium" end ) as priority ,
                 date(assigned_date) as date,TIME_FORMAT(assigned_date,"%r") AS Time,
        if(cm_complaint_mast.complaint_hicslno is null,'Not Suggested',hic_policy_name) as hic_policy_name
         from meliora.cm_complaint_detail
         left join cm_complaint_mast on cm_complaint_mast.complaint_slno=cm_complaint_detail.complaint_slno
         left join co_request_type on co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
         left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
         left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
         left join cm_hic_policy on cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno
        left join cm_complaint_type on cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
        left join cm_complaint_dept on cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
         left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assist_requested_emp
        where assigned_emp=? AND assist_flag=1 ORDER BY complaint_slno DESC`,
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
    AssistantRecieved: (data, callBack) => {
        pool.query(
            `UPDATE cm_complaint_detail
            SET assigned_date=?,
            assist_receive=?
            WHERE complaint_slno=? AND assigned_emp=? `,
            [
                data.assigned_date,
                data.assist_receive,
                data.complaint_slno,
                data.assigned_emp
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