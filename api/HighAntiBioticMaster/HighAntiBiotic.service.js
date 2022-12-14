const { pool } = require('../../config/database');


module.exports = {
    InsertHighBiotic: (data, callBack) => {
        pool.query(
            `insert into we_high_antibiotic 
            (high_item_code,
            high_item_desc,
            high_item_alias,
            high_item_status)
            values (?,?,?,?)`,
            [
                data.high_item_code,
                data.high_item_desc,
                data.high_item_alias,
                data.high_item_status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    updateHighBiotic: (data, callback) => {
        pool.query(
            `update we_high_antibiotic
            set 
            high_item_status =?,
            high_item_desc =?,
            high_item_alias =?
            where high_item_code = ?`,
            [
                data.high_item_status,
                data.high_item_desc,
                data.high_item_alias,
                data.high_item_code
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    gethighantibio: (callBack) => {
        pool.query(
            `select high_item_code,high_item_desc,high_item_alias,
            (case when high_item_status = 1 then 'yes' else 'no' end )high_item_status
            from we_high_antibiotic`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkInsertVal: (data, callBack) => {
        pool.query(`select high_item_desc from we_high_antibiotic
         where high_item_code =?`,
            [
                data.high_item_code
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    }
}