// dietdeliveryassign.router.js

const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { identifyUser, requireSelfParam, requireOwnPayment, requireOwnBill, stampActor } = require('../../authentication/userChecks');
const {
    MENU_PETTY_CASH,
    MENU_DAILY_CLOSING,
    MENU_CANTEEN_CLOSING,
    MENU_FINAL_SETTLEMENT,
    MENU_KOT_PREP_DELIVERY
} = require('../../authentication/menuNumbers');
const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail, getBillingSummary, getBillingDeliveryDetail, getBillingTransactions, getBystanderBill, getPatientExtraOrder, getPatientDietBill, createPatientBilling, updateBulkPickingUp, getDeliveryBillDetails, CreateBystanderBilling, GetBystanderBillingDetails, createBillingPayment, getBillablePatientDetail, getProformaDetails, convertProformaToBillController, insertOrderPackingController, getOrderPackingByAssignmentController, createPrintQueue, getCashSummaryDetails, getPaymentModeDetails, getPaymentHistoryDetail, getPaymentHistoryBillDetail, getCashReturnDetails, returnAmountSettlement, getReturnDetails, getEmployeePettyCashDetails, getBillCollectionSummary, getCollectionDetails, getEmployeePettyCashDetailsByClosingIds, getPendingBilledDetails, settleBilling, getTodaySettledBillDetails, getTodayDetailedSummary } = require('./dietorderassign.controller');



// assigned_by is the logged-in employee; assigned_to (the delivery person) stays as chosen
router.post(
    '/create',
    checkToken,
    stampActor('assigned_by'),
    CreateDietDeliveryAssignment
);

router.get(
    '/getcurrent',
    checkToken,
    getCurrentAssignedFoodDetail
);



// mobile "my deliveries": always the logged-in delivery person (the screen used to send any assign_to)
router.post(
    '/fetchbyassigny',
    checkToken,
    stampActor('assign_to'),
    FetchDeliveryByAssigny
);

router.post(
    '/assign-status-update',
    checkToken,
    FetchDeliveryByAssigny
);

router.post(
    '/update-delivery-status',
    checkToken,
    stampActor('updated_by'),
    updateDeliveryStatus
);


router.post(
    '/update-delivery-log',
    checkToken,
    stampActor('updated_by'),
    UpdateDeliveryLogDetail
);


router.post(
    '/fetchassigny-item-status',
    checkToken,
    FetchAssignedItemStatus
);


router.post(
    '/fetch-delivery-log',
    checkToken,
    fetchDeliveryLogDetail
);

router.post(
    '/update-order-status',
    checkToken,
    stampActor('updated_by'),
    UpdateAssignOrderDetail
);

router.get(
    '/billing/summary/:ptNo/:ipNo',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getBillingSummary
);

router.get(
    '/billing/delivery-detail/:ptNo/:ipNo',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getBillingDeliveryDetail
);


router.get(
    '/billing/transactions/:ptNo/:ipNo/:status',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getBillingTransactions
);


router.get(
    '/billing/patient/diet/:ptNo/:ipNo/:status',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getPatientDietBill
);


router.get(
    '/billing/extra/:ptNo/:ipNo/:status',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getPatientExtraOrder
);


router.get(
    '/billing/bystander/:ptNo/:ipNo/:status',
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getBystanderBill
);



// web "Patient Final Settlement" screen only
router.post(
    "/billing/create",
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    createPatientBilling
);

router.post(
    '/update-bulk-pickup',
    checkToken,
    updateBulkPickingUp
);



router.post(
    "/get-bill-details",
    checkToken,
    getDeliveryBillDetails
);



router.post(
    "/create-bystander-billing",
    checkToken,
    identifyUser,
    CreateBystanderBilling
);


router.post(
    "/get-bystander-billing-details",
    checkToken,
    GetBystanderBillingDetails
);


// mobile payment screen: the collector is the logged-in employee (set from the token)
router.post(
    "/billing/payment",
    checkToken,
    identifyUser,
    createBillingPayment
);



router.get(
    "/billable-patient/:status",
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getBillablePatientDetail
);

router.get(
    "/get-proforma/:assignment_detail_id",
    checkToken,
    getProformaDetails
);


// web "KOT Preperation / Delivery" screen only
router.post(
    "/convert-proforma",
    checkToken,
    requireMenuRight(MENU_KOT_PREP_DELIVERY),
    convertProformaToBillController
);


router.post(
    "/package/insert",
    checkToken,
    stampActor('created_by'),
    insertOrderPackingController
);


router.post(
    "/package/get-by-assignment",
    checkToken,
    getOrderPackingByAssignmentController
);

router.post(
    "/print-queue/create",
    checkToken,
    createPrintQueue
);


// mobile "my cash" screens: the :EmId in the URL must be the logged-in employee
router.get(
    '/get-cash-collection/:EmId',
    checkToken,
    requireSelfParam('EmId'),
    getCashSummaryDetails);


router.get(
    '/get-paymentmode/:EmId',
    checkToken,
    requireSelfParam('EmId'),
    getPaymentModeDetails);

router.get(
    '/get-paymenthistory/:EmId',
    checkToken,
    requireSelfParam('EmId'),
    getPaymentHistoryDetail);


router.get(
    "/get-paymenthistory-bill-detail/:billingId",
    checkToken,
    requireOwnBill('billingId'),
    getPaymentHistoryBillDetail
);



router.get(
    "/get-cash-return/:EmId",
    checkToken,
    requireSelfParam('EmId'),
    getCashReturnDetails
);


// mobile cash return: returned_by is the logged-in employee (set from the token) and the change
// must belong to a payment this employee collected
router.patch(
    "/return-settled",
    checkToken,
    identifyUser,
    returnAmountSettlement
);


router.get(
    "/bill-change-return/:paymentId",
    checkToken,
    requireOwnPayment('paymentId'),
    getReturnDetails
);



// web only: used by the petty cash screen and by the daily closing screen
router.get(
    "/get-pettycash/:empid/:status",
    checkToken,
    requireMenuRight([MENU_PETTY_CASH, MENU_DAILY_CLOSING]),
    getEmployeePettyCashDetails
);



router.get(
    "/get-collection-summary",
    checkToken,
    requireMenuRight(MENU_DAILY_CLOSING),
    getBillCollectionSummary
);



router.get(
    "/get-collection-details/:Empid",
    checkToken,
    requireMenuRight(MENU_DAILY_CLOSING),
    getCollectionDetails
);


router.post(
    "/get-closed-pettycash",
    checkToken,
    requireMenuRight(MENU_DAILY_CLOSING),
    getEmployeePettyCashDetailsByClosingIds
);


router.get(
    "/pending-billed-details/:admission_id",
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    getPendingBilledDetails
);


// web "Patient Final Settlement" screen only
router.post(
    "/settle-billing",
    checkToken,
    requireMenuRight(MENU_FINAL_SETTLEMENT),
    settleBilling
);

router.get(
    "/today-settle-bill",
    checkToken,
    requireMenuRight(MENU_CANTEEN_CLOSING),
    getTodaySettledBillDetails
);



router.get(
    "/today-detailed-summary",
    checkToken,
    requireMenuRight(MENU_CANTEEN_CLOSING),
    getTodayDetailedSummary
);


module.exports = router;