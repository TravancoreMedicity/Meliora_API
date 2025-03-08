const pool = require('../../config/dbConfig')
const logger = require('../../logger/logger')

module.exports = {
    insertUser: (data, callBack) => {
        // console.log("data service", data);
        console.log(pool)

        pool.query(
            `INSERT INTO user(
                name,
                mobile,
                email,
                login_type,
                password,
                password_validity,
                password_validity_expiry_date,
                user_status,
                sign_in_per_day_limit,
                is_limited_user,
                login_method_allowed,
                created_user,
                last_passwd_change_date,
                printer_access
                )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_Type,
                data.password,
                data.password_Validity,
                data.password_validity_expiry_date,
                data.user_Status,
                data.signIn_Limit,
                data.setOndayLogin,
                data.loginMethod,
                data.created_by,
                data.lastPasswordChangeDate,
                data.printerUsability
            ],
            (error, results, fields) => {
                logger.error(error)
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    editUser: (data, callBack) => {
        pool.query(
            `UPDATE user 
                SET name = ?,
                    mobile = ?,
                    email = ?,
                    login_type = ?,
                    password = ?,
                    password_validity = ?,
                    user_status = ?,
                    sign_in_per_day_count = ?,
                    is_limited_user = ?,
                    login_method_allowed = ?,
                    printer_access=?,
                    updated_user=?,
                    updated_time=?
                WHERE user_slno = ?`,
            [
                data.name,
                data.mobile,
                data.email,
                data.login_Type,
                data.password,
                data.password_Validity,
                data.user_Status,
                data.signIn_Limit_per_day,
                data.setOndayLogin,
                data.loginMethod,
                data.printerUsability,
                data.edit_user,
                data.edit_date,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    deleteUser: (id, callBack) => {
        pool.query(
            `UPDATE user SET user_status = 0 WHERE user_slno = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getUser: (id, callBack) => {
        pool.query(
            'SELECT * FROM user WHERE user_slno = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getAllUser: (callBack) => {
        pool.query(
            'SELECT * FROM user',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    mobileExist: (mobile, callBack) => {
        // console.log("mobile", mobile);
        // console.log(pool)
        pool.query(
            'SELECT * FROM user WHERE mobile = ?',
            [
                mobile
            ],
            (error, results, fields) => {
                if (error) {
                    //logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    emailExist: (email, callBack) => {
        pool.query(
            'SELECT * FROM user WHERE email = ?',
            [email],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertOTP: (data, callBack) => {
        pool.query(
            `UPDATE user SET generatedotp = ? WHERE mobile = ? `,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    verifyOTP: (data, callBack) => {
        pool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                iv,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access
            FROM  user 
            WHERE generatedotp = ?
            AND mobile  = ? 
            AND user_status = 1`,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    insertRefreshToken: (data, callBack) => {
        pool.query(
            `UPDATE user 
                SET token = ? ,
                sessionid = ? 
                WHERE user_slno = ? `,
            [
                data.refresh_token,
                data.user_slno,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getRefershToken: async (id, callBack) => {
        pool.query(
            `SELECT token,sessionid FROM user WHERE user_slno = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    deleteRefreshToken: (id, callBack) => {
        pool.query(
            `UPDATE user SET token = null, sessionid = null WHERE user_slno = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    validateUserCredExcistOrNot: (data, callBack) => {
        pool.query(
            `SELECT 
                user_slno
            FROM user 
            WHERE mobile = ? || email = ? || name = ?`,
            [
                data.mobile,
                data.email,
                data.name
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    userBasedValidationCheck: (data, callBack) => {
        pool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                password,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access
            FROM  user 
            WHERE name = ?
            AND user_status = 1`,
            [
                data.userName
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    userBasedInsertRefreshToken: (data, callBack) => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        pool.query(
            `UPDATE user 
                SET token = ? ,
                sessionid = ? ,
                generatedotp = ?
                WHERE user_slno = ? `,
            [
                data.refresh_token,
                data.user_slno,
                otp,
                data.user_slno
            ],
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    getAllSuperUsers: (callBack) => {
        pool.query(
            'SELECT * FROM user WHERE user.login_type=2',
            (error, results, fields) => {
                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    verifyOTPforPrint: (data, callBack) => {
        // console.log("data", data);

        pool.query(
            `SELECT 
                user_slno,
                name,
                login_type,
                password_validity,
                last_passwd_change_date,
                iv,
                password_validity_expiry_date,
                last_login_date,
                sign_in_per_day_limit,
                sign_in_per_day_count,
                is_limited_user,
                login_method_allowed,
                printer_access
            FROM  user 
            WHERE generatedotp = ?
            AND mobile  = ? 
            AND user_status = 1`,
            [
                data.otp,
                data.mobile
            ],
            (error, results, fields) => {
                // console.log("results", results);

                if (error) {
                    logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

}

