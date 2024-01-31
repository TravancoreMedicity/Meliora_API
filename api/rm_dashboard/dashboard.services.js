const { pool } = require('../../config/database')
module.exports = {
    floorDashgetById: (id, callback) => {
        pool.query(
            `select rm_floor_slno,rm_floor_name,floor_order,rm_floor_build_block_slno,rm_buildblock_name
            from rm_floor_creation     
            left join rm_buildblock_mast on rm_buildblock_mast.rm_buildblock_slno=  rm_floor_creation.     rm_floor_build_block_slno
            where rm_floor_building_slno=? ORDER BY floor_order DESC`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    RoomDashgetById: (id, callback) => {
        pool.query(
            `select rm_room_slno,rm_room_name
            from rm_newroom_creation 
                     
            where rm_room_floor_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    FloorNDroomById: (id, callback) => {
        pool.query(

            `SELECT 
            rm_room_slno, rm_room_name,rm_room_no, rm_room_alias,
            rm_newroom_creation.rm_build_slno,
            rm_newroom_creation.rm_room_floor_slno,
            rm_newroom_creation.rm_insidebuilldblock_slno, 
            rm_newroom_creation.rm_roomtype_slno,
            rm_newroom_creation.rm_category_slno, 
            rm_room_status,
            rm_building_mast.rm_building_name,			
            rm_floor_creation.rm_floor_name,
            rm_insidebuildblock_mast.rm_insidebuildblock_name,
            rm_room_type_master.rm_roomtype_name,
            rm_room_category_master.rm_roomcategory_name 
            from 
            rm_newroom_creation
            LEFT JOIN rm_building_mast ON rm_building_mast.rm_building_slno=rm_newroom_creation.rm_build_slno    
            LEFT JOIN rm_floor_creation ON rm_floor_creation.rm_floor_slno=rm_newroom_creation.rm_room_floor_slno          
            LEFT JOIN rm_insidebuildblock_mast ON rm_insidebuildblock_mast.rm_insidebuildblock_slno=rm_newroom_creation.rm_insidebuilldblock_slno
            LEFT JOIN rm_room_type_master ON rm_room_type_master.rm_roomtype_slno=rm_newroom_creation.rm_roomtype_slno
            LEFT JOIN rm_room_category_master ON rm_room_category_master.rm_roomcategory_slno=rm_newroom_creation.rm_category_slno
            where rm_room_floor_slno=? and rm_roomtype_type!=1`,
            [id],

            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getSubRoom: (id, callback) => {
        pool.query(

            `select rm_room_slno,subroom_name,subroom_slno
            from rm_subroom_master
            where rm_room_slno=? and sub_rm_roomtype_slno!=1`,
            [id],

            (error, results, fields) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }

        );
    },

    getRoomAsset: (id, callback) => {
        pool.query(
            `select am_item_map_slno,
            am_item_name_creation.item_name,
           P.sec_name as cus_primary,
           S.sec_name as cus_second,item_subroom_slno,
           rm_newroom_creation.rm_room_name,
           am_category.category_name,
           IFNULL(  rm_subroom_master.subroom_name,"Not Subroom" ) subroom_name
                    from am_asset_item_map_master            
                    left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
                   left join co_deptsec_mast P on P.sec_id=am_asset_item_map_master.item_deptsec_slno
                    left join co_deptsec_mast S on S.sec_id=am_asset_item_map_master.item_custodian_dept_sec
              left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_asset_item_map_master.item_room_slno
           left join rm_subroom_master on rm_subroom_master.subroom_slno=am_asset_item_map_master.item_subroom_slno
           left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
           where item_room_slno =?`,
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