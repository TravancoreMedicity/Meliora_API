const pool = require('../../config/database')

module.exports = {
    assetTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO cm_asset_type
            (
                asset_type_name,
                asset_type_status
               )
                VALUES(?,?)`,
            [
                data.asset_type_name,
                data.asset_type_status,
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
            `SELECT asset_type_name,
            asset_type_status
            FROM cm_asset_type
            WHERE asset_type_name=? `,
            [
                data.asset_type_name
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    checkUpdateVal: (data, callBack) => {
        pool.query(
            `SELECT asset_type_name,               
            asset_type_slno 
            FROM cm_asset_type 
            WHERE asset_type_name = ?  AND asset_type_slno != ?`,
            [
                data.asset_type_name,
                data.asset_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    assetTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE cm_asset_type 
                SET asset_type_name = ?,
                asset_type_status = ?
                WHERE asset_type_slno = ?`,
            [
                data.asset_type_name,
                data.asset_type_status,
                data.asset_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getAssetType: (callBack) => {
        pool.query(
            `SELECT asset_type_slno,
            asset_type_name,
                if(asset_type_status = 1 ,'Yes','No') status
            FROM cm_asset_type`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAssetTypeById: (id, callBack) => {
        pool.query(
            `SELECT asset_type_slno,
            asset_type_name,
            asset_type_status
            FROM cm_asset_type
            WHERE asset_type_slno=?`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteAssetType: (data, callBack) => {
        pool.query(
            `DELETE FROM cm_asset_type WHERE asset_type_slno = ?`,
            [
                data.asset_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getAssetTypeStatus: (callBack) => {
        pool.query(
            `SELECT asset_type_slno,asset_type_name FROM cm_asset_type WHERE asset_type_status=1`,
            [],
            (error, results, feilds) => {

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}