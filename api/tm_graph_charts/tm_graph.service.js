const { pool } = require('../../config/database')


module.exports = {
    getAlltaskfromtodate: (data, callback) => {

        const fromDate = data.from;
        const toDate = data.to;
        const employeee = data.tm_assigne_emp;

        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            tm_detail_status,
            tm_task_dept_sec,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
			tm_task_due_date, 
            tm_assigne_emp,
            co_employee_master.em_name,
            main_task_slno,
            tm_task_file,
			tm_task_description,
            tm_task_status, 
			tm_project_name,
            tm_project_mast.tm_project_duedate,
            tm_new_task_mast.create_date,
            tm_detail_status,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_complete_date,
            tm_completed_remarks,
            tm_mast_duedate_count, 
            co_setting_master.reschedule_pecent_slno,
            co_setting_master.reschedule_pecent,
            tm_new_task_mast.tm_project_slno
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno
            left join co_setting_master on co_setting_master.reschedule_pecent_slno = tm_new_task_mast.tm_mast_duedate_count
            WHERE tm_detail_status=1 
            and tm_assigne_emp=('${employeee}')
            and tm_new_task_mast.tm_task_due_date between ('${fromDate}') and ('${toDate}')
			group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getProjectsfromtodate: (data, callback) => {

        const fromDate = data.from;
        const toDate = data.to;
        const employeee = data.tm_assigne_emp;

        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
        	tm_project_mast.tm_project_duedate,
     		tm_project_name,
            tm_project_mast.create_date,
            tm_project_mast.tm_project_status,
            tm_new_task_mast.tm_project_slno,
            tm_new_task_mast.main_task_slno,
            tm_project_duedate,
            tm_assigne_emp
             FROM meliora.tm_new_task_mast         
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_assigne_emp=('${employeee}')
            and tm_project_mast.tm_project_duedate between ('${fromDate}') and ('${toDate}')
			group by tm_new_task_mast.tm_project_slno`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },


    getDepttaskfromtodate: (data, callback) => {
        const fromDate = data.from;
        const toDate = data.to;
        const section = data.tm_task_dept_sec;
        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            tm_detail_status,
            tm_task_dept_sec,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
    		tm_task_due_date, 
            tm_assigne_emp,
            co_employee_master.em_name,
            main_task_slno,
            tm_task_file,
    		tm_task_description,
            tm_task_status, 
    		tm_project_name,
            tm_project_mast.tm_project_duedate,
            tm_new_task_mast.create_date,
            tm_detail_status,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            tm_mast_duedate_count,    
            tm_new_task_mast.tm_project_slno
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_detail_status=1 
            and tm_task_dept_sec=('${section}')
            and tm_new_task_mast.tm_task_due_date between ('${fromDate}') and ('${toDate}')
    		group by tm_new_task_mast.tm_task_slno
    		ORDER BY tm_task_slno DESC`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getAllComplaintsfromtodate: (data, callback) => {

        const fromDate = data.from;
        const toDate = data.to;
        const employeee = data.assigned_emp;
        pool.query(
            `select
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_date,
            cm_rectify_time,
            reopen_cm_slno,
            cm_rectify_status
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join cm_reopen_complaint_log on cm_reopen_complaint_log.reopen_complaint_slno=cm_complaint_mast.complaint_slno
            where assigned_emp=('${employeee}')
            and assign_status=1
            and cm_complaint_mast.compalint_date between ('${fromDate}') and ('${toDate}')
			group by cm_complaint_mast.complaint_slno`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    getDeptComplaintsfromtodate: (data, callback) => {

        const fromDate = data.from;
        const toDate = data.to;
        const empdept = data.complaint_deptslno;

        pool.query(
            ` select
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_date,
            cm_rectify_time,
            reopen_cm_slno,
            cm_rectify_status
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join cm_reopen_complaint_log on cm_reopen_complaint_log.reopen_complaint_slno=cm_complaint_mast.complaint_slno
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                       where department_slno=('${empdept}'))
            and cm_complaint_mast.compalint_date between ('${fromDate}') and ('${toDate}')
    		group by cm_complaint_mast.complaint_slno`,
            {},
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getEmployeeDetails: (data, callback) => {
        pool.query(
            `SELECT  
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,		
            co_employee_master.em_name,
             co_designation.desg_name,     
            co_employee_master.em_id    
            FROM meliora.co_employee_master            
            left join co_department_mast on co_department_mast.dept_id=co_employee_master.em_department
            left join co_deptsec_mast on co_deptsec_mast.sec_id=co_employee_master.em_dept_section
             left join co_designation on co_designation.desg_slno=co_employee_master.em_designation
            WHERE co_employee_master.em_id =? `,
            [
                data.em_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAllEmployees: (data, callback) => {

        pool.query(
            `SELECT  
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,		
            co_employee_master.em_name,
            co_designation.desg_name,
            co_employee_master.em_id    
            FROM meliora.co_employee_master            
            left join co_department_mast on co_department_mast.dept_id=co_employee_master.em_department
            left join co_deptsec_mast on co_deptsec_mast.sec_id=co_employee_master.em_dept_section
            left join co_designation on co_designation.desg_slno=co_employee_master.em_designation
            WHERE  co_deptsec_mast.sec_id = ? and em_status=1`,
            [
                data.sec_id,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeePendingcompl: (id, callback) => {
        pool.query(
            `SELECT
    cm_complaint_mast.complaint_slno,
    complaint_desc,
    cm_complaint_mast.compalint_date,
    cm_rectify_time,
    reopen_cm_slno,
    cm_complaint_detail.assigned_emp,
    cm_rectify_status
    FROM cm_complaint_mast
    LEFT JOIN cm_complaint_detail ON cm_complaint_detail.complaint_slno = cm_complaint_mast.complaint_slno
    LEFT JOIN cm_reopen_complaint_log ON cm_reopen_complaint_log.reopen_complaint_slno = cm_complaint_mast.complaint_slno
    WHERE 
    cm_complaint_detail.assigned_emp = ?
    AND cm_complaint_detail.assign_status = 1
    AND (
        cm_complaint_mast.cm_rectify_status != 'R'
        AND cm_complaint_mast.cm_rectify_status != 'V'
        OR cm_complaint_mast.cm_rectify_status IS NULL
    )
    GROUP BY cm_complaint_mast.complaint_slno;
           `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EmployeeOnholdcompl: (id, callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_date,
            cm_rectify_time,
            reopen_cm_slno,
            cm_rectify_status
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join cm_reopen_complaint_log on cm_reopen_complaint_log.reopen_complaint_slno=cm_complaint_mast.complaint_slno
            where assigned_emp=? and assign_status= 1
            and cm_complaint_mast.cm_rectify_status ='O'
			group by cm_complaint_mast.complaint_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DeptOnholdcompl: (id, callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_date,
            cm_rectify_time,
            reopen_cm_slno,
            cm_rectify_status
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join cm_reopen_complaint_log on cm_reopen_complaint_log.reopen_complaint_slno=cm_complaint_mast.complaint_slno
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                       where department_slno=?)
            and cm_complaint_mast.cm_rectify_status ='O'
			group by cm_complaint_mast.complaint_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DeptPendingcompl: (id, callback) => {
        pool.query(
            `select
            cm_complaint_mast.complaint_slno,
            complaint_desc,
            compalint_date,
            cm_rectify_time,
            reopen_cm_slno,
            cm_rectify_status
            from cm_complaint_mast
            left join cm_complaint_detail on cm_complaint_detail.complaint_slno=cm_complaint_mast.complaint_slno
            left join cm_reopen_complaint_log on cm_reopen_complaint_log.reopen_complaint_slno=cm_complaint_mast.complaint_slno
            where complaint_deptslno=(select complaint_dept_slno from cm_complaint_dept
                       where department_slno=?)
            AND (
            cm_complaint_mast.cm_rectify_status != 'R'
            AND cm_complaint_mast.cm_rectify_status != 'V'
            OR cm_complaint_mast.cm_rectify_status IS NULL
    )
    group by cm_complaint_mast.complaint_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getprojectduedate: (id, callback) => {

        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_status,
            tm_project_duedate
            FROM tm_project_mast
            where tm_project_slno=? `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}