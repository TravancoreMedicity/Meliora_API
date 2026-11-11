const router = require('express').Router();

const { checkToken } = require('../../authentication/token_validation');
const {
    createProductionBatch,
    GetProductionMapingData,
    getKitchenItemList,
    updateKitchenBatchStatus,
    updateBatchStatus,
    CompletedBatchStatus,
    CancelProductionBatch,
    getAllOrderStatusDetail,
    getBatches,
    createBatch,
    completeBatch
} = require('./diet_production.controller');

router.post(
    '/createproductionbatch',
    checkToken,
    createProductionBatch
);

router.get(
    '/getprodutionmaping',
    checkToken,
    GetProductionMapingData
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
    updateKitchenBatchStatus
);


router.patch(
    '/update/batch-status',
    updateBatchStatus
);


router.patch(
    '/update/batch-complete',
    CompletedBatchStatus
);


router.patch(
    '/batch/cancel',
    CancelProductionBatch
);

router.get(
    '/getallorderstatus',
    getAllOrderStatusDetail
)

router.get(
    "/batches/:employeeId",
    getBatches
);


router.post(
    "/batches/create",
    createBatch
);


router.post(
    "/batches/complete",
    completeBatch
);

module.exports = router;