const { pool } = require('../../config/database')
module.exports = {
    dietInsert: (data, callback) => {
        pool.query(
            `INSERT INTO diet_master
            (
                diet_name,
                diet_status,
                order_req,
                diet_type_choose,
                em_id
                ) 
                VALUES(?,?,?,?,?)`,
            [

                data.diet_name,
                data.diet_status,
                data.order_req,
                data.diet_type_choose,
                data.em_id

            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    },
    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT diet_name,
            diet_status
            FROM diet_master
            WHERE diet_name=? `,
            [
                data.diet_name
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
            `SELECT diet_name,               
            diet_slno
            FROM diet_master
            WHERE diet_name = ?  AND diet_slno != ?`,
            [
                data.diet_name,
                data.diet_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    dietUpdate: (data, callback) => {
        pool.query(
            `UPDATE diet_master 
            SET diet_name=?,
            diet_status=?,
            order_req=?,
            diet_type_choose=?,
            em_id=?
            WHERE diet_slno=? `,
            [
                data.diet_name,
                data.diet_status,
                data.order_req,
                data.diet_type_choose,
                data.em_id,
                data.diet_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    dietSelect: (callback) => {
        pool.query(
            ` SELECT diet_slno, 
            diet_name ,diet_status,order_req,diet_type_choose,
             if(diet_status = 1 ,'Yes','No') diet_status1,
               if(diet_type_choose = 1 ,'Yes','No') diet_type_choose1,
                if(order_req = 1 ,'Yes','No') order_req1
            FROM diet_master`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    dietGetById: (data, callback) => {
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
    roomSelect: (callback) => {
        pool.query(`SELECT rc_code,rcc_desc FROM ora_roomcategory`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            });
    }
}
