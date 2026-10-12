const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_DIET_TYPE_GROUPING } = require('../../authentication/menuNumbers');

const {
    insertDietTemplateFood,
    getAllDietTemplateFood,
    updateDietTemplateFood,
    inactiveDietFoodItem
} = require('./diettemplatefood.controller');

const router = require('express').Router();

// Writes need the right of the "Diet Type Grouping" screen (menu 339). The body of insert / update is a
// LIST of foods, so the acting employee is stamped on every entry.
router.post("/insert", checkToken, requireMenuRight(MENU_DIET_TYPE_GROUPING), stampActor('[].created_by'), insertDietTemplateFood);
router.post("/getall", checkToken, getAllDietTemplateFood);
router.post("/update", checkToken, requireMenuRight(MENU_DIET_TYPE_GROUPING), stampActor('[].updated_by'), updateDietTemplateFood);
router.post("/inactive", checkToken, requireMenuRight(MENU_DIET_TYPE_GROUPING), stampActor('updated_by'), inactiveDietFoodItem);

module.exports = router;