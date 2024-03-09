const { pool } = require('../../config/database')
module.exports = {


    ViewOverDueToday: (id, callback) => {

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
            tm_new_task_mast.create_date,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            main_task_slno,
            tm_task_status,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            co_employee_master.em_name,
             tm_task_description,
             GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
             GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where CAST( tm_new_task_mast.tm_task_due_date as DATE)=current_date() AND tm_task_dept_sec=?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) ||(tm_new_task_mast.tm_task_status=2)
            ||(tm_new_task_mast.tm_task_status=3)||(tm_new_task_mast.tm_task_status=4)|| (tm_new_task_mast.tm_task_status iS NULL ))
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ViewOverDueNextWeek: (id, callback) => {

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
            main_task_slno,
            tm_new_task_mast.create_date,
            tm_task_status,
            co_employee_master.em_name,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where yearweek(tm_task_due_date,1)=yearweek(current_date(),1)+1 AND tm_task_dept_sec=?            
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) ||(tm_new_task_mast.tm_task_status=2)|| (tm_new_task_mast.tm_task_status iS NULL ))
            group by tm_new_task_mast.tm_task_slno
            order By tm_task_due_date asc`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ViewOverDueNextMonth: (id, callback) => {
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
            main_task_slno,
            tm_task_status,
            co_employee_master.em_name,
            tm_task_due_date,
            tm_new_task_mast.create_date,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where(
            ((year(tm_task_due_date) = year(current_date())AND month(tm_task_due_date) = month(current_date()) + 1)
            Or(year(tm_task_due_date) = year(current_date()) + 1 AND month(tm_task_due_date) = 1))       
            And (tm_task_status!=1)
            And(tm_task_dept_sec=?)
            )
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeeOnProgress: (id, callback) => {

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
            main_task_slno,
            tm_task_status,
            tm_new_task_mast.tm_project_slno,
            co_employee_master.em_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_project_name,
            tm_completed_remarks,
            tm_task_description,
            tm_new_task_mast.create_date,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_new_task_mast_detl.tm_assigne_emp=?
            AND (tm_new_task_mast.tm_task_status=2)            
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeeOnPending: (id, callback) => {

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
            main_task_slno,
            tm_task_status,
            co_employee_master.em_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_new_task_mast.create_date,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_new_task_mast_detl.tm_assigne_emp=?
            AND (tm_new_task_mast.tm_task_status =4)       
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeeOnHold: (id, callback) => {

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
            main_task_slno,
            tm_task_status,
            co_employee_master.em_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_completed_remarks,
            tm_new_task_mast.create_date,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_new_task_mast_detl.tm_assigne_emp=?           
            AND ((tm_new_task_mast.tm_task_status=3))
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EmployeeCompleted: (id, callback) => {
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
            main_task_slno,
            tm_new_task_mast.tm_project_slno,
            tm_task_status,
            tm_project_name,
            co_employee_master.em_name,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_new_task_mast.create_date,
            tm_completed_remarks,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where  tm_new_task_mast.tm_task_status=1 AND tm_new_task_mast_detl.tm_assigne_emp=?
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    EmployeeAllTask: (id, callback) => {

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
            main_task_slno,
            tm_task_status,
            co_employee_master.em_name,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_new_task_mast.create_date,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where  (tm_new_task_mast_detl.tm_assigne_emp=? and tm_new_task_mast.tm_task_status!=1)
            group by tm_new_task_mast.tm_task_slno
            ORDER BY tm_new_task_mast.tm_task_status DESC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeeName: (id, callback) => {

        pool.query(
            ` select
            tm_new_task_mast.tm_task_slno,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast
           left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
           left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where tm_new_task_mast.tm_task_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmployeeInCompleted: (id, callback) => {
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
            main_task_slno,
            tm_task_status,
            tm_new_task_mast.tm_project_slno,
            co_employee_master.em_name,
            tm_onhold_remarks,
            tm_project_name,
            tm_pending_remark,
            tm_new_task_mast.create_date,
            tm_completed_remarks,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_new_task_mast_detl.tm_assigne_emp=?           
            AND (tm_new_task_mast.tm_task_status=0)
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EmployeeOverDue: (id, callback) => {
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
            main_task_slno,
            tm_task_status,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            co_employee_master.em_name,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_new_task_mast.create_date,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where tm_new_task_mast_detl.tm_assigne_emp=? AND tm_task_due_date < current_date()
            AND ((tm_new_task_mast.tm_task_status =0)||(tm_new_task_mast.tm_task_status =2)||
            (tm_new_task_mast.tm_task_status =3)||(tm_new_task_mast.tm_task_status =4)||
            (tm_new_task_mast.tm_task_status iS NULL))
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    DepartmentOnProgress: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,        
            tm_task_dept_sec, 
            co_deptsec_mast.sec_name,
            tm_task_due_date, 
            tm_assigne_emp,
            main_task_slno,          
			tm_task_description,            
            tm_task_status,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_new_task_mast.create_date,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno
            WHERE tm_new_task_mast.tm_task_dept_sec =? AND (tm_new_task_mast.tm_task_due_date >=current_date())
            AND (tm_new_task_mast.tm_task_status =2)
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DepartmentPending: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,        
            tm_task_dept_sec, 
            co_deptsec_mast.sec_name,
            tm_task_due_date, 
            tm_assigne_emp,
            main_task_slno,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,          
			tm_task_description,
            tm_new_task_mast.create_date,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_new_task_mast.tm_task_dept_sec =? 
            AND (tm_new_task_mast.tm_task_status =4) 
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    DepartmentOnHold: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,        
            tm_task_dept_sec, 
            co_deptsec_mast.sec_name,
            tm_task_due_date, 
            tm_assigne_emp,
            main_task_slno,          
			tm_task_description,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_new_task_mast.create_date,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_new_task_mast.tm_task_dept_sec =? 
            AND (tm_new_task_mast.tm_task_status =3) 
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DepartmentCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,
            tm_task_dept_sec,
            co_deptsec_mast.sec_name,
            tm_task_due_date,
            tm_assigne_emp,
            main_task_slno,
            tm_new_task_mast.create_date,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_task_description,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name  
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_new_task_mast.tm_task_dept_sec =? AND tm_new_task_mast.tm_task_status = 1 
            group by tm_new_task_mast.tm_task_slno
            order By tm_task_due_date desc`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    DepartmentInCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,
            tm_task_dept_sec,
            co_deptsec_mast.sec_name,
            tm_task_due_date,
            tm_assigne_emp,
            main_task_slno,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_task_status,
            tm_new_task_mast.create_date,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE ((tm_new_task_mast.tm_task_dept_sec =?)
            AND (tm_new_task_mast.tm_task_status=0))
            group by tm_new_task_mast.tm_task_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    DepartmentOverDue: (id, callback) => {

        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,
            tm_task_dept_sec,
            co_deptsec_mast.sec_name,
            tm_task_due_date,
            tm_assigne_emp,
            main_task_slno,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_task_status,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_new_task_mast.create_date,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_new_task_mast.tm_task_dept_sec =? AND tm_task_due_date < current_date()
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0)|| (tm_new_task_mast.tm_task_status=2) || (tm_new_task_mast.tm_task_status iS NULL ))
            group by tm_new_task_mast.tm_task_slno
            order By tm_task_due_date desc`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    ProjectOnProgress: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_name,
            tm_project_dept,
            co_department_mast.dept_name,        
            tm_project_deptsec, 
            co_deptsec_mast.sec_name,
            tm_project_duedate,
            tm_project_status,                     
			tm_project_description,
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec        
           WHERE tm_project_mast.tm_project_deptsec =? AND tm_project_mast.tm_project_status is NULL or tm_project_mast.tm_project_status=0
            group by tm_project_mast.tm_project_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_name,
            tm_project_dept,
            co_department_mast.dept_name,        
            tm_project_deptsec, 
            co_deptsec_mast.sec_name,
            tm_project_duedate,
            tm_project_status,                   
			tm_project_description
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec        
           WHERE tm_project_mast.tm_project_deptsec =? AND tm_project_mast.tm_project_status =1
            group by tm_project_mast.tm_project_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ProjectInCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_name,
            tm_project_dept,
            co_department_mast.dept_name,        
            tm_project_deptsec, 
            co_deptsec_mast.sec_name,
            tm_project_duedate,
            tm_project_status,                   
			tm_project_description
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec        
           WHERE tm_project_mast.tm_project_deptsec =? AND (tm_project_mast.tm_project_status !=1)
            group by tm_project_mast.tm_project_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectOverDue: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_name,
            tm_project_dept,
            co_department_mast.dept_name,        
            tm_project_deptsec, 
            co_deptsec_mast.sec_name,
            tm_project_duedate,
            tm_project_status,                     
			tm_project_description
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec        
            WHERE tm_project_mast.tm_project_deptsec =? AND tm_project_duedate < current_date() AND (tm_project_mast.tm_project_status=0 OR tm_project_mast.tm_project_status is NULL)
            group by tm_project_mast.tm_project_slno`,

            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    GoalsOnProgress: (id, callback) => {
        pool.query(
            `SELECT 
            tm_goal_mast.tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            co_department_mast.dept_name,        
            tm_goal_deptsec, 
            co_deptsec_mast.sec_name,
            tm_goal_duedate,
            tm_goal_status,                   
			tm_goal_description
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_dept        
            WHERE (tm_goal_mast.tm_goal_deptsec=? AND tm_goal_mast.tm_goal_status =2)
            group by tm_goal_mast.tm_goals_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    GoalsCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_goal_mast.tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            co_department_mast.dept_name,        
            tm_goal_deptsec, 
            co_deptsec_mast.sec_name,
            tm_goal_duedate,
            tm_goal_status,                    
			tm_goal_description
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_dept        
           WHERE tm_goal_mast.tm_goal_deptsec =? AND tm_goal_mast.tm_goal_status =1
            group by tm_goal_mast.tm_goals_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    GoalsInCompleted: (id, callback) => {
        pool.query(
            `SELECT 
            tm_goal_mast.tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            co_department_mast.dept_name,        
            tm_goal_deptsec, 
            co_deptsec_mast.sec_name,
            tm_goal_duedate,
            tm_goal_status,                    
			tm_goal_description
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_dept        
           WHERE tm_goal_mast.tm_goal_deptsec =? AND tm_goal_mast.tm_goal_status !=1
            group by tm_goal_mast.tm_goals_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    GoalsOverDue: (id, callback) => {
        pool.query(
            `SELECT 
            tm_goal_mast.tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            co_department_mast.dept_name,        
            tm_goal_deptsec, 
            co_deptsec_mast.sec_name,
            tm_goal_duedate,
            tm_goal_status,                     
			tm_goal_description
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_dept        
            WHERE tm_goal_mast.tm_goal_deptsec =? AND tm_goal_duedate < current_date() AND (tm_goal_mast.tm_goal_status=0 OR tm_goal_mast.tm_goal_status is NULL)
            group by tm_goal_mast.tm_goals_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ViewAllEmployeeTask: (id, callback) => {
        pool.query(
            `select emslno,empname,dept_name,sec_name, sum(TT) TT, sum(TC) TC from(
                           select 
                           tm_assigne_emp emslno,
                           E.em_name empname,D.dept_name, DS.sec_name,        
                           count(TD.tm_task_slno) TT,
                           0 TC
                           from tm_new_task_mast_detl TD
                           left join co_employee_master E on E.em_id=TD.tm_assigne_emp
                              left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                              left join co_department_mast D on D.dept_id=T.tm_task_dept
                              left join co_deptsec_mast DS on DS.sec_id=T.tm_task_dept_sec
                           where tm_detail_status=1  
                              GROUP BY emslno    
                              union all
                                 select tm_assigne_emp emslno,
                           E.em_name empname,D.dept_name,DS.sec_name, 
                           0 TT,
                           count(TD.tm_task_slno) TC
                           from tm_new_task_mast_detl TD
                           left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                           left join co_employee_master E on E.em_id=TD.tm_assigne_emp
                           left join co_department_mast D on D.dept_id=T.tm_task_dept
                           left join co_deptsec_mast DS on DS.sec_id=T.tm_task_dept_sec
                           where tm_detail_status=1 and T.tm_task_status=1
                              GROUP BY emslno ) AA
                           where    AA.emslno in (select em_id from co_employee_master where em_department=1 and em_status=1)
                           group by emslno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    EmpProjectTask: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
        	tm_project_mast.tm_project_duedate,
     		tm_project_name,
             tm_project_mast.create_date,
             tm_project_mast.tm_project_status,
             tm_new_task_mast.tm_project_slno,
            tm_assigne_emp
             FROM meliora.tm_new_task_mast         
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            where ((tm_assigne_emp=?)and(tm_new_task_mast.tm_project_slno IS NOT NULL))
			group by tm_new_task_mast.tm_project_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    EmpTaskCount: (data, callback) => {
        pool.query(
            `select prjectslno,prjectname, sum(TT) TT, sum(TC) TC from (
                select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                   count(TD.tm_task_slno) TT,
                     0 TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where tm_assigne_emp=? and T.tm_project_slno=?
                  
                  union all
                  
                  select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                 0 TT,
                 count(TD.tm_task_slno) TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where tm_assigne_emp=? and T.tm_project_slno=? and T.tm_task_status=1 )AA`,
            [
                data.tm_assigne_emp,
                data.tm_project_slno,
                data.tm_assigne_emp,
                data.tm_project_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AllProjectUnderSection: (id, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
        	tm_project_mast.tm_project_duedate,
            tm_project_mast.create_date,
     		tm_project_name,
			tm_new_task_mast.tm_project_slno,
            tm_project_dept,
            tm_project_deptsec,
            tm_task_status,
            tm_assigne_emp
			FROM meliora.tm_new_task_mast         
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec  
            where ((tm_project_deptsec=?)and(tm_new_task_mast.tm_project_slno IS NOT NULL))
			group by tm_new_task_mast.tm_project_slno`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AllEmployeeProject: (id, callback) => {

        pool.query(
            ` 			SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_mast.tm_project_name,
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_name,     
            tm_assigne_emp,  
			tm_project_dept,        
            tm_project_deptsec,            
            em_name
			FROM meliora.tm_project_mast 
            left join tm_new_task_mast on tm_new_task_mast.tm_project_slno=tm_project_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where (tm_project_mast.tm_project_slno=?)
            GROUP BY ( tm_assigne_emp)`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    TTCTcountUnderProject: (data, callback) => {
        pool.query(
            ` select prjectslno,prjectname, sum(TT) TT, sum(TC) TC from (
                select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                   count(TD.tm_task_slno) TT,
                     0 TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where  T.tm_project_slno=?
                  union all  
                  select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                 0 TT,
                 count(TD.tm_task_slno) TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where T.tm_project_slno=? and T.tm_task_status=1)AA`,
            [
                data.tm_project_slno,
                data.tm_project_slno,

            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },
    EmployeeTTCTcount: (data, callback) => {
        pool.query(
            ` select prjectslno,prjectname, sum(TT) TT, sum(TC) TC from (
                select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                   count(TD.tm_task_slno) TT,
                     0 TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where tm_assigne_emp=? 
                  
                  union all
                  
                  select P.tm_project_slno prjectslno,P.tm_project_name prjectname,
                 0 TT,
                 count(TD.tm_task_slno) TC
                  from tm_new_task_mast_detl TD
                  left join tm_new_task_mast T on T.tm_task_slno=TD.tm_task_slno
                 left join tm_project_mast P on P.tm_project_slno=T.tm_project_slno 
                  where tm_assigne_emp=? and T.tm_task_status=1 )AA`,
            [
                data.tm_assigne_emp,
                data.tm_assigne_emp,
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    AllEmployeeTask: (id, callback) => {
        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_name,
            tm_project_mast.tm_project_slno,
            tm_project_mast.tm_project_name,         
            tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_status,
            tm_new_task_mast.create_date,
            tm_new_task_mast.create_user,
            tm_new_task_mast.main_task_slno,                         
  		     tm_assigne_emp,        
            T.em_name as task_empname,
            C.em_name as create_empname
			FROM meliora.tm_new_task_mast 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master T on T.em_id=tm_new_task_mast_detl.tm_assigne_emp
             left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
             left join co_employee_master C on C.em_id=tm_new_task_mast.create_user
            where ((tm_new_task_mast_detl.tm_assigne_emp=?) and (tm_new_task_mast.tm_project_slno is NULL) and (tm_new_task_mast.main_task_slno is NULL))`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    AllTaskUnderProject: (data, callback) => {
        pool.query(
            `SELECT 
            tm_project_mast.tm_project_slno,
            tm_project_mast.tm_project_name,
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_name,
            tm_new_task_mast.tm_task_status,
            tm_new_task_mast.create_date,
            tm_new_task_mast.create_user,        
            tm_assigne_emp,        
         T.em_name as task_empname,
         C.em_name as create_empname
			FROM meliora.tm_project_mast 
            left join tm_new_task_mast on tm_new_task_mast.tm_project_slno=tm_project_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master T on T.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join co_employee_master C on C.em_id=tm_new_task_mast.create_user
            where ((tm_project_mast.tm_project_slno=?) and (tm_new_task_mast.main_task_slno is null))`,
            [
                data.tm_project_slno,
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },
    EmpTaskCountWithoutProject: (data, callback) => {
        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
            count(*)as totalcount,        
            tm_project_mast.tm_project_slno,            
            tm_new_task_mast.tm_task_status,
  		    tm_assigne_emp,        
            T.em_name as task_empname,
            C.em_name as create_empname
			FROM meliora.tm_new_task_mast 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master T on T.em_id=tm_new_task_mast_detl.tm_assigne_emp
             left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
             left join co_employee_master C on C.em_id=tm_new_task_mast.create_user
            where ((tm_new_task_mast_detl.tm_assigne_emp=?) and (tm_new_task_mast.tm_project_slno is NULL))`,
            [
                data.tm_assigne_emp,
                data.tm_assigne_emp,
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },
    SubTaskUnderTask: (data, callback) => {
        pool.query(
            ` SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_name,
            tm_project_mast.tm_project_slno,
            tm_project_mast.tm_project_name,         
            tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_status,
            tm_new_task_mast.create_date,
            tm_new_task_mast.create_user,
            tm_new_task_mast.main_task_slno,
  		     tm_assigne_emp,        
            T.em_name as task_empname,
            C.em_name as create_empname
			FROM meliora.tm_new_task_mast 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master T on T.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join co_employee_master C on C.em_id=tm_new_task_mast.create_user
            where (tm_new_task_mast.main_task_slno=?)`,
            [

                data.main_task_slno,
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },


    TTCTcountSubtask: (data, callback) => {
        pool.query(
            ` `,
            [



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