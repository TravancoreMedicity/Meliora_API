const { pool } = require('../../config/database')
module.exports = {
    SupplierDetailInsert: (data, callback) => {
        pool.query(
            `INSERT INTO it_bill_supplier_details_mast
          ( 
            
            it_supplier_name,
            it_supplier_land_one,
            it_supplier_land_two,
            it_supplier_mob_one,
            it_supplier_mob_two,
            it_supplier_email_one,
            it_supplier_email_two,
            it_supplier_escl_name,
            it_supplier_escl_mob_one,
            it_supplier_escl_mob_two,
            it_supplier_escl_land_one,
            it_supplier_escl_land_two,
            it_supplier_escl_email_one,
            it_supplier_escl_email_two,
            it_supplier_servperson_name,
            it_supplier_servperson_land_one,
            it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one,
            it_supplier_servperson_email_two,
            it_supplier_saleperson_name,
            it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two,
            supplier_status,
            create_user
         
          )
          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.it_supplier_name,
                data.it_supplier_land_one,
                data.it_supplier_land_two,
                data.it_supplier_mob_one,
                data.it_supplier_mob_two,
                data.it_supplier_email_one,
                data.it_supplier_email_two,
                data.it_supplier_escl_name,
                data.it_supplier_escl_mob_one,
                data.it_supplier_escl_mob_two,
                data.it_supplier_escl_land_one,
                data.it_supplier_escl_land_two,
                data.it_supplier_escl_email_one,
                data.it_supplier_escl_email_two,
                data.it_supplier_servperson_name,
                data.it_supplier_servperson_land_one,
                data.it_supplier_servperson_land_two,
                data.it_supplier_servperson_mob_one,
                data.it_supplier_servperson_mob_two,
                data.it_supplier_servperson_email_one,
                data.it_supplier_servperson_email_two,
                data.it_supplier_saleperson_name,
                data.it_supplier_saleperson_land_one,
                data.it_supplier_saleperson_land_two,
                data.it_supplier_saleperson_mob_one,
                data.it_supplier_saleperson_mob_two,
                data.it_supplier_saleperson_email_one,
                data.it_supplier_saleperson_email_two,
                data.it_supplier_saleperson_second_name,
                data.it_supplier_saleperson_second_land_one,
                data.it_supplier_saleperson_second_land_two,
                data.it_supplier_saleperson_second_mob_one,
                data.it_supplier_saleperson_second_mob_two,
                data.it_supplier_saleperson_second_email_one,
                data.it_supplier_saleperson_second_email_two,
                data.supplier_status,
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
    SupplierDetailView: (callback) => {
        pool.query(
            `SELECT 
            it_supplier_slno,
            it_supplier_name,
            it_supplier_land_one,
            it_supplier_land_two,
            it_supplier_mob_one,
            it_supplier_mob_two,
            it_supplier_email_one,
            it_supplier_email_two,
            it_supplier_escl_name,
            it_supplier_escl_mob_one,
            it_supplier_escl_mob_two,
            it_supplier_escl_land_one,
            it_supplier_escl_land_two,
            it_supplier_escl_email_one,
            it_supplier_escl_email_two,
            it_supplier_servperson_name,
            it_supplier_servperson_land_one,
            it_supplier_servperson_land_two,
            it_supplier_servperson_mob_one,
            it_supplier_servperson_mob_two,
            it_supplier_servperson_email_one,
            it_supplier_servperson_email_two,
            it_supplier_saleperson_name,
            it_supplier_saleperson_land_one,
            it_supplier_saleperson_land_two,
            it_supplier_saleperson_mob_one,
            it_supplier_saleperson_mob_two,
            it_supplier_saleperson_email_one,
            it_supplier_saleperson_email_two,
            it_supplier_saleperson_second_name,
            it_supplier_saleperson_second_land_one,
            it_supplier_saleperson_second_land_two,
            it_supplier_saleperson_second_mob_one,
            it_supplier_saleperson_second_mob_two,
            it_supplier_saleperson_second_email_one,
            it_supplier_saleperson_second_email_two,
            supplier_status        
            FROM
            it_bill_supplier_details_mast`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    SupplierDetailUpdate: (data, callback) => {
        pool.query(
            `UPDATE it_bill_supplier_details_mast SET 
            it_supplier_name=?,
            it_supplier_land_one=?,
            it_supplier_land_two=?,
            it_supplier_mob_one=?,
            it_supplier_mob_two=?,
            it_supplier_email_one=?,
            it_supplier_email_two=?,
            it_supplier_escl_name=?,
            it_supplier_escl_mob_one=?,
            it_supplier_escl_mob_two=?,
            it_supplier_escl_land_one=?,
            it_supplier_escl_land_two=?,
            it_supplier_escl_email_one=?,
            it_supplier_escl_email_two=?,
            it_supplier_servperson_name=?,
            it_supplier_servperson_land_one=?,
            it_supplier_servperson_land_two=?,
            it_supplier_servperson_mob_one=?,
            it_supplier_servperson_mob_two=?,
            it_supplier_servperson_email_one=?,
            it_supplier_servperson_email_two=?,
            it_supplier_saleperson_name=?,
            it_supplier_saleperson_land_one=?,
            it_supplier_saleperson_land_two=?,
            it_supplier_saleperson_mob_one=?,
            it_supplier_saleperson_mob_two=?,
            it_supplier_saleperson_email_one=?,
            it_supplier_saleperson_email_two=?,
            it_supplier_saleperson_second_name=?,
            it_supplier_saleperson_second_land_one=?,
            it_supplier_saleperson_second_land_two=?,
            it_supplier_saleperson_second_mob_one=?,
            it_supplier_saleperson_second_mob_two=?,
            it_supplier_saleperson_second_email_one=?,
            it_supplier_saleperson_second_email_two=?,
            supplier_status=?,
            edit_user =?       
            WHERE 
            it_supplier_slno=?`,
            [
                data.it_supplier_name,
                data.it_supplier_land_one,
                data.it_supplier_land_two,
                data.it_supplier_mob_one,
                data.it_supplier_mob_two,
                data.it_supplier_email_one,
                data.it_supplier_email_two,
                data.it_supplier_escl_name,
                data.it_supplier_escl_mob_one,
                data.it_supplier_escl_mob_two,
                data.it_supplier_escl_land_one,
                data.it_supplier_escl_land_two,
                data.it_supplier_escl_email_one,
                data.it_supplier_escl_email_two,
                data.it_supplier_servperson_name,
                data.it_supplier_servperson_land_one,
                data.it_supplier_servperson_land_two,
                data.it_supplier_servperson_mob_one,
                data.it_supplier_servperson_mob_two,
                data.it_supplier_servperson_email_one,
                data.it_supplier_servperson_email_two,
                data.it_supplier_saleperson_name,
                data.it_supplier_saleperson_land_one,
                data.it_supplier_saleperson_land_two,
                data.it_supplier_saleperson_mob_one,
                data.it_supplier_saleperson_mob_two,
                data.it_supplier_saleperson_email_one,
                data.it_supplier_saleperson_email_two,
                data.it_supplier_saleperson_second_name,
                data.it_supplier_saleperson_second_land_one,
                data.it_supplier_saleperson_second_land_two,
                data.it_supplier_saleperson_second_mob_one,
                data.it_supplier_saleperson_second_mob_two,
                data.it_supplier_saleperson_second_email_one,
                data.it_supplier_saleperson_second_email_two,
                data.supplier_status,
                data.edit_user,
                data.it_supplier_slno,
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