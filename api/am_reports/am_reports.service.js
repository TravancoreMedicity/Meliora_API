const { pool } = require('../../config/database')
module.exports = {

    getItemList: (callBack) => {
        pool.query(
            `SELECT item_creation_slno,item_name, 
            am_asset_type.asset_type_name,am_item_type.item_type_name,am_category.category_name,
            am_subcategory.subcategory_name,am_group.group_name,am_sub_group.sub_group_name,
            am_manufacture.manufacture_name, am_uom.uom_name,
            am_model.model_name,item_model_num
            from am_item_name_creation
            left join am_asset_type on am_asset_type.asset_type_slno=am_item_name_creation.item_asset_type_slno
            left join am_item_type on am_item_type.item_type_slno=am_item_name_creation.item_type_slno
            left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join am_subcategory on am_subcategory.subcategory_slno=am_item_name_creation.item_subcategory_slno
            left join am_group on am_group.group_slno=am_item_name_creation.item_group_slno
            left join am_sub_group on am_sub_group.subgroup_slno=am_item_name_creation.item_subgroup_slno
            left join am_manufacture on am_manufacture.manufacture_slno=am_item_name_creation.item_manufactures_slno
            left join am_uom on am_uom.uom_slno=am_item_name_creation.item_uom_slno
            left join am_model on am_model.model_slno=am_item_name_creation.item_model_slno
            `,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )

    },
    getItemsFronList: (data, callBack) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno, 
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,
            am_custodian_name,item_asset_no,item_asset_no_only,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date,
            rm_newroom_creation.rm_room_name,rm_subroom_master.subroom_name,
           item_custodian_dept,am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
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
          WHERE
           item_dept_slno =? and item_deptsec_slno=?
           and  item_create_status=1
           ORDER BY am_asset_item_map_master.am_item_map_slno DESC`,
            [
                data.item_dept_slno,
                data.item_deptsec_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

}