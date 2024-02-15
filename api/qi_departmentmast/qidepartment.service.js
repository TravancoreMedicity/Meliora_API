const { pool } = require('../../config/database')
module.exports = {

    qualityDepInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_dept_mast
          ( 
            qi_dept_name,
            qi_dept_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.qi_dept_name,
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

    qualityDeptView: (callBack) => {
        pool.query(
            `SELECT 
                   qi_dept_slno, 
                   qi_dept_name,
                   if(qi_dept_status=1,'Yes','No') status
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

    qualityDeptUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_dept_mast 
             SET 
                  qi_dept_name=?,
                  qi_dept_status=?,
                  edit_user=?
            WHERE 
                  qi_dept_slno=?`,
            [
                data.qi_dept_name,
                data.qi_dept_status,
                data.edit_user,
                data.qi_dept_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },


    qualityDeptList: (callBack) => {
        pool.query(
            `SELECT 
                   qi_dept_slno, 
                   qi_dept_name
             FROM
                   qi_dept_mast 
             WHERE
                   qi_dept_status=1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


}