const { pool } = require("../config/database");
const { getCurrentEmId } = require("./currentUser");
const { expandMenu } = require("./menuNumbers");

/*
    Server-side check of the SAME menu rights the web sidebar uses.

    The sidebar asks /common/getMenu/:em_id, which runs the stored procedure
        GET_MENU_RIGHT_SLNO(em_id)
    = every menu_slno with menu_view = 1 in the user groups assigned to that employee
    (user_group_rights joined with module_group_user_rights).
    Until now that list only hid the menu item in the browser; nothing stopped a direct API
    call. requireMenuRight(menuSlno) runs the same procedure for the logged-in user and refuses
    the request unless that menu item is in the list - so "can see the screen" and
    "can use the API behind it" are one rule.

    Use after checkToken:
        router.post("/assign-pettycash", checkToken, requireMenuRight(376), handler);

    It also leaves the employee id in req.currentEmId for the handler.
    Fails closed: any error while checking means "not allowed".
*/
const requireMenuRight = (menuSlno) => (req, res, next) => {

    // one menu number, or a list where holding ANY of them is enough
    // (each number is widened with the numbers menu_master gives the same menu - see menuNumbers.js)
    const wantedList = [].concat(menuSlno).map(Number)
        .reduce((all, slno) => all.concat(expandMenu(slno)), []);
    const wanted = wantedList.join(" or ");

    getCurrentEmId(req, (identityError, emId) => {

        if (identityError) {
            console.error("requireMenuRight identity error:", identityError);
            return res.status(500).json({
                success: 0,
                message: "Could not check your access rights"
            });
        }

        if (!emId) {
            return res.status(403).json({
                success: 0,
                message: "Your login is not linked to an employee record, so you do not have access to this function"
            });
        }

        pool.query("CALL GET_MENU_RIGHT_SLNO(?)", [emId], (rightsError, results) => {

            if (rightsError) {
                console.error("requireMenuRight rights error:", rightsError);
                return res.status(500).json({
                    success: 0,
                    message: "Could not check your access rights"
                });
            }

            // a CALL returns [rows, okPacket]
            const rows = Array.isArray(results?.[0]) ? results[0] : [];
            const allowed = rows.some(row => wantedList.includes(Number(row.menu_slno)));

            if (!allowed) {
                console.warn(`Access denied: employee ${emId} has no right to menu ${wanted} (${req.method} ${req.originalUrl})`);
                return res.status(403).json({
                    success: 0,
                    message: "You do not have permission to use this function"
                });
            }

            req.currentEmId = emId;
            return next();
        });
    });
};

module.exports = { requireMenuRight };
