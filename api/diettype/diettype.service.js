const { pool } = require('../../config/database')
module.exports = {
    diettypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_type(
                type_desc,
                start_time,
                end_time,
                status,
                em_id)
                VALUES(?,?,?,?,?)`,
            [
                data.type_desc,
                data.start_time,
                data.end_time,
                data.status,
                data.em_id
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
            `SELECT type_desc,
            status
            FROM diet_type
            WHERE type_desc=? `,
            [
                data.type_desc
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
            `SELECT type_desc,               
            type_slno
            FROM diet_type
            WHERE type_desc = ?  AND type_slno != ?`,
            [
                data.type_desc,
                data.type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    diettypeSelect: (callback) => {
        pool.query(
            `SELECT type_slno,
            type_desc,
            start_time,
            end_time,
            time(start_time) as start_time1 ,
            time(end_time) as end_time2,status,
             if(status = 1 ,'Yes','No') status1
            FROM diet_type`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    diettypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE diet_type 
            SET type_desc=?,
            start_time=?,
            end_time=?,
            status=?
            WHERE type_slno=? `,
            [
                data.type_desc,
                data.start_time,
                data.end_time,
                data.status,
                data.type_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    diettypeGetById: (data, callback) => {
        pool.query(
            ``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

}