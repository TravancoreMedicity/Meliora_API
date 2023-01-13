const { pool } = require('../../config/database');
module.exports = {
    roomcreationInsert: (data, callback) => {
        pool.query(
            `INSERT INTO room_master
            (
                rmc_name,
                rmc_type,
                rm_code,
                rmc_status,
                em_id
               )
                VALUES(?,?,?,?,?)`,
            [
                data.rmc_name,
                data.rmc_type,
                data.rm_code,
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
            `SELECT rmc_name,
            rmc_status
            FROM room_master
            WHERE rmc_name=? `,
            [
                data.rmc_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getroomCreation: (callBack) => {
        pool.query(
            `select rmc_slno,rmc_name,room_master.rmc_type,room_master.rm_code,ora_roommaster.rmc_desc,room_type.rmc_desc as rm_desc1,
            if(room_master.rmc_status = 1 ,'Yes','No') status from room_master 
           left join room_type on room_master.rmc_type=room_type.rmc_type
           left join ora_roommaster on room_master.rm_code=ora_roommaster.rm_code `,
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
            `SELECT rmc_name,               
            rmc_slno
            FROM room_master 
            WHERE rmc_name = ?  AND rmc_slno != ?`,
            [
                data.rmc_name,
                data.rmc_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    updateRoomCreation: (data, callBack) => {
        pool.query(
            `UPDATE room_master 
                SET rmc_name = ?,
                rmc_type = ?,
                rm_code=?,
                rmc_status= ?
                WHERE rmc_slno = ?`,
            [
                data.rmc_name,
                data.rmc_type,
                data.rm_code,
                data.rmc_status,
                data.rmc_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    inactiveRoomCreation: (data, callBack) => {
        pool.query(
            `UPDATE  room_master  SET rmc_status=0 WHERE rmc_slno = ?`,
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
    getroomTypemeliora: (callBack) => {
        pool.query(
            `SELECT rmc_type,
            rmc_desc
            FROM room_type WHERE rmc_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getroomOraclermmaster: (callBack) => {
        pool.query(
            `SELECT rm_code,
            rmc_desc
            FROM ora_roommaster WHERE rmc_status='Y' `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getoraRoomByType: (id, callBack) => {
        pool.query(
            `SELECT 
            ora_roommaster.rm_code,
            ora_roommaster.rmc_desc
             FROM meliora.ora_roommaster
             left join ora_bed on ora_roommaster.rm_code = ora_bed.rm_code
             left join ora_roomtype on ora_bed.rt_code = ora_roomtype.rt_code
             left join room_type on ora_roomtype.rt_code =room_type.rt_code 
             where rmc_type = ? order by rmc_desc asc`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        )
    },

    getMeliRoomMaster: (callBack) => {
        pool.query(
            `SELECT rmc_slno,rmc_name
            FROM room_master
            WHERE rmc_status=1 `,
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