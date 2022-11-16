const { pool } = require('../../config/database');

module.exports = {
    totaladmissioncount: (callBack) => {
        pool.query(
            `select count(ip_no) as total_admission from wework_patient`,
            [],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
    getDamacount: (id, callBack) => {
        pool.query(
            `select count(ip_no) as total_admission from wework_patient`,
            [
                id
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        )
    },
}