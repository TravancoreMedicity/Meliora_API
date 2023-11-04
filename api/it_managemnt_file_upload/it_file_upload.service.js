const { pool } = require('../../config/database')
module.exports = {
    BillImageUpdateMonthly: (data, callback) => {

        pool.query(

            `UPDATE it_monthly_tarrif_details SET 
            file_upload_status=1            
            WHERE 
            monthly_slno=?`,

            [
                data.monthly_slno
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
                data.quaterly_slno
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
                data.yearly_slno
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