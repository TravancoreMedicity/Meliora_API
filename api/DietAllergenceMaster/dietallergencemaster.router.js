const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_ALLERGEN } = require('../../authentication/menuNumbers');

const {
    insertDietAllergenMaster,
    getAllDietAllergenceMaster,
    updateDietAllergenceMaster
} = require('./dietallergencemaster.controller');

// Writes need the right of the "Diet Allergency Master" screen (menu 362)
router.post("/insert", checkToken, requireMenuRight(MENU_ALLERGEN), stampActor('created_by'), insertDietAllergenMaster);
router.get("/getall", checkToken, getAllDietAllergenceMaster);
router.patch("/update", checkToken, requireMenuRight(MENU_ALLERGEN), stampActor('updated_by'), updateDietAllergenceMaster);

module.exports = router;