const { pool } = require('../../config/database')
module.exports = {

    CreateTaskInsert: (data, callback) => {
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
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
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

    TaskDateInserT: (data, callback) => {
        pool.query(
            `INSERT INTO tm_task_mast_log
          (           
            tm_task_slno,
            tm_task_status,
            tm_task_due_date,                
            tm_change_user
          )
          VALUES(?,?,?,?)`,
            [
                data.tm_task_slno,
                data.tm_task_status,
                data.tm_task_due_date,
                data.tm_change_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
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
    CreateTaskView: (callback) => {
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
            co_employee_master.em_name,
            main_task_slno,
			tm_task_description,
            tm_task_status, 
			tm_project_name,
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
            tm_new_task_mast.create_date,         
            main_task_slno,
            tm_new_task_mast.tm_project_slno,
			tm_task_description,
            tm_task_status,      
            tm_project_name,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ',')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
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
    GoalDeptSearch: (data, callback) => {
        pool.query(
            `SELECT 
            tm_goal_mast.tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            tm_goal_deptsec,
            co_department_mast.dept_name,
            co_deptsec_mast.sec_name,
            tm_goal_mast.create_date,
            tm_goal_fromdate,
			tm_goal_duedate,
            tm_goal_status,      
      		tm_goal_description
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_deptsec      
            where tm_goal_dept=? AND tm_goal_deptsec=?   
        	ORDER BY tm_goal_duedate DESC`,
            [
                data.tm_goal_dept,
                data.tm_goal_deptsec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectDeptSearch: (data, callback) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_dept,
            dept_name,
            sec_name,
            tm_project_deptsec, 
            tm_project_duedate,
            tm_project_status,
            tm_project_mast.tm_goal_slno,
            tm_goal_name,
            tm_project_description          
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec
            left join tm_goal_mast on tm_goal_mast.tm_goals_slno=tm_project_mast.tm_goal_slno            
             where tm_project_dept=? AND tm_project_deptsec=?   
            ORDER BY tm_project_duedate DESC  `,
            [
                data.tm_project_dept,
                data.tm_project_deptsec
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    CreateSubTaskInsert: (data, callback) => {
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
            main_task_slno,        
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.main_task_slno,
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

    CreateTaskSubTaskDetailInsert: (data, callback) => {
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

    MasterTaskviewBySecid: (id, callback) => {
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
            co_employee_master.em_name,
            main_task_slno,
			tm_task_description,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.create_date,
            tm_task_status,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            WHERE ((tm_new_task_mast.tm_task_dept_sec=?) And (tm_new_task_mast.tm_task_status!=1))
            group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    MasterEmpByid: (id, callback) => {
        pool.query(
            ` SELECT 
            tm_create_detl_slno,           
            tm_assigne_emp            
            FROM tm_new_task_mast_detl            
             WHERE tm_task_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    MasterTaskviewByidForEdit: (id, callback) => {
        pool.query(
            ` SELECT
            tm_task_slno,
            tm_task_name,           
            tm_task_dept,
            tm_task_dept_sec,
            tm_task_due_date,
            tm_task_description,
            tm_task_status,
            tm_project_slno,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            main_task_slno           
            FROM tm_new_task_mast                    
             WHERE tm_task_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    SubTaskviewByid: (id, callback) => {
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
            WHERE tm_new_task_mast.main_task_slno=? 
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
    UpdateMasterTask: (data, callback) => {
        pool.query(
            `UPDATE tm_new_task_mast SET                 
            tm_task_name=?,
            tm_task_dept=?,
            tm_task_dept_sec=?,
            tm_task_due_date=?,                 
            tm_task_description=?,
            tm_task_status=?,
            tm_project_slno=?,
            tm_pending_remark=?,
            tm_onhold_remarks=?,
            tm_completed_remarks=?,
            edit_user=?  
 			WHERE 
             tm_task_slno=?`,
            [
                data.tm_task_name,
                data.tm_task_dept,
                data.tm_task_dept_sec,
                data.tm_task_due_date,
                data.tm_task_description,
                data.tm_task_status,
                data.tm_project_slno,
                data.tm_pending_remark,
                data.tm_onhold_remarks,
                data.tm_completed_remarks,
                data.edit_user,
                data.tm_task_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    UpdateSubTask: (data, callback) => {
        pool.query(
            `UPDATE tm_new_task_mast SET                 
            tm_task_name=?,
            tm_task_dept=?,
            tm_task_dept_sec=?,
            tm_task_due_date=?,
            tm_pending_remark=?,
            tm_onhold_remarks=?,
            tm_completed_remarks=?,                
            tm_task_description=?,
            tm_task_status=?,
            edit_user=?    
 			WHERE 
             tm_task_slno=?`,
            [
                data.tm_task_name,
                data.tm_task_dept,
                data.tm_task_dept_sec,
                data.tm_task_due_date,
                data.tm_pending_remark,
                data.tm_onhold_remarks,
                data.tm_completed_remarks,
                data.tm_task_description,
                data.tm_task_status,
                data.edit_user,
                data.tm_task_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    SubtaskviewByidForEdit: (id, callback) => {
        pool.query(
            ` SELECT 
            tm_task_slno,
            tm_task_name,
            tm_task_dept,
            co_department_mast.dept_name,  
            tm_task_dept_sec,
            co_deptsec_mast.sec_name,
            tm_task_due_date,
            tm_task_status,
            tm_completed_remarks,
            tm_onhold_remarks,
            tm_pending_remark,
            tm_task_description                    
            FROM tm_new_task_mast
             left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
             WHERE tm_task_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    updateSubTaskDetail: (data, callback) => {
        pool.query(
            `UPDATE tm_new_task_mast_detl
            SET
            tm_assigne_emp=?,
            tm_detl_edit=?                        
             WHERE 
             tm_create_detl_slno=?`,
            [
                data.tm_assigne_emp,
                data.tm_detl_edit,
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

    employeeInactive: (body) => {
        return Promise.all(body.map((data) => {
            return new Promise((resolve, reject) => {
                pool.query(
                    `DELETE FROM tm_new_task_mast_detl WHERE tm_task_slno=? AND tm_assigne_emp=?`
                    ,
                    [
                        data.tm_task_slno,
                        data.tm_assigne_emp
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return reject(error)
                        }
                        return resolve(results)
                    }
                )
            })
        })
        )
    },

    GoalView: (callback) => {
        pool.query(
            `SELECT 
            tm_goals_slno,
            tm_goal_name,
            tm_goal_dept,
            dept_name,
            sec_name,
            tm_goal_deptsec,
            tm_goal_fromdate, 
            tm_goal_duedate,
            tm_goal_status,
            tm_goal_mast.create_date,
            tm_goal_description          
            FROM meliora.tm_goal_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_deptsec            
            ORDER BY tm_goal_duedate DESC`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectInsert: (data, callback) => {
        pool.query(
            `INSERT INTO tm_project_mast
            (            
                tm_project_name,
                tm_project_dept,
                tm_project_deptsec,
                tm_project_duedate,
                tm_project_description,
                tm_project_status,
                tm_goal_slno,
                tm_project_create_user            
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.tm_project_name,
                data.tm_project_dept,
                data.tm_project_deptsec,
                data.tm_project_duedate,
                data.tm_project_description,
                data.tm_project_status,
                data.tm_goal_slno,
                data.tm_project_create_user
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectView: (callback) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_dept,
            dept_name,
            sec_name,
            tm_project_deptsec, 
            tm_project_duedate,
            tm_project_status,
            tm_project_mast.tm_goal_slno,
            tm_goal_name,
            tm_project_description          
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec
            left join tm_goal_mast on tm_goal_mast.tm_goals_slno=tm_project_mast.tm_goal_slno              
            ORDER BY tm_project_duedate DESC`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProjectUpdate: (data, callback) => {
        pool.query(
            `UPDATE tm_project_mast SET                 
            tm_project_name=?,
            tm_project_dept=?,
            tm_project_deptsec=?,
            tm_project_duedate=?,                 
            tm_project_description=?,
            tm_project_status=?,
            tm_goal_slno=?,
            tm_project_edit_user=?  
 			WHERE 
             tm_project_slno=?`,
            [
                data.tm_project_name,
                data.tm_project_dept,
                data.tm_project_deptsec,
                data.tm_project_duedate,
                data.tm_project_description,
                data.tm_project_status,
                data.tm_goal_slno,
                data.tm_project_edit_user,
                data.tm_project_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    GoalDeptInsert: (data, callback) => {
        pool.query(
            `INSERT INTO tm_goal_mast
            (            
                tm_goal_name,
                tm_goal_dept,
                tm_goal_deptsec,
                tm_goal_fromdate,
                tm_goal_duedate,
                tm_goal_description,
                tm_goal_status,
                tm_goal_createuser            
            )
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.tm_goal_name,
                data.tm_goal_dept,
                data.tm_goal_deptsec,
                data.tm_goal_fromdate,
                data.tm_goal_duedate,
                data.tm_goal_description,
                data.tm_goal_status,
                data.tm_goal_createuser
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);


            }
        );
    },

    GoalDeptView: (id, callback) => {
        pool.query(
            `SELECT 
                     tm_goals_slno,
                     tm_goal_name,
                     tm_goal_dept,
                     dept_name,
                     sec_name,
                     tm_goal_deptsec,
                     tm_goal_fromdate,
                     tm_goal_duedate,
                     tm_goal_description          
                     FROM meliora.tm_goal_mast            
                     left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
                     left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_deptsec
                     WHERE tm_goal_mast.tm_goal_deptsec=?             
                     ORDER BY tm_goal_duedate DESC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    GoalDeptUpdate: (data, callback) => {
        pool.query(
            `UPDATE tm_goal_mast SET                 
            tm_goal_name=?,
            tm_goal_dept=?,
            tm_goal_deptsec=?,
            tm_goal_fromdate=?,
            tm_goal_duedate=?,                 
            tm_goal_description=?,
            tm_goal_status=?,
            tm_goal_edituser=?  
 			WHERE 
             tm_goals_slno=?`,
            [
                data.tm_goal_name,
                data.tm_goal_dept,
                data.tm_goal_deptsec,
                data.tm_goal_fromdate,
                data.tm_goal_duedate,
                data.tm_goal_description,
                data.tm_goal_status,
                data.tm_goal_edituser,
                data.tm_goals_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    GoalDeptView: (id, callback) => {
        pool.query(
            `SELECT 
                     tm_goals_slno,
                     tm_goal_name,
                     tm_goal_dept,
                     dept_name,
                     sec_name,
                     tm_goal_deptsec,
                     tm_goal_fromdate,
                     tm_goal_duedate,
                     tm_goal_mast.create_date,
                     tm_goal_status,
                     tm_goal_description          
                     FROM meliora.tm_goal_mast            
                     left join co_department_mast on co_department_mast.dept_id=tm_goal_mast.tm_goal_dept
                     left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_goal_mast.tm_goal_deptsec
                     WHERE tm_goal_mast.tm_goal_deptsec=?             
                     ORDER BY tm_goal_duedate DESC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    ProjectDeptView: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_dept,
            dept_name,
            sec_name,
            tm_project_deptsec, 
            tm_project_duedate,
            tm_project_status,
            tm_project_mast.tm_goal_slno,
            tm_goal_name,
            tm_project_description          
            FROM meliora.tm_project_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_project_mast.tm_project_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_project_mast.tm_project_deptsec     
			left join tm_goal_mast on tm_goal_mast.tm_goals_slno=tm_project_mast.tm_goal_slno   
             WHERE tm_project_mast.tm_project_deptsec=?
            ORDER BY tm_project_duedate DESC  `,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    ProgressInsert: (data, callback) => {
        pool.query(
            `INSERT INTO tm_task_progress_detl
            (
                tm_task_slno,
                tm_task_status,
                tm_progres_date,
                progress_emp,              
                tm_task_progress     
                   
            )
            VALUES (?,?,?,?,?)`,
            [

                data.tm_task_slno,
                data.tm_task_status,
                data.tm_progres_date,
                data.progress_emp,
                data.tm_task_progress
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProgressView: (data, callback) => {
        pool.query(
            `SELECT 
            progress_slno,  
            tm_task_slno,
            tm_task_status,
            tm_progres_date,
            em_name,
            tm_task_progress,
            progress_emp 
            FROM meliora.tm_task_progress_detl            
            left join co_employee_master on co_employee_master.em_id=tm_task_progress_detl.progress_emp
            where tm_task_slno=?
            order by tm_progres_date desc `,
            [
                data.tm_task_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    SubProgressView: (data, callback) => {
        pool.query(
            `SELECT 
            progress_slno,  
            tm_task_progress_detl.tm_task_slno,
            tm_task_progress_detl.tm_task_status,
            tm_progres_date,
            em_name,
            tm_task_progress,
            tm_new_task_mast.main_task_slno,
            progress_emp 
            FROM meliora.tm_task_progress_detl            
            left join co_employee_master on co_employee_master.em_id=tm_task_progress_detl.progress_emp
            left join tm_new_task_mast on tm_new_task_mast.tm_task_slno=tm_task_progress_detl.tm_task_slno
            where tm_task_progress_detl.tm_task_slno=?
            order by tm_progres_date desc`,
            [
                data.tm_task_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    ProgressUpdate: (data, callback) => {
        pool.query(
            `UPDATE tm_task_progress_detl SET                 
            tm_task_slno=?,
            tm_task_status=?,
            tm_progres_date=?,
            progress_emp=?,
            tm_task_progress=?              
            WHERE 
             progress_slno=?`,
            [
                data.tm_task_slno,
                data.tm_task_status,
                data.tm_progres_date,
                data.progress_emp,
                data.tm_task_progress,
                data.progress_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    taskStatusUpdate: (data, callback) => {

        pool.query(
            `UPDATE tm_new_task_mast SET               
              tm_task_status=2
             WHERE 
             tm_task_slno=?`,
            [
                data.tm_task_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    SearchProjectAndEmployee: (data, callback) => {
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
            co_employee_master.em_name,
            main_task_slno,
			tm_task_description,
            tm_new_task_mast.tm_project_slno,
            tm_project_name,
            tm_pending_remark,
            tm_onhold_remarks,
            tm_completed_remarks,
            tm_new_task_mast.create_date,
            tm_task_status,
            em_id,
            GROUP_CONCAT(tm_new_task_mast_detl.tm_assigne_emp SEPARATOR ', ')as tm_assigne_emp,
            GROUP_CONCAT(lower(co_employee_master.em_name) SEPARATOR ',')as em_name 
            FROM meliora.tm_new_task_mast            
            left join co_department_mast on co_department_mast.dept_id=tm_new_task_mast.tm_task_dept
            left join co_deptsec_mast on co_deptsec_mast.sec_id=tm_new_task_mast.tm_task_dept_sec
            left join tm_project_mast on tm_project_mast.tm_project_slno=tm_new_task_mast.tm_project_slno 
            left join tm_new_task_mast_detl on tm_new_task_mast_detl.tm_task_slno=tm_new_task_mast.tm_task_slno
            left join co_employee_master on co_employee_master.em_id=tm_new_task_mast_detl.tm_assigne_emp
            WHERE ((tm_new_task_mast.tm_task_dept_sec=?) And (tm_new_task_mast.tm_task_status!=1)
            And (tm_project_mast.tm_project_slno=?))
            group by tm_new_task_mast.tm_task_slno
			ORDER BY tm_task_slno DESC`,
            [data.tm_task_dept_sec,
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

    GetTaskSlno: (id, callback) => {
        pool.query(
            `SELECT 
            tm_task_status      
            FROM meliora.tm_new_task_mast           
            WHERE tm_new_task_mast.tm_task_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },
    UpdateStatus: (data, callback) => {
        pool.query(
            `UPDATE 
            tm_new_task_mast SET                
            tm_task_status=2                        
            WHERE 
            tm_task_slno=?`,
            [
                data.tm_task_slno
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