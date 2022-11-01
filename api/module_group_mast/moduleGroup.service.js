const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO module_group_mast (
                mod_grp_name,
                module_slno
            )
            VALUES (?,?)`,
            [
                data.mod_grp_name,
                JSON.stringify(data.module_slno),
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
            `SELECT mod_grp_name
            FROM module_group_mast
            WHERE mod_grp_name=?`,
            [
                data.mod_grp_name
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
            `SELECT mod_grp_name,               
            mod_grp_slno 
            FROM module_group_mast 
            WHERE mod_grp_name = ?  AND mod_grp_slno != ?`,
            [
                data.mod_grp_name,
                data.mod_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    update: (data, callBack) => {
        pool.query(
            `UPDATE module_group_mast 
                SET mod_grp_name = ?,
                module_slno =?
                WHERE mod_grp_slno = ?`,
            [
                data.mod_grp_name,
                JSON.stringify(data.module_slno),
                data.mod_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSelect: (callBack) => {
        pool.query(
            `SELECT 
            mod_grp_slno,
            mod_grp_name,
            module_slno
            FROM module_group_mast `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getModuleGroupByID: (id, callBack) => {
        pool.query(
            `SELECT 
            mod_grp_slno,
            mod_grp_name,
            module_slno
            FROM module_group_mast
            WHERE mod_grp_slno = ?`,
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
    deleteModuleGroup: (data, callBack) => {
        pool.query(
            `DELETE FROM module_group_mast WHERE mod_grp_slno = ?`,
            [
                data.mod_grp_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}