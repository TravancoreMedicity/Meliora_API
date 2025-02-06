const { pool } = require('../../config/database');

module.exports = {

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT user_group_slno,
            module_slno,
            menu_slno
               FROM user_group_rights
            WHERE user_group_slno=? and module_slno=? and menu_slno=? `,
            [
                data.user_group_slno,
                data.module_slno,
                data.menu_slno
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
            `SELECT user_grp_name,               
            user_grp_slno 
            FROM user_group_rights 
            WHERE user_grp_name = ?  AND user_grp_slno != ?`,
            [
                data.user_grp_name,
                data.user_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    usergroupRightupdate: (data, callBack) => {
        pool.query(
            `UPDATE user_group_rights 
                SET menu_view = ?                
                WHERE group_right_slno = ?`,
            [
                data.menu_view,
                data.group_right_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUsergroupRight: (callBack) => {
        pool.query(
            `SELECT user_grp_slno,
            user_grp_name,
            user_grp_status
                           FROM user_group_mast
                           where user_grp_status=1`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsergroupRightByid: (id, callBack) => {
        pool.query(
            `SELECT user_grp_slno,
            user_grp_name,
            user_grp_status
            FROM user_group_mast
            WHERE  user_grp_slno=?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results);
            }
        )
    },
    deleteUsergroupRight: (data, callBack) => {
        pool.query(
            `DELETE FROM user_group_mast WHERE user_grp_slno = ?`,
            [
                data.user_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getdataById: (data, callBack) => {
        pool.query(
            `SELECT user_grp_slno,
            user_grp_name,
            user_grp_status
            FROM user_group_mast
            WHERE  user_grp_slno IN (?)`,
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

    validateGroupRights: (data, callBack) => {
        pool.query(
            `SELECT 
            group_right_slno
        FROM user_group_rights 
        WHERE user_group_slno = ? AND module_slno =? and sub_module_slno=?`,
            [
                data.user_group_slno,
                data.module_slno,
                data.sub_module_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getMenuSlno: (data, callBack) => {
        pool.query(
            `SELECT menu_slno
            FROM menu_master 
            WHERE menu_module_slno = ? and sub_module_slno= ? and menu_status=1`,
            [
                data.module_slno,
                data.sub_module_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },

    insertGroupRight: (data, callBack) => { //Inser Group Rights              
        pool.query(
            `INSERT INTO user_group_rights (
                user_group_slno,
                module_slno,
                sub_module_slno,
                menu_slno
            )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getGroupMenuRigths: (data, callBack) => {
        pool.query(
            `SELECT 
            user_group_rights.group_right_slno,
                menu_master.menu_slno,
                menu_master.menu_module_slno,
                menu_master.menu_name,
                user_group_rights.menu_view,
                user_group_rights.menu_add,
                user_group_rights.menu_edit
            FROM user_group_rights
            RIGHT JOIN menu_master ON menu_master.menu_slno = user_group_rights.menu_slno 
            WHERE menu_master.menu_module_slno = ? AND user_group_slno = ? and user_group_rights.sub_module_slno=? and menu_status=1`,
            [
                data.module_slno,
                data.user_group_slno,
                data.sub_module_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateGroupMenuRights: (data, callBack) => {
        pool.query(
            `UPDATE user_group_rights
                SET menu_view = ?
                WHERE group_right_slno = ?`,
            [
                data.menu_view,
                data.group_right_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },


}