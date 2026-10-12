const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_DIET_TEMPLATE } = require('../../authentication/menuNumbers');

const {
    insertDietTemplate,
    getAllDietTemplate,
    updateDietTemplate
} = require('./diettemplate.controller');

// Writes need the right of the "Diet Template Master" screen (menu 363)
router.post("/insert", checkToken, requireMenuRight(MENU_DIET_TEMPLATE), stampActor('created_by'), insertDietTemplate);
router.get("/getall", checkToken, getAllDietTemplate);
router.patch("/update", checkToken, requireMenuRight(MENU_DIET_TEMPLATE), stampActor('updated_by'), updateDietTemplate);

module.exports = router;