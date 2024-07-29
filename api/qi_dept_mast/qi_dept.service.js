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
             ORDER BY qi_dept_no
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

    getDepartmentActive: (id, callBack) => {
        pool.query(
            `SELECT
                   qdm.qi_dept_no,
                   qdm.qi_dept_code,
                   qdm.qi_dept_desc,
                   qdm.qi_co_deptsec_slno,
                   qdm.qi_list_type,
	               cdm.sec_name,
                   qltm.qi_list_type_name
             FROM
                   qi_dept_mast qdm
             LEFT JOIN
                   qi_dept_access_mast qdam ON JSON_CONTAINS(qdam.dpt_access_list, CAST(qdm.qi_dept_no AS JSON), '$')
             LEFT JOIN 
	               co_deptsec_mast cdm ON cdm.sec_id=qdm.qi_co_deptsec_slno
             LEFT JOIN 
                   qi_list_type_mast qltm ON qltm.qi_list_type=qdm.qi_list_type
             WHERE
	               qdm.qi_dept_status=1 AND qdam.em_id=?
             ORDER BY qdm.qi_dept_desc`,
            [id],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAllActiveDepartment: (callBack) => {
        pool.query(
            `SELECT
                   qdm.qi_dept_no,
                   qdm.qi_dept_desc
             FROM
                   qi_dept_mast qdm
             WHERE
	               qdm.qi_dept_status=1
             ORDER BY qdm.qi_dept_desc`,
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
