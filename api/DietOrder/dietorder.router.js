const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertNewDietOrder,
    getDietOrderById,
    getAllDietDeliveryDetail,
    getDeliveryDetailStatus,
    NewPatientOrderDetail,
    InacitveCurrentBatchOrder,
    TakeExtraDietFoodOrders,
    CancelPatientBatch,
    CancelledOrderDetails,
    UpdateDietStatus,
    UpdateFoodStatus,
    AddDietItem,
    // UpdateFoodQuantity,
    // updateDietTemplate
} = require('./dietorder.controller');

router.post("/insert", checkToken, insertNewDietOrder);

router.post("/add/dietitem", checkToken, AddDietItem);

router.post("/getallpatientorders", checkToken, getDietOrderById);

router.post('/getdelivery', checkToken, getAllDietDeliveryDetail)

router.post('/diet-delivery-log', checkToken, getDeliveryDetailStatus)

router.post('/new-patient-oreder', checkToken, NewPatientOrderDetail)

router.post('/cancelled-patient-oreder', checkToken, CancelledOrderDetails)

router.post('/inactive-order', checkToken, InacitveCurrentBatchOrder)

router.post('/new-order', checkToken, TakeExtraDietFoodOrders);

router.post('/patient-batch-cancel', checkToken, CancelPatientBatch);


router.patch('/update-diet-status', checkToken, UpdateDietStatus);


router.patch('/cancel-food', checkToken, UpdateFoodStatus);


// router.patch('/update-quantity', checkToken, UpdateFoodQuantity);

// router.patch("/update", checkToken, updateDietTemplate);

module.exports = router;