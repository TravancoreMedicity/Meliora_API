const { pool } = require('../../config/database')
module.exports = {
    ItemTypeInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_type
          ( 
            item_type_name,
            item_type_status
          )
          VALUES(?,?)`,
            [
                data.item_type_name,
                data.item_type_status,
            ],

            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ItemTypeView: (callback) => {
        pool.query(
            `select 
            item_type_slno,
            item_type_name,
            item_type_status,
            if(am_item_type.item_type_status = 1 ,'Yes','No') status from am_item_type `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    ItemTypeUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_item_type SET 
            item_type_name=?,
            item_type_status=?
            WHERE 
            item_type_slno=?`,

            [
                data.item_type_name,
                data.item_type_status,
                data.item_type_slno
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