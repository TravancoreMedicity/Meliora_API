const { pool } = require('../../config/database');

module.exports = {
    totaladmissioncount: (callBack) => {
        pool.query(
            `select count(ip_no) as totaladmission from wework_patient`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    }
}