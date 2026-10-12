const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { stampActor } = require('../../authentication/userChecks');

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

// "who did it" fields are set from the logged-in employee (stampActor), not taken from the request
router.post("/insert", checkToken, stampActor('order.collected_by', 'canteenorder.created_by'), insertNewDietOrder);

router.post("/add/dietitem", checkToken, AddDietItem);

router.post("/getallpatientorders", checkToken, getDietOrderById);

// "my orders": the list is always for the logged-in employee (it used to take any collected_by)
router.post('/getdelivery', checkToken, stampActor('collected_by'), getAllDietDeliveryDetail)

router.post('/diet-delivery-log', checkToken, stampActor('develivered_by'), getDeliveryDetailStatus)

router.post('/new-patient-oreder', checkToken, NewPatientOrderDetail)

router.post('/cancelled-patient-oreder', checkToken, CancelledOrderDetails)

router.post('/inactive-order', checkToken, stampActor('emp_id'), InacitveCurrentBatchOrder)

router.post('/new-order', checkToken, stampActor('new_order_taken_by'), TakeExtraDietFoodOrders);

router.post('/patient-batch-cancel', checkToken, stampActor('cancelled_by'), CancelPatientBatch);


router.patch('/update-diet-status', checkToken, stampActor('updated_by'), UpdateDietStatus);


router.patch('/cancel-food', checkToken, UpdateFoodStatus);


// router.patch('/update-quantity', checkToken, UpdateFoodQuantity);

// router.patch("/update", checkToken, updateDietTemplate);

module.exports = router;