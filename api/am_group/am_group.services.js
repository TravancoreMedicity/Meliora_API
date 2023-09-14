const { pool } = require('../../config/database')
module.exports = {
    GroupInsert: (data, callback) => {
        console.log(data);
        pool.query(
            `INSERT INTO am_group
          ( 
            group_name,
            group_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.group_name,
                data.group_status,
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
    GroupView: (callback) => {
        pool.query(
            `SELECT 
            group_slno,
            group_name, 
            group_status,
            if(group_status=1,'Yes','No')status
            FROM
            am_group`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    GroupUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_group SET 
            group_name=?,
            group_status=?,
            edit_user=?
            WHERE 
            group_slno=?`,

            [
                data.group_name,
                data.group_status,
                data.edit_user,
                data.group_slno,


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