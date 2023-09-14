const { pool } = require('../../config/database')
module.exports = {
    SubGroupInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_sub_group
          ( 
            sub_group_name,
            group_slno,
            sub_group_status,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.sub_group_name,
                data.group_slno,
                data.sub_group_status,
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
    SubGroupView: (callback) => {
        pool.query(
            `SELECT 
            subgroup_slno,
            sub_group_name, 
            am_group.group_name,
            sub_group_status,am_group.group_slno,
            if(sub_group_status=1,'Yes','No')status
            FROM
            am_sub_group
            left join am_group on am_group.group_slno=am_sub_group.group_slno`, [],
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
            group_slno=?,
            sub_group_status=?,
            edit_user=?
            WHERE 
            subgroup_slno=?`,

            [


                data.sub_group_name,
                data.group_slno,
                data.sub_group_status,
                data.edit_user,
                data.subgroup_slno,

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