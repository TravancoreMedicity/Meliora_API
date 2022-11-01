const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO module_group_user_rights (
                emp_slno,
                module_slno,
                mod_grp_slno,
                mod_grp_user_status
            )
            VALUES (?,?,?,?)`,
            [
                data.emp_slno,
                data.module_slno,
                data.mod_grp_slno,
                data.mod_grp_user_status,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE module_group_user_rights
                SET emp_slno  = ?,
                module_slno = ?,
                mod_grp_slno = ?,
                mod_grp_user_status = ?
                WHERE mod_grp_user_slno =?`,
            [
                data.emp_slno,
                data.module_slno,
                data.mod_grp_slno,
                data.mod_grp_user_status,
                data.mod_grp_user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT mod_grp_user_slno
                FROM module_group_user_rights 
                WHERE emp_slno = ?`,
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
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT mdrte_slno
                FROM module_group_user_rights 
                WHERE emp_slno = ? AND mdrte_slno != ?`,
            [
                data.emp_slno,
                data.mdrte_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getUserModuleRightByID: (id, callBack) => {
        pool.query(
            `SELECT 
            mod_grp_user_slno,
                emp_slno,
                module_slno
                mod_grp_slno,
                mod_grp_user_status
            FROM module_group_user_rights
            WHERE mod_grp_user_slno =? `,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }

                return callBack(null, results)
            }
        )
    },
    getuserModuleRights: (callBack) => {
        pool.query(
            `SELECT 
                mdrte_slno,
                emp_slno,
                hrm_emp_master.em_name,
                module_group_mast.module_group_name,
                user_group_mast.user_group_name,
                IF(status = 1, 'Active', 'Inactive') status
            FROM
                module_group_user_rights
                    LEFT JOIN
                hrm_emp_master ON hrm_emp_master.em_no = module_group_user_rights.emp_slno
                    LEFT JOIN
                module_group_mast ON module_group_mast.mdgrp_slno = module_group_user_rights.mdgrp_slno
                    LEFT JOIN 
                user_group_mast ON user_group_mast.user_grp_slno = module_group_user_rights.user_grp_slno`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    deleteUserGroup: (data, callBack) => {
        pool.query(
            `DELETE FROM module_group_user_rights WHERE mod_grp_user_slno=?`,
            [
                data.mod_grp_user_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    }
}