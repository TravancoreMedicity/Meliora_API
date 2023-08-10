const { pool } = require('../../config/database')
module.exports = {
    RoomTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_room_type_master
          (
            rm_roomtype_name,
            rm_roomtype_alias,
            rm_roomtype_no,
            rm_roomtype_status
          )
          VALUES(?,?,?,?)`,
            [
                data.rm_roomtype_name,
                data.rm_roomtype_alias,
                data.rm_roomtype_no,
                data.rm_roomtype_status

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
            `SELECT rm_roomtype_name,
            rm_roomtype_status
            FROM rm_room_type_master
            WHERE rm_roomtype_name=? `,
            [
                data.rm_roomtype_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    RoomTypeView: (callback) => {
        pool.query(
            `SELECT 
            rm_roomtype_slno,
            rm_roomtype_name,
            rm_roomtype_alias,
            rm_roomtype_no,
            rm_roomtype_status,
            if( rm_roomtype_status=1,'Yes','No')status
            FROM
            rm_room_type_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT rm_roomtype_name,               
            rm_roomtype_slno
            FROM rm_room_type_master
            WHERE rm_roomtype_name = ?  AND rm_roomtype_slno != ?`,
            [
                data.rm_roomtype_name,
                data.rm_roomtype_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    RoomtypeUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_room_type_master SET 
            rm_roomtype_name=?,
            rm_roomtype_alias=?,
            rm_roomtype_no=?,
            rm_roomtype_status=? 
            WHERE 
            rm_roomtype_slno=?`,
            [
                data.rm_roomtype_name,
                data.rm_roomtype_alias,
                data.rm_roomtype_no,
                data.rm_roomtype_status,
                data.rm_roomtype_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}