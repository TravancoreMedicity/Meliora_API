const { pool } = require('../../config/database')
module.exports = {
    ComplaintFileUpload: (data, callback) => {

        pool.query(

            `UPDATE cm_complaint_mast SET 
            cm_file_status=1            
            WHERE 
            complaint_slno=?`,

            [
                data.complaint_slno
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