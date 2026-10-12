const router = require('express').Router();
const { checkToken } = require('../../authentication/token_validation');
const { requireMenuRight } = require('../../authentication/menuRights');
const { stampActor } = require('../../authentication/userChecks');
const { MENU_DIET_MASTER } = require('../../authentication/menuNumbers');

const {
    insertPatientDietMaster,
    getAllPatientDietMaster,
    updatePatientDietMaster
} = require('./patientdietmaster.controller');

// Writes need the right of the "Diet Master" screen (menu 36); the list is read by many screens.
router.post("/patient/insert", checkToken, requireMenuRight(MENU_DIET_MASTER), stampActor('created_by'), insertPatientDietMaster);
router.get("/patient/getallpatientdiet", checkToken, getAllPatientDietMaster);
router.patch("/patient/update", checkToken, requireMenuRight(MENU_DIET_MASTER), stampActor('updated_by'), updatePatientDietMaster);

module.exports = router;