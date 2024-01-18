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
            main_task_slno,
            tm_task_status,
            co_employee_master.em_name,
             tm_task_description,
             GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
             GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where tm_task_due_date=current_date() AND tm_task_dept_sec=?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            ` SELECT 
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
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where yearweek(tm_task_due_date,1)=yearweek(current_date(),1)+1 AND tm_task_dept_sec=1               
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            ` SELECT 
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
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            where(year(tm_task_due_date) = year(current_date())AND month(tm_task_due_date) = month(current_date()) + 1)
            Or(year(tm_task_due_date) = year(current_date()) + 1 AND month(tm_task_due_date) = 1) AND tm_task_dept_sec=?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            co_employee_master.em_name,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where tm_new_task_mast_detl.tm_assigne_emp=?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
            AND (tm_new_task_mast.tm_task_due_date >=current_date())
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
            tm_task_status,
            co_employee_master.em_name,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
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
            co_employee_master.em_name,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where tm_new_task_mast_detl.tm_assigne_emp=?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            co_employee_master.em_name,
            tm_task_description
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            where tm_new_task_mast_detl.tm_assigne_emp=? AND tm_task_due_date < current_date()
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            WHERE tm_new_task_mast.tm_task_dept_sec =? AND (tm_new_task_mast.tm_task_due_date >=current_date())
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            tm_task_description,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name  
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
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
            tm_task_status,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            WHERE tm_new_task_mast.tm_task_dept_sec =?
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
            tm_task_status,
            tm_task_description,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id = tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id = tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno = tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id = tm_new_task_mast_detl.tm_assigne_emp
            WHERE tm_new_task_mast.tm_task_dept_sec =? AND tm_task_due_date < current_date()
            AND ((tm_new_task_mast.tm_task_status !=1) || (tm_new_task_mast.tm_task_status=0) || (tm_new_task_mast.tm_task_status iS NULL ))
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
           WHERE tm_goal_mast.tm_goal_deptsec =1 AND tm_goal_mast.tm_goal_status =0 OR tm_goal_mast.tm_goal_status is NULL
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

}