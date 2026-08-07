const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietPrice,
    getDietPrice,
    updateDietPrice,
    getDietPriceDetail,
    insertDietMealPrice,
    updateDietMealPrice
} = require('./dietpricemaster.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertDietPrice);
router.post("/getall", checkToken, getDietPrice);
router.patch("/update", checkToken, updateDietPrice);

router.post("/pricedtl/get", checkToken, getDietPriceDetail);
router.post("/pricedtl/insert", insertDietMealPrice);
router.post("/pricedtl/update", updateDietMealPrice);
module.exports = router;