const { pool } = require('../../config/database')
module.exports = {
    ItemcreationdeptInsert: (data, callback) => {
        pool.query(
            `INSERT INTO meliora.am_asset_item_map_master
          ( 
            item_creation_slno,
            item_dept_slno,
            item_deptsec_slno,
            item_room_slno,
            item_subroom_slno,
            item_rack_slno,
            item_create_status,
            item_custodian_dept,
            item_custodian_dept_sec,
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
            item_room_slno,
            item_subroom_slno,
            item_rack_slno,
            item_create_status,
            item_custodian_dept,
            item_custodian_dept_sec,
            item_asset_no,
            item_asset_no_only,
            create_user
            
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.item_creation_slno,
                data.item_dept_slno,
                data.item_deptsec_slno,
                data.item_room_slno,
                data.item_subroom_slno,
                data.item_rack_slno,
                data.item_create_status,
                data.item_custodian_dept,
                data.item_custodian_dept_sec,
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
            am_item_name_creation.item_name,rm_newroom_creation.rm_room_name,
            IFNULL(rm_subroom_master.subroom_name,"Not Subroom" ) subroom_name
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_asset_item_map_master.item_room_slno
           left join rm_subroom_master on rm_subroom_master.subroom_slno=am_asset_item_map_master.item_subroom_slno
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

    itemInactive: (data, callback) => {
        pool.query(
            `UPDATE am_asset_item_map_master SET 
                  item_create_status=0          
            WHERE 
            am_item_map_slno=?`,

            [
                data.am_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getItemsFronList: (data, callBack) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
            am_custodian_name,am_manufacture_no,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
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

    getCustdyBasedLastSpareNo: (id, callback) => {
        pool.query(
            `select  max(spare_asset_no_only) as spare_asset_no_only
            from am_spare_item_map_master
                        where spare_custodian_dept=?`, [id],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ItemcreationdeptInsertSpare: (data, callback) => {
        pool.query(
            `INSERT INTO am_spare_item_map_master
          ( 
            spare_creation_slno,
            spare_dept_slno,
            spare_deptsec_slno,
            spare_room_slno,
            spare_subroom_slno,
            spare_rack_slno,
            spare_create_status,
            spare_custodian_dept,
            spare_custodian_dept_sec,
            spare_asset_no,
            spare_asset_no_only,
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
    insertSpareItemAdditional: (data, callback) => {

        pool.query(
            `INSERT INTO am_spare_item_map_master
          ( 
            spare_creation_slno,
            spare_dept_slno,
            spare_deptsec_slno,
            spare_room_slno,
            spare_subroom_slno,
            spare_rack_slno,
            spare_create_status,
            spare_custodian_dept,
            spare_custodian_dept_sec,
            spare_asset_no,
            spare_asset_no_only,
            create_user            
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.spare_creation_slno,
                data.spare_dept_slno,
                data.spare_deptsec_slno,
                data.spare_room_slno,
                data.spare_subroom_slno,
                data.spare_rack_slno,
                data.spare_create_status,
                data.spare_custodian_dept,
                data.spare_custodian_dept_sec,
                data.spare_asset_no,
                data.spare_asset_no_only,
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

    getInsertSpareData: (data, callBack) => {
        pool.query(
            `SELECT 
            am_spare_item_map_slno,  am_spare_item_map_master.spare_creation_slno,spare_dept_slno,spare_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,
            am_item_name_creation.item_name,rm_newroom_creation.rm_room_name,
            IFNULL(rm_subroom_master.subroom_name,"Not Subroom" ) subroom_name
          FROM
          am_spare_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_spare_item_map_master.spare_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_spare_item_map_master.spare_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
           left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=am_spare_item_map_master.spare_room_slno
           left join rm_subroom_master on rm_subroom_master.subroom_slno=am_spare_item_map_master.spare_subroom_slno
           WHERE
          am_spare_item_map_master.spare_creation_slno=? and  spare_dept_slno = ?
           and spare_deptsec_slno=? and spare_create_status=1 ORDER BY am_spare_item_map_slno DESC`,
            [
                data.spare_creation_slno,
                data.spare_dept_slno,
                data.spare_deptsec_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    itemInactiveSpare: (data, callback) => {
        pool.query(
            `UPDATE am_spare_item_map_master SET 
            spare_create_status=0          
            WHERE 
            am_spare_item_map_slno=?`,

            [
                data.am_spare_item_map_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getSpareItemsFronListonlydept: (data, callBack) => {
        pool.query(
            `SELECT 
            am_spare_item_map_master.am_spare_item_map_slno,  am_spare_item_map_master.spare_creation_slno,spare_dept_slno,spare_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,spare_custodian_dept,
            am_custodian_name,
            am_item_name_creation.item_name,spare_asset_no,spare_asset_no_only,due_date
          FROM
          am_spare_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_spare_item_map_master.spare_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_spare_item_map_master.spare_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_spare_item_map_master.spare_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
          WHERE
           spare_dept_slno = ? and spare_create_status=1
           ORDER BY am_spare_item_map_master.am_spare_item_map_slno DESC`,
            [
                data.spare_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSpareItemsFronListdeptandsec: (data, callBack) => {
        pool.query(
            `SELECT 
            am_spare_item_map_master.am_spare_item_map_slno,  am_spare_item_map_master.spare_creation_slno,spare_dept_slno,spare_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,spare_custodian_dept,
            am_custodian_name,
            am_item_name_creation.item_name,spare_asset_no,spare_asset_no_only,due_date
          FROM
          am_spare_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_spare_item_map_master.spare_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_spare_item_map_master.spare_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_spare_item_map_master.spare_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
          WHERE
           spare_dept_slno = ?
           and spare_deptsec_slno=?  and spare_create_status=1
           ORDER BY am_spare_item_map_master.am_spare_item_map_slno DESC`,
            [
                data.spare_dept_slno,
                data.spare_deptsec_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getSpareItemsFronList: (data, callBack) => {
        pool.query(
            `SELECT 
            am_spare_item_map_master.am_spare_item_map_slno,  am_spare_item_map_master.spare_creation_slno,spare_dept_slno,spare_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,spare_custodian_dept,
            am_custodian_name,
            am_item_name_creation.item_name,spare_asset_no,spare_asset_no_only,due_date
          FROM
          am_spare_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_spare_item_map_master.spare_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_spare_item_map_master.spare_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_spare_item_map_master.spare_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_spare_item_map_master.spare_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_spare_item_map_master.am_spare_item_map_slno
          WHERE
           spare_dept_slno = ?
           and spare_deptsec_slno=? and am_spare_item_map_master.spare_creation_slno=? and spare_create_status=1
           ORDER BY am_spare_item_map_master.am_spare_item_map_slno DESC`,
            [

                data.spare_dept_slno,
                data.spare_deptsec_slno,
                data.spare_creation_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getItemsFronListonlydept: (data, callBack) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
            am_custodian_name,am_manufacture_no,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           WHERE
           item_dept_slno = ?
           and  item_create_status=1
           ORDER BY am_asset_item_map_master.am_item_map_slno DESC`,
            [
                data.item_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getItemsFronListdeptandsec: (data, callBack) => {
        pool.query(
            `SELECT 
            am_asset_item_map_master.am_item_map_slno,  am_asset_item_map_master.item_creation_slno,item_dept_slno,item_deptsec_slno,
            co_department_mast.dept_name as deptname,co_deptsec_mast.sec_name as secname,item_custodian_dept,
            am_custodian_name,am_manufacture_no,
            am_item_name_creation.item_name,item_asset_no,item_asset_no_only,due_date
          FROM
          am_asset_item_map_master
         left join co_department_mast on co_department_mast.dept_id=am_asset_item_map_master.item_dept_slno
          left join co_deptsec_mast on co_deptsec_mast.sec_id=am_asset_item_map_master.item_deptsec_slno
           left join am_item_name_creation on am_item_name_creation.item_creation_slno=am_asset_item_map_master.item_creation_slno
           left join am_custodian_department on am_custodian_department.am_custodian_slno=am_asset_item_map_master.item_custodian_dept
           left join am_item_map_amcpm_detail on am_item_map_amcpm_detail.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           left join am_item_map_details on am_item_map_details.am_item_map_slno=am_asset_item_map_master.am_item_map_slno
           WHERE
           item_dept_slno = ?
           and item_deptsec_slno=? and item_create_status=1
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