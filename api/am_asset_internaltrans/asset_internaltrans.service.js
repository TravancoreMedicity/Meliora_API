const { pool } = require('../../config/database')
module.exports = {
    getdataForInternalTrans: (data, callback) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno, 
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,
            am_custodian_name,item_asset_no,item_asset_no_only,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date,
            rm_newroom_creation.rm_room_name,rm_subroom_master.subroom_name,
           item_custodian_dept,am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
           am_category.category_name,
           am_manufacture_no
          FROM
          am_asset_item_map_master
           left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
           left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
		   left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_asset_item_map_master.item_room_slno
           left join rm_subroom_master on rm_subroom_master.subroom_slno=am_asset_item_map_master.item_subroom_slno
           left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
           WHERE
           item_dept_slno =? and item_deptsec_slno=?
           and  item_create_status=1
           ORDER BY am_asset_item_map_master.am_item_map_slno DESC`,
            [
                data.item_dept_slno,
                data.item_deptsec_slno
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
