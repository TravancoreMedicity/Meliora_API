const { pool } = require('../../config/database');
module.exports = {
    roomtypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO room_type
            (
                rmc_desc,
                rt_code,
                rmc_status,
                em_id
               )
                VALUES(?,?,?,?)`,
            [
                data.rmc_desc,
                data.rt_code,
                data.rmc_status,
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
            `SELECT rmc_desc,
            rmc_status
            FROM room_type
            WHERE rmc_desc=? `,
            [
                data.rmc_desc
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
            `SELECT rmc_desc,               
            rmc_type
            FROM room_type 
            WHERE rmc_desc = ?  AND rmc_type != ?`,
            [
                data.rmc_desc,
                data.rmc_type
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getRoomtype: (callBack) => {
        pool.query(
            `select rmc_type,rmc_desc,rtc_desc,room_type.rt_code,
            if(rmc_status = 1 ,'Yes','No') status from room_type left join ora_roomtype on room_type.rt_code=ora_roomtype.rt_code `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateRoomtype: (data, callBack) => {
        pool.query(
            `UPDATE room_type 
                SET rmc_desc = ?,
                rt_code=?,
                rmc_status= ?
                WHERE rmc_type = ?`,
            [
                data.rmc_desc,
                data.rt_code,
                data.rmc_status,
                data.rmc_type
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactiveRoomtype: (data, callBack) => {
        pool.query(
            `UPDATE  room_type  SET rmc_status=0 WHERE rmc_type = ?`,
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
    getRoomoracle: (callBack) => {
        pool.query(
            `SELECT rt_code,
            rtc_desc
            FROM ora_roomtype `,
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