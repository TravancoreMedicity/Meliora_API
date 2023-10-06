const { pool } = require('../../config/database')
module.exports = {

    checkDetailInsertOrNot: (id, callBack) => {
        pool.query(
            `SELECT am_Item_map_slno            
            FROM am_item_map_details
            WHERE am_Item_map_slno=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    callBack(error)
                }
                return callBack(null, results)
            }
        );
    },

    ItemDetailsInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_item_map_details
          ( 
            am_Item_map_slno,
            am_grn_no,
            am_grn_date,
            create_user
          )
          VALUES(?,?,?,?)`,
            [
                data.am_Item_map_slno,
                data.am_grn_no,
                data.am_grn_date,
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

    checkInsetOrNot: (data, callBack) => {
        pool.query(
            `SELECT am_Item_map_slno            
            FROM am_item_map_details
            WHERE am_Item_map_slno=? `,
            [
                data.am_Item_map_slno
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