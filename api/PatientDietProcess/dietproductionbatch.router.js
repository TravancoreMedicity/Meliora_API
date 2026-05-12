const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietProductionBatch,
    getAllDietProductionBatch,
    updateDietProductionBatch,
    getAllBatchProductionItem
} = require('./dietproductionbatch.controller');

router.post("/batch/insert", checkToken, insertDietProductionBatch);
router.post("/batch/getall", checkToken, getAllDietProductionBatch);
router.patch("/batch/update", checkToken, updateDietProductionBatch);

router.post("/batch/item/getall", checkToken, getAllBatchProductionItem)

module.exports = router;