// dietdeliveryassign.router.js

const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { CreateDietDeliveryAssignment, getCurrentAssignedFoodDetail, FetchDeliveryByAssigny, updateDeliveryStatus, UpdateDeliveryLogDetail, FetchAssignedItemStatus, fetchDeliveryLogDetail, UpdateAssignOrderDetail, getBillingSummary, getBillingDeliveryDetail, getBillingTransactions, getBystanderBill, getPatientExtraOrder, getPatientDietBill, createPatientBilling, updateBulkPickingUp, getDeliveryBillDetails, CreateBystanderBilling, GetBystanderBillingDetails, createBillingPayment } = require('./dietorderassign.controller');


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

module.exports = router;