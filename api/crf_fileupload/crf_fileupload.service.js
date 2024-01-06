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

    CrfDataColectionImageStatusUpdate: (data, callback) => {
        pool.query(
            `UPDATE crf_data_collection SET 
            data_coll_image_status=1
            WHERE 
            crf_data_collect_slno=?`,
            [
                data.crf_data_collect_slno
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