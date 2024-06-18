const { pool } = require('../../config/database')
module.exports = {
    taskMast: (data, callBack) => {

        pool.query(
            `INSERT INTO tm_new_task_mast
            (
              tm_task_name,
              tm_task_dept,
              tm_task_dept_sec,
              tm_task_due_date,
              tm_task_description,
              tm_task_status,
              tm_project_slno,
              tm_onhold_remarks,
              tm_pending_remark,
              tm_completed_remarks,
              tm_complete_date,
              main_task_slno,
              create_user
            )
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) `,
            [
                data.tm_task_name,
                data.tm_task_dept,
                data.tm_task_dept_sec,
                data.tm_task_due_date,
                data.tm_task_description,
                data.tm_task_status,
                data.tm_project_slno,
                data.tm_onhold_remarks,
                data.tm_pending_remark,
                data.tm_completed_remarks,
                data.tm_complete_date,
                data.main_task_slno,
                data.create_user

            ],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    CreateTaskDetailInsert: (data, callback) => {

        pool.query(
            `INSERT INTO tm_new_task_mast_detl
          (
            tm_task_slno,
            tm_assigne_emp,
            tm_detail_status,
            tm_detl_create
          )
          VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    InsertDueDate: (data, callback) => {
        pool.query(
            `INSERT INTO tm_duedate_logtable
          (
            tm_task_slno,
            tm_duedate,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.tm_task_slno,
                data.tm_duedate,
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



    getAssignedTask: (data, callback) => {
        pool.query(
            `SELECT 
            tm_new_task_mast.tm_task_slno,
            tm_new_task_mast.tm_task_name,
            tm_project_mast.tm_project_slno,
            tm_project_mast.tm_project_name,         
            tm_new_task_mast.tm_task_due_date,
            tm_new_task_mast.tm_task_status,
            tm_new_task_mast.create_date,
            tm_new_task_mast.create_user,
            tm_new_task_mast.main_task_slno,
            tm_task_file,
            tm_query_remark,
            tm_create_detl_slno,
            tm_task_description,                       
  		     tm_assigne_emp,
             tm_query_reply,
             tm_query_reply_date,
             tm_detail_status,
             tm_query_reply_user,
            T.em_name as task_empname,
            C.em_name as create_empname,
            R.em_name as reply_empname
			FROM meliora.tm_new_task_mast 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno     
			left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master T on T.em_id=tm_new_task_mast_detl.tm_assigne_emp
             left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
             left join co_employee_master C on C.em_id=tm_new_task_mast.create_user
            left join co_employee_master R on R.em_id=tm_new_task_mast.tm_query_reply_user
            where tm_new_task_mast_detl.tm_assigne_emp=?  and tm_detail_status!=1`,
            [
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

    AcceptTask: (data, callback) => {
        pool.query(
            `UPDATE tm_new_task_mast_detl SET                 
            tm_detail_status=?                
           			WHERE 
             tm_create_detl_slno=?`,
            [
                data.tm_detail_status,
                data.tm_create_detl_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getRejectedTask: (callback) => {
        pool.query(
            `SELECT 
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
            tm_query_remark,
			tm_task_description,
            tm_task_status,
            tm_task_file, 
			tm_project_name,
            tm_project_mast.tm_project_duedate,
            tm_new_task_mast.create_date,
            tm_detail_status,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_completed_remarks,
            tm_query_reply,
            tm_query_remark_date,
            tm_query_reply_user,
            tm_query_reply_date,   
            tm_new_task_mast.tm_project_slno,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_detail_status=2 
			group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getPendingAssignedTask: (callback) => {
        pool.query(
            `SELECT 
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
            tm_new_task_mast.tm_project_slno,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp 
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_detail_status=0
			group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`
            , [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    getprojectundergoal: (id, callback) => {
        pool.query(
            `select 
            tm_project_slno,
            tm_project_name,
            tm_goal_slno,
            tm_project_status
            from tm_project_mast
            where
            tm_goal_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getTaskunderProject: (id, callback) => {
        pool.query(
            `select 
             tm_task_slno,
             tm_task_name,
             tm_project_slno,
             tm_task_status
            from
            tm_new_task_mast
            where tm_project_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    subtaskviewByidPending: (id, callback) => {
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
            tm_task_status,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.create_date,          
			tm_task_description,
            tm_complete_date,
            tm_new_task_mast.tm_project_slno,
            main_task_slno,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(co_employee_master.em_name SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            WHERE tm_new_task_mast.main_task_slno=?  And tm_detail_status!=2
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
    AskQuery: (data, callback) => {

        pool.query(
            `UPDATE tm_new_task_mast_detl SET                 
            tm_detail_status=?,
            tm_query_remark=?,
            tm_query_remark_date=?               
           			WHERE 
             tm_create_detl_slno=?`,
            [
                data.tm_detail_status,
                data.tm_query_remark,
                data.tm_query_remark_date,
                data.tm_create_detl_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}