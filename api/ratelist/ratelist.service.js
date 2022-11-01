const { pool } = require('../../config/database');
module.exports = {
    ratelistInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_rate_list(
                diet_slno,
                rc_code,
                type_slno,
                hosp_rate,
                cant_rate,
                status)
                VALUES(?,?,?,?,?,?)`,
            [
                data.diet_slno,
                data.rc_code,
                data.type_slno,
                data.hosp_rate,
                data.cant_rate,
                data.status

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ratelistUpdate: (data, callback) => {
        pool.query(
            `UPDATE diet_rate_list 
            SET diet_slno=?,
            rc_code=?,
            type_slno=?,
            hosp_rate=?,
            cant_rate=?,
            status=? 
            WHERE drate_slno=?`,
            [
                data.diet_slno,
                data.rc_code,
                data.type_slno,
                data.hosp_rate,
                data.cant_rate,
                data.status,
                data.drate_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ratelistSelect: (callback) => {
        pool.query(
            `SELECT drate_slno,diet_rate_list.diet_slno,hosp_rate,cant_rate,diet_name,rcc_desc,diet_rate_list.rc_code,diet_rate_list.type_slno,type_desc, diet_rate_list.status,
            if( diet_rate_list.status=1,'Yes','No') status1 FROM diet_rate_list
            LEFT JOIN diet_master on diet_rate_list.diet_slno=diet_master.diet_slno
            LEFT JOIN ora_roomcategory on diet_rate_list.rc_code=ora_roomcategory.rc_code
            LEFT JOIN diet_type on diet_rate_list.type_slno=diet_type.type_slno`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    ratelistGetById: (data, callback) => {
        pool.query(
            ``,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    roomcatSelect: (callback) => {
        pool.query(`SELECT rc_code,rcc_desc FROM ora_roomcategory WHERE rcc_status='Y'`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    dietSelect: (callback) => {
        pool.query(
            `SELECT diet_slno,diet_name FROM diet_master WHERE diet_status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    dietTypeSelect: (callback) => {
        pool.query(
            `select type_slno,type_desc from diet_type WHERE status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    }
}