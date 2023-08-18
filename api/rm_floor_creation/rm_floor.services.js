const { pool } = require('../../config/database')
module.exports = {
    FloorInsert: (data, callback) => {

        pool.query(
            `INSERT INTO rm_floor_creation
          ( 
           rm_floor_campus_slno,
           rm_floor_building_slno,
           rm_floor_build_block_slno,
                     rm_floor_name,
           rm_floor_alias,
           rm_floor_no,
           floor_order,
           rm_floor_room_starts,
           rm_floor_room_ends,
           rm_floor_status
          )
          VALUES(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.rm_floor_campus_slno,
                data.rm_floor_building_slno,
                data.rm_floor_build_block_slno,
                data.rm_floor_name,
                data.rm_floor_alias,
                data.rm_floor_no,
                data.floor_order,
                data.rm_floor_room_starts,
                data.rm_floor_room_ends,
                data.rm_floor_status

            ],
            (error, results, fields) => {
                if (error) {
                    console.log(results);
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    FloorLastRoom: (data, callback) => {


        pool.query(
            `INSERT INTO rm_floor_room_connect
          ( 
            floor_slno,
            last_room_slno
                     )
          VALUES(?,?)`,
            [
                data.floor_slno,
                data.last_room_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


    FloorView: (callback) => {
        pool.query(
            `SELECT
            rm_floor_slno, rm_floor_campus_slno,rm_campus_mast.rm_campus_name,
            rm_floor_building_slno,rm_building_mast.rm_building_name,
            rm_floor_build_block_slno, rm_buildblock_mast.rm_buildblock_name,          
            rm_floor_name, rm_floor_alias,rm_floor_no,floor_order,rm_floor_room_starts,rm_floor_room_ends, rm_floor_status,
            if(rm_floor_creation.rm_floor_status = 1 ,'Yes','No') status
            from rm_floor_creation
            left join rm_campus_mast on rm_campus_mast.rm_campus_slno=rm_floor_creation.rm_floor_campus_slno
            left join rm_building_mast on rm_building_mast.rm_building_slno=rm_floor_creation.rm_floor_building_slno
            left join rm_buildblock_mast on rm_buildblock_mast.rm_buildblock_slno=rm_floor_creation.rm_floor_build_block_slno
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    FloorUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_floor_creation SET 
            rm_floor_campus_slno=?,
            rm_floor_building_slno=?,
            rm_floor_build_block_slno=?,
            rm_floor_name=?,
            rm_floor_alias=?,
            rm_floor_no=?,
            floor_order=?,
            rm_floor_room_starts=?,
            rm_floor_room_ends=?,
            rm_floor_status=? 
            WHERE 
            rm_floor_slno=?`,

            [
                data.rm_floor_campus_slno,
                data.rm_floor_building_slno,
                data.rm_floor_build_block_slno,
                data.rm_floor_name,
                data.rm_floor_alias,
                data.rm_floor_no,
                data.floor_order,
                data.rm_floor_room_starts,
                data.rm_floor_room_ends,
                data.rm_floor_status,
                data.rm_floor_slno
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