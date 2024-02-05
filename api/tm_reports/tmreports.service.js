const { pool } = require('../../config/database')
module.exports = {

    DeptSearch: (data, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            tm_task_dept_sec,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
			tm_task_due_date, 
            tm_assigne_emp,
            tm_detail_status,
            co_employee_master.em_name,           
            main_task_slno,
            tm_new_task_mast.tm_project_slno,
			tm_task_description,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_task_dept=? AND tm_task_dept_sec=? 
            group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`,
            [
                data.tm_task_dept,
                data.tm_task_dept_sec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EmpTaskSearch: (data, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_name, 
			tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_dept,
            tm_new_task_mast.tm_task_dept_sec,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
            tm_assigne_emp,
            tm_detail_status,
            co_employee_master.em_name,           
            tm_new_task_mast.main_task_slno,
            tm_new_task_mast.tm_project_slno,
			tm_new_task_mast.tm_task_description,
            tm_new_task_mast.tm_task_status           
            FROM meliora.tm_new_task_mast_detl       
            left join tm_new_task_mast on tm_new_task_mast.tm_task_slno= tm_new_task_mast_detl.tm_task_slno 
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            where tm_assigne_emp=?`,
            [

                data.tm_assigne_emp
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
}