const { pool } = require('../../config/database')
module.exports = {

    CrfImageStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crf_request_master SET 
            image_status=1
            WHERE 
            req_slno=?`,
            [
                data.req_slno
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