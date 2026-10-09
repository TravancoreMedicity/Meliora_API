const { checkToken } = require('../../authentication/token_validation');

const {
    insertDietTemplateFood,
    getAllDietTemplateFood,
    updateDietTemplateFood,
    inactiveDietFoodItem
} = require('./diettemplatefood.controller');

const router = require('express').Router();

router.post("/insert", checkToken, insertDietTemplateFood);
router.post("/getall", checkToken, getAllDietTemplateFood);
router.post("/update", checkToken, updateDietTemplateFood);
router.post("/inactive", checkToken, inactiveDietFoodItem);// tommarow

module.exports = router;