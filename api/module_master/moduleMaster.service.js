const { pool } = require('../../config/database')

module.exports = {
    moduleInsert: (data, callback) => {
        pool.query(
            `INSERT INTO module_master
            (
                module_name,
                module_status,
                create_user
               )
                VALUES(?,?,?)`,
            [
                data.module_name,
                data.module_status,
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
            `SELECT module_name
            FROM module_master
            WHERE module_name=? `,
            [
                data.module_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getModule: (callBack) => {
        pool.query(
            `SELECT module_slno,
            module_name,
            module_status,
            if(module_status = 1 ,'Yes','No') status 
            FROM module_master`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    moduleMasterById: (id, callBack) => {
        pool.query(
            `SELECT module_slno,
            module_name,module_status
            FROM module_master
            WHERE module_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT module_name,               
            module_slno 
            FROM module_master 
            WHERE module_name = ?  AND module_slno != ?`,
            [
                data.module_name,
                data.module_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    moduleUpdate: (data, callback) => {
        pool.query(
            `UPDATE module_master 
                SET module_name = ?,
                module_status=?,
                edit_user=?
                WHERE module_slno = ?`,
            [
                data.module_name,
                data.module_status,
                data.edit_user,
                data.module_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    moduleDelete: (data, callBack) => {
        pool.query(
            `DELETE FROM module_master WHERE module_slno = ?`,
            [
                data.module_slno
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
            `SELECT module_slno,
            module_name,module_status
            FROM module_master
            WHERE module_slno IN (?)`,
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