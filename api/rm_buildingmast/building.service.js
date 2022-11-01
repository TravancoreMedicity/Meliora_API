const { pool } = require('../../config/database');

module.exports = {
    buildingInsert: (data, callback) => {
        pool.query(
            `INSERT INTO building_master
            (
                build_name,
                build_alias,
                build_no,
                status,
                em_id
               )
                VALUES(?,?,?,?,?)`,
            [
                data.build_name,
                data.build_alias,
                data.build_no,
                data.status,
                data.em_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results.insertId);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT build_name,
            status
            FROM building_master
            WHERE build_name=? `,
            [
                data.build_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkBuildalias: (data, callBack) => {
        pool.query(
            `SELECT build_alias,
            status
            FROM building_master
            WHERE build_alias = ?`,
            [
                data.build_alias
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getBuilding: (callBack) => {
        pool.query(
            `SELECT build_code,
            build_name,
            build_alias,
            build_no,
                if(status = 1 ,'Yes','No') status
            FROM building_master `,
            [],
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
            `SELECT build_name,               
            build_code
            FROM building_master 
            WHERE build_name = ?  AND build_code != ?`,
            [
                data.build_name,
                data.build_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateAlias: (data, callBack) => {
        pool.query(
            `   SELECT build_alias,               
            build_code
            FROM building_master 
            WHERE build_alias =?  AND build_code != ?`,
            [
                data.build_alias,
                data.build_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateBuilding: (data, callBack) => {
        pool.query(
            `UPDATE building_master 
                SET build_name = ?,
                build_alias = ?,
                build_no=?,
                status= ?
                WHERE build_code = ?`,
            [
                data.build_name,
                data.build_alias,
                data.build_no,
                data.status,
                data.build_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactiveBuilding: (data, callBack) => {
        pool.query(
            `UPDATE  building_master  SET status=0 WHERE build_code = ?`,
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