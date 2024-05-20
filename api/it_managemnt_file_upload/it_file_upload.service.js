const { pool } = require('../../config/database')
module.exports = {
    BillImageUpdateMonthly: (data, callback) => {
        pool.query(

            `UPDATE it_bill_monthly_tariff SET 
            file_upload_status=1            
            WHERE 
            monthly_slno=?`,

            [
                data.index_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    BillImageUpdateQuaterly: (data, callback) => {

        pool.query(

            `UPDATE it_quaterly_tarrif_details SET 
            file_upload_status=1            
            WHERE 
            quaterly_slno=?`,

            [
                data.index_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    BillImageUpdateYearly: (data, callback) => {

        pool.query(

            `UPDATE it_yearly_tarrif_details SET 
            file_upload_status=1            
            WHERE 
            yearly_slno=?`,

            [
                data.index_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    OtherBillImageUpdate: (data, callback) => {

        pool.query(

            `UPDATE it_other_bills SET 
            file_upload_status=1            
            WHERE 
            other_bill_slno=?`,

            [
                data.index_no
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    TeleMonthlyBills: (callback) => {
        pool.query(
            `SELECT
            it_bill_add.bill_add_slno,
            bill_name,bill_category,
            it_bill_category_name,
            file_upload_status
            FROM
            it_bill_add
            left join it_bill_category_mast on it_bill_category_mast.it_bill_category_slno=it_bill_add.bill_category
            left join it_bill_monthly_tariff on it_bill_monthly_tariff.bill_add_slno=it_bill_add.bill_add_slno
            where bill_tariff=1 and file_upload_status=1 `, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
}