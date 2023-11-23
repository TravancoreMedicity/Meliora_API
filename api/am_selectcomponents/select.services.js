const { pool } = require('../../config/database')
module.exports = {

    getCategory: (callback) => {
        pool.query(
            `SELECT 
            category_slno,
            category_name
            FROM
            meliora.am_category
            WHERE category_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getGroup: (callback) => {
        pool.query(
            `SELECT 
            group_slno,
            group_name
            FROM
            meliora.am_group
            WHERE group_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAssetType: (callback) => {
        pool.query(
            `SELECT 
            asset_type_slno,
            asset_type_name
            FROM
            meliora.am_asset_type
            WHERE asset_type_status=1`, [],
            (error, results, feilds) => {

                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAmItemType: (callback) => {
        pool.query(
            `SELECT 
            item_type_slno,
            item_type_name
            FROM
            meliora.am_item_type
            WHERE item_type_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAmSubcategory: (id, callback) => {
        pool.query(
            `SELECT 
            subcategory_slno,
            subcategory_name
            FROM
            meliora.am_subcategory
            WHERE subcategory_status=1 and category_slno=?`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAmSubGroup: (id, callback) => {
        pool.query(
            `SELECT 
            subgroup_slno,
            sub_group_name
            FROM
            meliora.am_sub_group
            WHERE sub_group_status=1 and group_slno=?`, [id],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAmManufacture: (callback) => {
        pool.query(
            `SELECT 
            manufacture_slno,
            manufacture_name
            FROM
            meliora.am_manufacture
            WHERE manufacture_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getAmModel: (callback) => {
        pool.query(
            `SELECT 
            model_slno,
            model_name
            FROM
            meliora.am_model
            WHERE model_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getUOM: (callback) => {
        pool.query(
            `SELECT 
            uom_slno,
            uom_name
            FROM
            meliora.am_uom
            WHERE uom_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getSubmodel: (id, callback) => {
        pool.query(
            `SELECT 
            submodel_slno,
            submodel_name
            FROM
            meliora.am_submodel
            WHERE submodel_status=1 and model_slno=? `, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    modelNoSelect: (callback) => {
        pool.query(
            `SELECT 
            item_creation_slno,  item_model_num
              FROM
              meliora.am_item_name_creation
              WHERE item_creation_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    ItemBasedOnDeptSec: (id, callback) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.item_creation_slno,
            item_name
            FROM
           am_asset_item_map_master
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
            WHERE item_deptsec_slno=? and item_create_status=1 group by item_creation_slno`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SpareItemBasedOnDeptSec: (id, callback) => {
        pool.query(
            `SELECT 
            am_spare_item_map_master.spare_creation_slno,
            item_name
            FROM
           am_spare_item_map_master
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
            WHERE spare_deptsec_slno=? and spare_create_status=1 group by spare_creation_slno`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    rackselect: (callback) => {
        pool.query(
            `SELECT 
            am_rack_slno,
            am_rack_name
            FROM
            am_rack_mast
            WHERE am_rack_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    RoomBasedOnDeptSec: (id, callback) => {
        pool.query(
            `SELECT 
            rm_room_slno,
            rm_room_name
             FROM
            rm_newroom_creation
           WHERE rm_outlet_slno=? and rm_room_status=1 ORDER BY rm_room_name ASC`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    SubRoomunderRoom: (id, callback) => {
        pool.query(
            `SELECT 
            subroom_slno,
            subroom_name
             FROM
            rm_subroom_master
           WHERE rm_room_slno=? and subroom_status=1 ORDER BY subroom_name ASC`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}