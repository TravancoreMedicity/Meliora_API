const { pool } = require('../../config/database')
module.exports = {
    RoomInsert: (data, callback) => {

        pool.query(
            `INSERT INTO rm_newroom_creation
          ( 
            rm_room_name,
            rm_room_no,
            rm_room_alias,
            rm_room_floor_slno,
            rm_room_status
          )
          VALUES(?,?,?,?,?)`,
            [
                data.rm_room_name,
                data.rm_room_no,
                data.rm_room_alias,
                data.rm_room_floor_slno,
                data.rm_room_status,


            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    RoomView: (callback) => {
        pool.query(
            `select 
            rm_room_slno,
            rm_room_name,
            rm_room_no,
            rm_room_floor_slno,
            rm_room_alias,
            rm_floor_creation.rm_floor_name,
            rm_room_status,
            if(rm_newroom_creation.rm_room_status = 1 ,'Yes','No') status from rm_newroom_creation 
            left join 
            rm_floor_creation
             ON 
             rm_floor_creation.rm_floor_slno=rm_newroom_creation.rm_room_floor_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    RoomUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_newroom_creation SET 
            rm_room_name=?,
            rm_room_alias=?,
            rm_room_no=?,
            rm_room_floor_slno=?,
            rm_room_status=?
            WHERE 
            rm_room_slno=?`,

            [


                data.rm_room_name,
                data.rm_room_alias,
                data.rm_room_no,
                data.rm_room_floor_slno,
                data.rm_room_status,
                data.rm_room_slno
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