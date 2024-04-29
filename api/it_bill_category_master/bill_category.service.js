const { pool } = require('../../config/database')
module.exports = {
    BillCategoryInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_bill_category_mast
          ( 
            it_bill_category_name,
            it_bill_type_slno,
            it_bill_category_status,
            create_user
         
          )
          VALUES(?,?,?,?)`,
            [
                data.it_bill_category_name,
                data.it_bill_type_slno,
                data.it_bill_category_status,
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
    BillCategoryView: (callback) => {
        pool.query(
            `SELECT 
            it_bill_category_slno,
            it_bill_category_name,
            it_bill_category_mast.it_bill_type_slno,
            it_bill_type_name,
            it_bill_category_status,
            if(it_bill_category_status=1,'Yes','No')status
            FROM
            it_bill_category_mast
            left join it_bill_type_mast on it_bill_type_mast.it_bill_type_slno=it_bill_category_mast.it_bill_type_slno`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    BillCategoryUpdate: (data, callback) => {

        pool.query(
            `UPDATE it_bill_category_mast SET 
            it_bill_category_name=?,
            it_bill_type_slno=?,
            it_bill_category_status=?,
            edit_user =?       
            WHERE 
            it_bill_category_slno=?`,
            [
                data.it_bill_category_name,
                data.it_bill_type_slno,
                data.it_bill_category_status,
                data.edit_user,
                data.it_bill_category_slno,
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