const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietPrice,
    getDietPrice,
    updateDietPrice
} = require('./dietpricemaster.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertDietPrice);
router.post("/getall", checkToken, getDietPrice);
router.patch("/update", checkToken, updateDietPrice);

module.exports = router;