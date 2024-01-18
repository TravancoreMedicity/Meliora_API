const { pool } = require('../../config/database')
module.exports = {
    RoomInsert: (data, callback) => {

        pool.query(
            `INSERT INTO rm_newroom_creation
          ( 
            rm_room_name,
            rm_room_no,
            rm_room_alias,
            rm_build_slno,
            rm_building_block_slno,
            rm_room_floor_slno,
            rm_insidebuilldblock_slno,
            rm_roomtype_slno,
            rm_category_slno,
            rm_outlet_slno,
            rm_room_status,
            actual_rm_no,
            rm_room_no_dis,
            rm_old_roomno,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.rm_room_name,
                data.rm_room_no,
                data.rm_room_alias,
                data.rm_build_slno,
                data.rm_building_block_slno,
                data.rm_room_floor_slno,
                data.rm_insidebuilldblock_slno,
                data.rm_roomtype_slno,
                data.rm_category_slno,
                data.rm_outlet_slno,
                data.rm_room_status,
                data.actual_rm_no,
                data.rm_room_no_dis,
                data.rm_old_roomno,
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
    RoomView: (callback) => {
        pool.query(
            ` SELECT 
            rm_room_slno, rm_room_name,rm_room_no, rm_room_alias,rm_outlet_slno,
            rm_newroom_creation.rm_build_slno,
            rm_newroom_creation.rm_building_block_slno,
            rm_newroom_creation.rm_room_floor_slno,
            rm_newroom_creation.rm_insidebuilldblock_slno, 
            rm_newroom_creation.rm_roomtype_slno,
            rm_newroom_creation.rm_category_slno, 
            rm_room_status,if(rm_room_no_dis is null,"Not Given",rm_room_no_dis) as rm_room_no_dis,
            if(rm_room_status = 1 ,'Yes','No') status,
            rm_building_mast.rm_building_name,	
            rm_buildblock_mast.rm_buildblock_name,
            rm_floor_creation.rm_floor_name,
            rm_insidebuildblock_mast.rm_insidebuildblock_name,
            rm_room_type_master.rm_roomtype_name,
            rm_room_category_master.rm_roomcategory_name,rm_old_roomno
            from 
            rm_newroom_creation
            LEFT JOIN rm_building_mast ON rm_building_mast.rm_building_slno=rm_newroom_creation.rm_build_slno 
            LEFT JOIN rm_buildblock_mast ON rm_buildblock_mast.rm_buildblock_slno=rm_newroom_creation.rm_building_block_slno 
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno=rm_newroom_creation.rm_room_floor_slno          
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno=rm_newroom_creation.rm_insidebuilldblock_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno=rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_room_category_master ON rm_room_category_master.rm_roomcategory_slno=rm_newroom_creation.rm_category_slno
            `, [],
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
            rm_build_slno=?,
            rm_building_block_slno=?,
            rm_room_floor_slno=?,
            rm_insidebuilldblock_slno=?,
            rm_roomtype_slno=?,
            rm_category_slno=?,
            rm_outlet_slno=?,
            rm_room_status=?,
            rm_room_no_dis=?,
            rm_old_roomno=?,
            edit_user=?
            WHERE 
            rm_room_slno=?`,

            [


                data.rm_room_name,
                data.rm_room_no,
                data.rm_room_alias,
                data.rm_build_slno,
                data.rm_building_block_slno,
                data.rm_room_floor_slno,
                data.rm_insidebuilldblock_slno,
                data.rm_roomtype_slno,
                data.rm_category_slno,
                data.rm_outlet_slno,
                data.rm_room_status,
                data.rm_room_no_dis,
                data.rm_old_roomno,
                data.edit_user,
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

    RoomLastUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_floor_room_connect SET 
            last_room_slno=?                      
            WHERE 
            floor_slno=?`,
            [
                data.last_room_slno,
                data.floor_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    roomgetById: (id, callback) => {
        pool.query(
            `SELECT rm_floor_room_starts,rm_floor_room_ends FROM rm_floor_creation WHERE rm_floor_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    lastUpdatedRoomgetById: (id, callback) => {
        pool.query(
            `select last_room_slno from rm_floor_room_connect where floor_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


}