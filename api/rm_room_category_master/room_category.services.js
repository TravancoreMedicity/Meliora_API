const { pool } = require('../../config/database')
module.exports = {
    RoomCategoryInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_room_category_master
          (
            rm_roomcategory_name, 
            rm_roomcategory_alias, 
            rm_roomcategory_no, 
            rm_roomcategory_status
          )
          VALUES(?,?,?,?)`,
            [
                data.rm_roomcategory_name,
                data.rm_roomcategory_alias,
                data.rm_roomcategory_no,
                data.rm_roomcategory_status

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT rm_roomcategory_name,
            rm_roomcategory_status
            FROM rm_room_category_master
            WHERE rm_roomcategory_name=?`,
            [
                data.rm_roomcategory_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    RoomCategoryView: (callback) => {
        pool.query(
            `SELECT 
            rm_roomcategory_slno,
            rm_roomcategory_name,
            rm_roomcategory_alias,
            rm_roomcategory_no,
            rm_roomcategory_status,
            if( rm_roomcategory_status=1,'Yes','No')status
            FROM
            rm_room_category_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    RoomCategoryUpdate: (data, callback) => {

        pool.query(

            `UPDATE rm_room_category_master SET 
            rm_roomcategory_name=?,
            rm_roomcategory_alias=?,
            rm_roomcategory_no=?,
            rm_roomcategory_status=? 
            WHERE 
            rm_roomcategory_slno=?`,
            [
                data.rm_roomcategory_name,
                data.rm_roomcategory_alias,
                data.rm_roomcategory_no,
                data.rm_roomcategory_status,
                data.rm_roomcategory_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT rm_roomcategory_name,               
            rm_roomcategory_slno
            FROM rm_room_category_master
            WHERE rm_roomcategory_name = ?  AND rm_roomcategory_slno != ?`,
            [
                data.rm_roomcategory_name,
                data.rm_roomcategory_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}