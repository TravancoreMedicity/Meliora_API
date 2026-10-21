const router = require('express').Router();

const {
    checkToken
} = require('../../authentication/token_validation');

const {
    createCashClosingController,
    getTodayClosedEmployeesController,
    getToadyEmployeePettyCash,
    AssignEmployeePettyCashDetails,
    getClosingDenominationDetails,
    getBillDetails,
    assignCollectionBillsController,
    getAssignedCollectionBills
} = require('./dailycasclosing.controller');


router.post(
    '/create',
    checkToken,
    createCashClosingController
);


router.get(
    '/today-closed-employees',
    checkToken,
    getTodayClosedEmployeesController
);



router.get(
    '/today-petty-cash',
    checkToken,
    getToadyEmployeePettyCash
);



router.post('/assign-pettycash',
    checkToken,
    AssignEmployeePettyCashDetails
);



router.post(
    '/closing-denomination',
    checkToken,
    getClosingDenominationDetails
);



router.get(
    '/get-bill-details',
    checkToken,
    getBillDetails
);

router.post(
    "/assign-bill",
    checkToken,
    assignCollectionBillsController
);


router.get(
    "/assigned-bills-cashier/:employeeId",
    checkToken,
    getAssignedCollectionBills
);



module.exports = router;