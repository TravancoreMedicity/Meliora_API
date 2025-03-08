// @ts-nocheck
const { addDays } = require("date-fns");

const validateUserLoginCheck = (
    password_validity,
    last_passwd_change_date,
    last_login_date,
    sign_in_per_day_limit,
    sign_in_per_day_count,
    is_limited_user,
    login_method_allowed,
    limited_user_validity_end_time,
    method
) => {

    const result = { message: "", status: false }

    const password_validity_datys = Number(password_validity)
    const password_validity_end_date_diffrence = addDays(new Date(last_passwd_change_date), password_validity_datys); // Password validity end date
    const password_validity_end_date = new Date(password_validity_end_date_diffrence).getTime();

    // check for the password validity expiry date
    if (password_validity_end_date < new Date().getTime()) {
        return { ...result, message: "Password Expired", status: true }
    }

    // check for sign per day limit
    if (sign_in_per_day_limit < sign_in_per_day_count) {
        return { ...result, message: "Sign in per day limit exceeded", status: true }
    }

    // 24 HOUR LIMIT CHECK
    const lastLoginDate = new Date(last_login_date).getTime();
    const user_validity_end_time = new Date(limited_user_validity_end_time).getTime();

    if (is_limited_user === 'Y' && lastLoginDate > user_validity_end_time) {
        return { ...result, message: "24 hour limit exceeded", status: true }
    }

    // check for login method allowed
    if (method !== login_method_allowed && login_method_allowed !== 1) {
        return { ...result, message: "Login method not allowed", status: true }
    }

    return { ...result, status: false }

}

module.exports = {
    validateUserLoginCheck
}