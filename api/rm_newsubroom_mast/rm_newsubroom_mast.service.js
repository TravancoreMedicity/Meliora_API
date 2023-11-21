const { pool } = require('../../config/database')
module.exports = {
    newSubRoomInsert: (data, callback) => {

        pool.query(
            `INSERT INTO rm_subroom_master
          ( sub_rm_loctaion,
            rm_room_slno,
            sub_rm_category_slno,
            sub_rm_roomtype_slno,
            subroom_name,
            subroom_no,
            subroom_oldno,
            subroom_status,
            create_user
          )
          VALUES(?,?,?,?,?,?,?,?,?)`,
            [
                data.sub_rm_loctaion,
                data.rm_room_slno,
                data.sub_rm_category_slno,
                data.sub_rm_roomtype_slno,
                data.subroom_name,
                data.subroom_no,
                data.subroom_oldno,
                data.subroom_status,
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
    newSubRoomView: (callback) => {
        pool.query(
            `select 
            subroom_slno,sub_rm_loctaion,
            rm_subroom_master.rm_room_slno,
            rm_newroom_creation.rm_room_name,
            sub_rm_category_slno,
            sub_rm_roomtype_slno,
            subroom_name,
            subroom_no,
            subroom_oldno,
            subroom_status,          
            if(subroom_status = 1 ,'Yes','No')status from rm_subroom_master
            left join rm_newroom_creation on rm_newroom_creation.rm_room_slno=rm_subroom_master.rm_room_slno
            
            `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    newSubRoomUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_subroom_master SET
            sub_rm_loctaion=?,
            rm_room_slno=?,
            sub_rm_category_slno=?,
            sub_rm_roomtype_slno=?,
            subroom_name=?,
            subroom_no=?,
            subroom_oldno=?,
            subroom_status=?,
            edit_user =?
            WHERE 
            subroom_slno=?`,

            [
                data.sub_rm_loctaion,
                data.rm_room_slno,
                data.sub_rm_category_slno,
                data.sub_rm_roomtype_slno,
                data.subroom_name,
                data.subroom_no,
                data.subroom_oldno,
                data.subroom_status,
                data.edit_user,
                data.subroom_slno
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