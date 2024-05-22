const { pool } = require('../../config/database')
module.exports = {
    qiDeptListInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_dept_mast
            ( 
              qi_dept_code,
              qi_dept_desc,
              qi_co_deptsec_slno,
              qi_dept_status,
              qi_list_type,
              create_user
            )
            VALUES(?,?,?,?,?,?)`,
            [
                data.qi_dept_code,
                data.qi_dept_desc,
                data.qi_co_deptsec_slno,
                data.qi_dept_status,
                data.qi_list_type,
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

    DepartmentListView: (callBack) => {
        pool.query(
            `SELECT 
                   qi_dept_no, qi_dept_code,qi_dept_desc,qi_co_deptsec_slno,if(qi_dept_status=1,'Yes','No') status,
                   qi_dept_mast.qi_list_type,co_deptsec_mast.sec_name,qi_list_type_mast.qi_list_type_name
             FROM
                   qi_dept_mast,co_deptsec_mast,qi_list_type_mast
             WHERE
                     qi_dept_mast.qi_co_deptsec_slno=co_deptsec_mast.sec_id
                  AND qi_dept_mast.qi_list_type=qi_list_type_mast.qi_list_type
                   `, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    DepartmentUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_dept_mast 
             SET 
                  qi_dept_desc=?,
                  qi_dept_code=?,
                  qi_co_deptsec_slno=?,
                  qi_dept_status=?,
                  qi_list_type=?,
                  edit_user=?
            WHERE 
                  qi_dept_no=?`,
            [
                data.qi_dept_desc,
                data.qi_dept_code,
                data.qi_co_deptsec_slno,
                data.qi_dept_status,
                data.qi_list_type,
                data.edit_user,
                data.qi_dept_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getDepartmentActive: (callBack) => {
        pool.query(
            `SELECT 
                   qi_dept_no, qi_dept_code,qi_dept_desc,qi_co_deptsec_slno,if(qi_dept_status=1,'Yes','No') status,
                   qi_dept_mast.qi_list_type,co_deptsec_mast.sec_name,qi_list_type_mast.qi_list_type_name
             FROM
                   qi_dept_mast,co_deptsec_mast,qi_list_type_mast
             WHERE
                   qi_dept_mast.qi_co_deptsec_slno=co_deptsec_mast.sec_id
                   AND qi_dept_mast.qi_list_type=qi_list_type_mast.qi_list_type
                   AND qi_dept_status=1 order by qi_dept_no`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
