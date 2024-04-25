const { pool } = require('../../config/database')
module.exports = {
    BillTypeInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_bill_type_mast
          ( 
            it_bill_type_name,
            it_bill_type_status,
            create_user
         
          )
          VALUES(?,?,?)`,
            [
                data.it_bill_type_name,
                data.it_bill_type_status,
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
    BillTypeView: (callback) => {
        pool.query(
            `SELECT 
            it_bill_type_slno,
            it_bill_type_name, 
            it_bill_type_status,
            if(it_bill_type_status=1,'Yes','No')status
            FROM
            it_bill_type_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    BillTypeUpdate: (data, callback) => {

        pool.query(
            `UPDATE it_bill_type_mast SET 
            it_bill_type_name=?,
            it_bill_type_status=?,
            edit_user =?       
            WHERE 
            it_bill_type_slno=?`,
            [
                data.it_bill_type_name,
                data.it_bill_type_status,
                data.edit_user,
                data.it_bill_type_slno,
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