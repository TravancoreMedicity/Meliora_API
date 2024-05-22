const { pool } = require('../../config/database')
module.exports = {
    qiTypeListInsert: (data, callback) => {
        pool.query(
            `INSERT INTO qi_list_type_mast
          (
             qi_list_type_name,qi_type_status,create_user
          )
             VALUES(?,?,?)`,
            [
                data.qi_list_type_name,
                data.qi_type_status,
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
    QITypeView: (callBack) => {
        pool.query(
            `SELECT 
                   qi_list_type,qi_list_type_name,if(qi_type_status=1,'Yes','No') status
              FROM
                   qi_list_type_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    QITypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE 
                  qi_list_type_mast 
             SET 
                  qi_list_type_name=?,
                  qi_type_status=?,
                  edit_user=?
            WHERE 
                  qi_list_type=?`,
            [
                data.qi_list_type_name,
                data.qi_type_status,
                data.edit_user,
                data.qi_list_type
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    getQITypeActive: (callBack) => {
        pool.query(
            `SELECT 
                  qi_list_type, 
                  qi_list_type_name
             FROM
                   qi_list_type_mast
             WHERE 
                   qi_type_status=1 order by qi_list_type`, [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}
