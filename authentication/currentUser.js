const { pool } = require("../config/database");

/*
    Who is logged in?

    The access token is signed with the login's `empdtl_slno` (see usermanagement/user.controller.js:
    generateAccessToken(empdtl_slno)) and checkToken puts it in req.decoded.id. Most of the diet and
    cash tables store the EMPLOYEE id (co_employee_master.em_id), which is a different number.

    This turns the token into the em_id with exactly the join the login query uses:
        co_employee.empdtl_slno -> co_employee.emp_no = co_employee_master.em_no -> em_id

    callback(error, emId)   emId is null when the login is not linked to an employee record.
*/
const getCurrentEmId = (req, callback) => {

    // already resolved earlier in this request (requireMenuRight stores it)
    if (req?.currentEmId) {
        return callback(null, req.currentEmId);
    }

    const loginId = Number(req?.decoded?.id);

    if (!Number.isInteger(loginId) || loginId <= 0) {
        return callback(null, null);
    }

    pool.query(
        `
        SELECT emp.em_id
        FROM co_employee ce
        INNER JOIN co_employee_master emp
            ON emp.em_no = ce.emp_no
        WHERE ce.empdtl_slno = ?
        LIMIT 1
        `,
        [loginId],
        (error, rows) => {

            if (error) {
                return callback(error);
            }

            const emId = Number(rows?.[0]?.em_id);

            return callback(null, Number.isInteger(emId) && emId > 0 ? emId : null);
        }
    );
};

module.exports = { getCurrentEmId };
