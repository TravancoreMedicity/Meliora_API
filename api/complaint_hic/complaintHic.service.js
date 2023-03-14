const { pool } = require('../../config/database')
module.exports = {
    getcomplaintAll: (callBack) => {
        pool.query(
            `SELECT cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,
            compalint_date, 
            IFNULL(assigned_date,"Not Assign") as assigned_date,
            IFNULL(cm_rectify_time,"Not Updated") as cm_rectify_time,
               IFNULL(cm_verfy_time,"Not updated") as cm_verfy_time,   
              IFNULL(em_name,"Not assigned" ) em_name,
                       S.sec_name as sec_name, 
              IFNULL( L.sec_name,"Nil" ) location,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,
                req_type_name,
                complaint_dept_name,
                complaint_type_name,compalint_status,
                (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
                (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1
                FROM cm_complaint_mast
                LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
               left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                        left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                LEFT JOIN co_employee_master ON co_employee_master.em_id=cm_complaint_detail.assigned_emp                
                where complaint_hicslno=1  group by cm_complaint_mast.complaint_slno ORDER BY compalint_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}