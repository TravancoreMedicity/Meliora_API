const { pool } = require('../../config/database')
module.exports = {
    SubGroupInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_sub_group
          ( 
            sub_group_name,
            sub_group_status
          )
          VALUES(?,?)`,
            [
                data.sub_group_name,
                data.sub_group_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    SubGroupView: (callback) => {
        pool.query(
            `SELECT 
            subgroup_slno,
            sub_group_name, 
            sub_group_status,
            if(sub_group_status=1,'Yes','No')status
            FROM
            am_sub_group`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    SubGroupUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_sub_group SET 
            sub_group_name=?,
            sub_group_status=?
            WHERE 
            subgroup_slno=?`,

            [


                data.sub_group_name,
                data.sub_group_status,
                data.subgroup_slno
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