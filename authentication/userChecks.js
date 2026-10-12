const { pool } = require("../config/database");
const { getCurrentEmId } = require("./currentUser");

/*
    Small identity checks for routes that are used by the MOBILE app. The mobile app has no menus,
    so menu rights (authentication/menuRights.js) do not apply there; these checks tie the request
    to the logged-in employee instead. All of them run after checkToken and leave the employee id
    in req.currentEmId.
*/

const NOT_LINKED =
    "Your login is not linked to an employee record, so you do not have access to this function";

// Identify the logged-in employee. Handlers then read req.currentEmId instead of trusting an
// employee id sent in the request body.
const identifyUser = (req, res, next) => {

    getCurrentEmId(req, (error, emId) => {

        if (error) {
            console.error("identifyUser error:", error);
            return res.status(500).json({ success: 0, message: "Could not identify the logged-in user" });
        }

        if (!emId) {
            return res.status(403).json({ success: 0, message: NOT_LINKED });
        }

        req.currentEmId = emId;
        return next();
    });
};

// "My own data only": the employee id in the URL (e.g. /get-cash-collection/:EmId) must be the
// logged-in employee. Without this, changing the number in the URL showed another employee's cash.
const requireSelfParam = (paramName) => (req, res, next) => {

    getCurrentEmId(req, (error, emId) => {

        if (error) {
            console.error("requireSelfParam error:", error);
            return res.status(500).json({ success: 0, message: "Could not identify the logged-in user" });
        }

        if (!emId) {
            return res.status(403).json({ success: 0, message: NOT_LINKED });
        }

        if (Number(req.params?.[paramName]) !== emId) {
            console.warn(
                `Access denied: employee ${emId} asked for the data of employee ${req.params?.[paramName]} (${req.method} ${req.originalUrl})`
            );
            return res.status(403).json({
                success: 0,
                code: "USER_MISMATCH", // the app's saved login is a different employee than the login cookie
                message: "You can only view your own details"
            });
        }

        req.currentEmId = emId;
        return next();
    });
};

// "My own payment": /bill-change-return/:paymentId must be a payment this employee collected.
const requireOwnPayment = (paramName) => (req, res, next) => {

    identifyUser(req, res, () => {

        pool.query(
            `SELECT collected_by FROM patient_bill_payment WHERE payment_id = ? LIMIT 1`,
            [Number(req.params?.[paramName])],
            (error, rows) => {

                if (error) {
                    console.error("requireOwnPayment error:", error);
                    return res.status(500).json({ success: 0, message: "Could not check your access rights" });
                }

                // an unknown payment answers the same way as someone else's, nothing is revealed
                if (!rows?.length || Number(rows[0].collected_by) !== req.currentEmId) {
                    console.warn(
                        `Access denied: employee ${req.currentEmId} asked for payment ${req.params?.[paramName]} (${req.method} ${req.originalUrl})`
                    );
                    return res.status(403).json({ success: 0, message: "You can only view your own payments" });
                }

                return next();
            }
        );
    });
};

// "My own bill": /get-paymenthistory-bill-detail/:billingId must be a bill this employee created
// (the cash collector of the bill) or one they collected a payment on.
const requireOwnBill = (paramName) => (req, res, next) => {

    identifyUser(req, res, () => {

        pool.query(
            `
            SELECT pb.billing_id
            FROM patient_billing pb
            WHERE pb.billing_id = ?
            AND (
                pb.created_by = ?
                OR EXISTS (
                    SELECT 1 FROM patient_bill_payment p
                    WHERE p.billing_id = pb.billing_id AND p.collected_by = ?
                )
            )
            LIMIT 1
            `,
            [Number(req.params?.[paramName]), req.currentEmId, req.currentEmId],
            (error, rows) => {

                if (error) {
                    console.error("requireOwnBill error:", error);
                    return res.status(500).json({ success: 0, message: "Could not check your access rights" });
                }

                if (!rows?.length) {
                    console.warn(
                        `Access denied: employee ${req.currentEmId} asked for bill ${req.params?.[paramName]} (${req.method} ${req.originalUrl})`
                    );
                    return res.status(403).json({ success: 0, message: "You can only view your own bills" });
                }

                return next();
            }
        );
    });
};

/*
    stampActor('created_by', 'order.collected_by', 'items[].updated_by')

    Overwrites the named request fields with the LOGGED-IN employee, so "who did this" can no longer be
    chosen by the caller. It is meant for fields that mean the acting employee (created_by, updated_by,
    cancelled_by, assigned_by, processed_by ...), not for recipients such as assigned_to.

      'field'            top level (always set, so a handler that requires it still finds it)
      'parent.field'     inside an object; skipped when the parent is missing
      'list[].field'     on every object of an array; skipped when the list is missing
      '[].field'         when the request body itself is an array: on every object of it

    Runs after checkToken. Refuses (403) a login that is not linked to an employee record.
*/
const setActor = (body, path, emId) => {

    // '[].field' : the request body itself is a list; set the field on every object of it
    const bodyListMatch = path.match(/^\[\]\.([A-Za-z0-9_]+)$/);

    if (bodyListMatch) {
        if (Array.isArray(body)) {
            body.forEach(entry => {
                if (entry && typeof entry === "object") entry[bodyListMatch[1]] = emId;
            });
        }
        return;
    }

    const arrayMatch = path.match(/^([A-Za-z0-9_]+)\[\]\.([A-Za-z0-9_]+)$/);

    if (arrayMatch) {
        const [, listName, field] = arrayMatch;
        if (Array.isArray(body[listName])) {
            body[listName].forEach(entry => {
                if (entry && typeof entry === "object") entry[field] = emId;
            });
        }
        return;
    }

    const parts = path.split(".");
    const field = parts.pop();
    let target = body;

    for (const part of parts) {
        target = target?.[part];
        if (!target || typeof target !== "object") return;
    }

    target[field] = emId;
};

const stampActor = (...paths) => (req, res, next) => {

    identifyUser(req, res, () => {

        // a list body is allowed (use '[].field'); only a missing / non-object body is replaced
        if (!req.body || typeof req.body !== "object") {
            req.body = {};
        }

        paths.forEach(path => setActor(req.body, path, req.currentEmId));

        return next();
    });
};

module.exports = { identifyUser, requireSelfParam, requireOwnPayment, requireOwnBill, stampActor, setActor };
