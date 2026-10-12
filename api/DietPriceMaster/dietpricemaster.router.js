const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_DIET_PRICE } = require('../../authentication/menuNumbers');

const {
    insertDietPrice,
    getDietPrice,
    updateDietPrice,
    getDietPriceDetail,
    insertDietMealPrice,
    updateDietMealPrice
} = require('./dietpricemaster.controller');

const router = require('express').Router();

// Reads are used by many screens (ordering, billing), so they only need a login.
router.post("/getall", checkToken, getDietPrice);
router.post("/pricedtl/get", checkToken, getDietPriceDetail);

// Changing diet prices is money. pricedtl/insert and pricedtl/update had NO checkToken at all.
// All four write routes now need a login and the right of the "Diet Room Type Grouping Master"
// screen (menu 338), the only screen that calls them.
router.post("/insert", checkToken, requireMenuRight(MENU_DIET_PRICE), stampActor('created_by'), insertDietPrice);
router.patch("/update", checkToken, requireMenuRight(MENU_DIET_PRICE), stampActor('updated_by'), updateDietPrice);

router.post("/pricedtl/insert", checkToken, requireMenuRight(MENU_DIET_PRICE), insertDietMealPrice);
router.post("/pricedtl/update", checkToken, requireMenuRight(MENU_DIET_PRICE), updateDietMealPrice);
module.exports = router;
