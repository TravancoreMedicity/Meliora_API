const { pool } = require('../../config/database')
module.exports = {

    getProjectListWithGoal: (id, callback) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_duedate
            FROM tm_project_mast 
            WHERE tm_goal_slno = ? and tm_project_status!=1
            order by tm_project_name ASC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getGoalsList: (callBack) => {
        pool.query(
            `SELECT 
            tm_goals_slno,
            tm_goal_name,
            tm_goal_duedate
            FROM tm_goal_mast
            where tm_goal_status!=1
            order by tm_goal_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMultDepSection: (data, callback) => {
        pool.query(
            `SELECT 
            sec_id,
            sec_name,
            dept_id
            FROM co_deptsec_mast 
            WHERE dept_id IN (?) and sec_status=1
            order by sec_name ASC`,
            [

                data
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },
    getMultHodInCharge: (data, callback) => {

        pool.query(
            `select 
            dept_section ,
            auth_post,
            emp_id,
            sec_name,
            co_employee_master.em_name
            from co_authorization
            left join co_employee_master on co_employee_master.em_id=co_authorization.emp_id 
             left join co_deptsec_mast on co_deptsec_mast.sec_id=co_authorization.dept_section
             WHERE dept_section IN (?) and auth_status=1
            order by em_name ASC`,
            [

                data
            ],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );

    },

    getNonGoalprojects: (callBack) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_duedate
            FROM tm_project_mast 
            WHERE tm_goal_slno is NULL and tm_project_status!=1
            order by tm_project_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getProjectList: (callBack) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_duedate
            FROM tm_project_mast                  
            order by tm_project_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getprojectFrTaskCreation: (callBack) => {
        pool.query(
            `SELECT 
            tm_project_slno,
            tm_project_name,
            tm_project_status,
            tm_project_duedate
            FROM tm_project_mast
            where tm_project_status!=1                 
            order by tm_project_name ASC`,
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}