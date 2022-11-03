const { pool } = require('../../config/database')
module.exports = {

    getItemmaster: (callback) => {
        pool.query(
            `SELECT item_slno,item_name from kot_item_master WHERE status=1`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },


}