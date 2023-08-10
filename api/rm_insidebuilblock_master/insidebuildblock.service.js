const { pool } = require('../../config/database')
module.exports = {
    InsideBuildBlockInsert: (data, callback) => {
        pool.query(
            `INSERT INTO rm_insidebuildblock_mast
          (
            rm_insidebuildblock_name,
            rm_insidebuildblock_alias,
            rm_insidebuildblock_no,
            rm_insidebuildblock_status
          )
          VALUES(?,?,?,?)`,
            [
                data.rm_insidebuildblock_name,
                data.rm_insidebuildblock_alias,
                data.rm_insidebuildblock_no,
                data.rm_insidebuildblock_status

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    InsideBuildBlockView: (callback) => {
        pool.query(
            `SELECT 
             rm_insidebuildblock_slno,
             rm_insidebuildblock_name, 
             rm_insidebuildblock_alias, 
             rm_insidebuildblock_no, 
             rm_insidebuildblock_status,
            if( rm_insidebuildblock_status=1,'Yes','No')status
            FROM
            rm_insidebuildblock_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    InsideBuildBlockUpdate: (data, callback) => {
        pool.query(

            `UPDATE rm_insidebuildblock_mast SET 
            rm_insidebuildblock_name=?,
            rm_insidebuildblock_alias=?,
            rm_insidebuildblock_no=?,
            rm_insidebuildblock_status=? 
            WHERE 
            rm_insidebuildblock_slno=?`,
            [
                data.rm_insidebuildblock_name,
                data.rm_insidebuildblock_alias,
                data.rm_insidebuildblock_no,
                data.rm_insidebuildblock_status,
                data.rm_insidebuildblock_slno,
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