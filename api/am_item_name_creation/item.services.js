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
            item_creation_status,
            asset_spare
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.asset_spare
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
            item_specific_two,asset_spare,
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
			left join am_manufacture on am_manufacture.manufacture_slno=am_item_name_creation.item_manufactures_slno
            ORDER BY item_creation_slno DESC
            `, [],
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
            item_creation_status=?,
            asset_spare=?
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
                data.item_creation_status,
                data.asset_spare,
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

    getitemFromMasterdemo: (data, callBack) => {
        pool.query(`
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and
            item_group_slno=?  and 
            item_model_slno=?           
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_model_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )


    },
    getitemFromMaster: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and
            item_group_slno=?  and 
            item_model_slno=? and 
           
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_model_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    //Get Items From Item Master
    getitemAll: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoManufactr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=?  and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
             item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoSubGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemNoGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemNoSubCat: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemNoCat: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemOnlyModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_model_num=?
            and item_creation_status=1`,
            [
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlyManufactr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_manufactures_slno=?
            and item_creation_status=1`,
            [

                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlySubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlyModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlySubGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subgroup_slno=? 
            and item_creation_status=1`,
            [
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlyGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=? 
            and item_creation_status=1`,
            [
                data.item_group_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlySubCat: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_subcategory_slno=? 
            and item_creation_status=1`,
            [
                data.item_subcategory_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemOnlyCat: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getitemCatSubCat: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemGroupSubGrup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=? and item_subgroup_slno=? 
            and item_creation_status=1`,
            [

                data.item_group_slno,
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemModlSubMdl: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  
            item_model_slno=? and item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_model_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemManufctrMdlNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGrup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_group_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subgroup_slno=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatModel: (data, callBack) => {
        pool.query(
            `select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and  item_submodel_slno=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_manufactures_slno],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemCatModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemSubCatGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subcategory_slno=? and
            item_group_slno=? 
            and item_creation_status=1`,
            [
                data.item_subcategory_slno,
                data.item_group_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemSubCatSubGroup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subcategory_slno=?  and item_subgroup_slno=? 
            and item_creation_status=1`,
            [
                data.item_subcategory_slno,
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubCatModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subcategory_slno=? and             
            item_model_slno=? 
            and item_creation_status=1`,
            [

                data.item_subcategory_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubCatSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_subcategory_slno=? and
            item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_subcategory_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubCatManufactr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subcategory_slno=? and            
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_subcategory_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubCatModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subcategory_slno=? and
             item_model_num=?
            and item_creation_status=1`,
            [
                data.item_subcategory_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },



    getitemGroupModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=?  and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_group_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemGroupSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=?  and item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_group_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemGroupManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=? and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_group_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemGroupModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_group_slno=?  and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_group_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubGroupModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subgroup_slno=? and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_subgroup_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubGroupSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_subgroup_slno=?  and item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_subgroup_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubGroupManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subgroup_slno=? and              
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_subgroup_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubGroupModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where  item_subgroup_slno=? and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_subgroup_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemModelManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_model_slno=? and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_model_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemModelModelno: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where 
            item_model_slno=?  and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_model_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubModelManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_submodel_slno=? and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_submodel_slno,
                data.item_manufactures_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemSubModelModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name
            from am_item_name_creation           
            where  item_submodel_slno=? and 
            item_model_num=?
            and item_creation_status=1`,
            [
                data.item_submodel_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatGrup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatSubGrup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_subgroup_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and            
            item_submodel_slno=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_manufactures_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubCatModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGroupSubGrup: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and
            item_group_slno=? and item_subgroup_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_subgroup_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGroupModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and i
            item_group_slno=?  and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_model_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGroupSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_group_slno=? and item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_submodel_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGroupManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and 
            item_group_slno=?  and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_manufactures_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatGroupModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and
            item_group_slno=?  and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_group_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubGroupModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and item_subgroup_slno=? and 
            item_model_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubGroupSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and item_subgroup_slno=? and 
             item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subgroup_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getitemCatSubGroupManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and item_subgroup_slno=? 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subgroup_slno,
                data.item_manufactures_slno

            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemCatSubGroupModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and item_subgroup_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subgroup_slno,

                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemCatModelSubModel: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and 
            item_model_slno=? and item_submodel_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_model_slno,
                data.item_submodel_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemCatModelManufctr: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and 
            item_model_slno=?  and 
            item_manufactures_slno=? 
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_model_slno,
                data.item_manufactures_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemCatModelModelNo: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=?  and 
            item_model_slno=?  and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_model_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemAll: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },


    getitemAll: (data, callBack) => {
        pool.query(
            `
            select item_creation_slno, item_name,asset_spare
            from am_item_name_creation           
            where item_category_slno=? and item_subcategory_slno=? and
            item_group_slno=? and item_subgroup_slno=? and 
            item_model_slno=? and item_submodel_slno=? and 
            item_manufactures_slno=? and item_model_num=?
            and item_creation_status=1`,
            [
                data.item_category_slno,
                data.item_subcategory_slno,
                data.item_group_slno,
                data.item_subgroup_slno,
                data.item_model_slno,
                data.item_submodel_slno,
                data.item_manufactures_slno,
                data.item_model_num
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