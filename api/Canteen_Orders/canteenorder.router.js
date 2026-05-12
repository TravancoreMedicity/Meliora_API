const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

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
    getBatchItemDetail
} = require('./canteeorder.controller');

/* CREATE */
router.post("/create", checkToken, createCanteenOrder);

/* READ */
router.post("/list", checkToken, getAllCanteenOrders);

router.post("/get", checkToken, getCanteenOrderById);

/* UPDATE */
router.patch("/status", checkToken, updateCanteenOrderStatus);

/* CANCEL */
router.patch("/cancel", checkToken, cancelCanteenOrder);

router.post("/add/items", checkToken, addItemsToExistingOrder);

/* DELETE */
router.delete("/delete", checkToken, deleteCanteenOrder);

router.patch("/order/cancel", checkToken, CancelCanteenOrders);

router.post('/getActivePatient', checkToken, getActivePatientDetail);

router.post('/canteenorders', checkToken, CanteenOrderDetail);

router.post('/previouscanteenorder', checkToken, PatientLastWeekOrders);

router.post('/extar/canteenorders', checkToken, ExtraCanteenOrderDetail);

router.post('/activepatient', checkToken, getAllActivePatients);

router.get("/allactivebed", checkToken, GetAllActiveBedDetail);

router.patch("/update/quantity", checkToken, UpdateAllQuantities);


router.post('/getbatchitemdetail', checkToken, getBatchItemDetail);

module.exports = router;