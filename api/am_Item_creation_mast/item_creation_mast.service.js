const { pool } = require('../../config/database')
module.exports = {
    ItemcreationdeptInsert: (data, callback) => {
        pool.query(
            `INSERT INTO meliora.am_asset_item_map_master
          ( 
            item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            item_create_status,
            item_custodian_dept,
            item_asset_no,
            item_asset_no_only,
            create_user           
          )
          VALUES ?`,
            [
                data
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    insertItemAdditional: (data, callback) => {

        pool.query(
            `INSERT INTO meliora.am_asset_item_map_master
          ( 
            item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            item_create_status,
            item_custodian_dept,
            item_asset_no,
            item_asset_no_only,
            create_user
            
          )
          VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.item_creation_slno,
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_create_status,
                data.item_custodian_dept,
                data.item_asset_no,
                data.item_asset_no_only,
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
    getInsertData: (data, callBack) => {
        pool.query(
            `SELECT 
            am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,
            am_item_name_creation.item_name
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
          WHERE
          am_asset_item_map_master.item_creation_slno=? and  item_dept_slno = ?
           and item_deptsec_slno=?  and item_create_status=1 ORDER BY am_item_map_slno DESC`,
            [
                data.item_creation_slno,
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

    getItemsFronList: (data, callBack) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
            am_custodian_name,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
          WHERE
           item_dept_slno = ?
           and item_deptsec_slno=?  and am_asset_item_map_master.item_creation_slno=? and item_create_status=1
           ORDER BY am_asset_item_map_master.am_item_map_slno DESC`,
            [

                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_creation_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getCustdyBasedLastAssetNo: (id, callback) => {
        pool.query(
            `select  max(item_asset_no_only) as item_asset_no_only

            from am_asset_item_map_master
            
            where item_custodian_dept=?`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}