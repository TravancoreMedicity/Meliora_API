const { pool } = require('../../config/database')
module.exports = {
    getCampus: (callback) => {
        pool.query(
            `SELECT 
            rm_campus_name,
            rm_campus_slno
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
            rm_building_slno
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
            rm_buildblock_slno
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
            rm_insidebuildblock_slno
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


}