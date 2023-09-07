const { pool } = require('../../config/database')
module.exports = {
    ItemNameInsert: (data, callback) => {

        pool.query(
            `INSERT INTO meliora.am_item_name_creation
          ( 
            item_asset_type_slno,
            item_type_slno,
            item_category_slno,
            item_subcategory_slno,
            item_group_slno,
            item_subgroup_slno,
            item_model_slno,
            item_submodel_slno,
            item_uom_slno,
            item_manufactures_slno,
            item_name,
            item_base_name,
            item_model_num,
            item_specific_one,
            item_specific_two,
            
            item_creation_status
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.item_asset_type_slno,
                data.item_type_slno,
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_uom_slno,
                data.item_manufactures_slno,
                data.item_name,
                data.item_base_name,
                data.item_model_num,
                data.item_specific_one,
                data.item_specific_two,
                data.item_creation_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },

    ItemNameview: (callback) => {
        pool.query(
            `SELECT
            item_creation_slno,
            am_item_name_creation.item_asset_type_slno,
            am_asset_type.asset_type_name,
            am_item_name_creation.item_type_slno,
            am_item_type.item_type_name,
            am_item_name_creation.item_category_slno,
            am_category.category_name, 
			am_item_name_creation.item_subcategory_slno,
            am_subcategory.subcategory_name, 
            am_item_name_creation.item_group_slno,
            am_group.group_name, 
            am_item_name_creation.item_subgroup_slno,
            am_sub_group.sub_group_name,
            am_item_name_creation.item_model_slno,
            am_model.model_name,
            am_item_name_creation.item_submodel_slno,
            am_submodel.submodel_name,
            am_item_name_creation.item_uom_slno,
            am_uom.uom_name,
            am_item_name_creation.item_manufactures_slno,
            am_manufacture.manufacture_name, 
            item_name,
            item_base_name,
            item_model_num,
            item_specific_one,
            item_specific_two,
            item_specific_three,
            item_creation_status,
            if(am_item_name_creation.item_creation_status = 1 ,'Yes','No') status
            from am_item_name_creation
            left join am_asset_type on am_asset_type.asset_type_slno=am_item_name_creation.item_asset_type_slno
            left join am_item_type on am_item_type.item_type_slno=am_item_name_creation.item_asset_type_slno
			left join am_category on am_category.category_slno=am_item_name_creation.item_category_slno
            left join am_subcategory on am_subcategory.subcategory_slno=am_item_name_creation.item_subcategory_slno
			left join am_group on am_group.group_slno=am_item_name_creation.item_group_slno
            left join am_sub_group on am_sub_group.subgroup_slno=am_item_name_creation.item_subgroup_slno
			left join am_model on am_model.model_slno=am_item_name_creation.item_model_slno
            left join am_submodel on am_submodel.submodel_slno=am_item_name_creation.item_submodel_slno
			left join am_uom on am_uom.uom_slno=am_item_name_creation.item_uom_slno
			left join am_manufacture on am_manufacture.manufacture_slno=am_item_name_creation.item_manufactures_slno  `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ItemNameUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_item_name_creation SET 
      
            item_asset_type_slno=?,
            item_type_slno=?,
            item_category_slno=?,
            item_subcategory_slno=?,
            item_group_slno=?,
            item_subgroup_slno=?,
            item_model_slno=?,
            item_submodel_slno=?,
            item_uom_slno=?,
            item_manufactures_slno=?,
            item_name=?,
            item_base_name=?,
            item_model_num=?,
            item_specific_one=?,
            item_specific_two=?,
            item_specific_three=?,
            item_creation_status=?
            WHERE 
            item_creation_slno=?`,

            [
                data.item_asset_type_slno,
                data.item_type_slno,
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_uom_slno,
                data.item_manufactures_slno,
                data.item_name,
                data.item_base_name,
                data.item_model_num,
                data.item_specific_one,
                data.item_specific_two,
                data.item_specific_three,
                data.item_creation_status,
                data.item_creation_slno
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