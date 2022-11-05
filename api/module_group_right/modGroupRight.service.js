const { pool } = require('../../config/database')

module.exports = {
    moduleGroupRightInsert: (data, callback) => {
        pool.query(
            `INSERT INTO module_group_user_rights
            (
                emp_slno,
                mod_grp_slno,
                user_group_slno,
                mod_grp_user_status,
                dept_slno,
                deptsec_slno,
                create_user
               )
                VALUES(?,?,?,?,?,?,?)`,
            [
                data.emp_slno,
                data.mod_grp_slno,
                data.user_group_slno,
                data.mod_grp_user_status,
                data.dept_slno,
                data.deptsec_slno,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT emp_slno
            FROM module_group_user_rights
            WHERE emp_slno=? `,
            [
                data.emp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getmoduleGroupRight: (callBack) => {
        pool.query(
            `select 
            mod_grp_user_slno,user_grp_name,
            em_name,mod_grp_name,emp_slno,
            module_group_user_rights.mod_grp_slno,
            user_group_slno,co_department_mast.dept_name,co_deptsec_mast.sec_name,
            dept_slno,deptsec_slno,
            if(mod_grp_user_status = 1 ,'Yes','No')mod_grp_user_status
            from  module_group_user_rights
            left join co_department_mast on co_department_mast.dept_id=module_group_user_rights.dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_name=module_group_user_rights.deptsec_slno
            left join co_employee_master on co_employee_master.em_id=module_group_user_rights.emp_slno
            left join module_group_mast on module_group_mast.mod_grp_slno=module_group_user_rights.mod_grp_slno
            left join user_group_mast on user_group_mast.user_grp_slno=module_group_user_rights.user_group_slno;
            `,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    // moduleMasterById: (id, callBack) => {
    //     pool.query(
    //         `SELECT module_slno,
    //         module_name,module_status
    //         FROM module_master
    //         WHERE module_slno=?`,
    //         [
    //             id
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT emp_slno,               
            mod_grp_user_slno 
            FROM module_group_user_rights 
            WHERE emp_slno = ?  AND mod_grp_user_slno != ?`,
            [
                data.emp_slno,
                data.mod_grp_user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    moduleGroupRightUpdate: (data, callback) => {
        pool.query(
            `UPDATE module_group_user_rights 
                SET emp_slno = ?,
                deptsec_slno=?,
                dept_slno=?,
                mod_grp_slno=?,
                user_group_slno=?,
                mod_grp_user_status=?
                WHERE mod_grp_user_slno = ?`,
            [
                data.emp_slno,
                data.deptsec_slno,
                data.dept_slno,
                data.mod_grp_slno,
                data.user_group_slno,
                data.mod_grp_user_status,
                data.mod_grp_user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    // moduleDelete: (data, callBack) => {
    //     pool.query(
    //         `DELETE FROM module_master WHERE module_slno = ?`,
    //         [
    //             data.module_slno
    //         ],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callBack(error);
    //             }
    //             return callBack(null, results);
    //         }
    //     );
    // },
    getdataById: (data, callBack) => {
        pool.query(
            `SELECT emp_slno,dept_slno,deptsec_slno,
            mod_grp_slno,user_group_slno,mod_grp_user_status,mod_grp_user_slno
            FROM module_group_user_rights
            WHERE mod_grp_user_slno IN (?)`,
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
}