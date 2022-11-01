const { pool } = require('../../config/database');
module.exports = {
    subroomcreationInsert: (data, callback) => {
        pool.query(
            `INSERT INTO sub_room
            (
                subrm_desc,
                rmc_slno,
                rmc_type,
                status,
                em_id
               )
                VALUES(?,?,?,?,?)`,
            [
                data.subrm_desc,
                data.rmc_slno,
                data.rmc_type,
                data.status,
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
            `SELECT subrm_desc,
            status
            FROM sub_room
            WHERE subrm_desc=? `,
            [
                data.subrm_desc
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getsubroomCreation: (callBack) => {
        pool.query(
            `select subrm_slno,subrm_desc,rmc_name,rmc_desc,sub_room.rmc_slno,sub_room.rmc_type, if(status = 1 ,'Yes','No') status from sub_room
            left join room_master on sub_room.rmc_slno=room_master.rmc_slno
            left join room_type on sub_room.rmc_type=room_type.rmc_type `,
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
            `SELECT subrm_desc,               
            subrm_slno
            FROM sub_room 
            WHERE subrm_desc = ?  AND subrm_slno != ?`,
            [
                data.subrm_desc,
                data.subrm_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updatesubRoomCreation: (data, callBack) => {
        pool.query(
            `UPDATE sub_room 
                SET subrm_desc = ?,
                rmc_slno = ?,
                rmc_type=?,
                status= ?
                WHERE subrm_slno = ?`,
            [
                data.subrm_desc,
                data.rmc_slno,
                data.rmc_type,
                data.status,
                data.subrm_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactivesubRoomCreation: (data, callBack) => {
        pool.query(
            `UPDATE  sub_room  SET status=0 WHERE subrm_slno = ?`,
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
    getroomMasteremeliora: (callBack) => {
        pool.query(
            `SELECT rm_code,
            rmc_name
            FROM room_master WHERE rmc_status=1`,
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