const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_CANTEEN_ORDER_DETAIL, MENU_KOT_ITEM_LIST } = require('../../authentication/menuNumbers');
const {
    createProductionBatch,
    GetProductionMapingData,
    getKitchenItemList,
    updateKitchenBatchStatus,
    updateBatchStatus,
    CompletedBatchStatus,
    CancelProductionBatch,
    getAllOrderStatusDetail
} = require('./diet_production.controller');

// Kitchen batches. The write routes below had NO checkToken at all (anybody who could reach the
// server could complete or cancel a batch); they now need a login and the right of the web screen
// that uses them: "Canteen Order Detail" creates batches, "KOT Item List" completes / cancels them.

router.post(
    '/createproductionbatch',
    checkToken,
    requireMenuRight(MENU_CANTEEN_ORDER_DETAIL),
    stampActor('processed_by'),
    createProductionBatch
);

router.get(
    '/getprodutionmaping',
    checkToken,
    GetProductionMapingData
);

router.get(
    '/getkotlist',
    checkToken,
    getKitchenItemList
);


router.patch(
    '/update/kitchen-status',
    checkToken,
    requireMenuRight(MENU_KOT_ITEM_LIST),
    stampActor('emp_id'),
    updateKitchenBatchStatus
);


router.patch(
    '/update/batch-status',
    checkToken,
    requireMenuRight(MENU_KOT_ITEM_LIST),
    updateBatchStatus
);


router.patch(
    '/update/batch-complete',
    checkToken,
    requireMenuRight(MENU_KOT_ITEM_LIST),
    CompletedBatchStatus
);


router.patch(
    '/batch/cancel',
    checkToken,
    requireMenuRight(MENU_KOT_ITEM_LIST),
    stampActor('cancelled_by'),
    CancelProductionBatch
);

router.get(
    '/getallorderstatus',
    checkToken,
    getAllOrderStatusDetail
)


module.exports = router;
