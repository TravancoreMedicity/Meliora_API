const { pool } = require('../../config/database')
module.exports = {

    getCRFDatas: (callback) => {
        pool.query(
            `
            SELECT req_date,request_deptsec_slno,expected_date,req_slno,work_order_status,crm_request_master.company_slno,sec_name,company_name
            FROM crm_request_master
            LEFT JOIN co_deptsec_mast U on U.sec_id=crm_request_master.user_deptsec  
            LEFT JOIN crm_company_master C ON crm_request_master.company_slno=C.company_slno
            where work_order_status =1`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },


}