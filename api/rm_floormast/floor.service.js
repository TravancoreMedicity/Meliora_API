const { pool } = require('../../config/database');
module.exports = {
    floorInsert: (data, callback) => {
        pool.query(
            `INSERT INTO floor_master
            (
                floor_desc,
                build_code,
                floor_number,
                floor_status,
                em_id
               )
                VALUES(?,?,?,?,?)`,
            [
                data.floor_desc,
                data.build_code,
                data.floor_number,
                data.floor_status,
                data.em_id
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
            `SELECT floor_desc,
            floor_status
            FROM floor_master
            WHERE floor_desc=? `,
            [
                data.floor_desc
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
            `SELECT floor_desc,               
            floor_code
            FROM floor_master 
            WHERE floor_desc = ?  AND floor_code != ?`,
            [
                data.floor_desc,
                data.floor_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getFloor: (callBack) => {
        pool.query(
            `select floor_code,floor_desc,build_name,floor_number,building_master.build_code,
            if(floor_status = 1 ,'Yes','No') status from floor_master left join building_master on floor_master.build_code=building_master.build_code `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateFloor: (data, callBack) => {
        pool.query(
            `UPDATE floor_master 
                SET floor_desc = ?,
                build_code = ?,
                floor_number=?,
                floor_status= ?
                WHERE floor_code = ?`,
            [
                data.floor_desc,
                data.build_code,
                data.floor_number,
                data.floor_status,
                data.floor_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactiveFloor: (data, callBack) => {
        pool.query(
            `UPDATE  floor_master  SET floor_status=0 WHERE floor_code = ?`,
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
    getBuild: (callBack) => {
        pool.query(
            `SELECT build_code,
            build_name
            FROM building_master WHERE status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}