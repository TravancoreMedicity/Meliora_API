// dietdeliveryassign.router.js

const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail, getBillingSummary, getBillingDeliveryDetail, getBillingTransactions, getBystanderBill, getPatientExtraOrder, getPatientDietBill, createPatientBilling, updateBulkPickingUp, getDeliveryBillDetails, CreateBystanderBilling, GetBystanderBillingDetails, createBillingPayment, getBillablePatientDetail, getProformaDetails, convertProformaToBillController, insertOrderPackingController, getOrderPackingByAssignmentController, createPrintQueue, getCashSummaryDetails, getPaymentModeDetails, getPaymentHistoryDetail, getPaymentHistoryBillDetail, getCashReturnDetails, returnAmountSettlement, getReturnDetails, getEmployeePettyCashDetails, getBillCollectionSummary, getCollectionDetails, getEmployeePettyCashDetailsByClosingIds, getPendingBilledDetails, settleBilling, getTodaySettledBillDetails, getTodayDetailedSummary } = require('./dietorderassign.controller');



router.post(
    '/create',
    checkToken,
    CreateDietDeliveryAssignment
);

router.get(
    '/getcurrent',
    checkToken,
    getCurrentAssignedFoodDetail
);



router.post(
    '/fetchbyassigny',
    checkToken,
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
    updateDeliveryStatus
);


router.post(
    '/update-delivery-log',
    checkToken,
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
    UpdateAssignOrderDetail
);

router.get(
    '/billing/summary/:ptNo/:ipNo',
    checkToken,
    getBillingSummary
);

router.get(
    '/billing/delivery-detail/:ptNo/:ipNo',
    checkToken,
    getBillingDeliveryDetail
);


router.get(
    '/billing/transactions/:ptNo/:ipNo/:status',
    checkToken,
    getBillingTransactions
);


router.get(
    '/billing/patient/diet/:ptNo/:ipNo/:status',
    checkToken,
    getPatientDietBill
);


router.get(
    '/billing/extra/:ptNo/:ipNo/:status',
    checkToken,
    getPatientExtraOrder
);


router.get(
    '/billing/bystander/:ptNo/:ipNo/:status',
    checkToken,
    getBystanderBill
);



router.post(
    "/billing/create",
    checkToken,
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
    CreateBystanderBilling
);


router.post(
    "/get-bystander-billing-details",
    checkToken,
    GetBystanderBillingDetails
);


router.post(
    "/billing/payment",
    checkToken,
    createBillingPayment
);



router.get(
    "/billable-patient/:status",
    checkToken,
    getBillablePatientDetail
);

router.get(
    "/get-proforma/:assignment_detail_id",
    checkToken,
    getProformaDetails
);


router.post(
    "/convert-proforma",
    checkToken,
    convertProformaToBillController
);


router.post(
    "/package/insert",
    checkToken,
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


router.get(
    '/get-cash-collection/:EmId',
    checkToken,
    getCashSummaryDetails);


router.get(
    '/get-paymentmode/:EmId',
    checkToken,
    getPaymentModeDetails);

router.get(
    '/get-paymenthistory/:EmId',
    checkToken,
    getPaymentHistoryDetail);


router.get(
    "/get-paymenthistory-bill-detail/:billingId",
    checkToken,
    getPaymentHistoryBillDetail
);



router.get(
    "/get-cash-return/:EmId",
    checkToken,
    getCashReturnDetails
);


router.patch(
    "/return-settled",
    checkToken,
    returnAmountSettlement
);


router.get(
    "/bill-change-return/:paymentId",
    checkToken,
    getReturnDetails
);



router.get(
    "/get-pettycash/:empid/:status",
    checkToken,
    getEmployeePettyCashDetails
);



router.get(
    "/get-collection-summary",
    checkToken,
    getBillCollectionSummary
);



router.get(
    "/get-collection-details/:Empid",
    checkToken,
    getCollectionDetails
);


router.post(
    "/get-closed-pettycash",
    checkToken,
    getEmployeePettyCashDetailsByClosingIds
);


router.get(
    "/pending-billed-details/:admission_id",
    checkToken,
    getPendingBilledDetails
);


router.post(
    "/settle-billing",
    checkToken,
    settleBilling
);

router.get(
    "/today-settle-bill",
    checkToken,
    getTodaySettledBillDetails
);



router.get(
    "/today-detailed-summary",
    checkToken,
    getTodayDetailedSummary
);


module.exports = router;