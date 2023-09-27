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
            create_user
            
          )
          VALUES(?,?,?,?,?)`,
            [
                data.item_creation_slno,
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_create_status,
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

}