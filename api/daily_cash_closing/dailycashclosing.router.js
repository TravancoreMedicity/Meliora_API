const router = require('express').Router();

const {
    checkToken
} = require('../../authentication/token_validation');

const { requireMenuRight } = require('../../authentication/menuRights');
const { MENU_PETTY_CASH, MENU_DAILY_CLOSING, MENU_CANTEEN_CLOSING } = require('../../authentication/menuNumbers');

const {
    createCashClosingController,
    getTodayClosedEmployeesController,
    getToadyEmployeePettyCash,
    AssignEmployeePettyCashDetails,
    getClosingDenominationDetails
} = require('./dailycasclosing.controller');


// web "Daily User Bill Closing" screen only
router.post(
    '/create',
    checkToken,
    requireMenuRight(MENU_DAILY_CLOSING),
    createCashClosingController
);


// reads for the web closing / petty cash / canteen closing screens: holding any of those menus is enough
router.get(
    '/today-closed-employees',
    checkToken,
    requireMenuRight([MENU_DAILY_CLOSING, MENU_PETTY_CASH, MENU_CANTEEN_CLOSING]),
    getTodayClosedEmployeesController
);



router.get(
    '/today-petty-cash',
    checkToken,
    requireMenuRight([MENU_DAILY_CLOSING, MENU_PETTY_CASH, MENU_CANTEEN_CLOSING]),
    getToadyEmployeePettyCash
);



// Issuing petty cash needs the same right that shows the "User Petty Cash" menu item
// (menu_master.menu_slno 376 - men_slno in the web's Menus/DietTransactions.js). The check calls
// the same stored procedure as the sidebar. A different number the live database gives this menu
// name is also accepted (see authentication/menuNumbers.js).
router.post('/assign-pettycash',
    checkToken,
    requireMenuRight(MENU_PETTY_CASH),
    AssignEmployeePettyCashDetails
);



router.post(    
    '/closing-denomination',
    checkToken,
    requireMenuRight([MENU_DAILY_CLOSING, MENU_CANTEEN_CLOSING]),
    getClosingDenominationDetails
);

module.exports = router;