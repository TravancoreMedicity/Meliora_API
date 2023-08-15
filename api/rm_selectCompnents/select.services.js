const { pool } = require('../../config/database')
module.exports = {
    getCampus: (callback) => {
        pool.query(
            `SELECT 
            rm_campus_name,
            rm_campus_slno,rm_campus_alias
            FROM
            rm_campus_mast
            WHERE rm_campus_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getBuilding: (callback) => {
        pool.query(
            `SELECT 
            rm_building_name,
            rm_building_slno,rm_building_alias
            FROM
            rm_building_mast
            WHERE rm_building_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getBuildingBlock: (callback) => {
        pool.query(
            `SELECT 
            rm_buildblock_name,
            rm_buildblock_slno,rm_buildblock_alias
            FROM
            rm_buildblock_mast
            WHERE rm_buildblock_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getInsideBuildingBlock: (callback) => {
        pool.query(
            `SELECT 
            rm_insidebuildblock_name,
            rm_insidebuildblock_slno,rm_insidebuildblock_alias
            FROM
            rm_insidebuildblock_mast
            WHERE rm_insidebuildblock_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getFloordropDown: (callback) => {
        pool.query(
            `SELECT 
            rm_floor_name,
            rm_floor_slno
            FROM
            rm_floor_creation
            WHERE rm_floor_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getFloorBasedOnBuild: (id, callBack) => {
        pool.query(
            `select rm_floor_slno,rm_floor_name,rm_floor_alias
            from rm_floor_creation            
            where rm_floor_building_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    getRoomTypedropDown: (callback) => {
        pool.query(
            `SELECT 
            rm_roomtype_slno,
            rm_roomtype_name
            FROM
            rm_room_type_master
            WHERE rm_roomtype_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getRoomCategorydropDown: (callback) => {
        pool.query(
            `SELECT 
            rm_roomcategory_name,
            rm_roomcategory_slno
            FROM
            rm_room_category_master
            WHERE rm_roomcategory_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}