const { pool } = require('../../config/database')
const logger = require('../../logger/logger')

module.exports = {

    insertOTP: (data, callBack) => {
        pool.query(
            `INSERT INTO abha_otp_login_tbl(pt_no,mobile_no,otp)
         VALUES(?,?,?)`,
            [
                data.mrdNo,
                data.mobile,
                data.otp
            ],
            (error, results) => {

                if (error) {
                    return callBack(error);
                }

                return callBack(null, results);
            }
        );
    },
    VerifyOTP: (data, callBack) => {
        pool.query(
            `SELECT * FROM  abha_otp_login_tbl 
            WHERE otp = ?
            AND mobile_no  = ?`,
            [
                data.otp,
                data.mobileNumber
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
}
