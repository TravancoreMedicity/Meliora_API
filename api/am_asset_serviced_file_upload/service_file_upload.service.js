const { pool } = require('../../config/database')
module.exports = {
    AssetServiceFileUpload: (data, callback) => {

        pool.query(

            `UPDATE am_service_details SET 
            service_file_status=1            
            WHERE 
            am_service_details_slno=?`,

            [
                data.am_service_details_slno
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