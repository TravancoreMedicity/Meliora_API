const { pool } = require('../../config/database')
module.exports = {
    qiDeptListInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_dept_mast
          ( 
            qi_dept_code,
            qi_dept_desc,
            qi_dept_status,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.qi_dept_code,
                data.qi_dept_desc,
                data.qi_dept_status,
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
                   qi_dept_no, qi_dept_code,qi_dept_desc,if(qi_dept_status=1,'Yes','No') status
              FROM
                   qi_dept_mast`, [],
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
                  qi_dept_status=?,
                  edit_user=?
            WHERE 
                  qi_dept_no=?`,
            [
                data.qi_dept_desc,
                data.qi_dept_code,
                data.qi_dept_status,
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
                  qi_dept_no, 
                  qi_dept_desc,
                  qi_dept_code
             FROM
                   qi_dept_mast
             WHERE 
                   qi_dept_status=1 order by qi_dept_no`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
