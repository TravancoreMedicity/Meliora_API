// @ts-nocheck
const { addDays } = require("date-fns");

const validateUserLoginCheck = (
    password_validity,
    last_passwd_change_date,
    last_login_date,
    login_method_allowed,
    method
) => {

    const result = { message: "", status: false }
    const password_validity_datys = Number(password_validity)
    const password_validity_end_date_diffrence = addDays(new Date(last_passwd_change_date), password_validity_datys); // Password validity end date
    const password_validity_end_date = new Date(password_validity_end_date_diffrence).getTime();

    // if (password_validity_end_date < new Date().getTime()) {
    //     return { ...result, message: "Password Expired", status: true }
    // }

    // check for login method allowed
    // if (method !== login_method_allowed && login_method_allowed !== 1) {
    //     return { ...result, message: "Login method not allowed", status: true }
    // }

    return { ...result, status: false }
}

module.exports = {
    validateUserLoginCheck
}