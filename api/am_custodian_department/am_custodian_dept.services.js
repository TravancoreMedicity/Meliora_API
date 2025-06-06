const { pool } = require('../../config/database')
module.exports = {
    CustodianDeptInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_custodian_department
          ( 
            am_custodian_name,
            am_custodian_dept_slno,
            am_custodian_deptsec_slno,
            am_custodian_emp,
            am_custdn_asset_no_first,
            am_custdn_asset_no_second,
            status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?)`,
            [
                data.am_custodian_name,
                data.am_custodian_dept_slno,
                data.am_custodian_deptsec_slno,
                data.am_custodian_emp,
                data.am_custdn_asset_no_first,
                data.am_custdn_asset_no_second,
                data.status,
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
    CustodianDepView: (callback) => {
        pool.query(
            `select am_custodian_slno, am_custodian_name,
            am_custodian_dept_slno,dept_name,sec_name,em_name, am_custodian_deptsec_slno,
            am_custodian_emp, am_custdn_asset_no_first, am_custdn_asset_no_second,
              if(am_custodian_department.status = 1 ,'Yes','No')statuss,
            status
            from am_custodian_department
            left join co_department_mast on co_department_mast.dept_id=am_custodian_department.am_custodian_dept_slno
            left join co_deptsec_mast on co_deptsec_mast.sec_id=am_custodian_department.am_custodian_deptsec_slno
            left join co_employee_master on co_employee_master.em_id=am_custodian_department.am_custodian_emp `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    CustodianDepUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_custodian_department SET
            am_custodian_name=?,
            am_custodian_dept_slno=?,
            am_custodian_deptsec_slno=?,
            am_custodian_emp=?,
            am_custdn_asset_no_first=?,
            am_custdn_asset_no_second=?,
            status=?,         
            edit_user =?
            WHERE 
            am_custodian_slno=?`,

            [
                data.am_custodian_name,
                data.am_custodian_dept_slno,
                data.am_custodian_deptsec_slno,
                data.am_custodian_emp,
                data.am_custdn_asset_no_first,
                data.am_custdn_asset_no_second,
                data.status,
                data.edit_user,
                data.am_custodian_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    CustodianDepSelect: (callback) => {
        pool.query(
            `select
                am_custodian_slno,
                am_custodian_deptsec_slno,
                am_custodian_name,
                am_custodian_dept_slno,
                am_custdn_asset_no_first,
                am_custdn_asset_no_second,
                sec_name
                from 
                am_custodian_department
                left join co_deptsec_mast on co_deptsec_mast.sec_id=am_custodian_department.am_custodian_deptsec_slno
                where
                status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    selectById: (id, callBack) => {
        pool.query(
            `select
                    am_custodian_slno, am_custodian_name,am_custodian_deptsec_slno,
                    am_custdn_asset_no_first,am_custdn_asset_no_second
              from
                    am_custodian_department

               where
                     status=1 and am_custodian_dept_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    // getDeptSecAsset: (data, callback) => {


    //     pool.query(
    //         `select
    //         am_item_map_slno,
    //         item_asset_no,
    //         item_asset_no_only,
    //         item_custodian_dept,
    //         item_deptsec_slno
    //         from
    //         am_asset_item_map_master
    //         where
    //         item_custodian_dept=?
    //         and
    //         item_deptsec_slno=?
    //         and
    //         item_create_status=1`,
    //         [
    //             data.item_custodian_dept,
    //             data.item_deptsec_slno

    //         ],
    //         (error, results, fields) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);
    //         }
    //     );

    // },
}