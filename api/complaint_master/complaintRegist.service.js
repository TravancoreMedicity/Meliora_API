const { pool } = require('../../config/database')
module.exports = {
    complaintRegistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO cm_complaint_mast (
                complaint_desc,
                complaint_typeslno,
                complaint_request_slno,
                complaint_deptslno,
                compalint_priority,
                compalint_status,
                complaint_hicslno,
                complaint_dept_secslno,
                cm_location,
                create_user
               )
                VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.complaint_desc,
                data.complaint_typeslno,
                data.complaint_request_slno,
                data.complaint_deptslno,
                data.compalint_priority,
                data.compalint_status,
                data.complaint_hicslno,
                data.complaint_dept_secslno,
                data.cm_location,
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
    complaintRegistUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_complaint_mast 
                SET complaint_desc = ?,
                complaint_dept_secslno = ?,
                complaint_request_slno = ?,
                complaint_deptslno = ?,
                complaint_typeslno = ?,
                compalint_priority = ?,
                complaint_hicslno = ?, 
                cm_location=?,
                edit_user=?          
                WHERE complaint_slno = ?`,
            [
                data.complaint_desc,
                data.complaint_dept_secslno,
                data.complaint_request_slno,
                data.complaint_deptslno,
                data.complaint_typeslno,
                data.compalint_priority,
                data.complaint_hicslno,
                data.cm_location,
                data.edit_user,
                data.complaint_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getcomplaintRegist: (callBack) => {
        pool.query(
            `SELECT cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,
            compalint_date,    
              IFNULL(em_name,"Not assigned" ) em_name,
                       S.sec_name as sec_name, 
              IFNULL( L.sec_name,"Nill" ) location,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,
                req_type_name,
                complaint_dept_name,
                complaint_type_name,
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
                ORDER BY compalint_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getcomplaintRegistByID: (data, callBack) => {
        pool.query(
            `
            SELECT 
            complaint_slno,
            complaint_desc,
            cm_dept_sec,
            cm_request_type,
            cm_complaint_dept,
            cm_complaint_type,
            cm_priority,
            cm_hic_policy,cm_location,
            FROM cm_complaint_master
             WHERE complaint_slno IN(?)`,
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

    getcomplaintListbylogin: (id, callBack) => {
        pool.query(
            `select complaint_slno,
            S.sec_name as sec_name, 
              IFNULL( L.sec_name,"Nill" ) location,
                        complaint_desc,
                        req_type_name,
                        complaint_dept_secslno,
                        complaint_request_slno,
                        complaint_hicslno,
                        compalint_priority,
                        complaint_dept_name,
                        complaint_deptslno,
                        complaint_typeslno,
                        complaint_type_name,
                        cm_complaint_mast.create_user,
                        cm_location,
                        compalint_status,
                        hic_policy_status,
                        cm_rectify_status,
                        rectify_pending_hold_remarks,
                        (case when rectify_pending_hold_remarks is null then "not updated" else rectify_pending_hold_remarks end ) as rectify_pending_hold_remarks1,
                        (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority ,
                        (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                        (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"  when compalint_status = '3' then "Verified"  else "Not" end ) as compalint_status1,
                                     (case when cm_rectify_status = 'R' then "Rectified" when cm_rectify_status = 'P' then "Pending" when cm_rectify_status = 'O' then "On Hold" else "Not" end ) as cm_rectify_status1,
                        compalint_date,compalint_status
                        from 
                        cm_complaint_mast
                        left join co_employee_master on cm_complaint_mast.create_user = co_employee_master.em_id
                        left join co_request_type on cm_complaint_mast.complaint_request_slno = co_request_type.req_type_slno
                        left join cm_complaint_dept on cm_complaint_mast.complaint_deptslno = cm_complaint_dept.complaint_dept_slno
                        left join cm_complaint_type on cm_complaint_mast.complaint_typeslno = cm_complaint_type.complaint_type_slno
                        left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                        left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                        left join cm_hic_policy on cm_complaint_mast.complaint_hicslno = cm_hic_policy.hic_policy_slno
                        where complaint_dept_secslno =?`,
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
    getcomplaintListbydept: (id, callBack) => {
        pool.query(
            `SELECT complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date,
            ROW_NUMBER() over (order by complaint_slno ) as complaint_slno,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nill" ) location,
            complaint_dept_secslno,
            complaint_request_slno,
            complaint_deptslno,
            complaint_typeslno,
            compalint_priority,
            complaint_hicslno,
            req_type_name,
            complaint_dept_name,
            complaint_type_name,
            (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
            (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
            (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" else "Rectified" end ) as compalint_status
            FROM cm_complaint_mast
            LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
            LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
            LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
            left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
            left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
            LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
            where complaint_deptslno = ? `,
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
    getAssignedcomplaint: (callBack) => {
        pool.query(
            `        SELECT  cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,
            compalint_date,assigned_emp,em_name,assigned_date,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nill" ) location,
                assigned_emp,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,
                req_type_name,
                complaint_dept_name,
                complaint_type_name,
                (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
                (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                when compalint_status = '3' then "Verified" end ) as compalint_status1  
              from meliora.cm_complaint_detail
				LEFT JOIN cm_complaint_mast on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
                left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                  left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
                where compalint_status = 1 ORDER BY compalint_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRctifiedcomplaint: (callBack) => {
        pool.query(
            `SELECT  cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,
            compalint_date,assigned_emp,em_name,assigned_date,cm_rectify_time,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nill" ) location,assigned_emp,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,
                req_type_name,
                complaint_dept_name,
                complaint_type_name,
                (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
                (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                when compalint_status = '3' then "Verified" end ) as compalint_status1  
              from meliora.cm_complaint_detail
				LEFT JOIN cm_complaint_mast on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
                left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                  left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
                where compalint_status = 2 ORDER BY compalint_date DESC`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getverifiedcmp: (callBack) => {
        pool.query(
            ` SELECT  cm_complaint_mast.complaint_slno,complaint_desc,DATE_FORMAT(compalint_date,'%d-%m-%Y ')compalint_date1,
            compalint_date,assigned_emp,em_name,assigned_date,cm_rectify_time,
            S.sec_name as sec_name, 
            IFNULL( L.sec_name,"Nill" ) location,assigned_emp,
                complaint_dept_secslno,
                complaint_request_slno,
                compalint_priority,
                req_type_name,
                complaint_dept_name,
                complaint_type_name,
                (case when compalint_priority='1' then "Critical" when compalint_priority='2' then "High" else "Medium" end ) as priority,
                (case when hic_policy_name is not null then hic_policy_name else 'Not Suggested' end )as hic_policy_name,
                (case when compalint_status = '0' then "not assigned" when compalint_status = '1' then "assigned" when compalint_status = '2' then "Rectified"
                when compalint_status = '3' then "Verified" end ) as compalint_status1  
              from meliora.cm_complaint_detail
				LEFT JOIN cm_complaint_mast on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
                LEFT JOIN co_request_type ON co_request_type.req_type_slno=cm_complaint_mast.complaint_request_slno
                LEFT JOIN cm_complaint_dept ON cm_complaint_dept.complaint_dept_slno=cm_complaint_mast.complaint_deptslno
                LEFT JOIN cm_hic_policy ON cm_hic_policy.hic_policy_slno=cm_complaint_mast.complaint_hicslno 
                left join co_deptsec_mast S on S.sec_id=cm_complaint_mast.complaint_dept_secslno
                left join co_deptsec_mast L on L.sec_id=cm_complaint_mast.cm_location
                LEFT JOIN cm_complaint_type ON cm_complaint_type.complaint_type_slno=cm_complaint_mast.complaint_typeslno
                  left join co_employee_master on co_employee_master.em_id=cm_complaint_detail.assigned_emp
                where compalint_status = 3 ORDER BY compalint_date DESC `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}