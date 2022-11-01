const { pool } = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO menu_master (
                menu_name,
                menu_module_slno,
                menu_status
            )
            VALUES (?,?,?)`,
            [
                data.menu_name,
                data.menu_module_slno,
                // JSON.stringify(data.menu_module_slno),
                data.menu_status
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
            `SELECT menu_name,
            menu_status
            FROM menu_master
            WHERE menu_name=? `,
            [
                data.menu_name
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
            `SELECT menu_name,               
            menu_slno 
            FROM menu_master 
            WHERE menu_name = ?  AND menu_slno != ?`,
            [
                data.menu_name,
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
    update: (data, callBack) => {
        pool.query(
            `UPDATE menu_master 
                SET menu_name = ?,
                menu_module_slno =?,
                menu_status=?
                WHERE menu_slno = ?`,
            [
                data.menu_name,
                JSON.stringify(data.menu_module_slno),
                data.menu_status,
                data.menu_slno
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
            menu_slno,
            menu_name,
            menu_module_slno
            FROM menu_master `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getModuleMasterByID: (id, callBack) => {
        pool.query(
            `SELECT 
            menu_master.menu_slno,
            menu_name,
            menu_module_slno,
            ifnull(user_group_slno,0)user_group_slno,
            ifnull(menu_view,0)menu_view,
            ifnull(group_right_slno,0)group_right_slno
            FROM menu_master
            left join user_group_rights on user_group_rights.menu_slno=menu_master.menu_slno
            WHERE menu_master.menu_module_slno  = ?`,
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
    deleteMenuMaster: (data, callBack) => {
        pool.query(
            `DELETE FROM menu_master WHERE menu_slno = ?`,
            [
                data.menu_slno
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