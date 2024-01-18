const { pool } = require('../../config/database')
module.exports = {
    TaskFileUpload: (data, callback) => {

        pool.query(

            `UPDATE tm_new_task_mast SET 
            tm_task_file=1            
            WHERE 
            tm_task_slno=?`,

            [
                data.tm_task_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    SubTaskFileUpload: (data, callback) => {

        pool.query(

            `UPDATE tm_sub_task_mast SET 
            tm_subtask_file=1            
            WHERE 
            tm_sub_task_slno=?`,

            [
                data.tm_sub_task_slno
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