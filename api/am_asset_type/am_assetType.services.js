const { pool } = require('../../config/database')
module.exports = {
    AssetTypeInsert: (data, callback) => {

        pool.query(
            `INSERT INTO am_asset_type
          ( 
            asset_type_name,
            asset_type_status,
            create_user
          )
          VALUES(?,?,?)`,
            [
                data.asset_type_name,
                data.asset_type_status,
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
    AssetTypeView: (callback) => {
        pool.query(
            `select 
            asset_type_slno,
            asset_type_name,
            asset_type_status,
            if(am_asset_type.asset_type_status = 1 ,'Yes','No')status from am_asset_type `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    AssetTypeUpdate: (data, callback) => {

        pool.query(

            `UPDATE am_asset_type SET 
            asset_type_name=?,
            asset_type_status=?,
            create_user=?
            WHERE 
            asset_type_slno=?`,

            [
                data.asset_type_name,
                data.asset_type_status,
                data.create_user,
                data.asset_type_slno,

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