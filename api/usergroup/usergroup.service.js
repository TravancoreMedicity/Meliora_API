const { pool } = require('../../config/database');

module.exports = {
    usergroupInsert: (data, callBack) => {
        pool.query(
            `INSERT INTO user_group_mast (user_grp_name,user_grp_status,create_user)
                VALUES(?,?,?)`,
            [
                data.user_grp_name,
                data.user_grp_status,
                data.create_user
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
            `SELECT
                 user_grp_name,
            user_grp_status
            FROM 
                user_group_mast
            WHERE 
                user_grp_name=? `,
            [
                data.user_grp_name
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
            `SELECT 
                user_grp_name,               
                user_grp_slno 
            FROM 
                user_group_mast 
            WHERE 
                user_grp_name = ?  AND user_grp_slno != ?`,
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
    usergroupupdate: (data, callBack) => {
        pool.query(
            `UPDATE 
                user_group_mast 
                SET 
                    user_grp_name = ?,
                    user_grp_status =?,
                    edit_user=?
                WHERE 
                    user_grp_slno = ?`,
            [
                data.user_grp_name,
                data.user_grp_status,
                data.edit_user,
                data.user_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getUsergroup: (callBack) => {
        pool.query(
            `SELECT 
                user_grp_slno,
                user_grp_name,
                user_grp_status,
                if(user_grp_status = 1 ,'Yes','No') status
            FROM 
                user_group_mast`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsergroupByid: (id, callBack) => {
        pool.query(
            `SELECT 
                user_grp_slno,
                user_grp_name,
                user_grp_status
            FROM 
                user_group_mast
            WHERE  
                user_grp_slno=?`,
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
    deleteUsergroup: (data, callBack) => {
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
            `SELECT 
                user_grp_slno,
                user_grp_name,
                user_grp_status
            FROM 
                user_group_mast
            WHERE 
                user_grp_slno IN (?)`,
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