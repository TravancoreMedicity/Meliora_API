const { pool } = require('../../config/database');

module.exports = {
    requestTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO co_request_type
            (
                req_type_name,
                req_type_status,
                create_user
               )
                VALUES(?,?,?)`,
            [
                data.req_type_name,
                data.req_type_status,
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
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT req_type_name,
            req_type_status
            FROM co_request_type
            WHERE req_type_name=? `,
            [
                data.req_type_name
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
            `SELECT req_type_name,               
            req_type_slno
            FROM co_request_type 
            WHERE req_type_name = ?  AND req_type_slno != ?`,
            [
                data.req_type_name,
                data.req_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    getRequestType: (callBack) => {
        pool.query(
            `SELECT req_type_slno,
            req_type_name,
                if(req_type_status = 1 ,'Yes','No') status
            FROM co_request_type`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getRequestTypeById: (data, callBack) => {
        pool.query(
            `SELECT req_type_slno,
            req_type_name,
            req_type_status
            FROM co_request_type
            WHERE req_type_slno IN(?)`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    requestTypeUpdate: (data, callback) => {
        pool.query(
            `UPDATE co_request_type 
                SET req_type_name = ?,
                req_type_status = ?,
                edit_user=?
                WHERE req_type_slno = ?`,
            [
                data.req_type_name,
                data.req_type_status,
                data.edit_user,
                data.req_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getRequestTypeStatus: (callBack) => {
        pool.query(
            `  SELECT req_type_slno,
            req_type_name FROM co_request_type where  req_type_status=1`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },













    deleteRequestType: (data, callBack) => {
        pool.query(
            `DELETE FROM co_request_type WHERE req_type_slno = ?`,
            [
                data.req_type_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}