const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { stampActor } = require('../../authentication/userChecks');

const {
    createCanteenOrder,
    getAllCanteenOrders,
    getCanteenOrderById,
    updateCanteenOrderStatus,
    cancelCanteenOrder,
    deleteCanteenOrder,
    addItemsToExistingOrder,
    CancelCanteenOrders,
    getActivePatientDetail,
    CanteenOrderDetail,
    ExtraCanteenOrderDetail,
    getAllActivePatients,
    GetAllActiveBedDetail,
    PatientLastWeekOrders,
    UpdateAllQuantities,
    getBatchItemDetail,
    UpdateItemQuantity
} = require('./canteeorder.controller');

// "who did it" fields are set from the logged-in employee (stampActor), not taken from the request
/* CREATE */
router.post("/create", checkToken, stampActor('order.created_by'), createCanteenOrder);

/* READ */
router.post("/list", checkToken, getAllCanteenOrders);

router.post("/get", checkToken, getCanteenOrderById);

/* UPDATE */
router.patch("/status", checkToken, stampActor('updated_by'), updateCanteenOrderStatus);

/* CANCEL */
router.patch("/cancel", checkToken, cancelCanteenOrder);

router.post("/add/items", checkToken, stampActor('created_by'), addItemsToExistingOrder);

/* DELETE */
router.delete("/delete", checkToken, deleteCanteenOrder);

router.patch("/order/cancel", checkToken, CancelCanteenOrders);

router.post('/getActivePatient', checkToken, getActivePatientDetail);

router.post('/canteenorders', checkToken, CanteenOrderDetail);

router.post('/previouscanteenorder', checkToken, PatientLastWeekOrders);

router.post('/extar/canteenorders', checkToken, ExtraCanteenOrderDetail);

router.post('/activepatient', checkToken, getAllActivePatients);

router.get("/allactivebed", checkToken, GetAllActiveBedDetail);

router.patch("/update/quantity", checkToken, stampActor('extra[].updated_by'), UpdateAllQuantities);


router.post('/getbatchitemdetail', checkToken, getBatchItemDetail);

router.post('/update-qty', checkToken, UpdateItemQuantity);

module.exports = router;