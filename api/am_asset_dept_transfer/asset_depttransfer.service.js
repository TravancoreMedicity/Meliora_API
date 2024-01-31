const { pool } = require('../../config/database')
module.exports = {
    getAssetBasedOnLocation: (data, callback) => {
        pool.query(
            `select
            item_name,am_item_map_slno,
            am_item_name_creation.item_creation_slno,
            item_deptsec_slno,     co_department_mast.dept_name,  
         am_custodian_department.am_custodian_name,
            am_item_name_creation.item_name,
            co_deptsec_mast.sec_name,
             item_asset_no,
            item_asset_no_only
            from am_asset_item_map_master
            left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id =am_asset_item_map_master.item_deptsec_slno
            left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
          left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
            where am_asset_item_map_master.item_asset_no=? and am_asset_item_map_master.item_asset_no_only=?`,
            [
                data.item_asset_no,
                data.item_asset_no_only
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    transferDepartment: (data, callback) => {
        pool.query(
            `UPDATE am_asset_item_map_master
            SET item_dept_slno=?,
            item_deptsec_slno=?,
            item_room_slno=?,
            item_subroom_slno=?
            WHERE  am_item_map_slno=?`,
            [
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.am_item_map_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}
