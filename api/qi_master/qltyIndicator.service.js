const { pool } = require('../../config/database')
module.exports = {

    qualityIndicatorInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_indicator_mast
          ( 
             qi_name,
             qi_dept_slno,
             qi_status,
             create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.qi_name,
                data.qi_dept_slno,
                data.qi_status,
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

    qualityIndicatorView: (callBack) => {
        pool.query(
            `SELECT 
                   qi_slno, 
                   qi_name,
                   qi_indicator_mast.qi_dept_slno,
                   qi_dept_mast.qi_dept_name,
                   if(qi_status=1,'Yes','No') status
              FROM
                 qi_indicator_mast
              LEFT JOIN qi_dept_mast on qi_dept_mast.qi_dept_slno=qi_indicator_mast.qi_dept_slno
                `, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    qualityIndicatorUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                qi_indicator_mast 
             SET 
                  qi_name=?,
                  qi_dept_slno=?,
                  qi_status=?,
                  edit_user=?
            WHERE 
                  qi_slno=?`,
            [
                data.qi_name,
                data.qi_dept_slno,
                data.qi_status,
                data.edit_user,
                data.qi_slno
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