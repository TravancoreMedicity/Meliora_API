const { pool } = require('../../config/database')
module.exports = {
    RoomTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_room_type_master
          (
            rm_roomtype_name,
            rm_roomtype_alias,
            rm_roomtype_no,
            rm_roomtype_status,
            rm_roomtype_type,
            create_user
          )
          VALUES(?,?,?,?,?,?)`,
            [
                data.rm_roomtype_name,
                data.rm_roomtype_alias,
                data.rm_roomtype_no,
                data.rm_roomtype_status,
                data.rm_roomtype_type,
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
            rm_roomtype_type,
            if( rm_roomtype_status=1,'Yes','No')status,
            if(rm_roomtype_type=1,'Entrance','Not entrance')room_type
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
            rm_roomtype_status=?,
            rm_roomtype_type=? ,
            edit_user=?
            WHERE 
            rm_roomtype_slno=?`,
            [
                data.rm_roomtype_name,
                data.rm_roomtype_alias,
                data.rm_roomtype_no,
                data.rm_roomtype_status,
                data.rm_roomtype_type,
                data.edit_user,
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